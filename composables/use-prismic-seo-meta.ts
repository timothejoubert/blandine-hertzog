import { joinURL } from 'ufo'
import { getText } from '~/utils/prismic/prismic-rich-field'
import type { ReachableDocument } from '~/types/api'

export function usePrismicSeoMeta(document: ReachableDocument) {
    const config = useRuntimeConfig()
    const siteName = config.public.site.name || ''
    const siteUrl = config.public.site.url || ''

    const title = document.data?.meta_title || document.data?.title || siteName
    const description = document.data?.meta_description || getText(document.data?.content)
    const apiImgUrl = document.data?.meta_image?.url || document.data?.image?.url

    const generateImg = useImage()
    const image = apiImgUrl
        ? generateImg(
            apiImgUrl,
            {
                fit: 'crop',
                width: 720,
            },
            {
                provider: 'imgix',
            },
        )
        : joinURL(siteUrl, '/share.jpg')

    const { fullPath } = useRoute()
    const canonicalUrl = joinURL(siteUrl, fullPath)

    useSeoMeta({
        ogSiteName: siteName,
        ogTitle: title,
        description,
        ogDescription: description,
        twitterDescription: description,
        twitterCard: 'summary',
        twitterTitle: title,
        ogImage: image,
        twitterImage: image,
        ogUrl: canonicalUrl,
    })
}
