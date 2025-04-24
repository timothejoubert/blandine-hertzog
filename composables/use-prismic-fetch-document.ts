import type { AllDocumentTypes } from '~/prismicio-types'
import type { PrismicDocumentType } from '~/types/api'
import { isDynamicDocument, isExistingDocumentType } from '~/utils/prismic/document-type'
import { usePrismicPreviewRoute } from '~/composables/use-prismic-preview-route'

export type PrismicWebResponse = Awaited<ReturnType<typeof usePrismicFetchDocument>>['document']

export async function usePrismicFetchDocument<T extends AllDocumentTypes>(prismicDocument: PrismicDocumentType | undefined) {
    const route = useRoute()
    const routeUid = route.params?.uid || ''
    const uid = Array.isArray(routeUid) ? routeUid.at(-1) : routeUid // get the last uid when route has subPage,

    const { documentId, isPreview } = usePrismicPreviewRoute()

    const dataKey = `page-${prismicDocument}-${uid || documentId || 'single-document'}`

    const prismicClient = usePrismic().client
    const { fetchLocaleOption } = useLocale()
    const prismicFetchOptions = {
        ...fetchLocaleOption.value,
        brokenRoute: '/404',
    }

    const { data, error } = await useAsyncData(dataKey, async () => {
        try {
            if (isPreview.value && documentId.value) {
                return await prismicClient.getByID(documentId.value, prismicFetchOptions)
            }
            else if (prismicDocument && uid && isDynamicDocument(prismicDocument)) {
                return await prismicClient.getByUID(prismicDocument, uid, prismicFetchOptions)
            }
            else if (prismicDocument && isExistingDocumentType(prismicDocument)) {
                return await prismicClient.getSingle(prismicDocument, prismicFetchOptions)
            } 
        } catch (error) {
            console.error('Error during Prismic document fetch', error);
            return { data: '' }   
        }
    }, {
        getCachedData: (key, nuxtApp) => nuxtApp.static.data[key] ?? nuxtApp.payload.data[key],
        dedupe: 'defer',
        deep: false,
    })

    const document = computed(() => data.value as T)
    const documentData = computed(() => data.value?.data as T['data'])

    return {
        document,
        documentData,
        error,
    }
}
