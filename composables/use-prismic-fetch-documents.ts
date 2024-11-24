import { usePrismic } from '@prismicio/vue'
import type { BuildQueryURLArgs } from '@prismicio/client'
import type { PrismicDocumentType } from '~/types/api'
import { prismicDocumentRoutes } from '~/utils/prismic/route-resolver'
import type { AllDocumentTypes } from '~/prismicio-types'
import { generateHashFromObject } from '~/utils/string/generate-hash-from-object'

type PrismicFetchDocumentsOptions = Partial<BuildQueryURLArgs>

const DEFAULT_SIZE = 10

export function usePrismicFetchDocuments<T extends AllDocumentTypes>(prismicDocument: PrismicDocumentType, options: PrismicFetchDocumentsOptions = {}) {
    const hash: string[] = [prismicDocument]

    if (Object.keys(options)) {
        const optionsHash = typeof options.orderings === 'object' ? generateHashFromObject(options) : options.orderings

        if (optionsHash) hash.push(optionsHash)
    }

    const key = `fetched-pages-${hash.join('-')}`
    console.log('key', key)
    const size = options.pageSize || DEFAULT_SIZE

    return useAsyncData(key, async () => {
        const prismicClient = usePrismic().client
        const { fetchLocaleOption } = useLocale()

        return await prismicClient.getByType<T>(prismicDocument, {
            ...fetchLocaleOption.value,
            pageSize: size, // default 20
            routes: prismicDocumentRoutes,
            brokenRoute: '/404',
            ...options,
        })
    }, {
        deep: false,
        lazy: true,
        default: () => {
            return {
                page: options.page || 0,
                results_per_page: 0,
                results_size: 0,
                total_results_size: size,
                total_pages: 0,
                next_page: null,
                prev_page: null,
                results: [...Array(size).keys()].map(() => null),
            }
        },
    })
}
