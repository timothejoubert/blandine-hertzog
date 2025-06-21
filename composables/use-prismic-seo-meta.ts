import { joinURL } from 'ufo'
import { getText } from '~/utils/prismic/prismic-rich-field'
import type { ReachableDocument } from '~/types/api'

export function usePrismicSeoMeta(document: ReachableDocument) {
    const config = useRuntimeConfig()
    const siteName = config.public.site.name
    const siteUrl = config.public.site.url

    const title = document.data?.meta_title || document.data?.title || siteName
    const description = document.data?.meta_description || getText(document.data?.content)
    const apiImgUrl = document.data?.meta_image?.url || document.data?.image?.url

    const generateImg = useImage()
    const image = apiImgUrl
        ? generateImg(
            apiImgUrl,
            {
                fit: 'crop',
                width: 1200,
                height: 700,
            },
            {
                provider: 'imgix',
            },
        )
        : joinURL(siteUrl, '/share.jpg')

    const { path } = useRoute()

    useSeoMeta({
        ogSiteName: siteName,
        ogTitle: title,
        description,
        ogDescription: description,
        twitterDescription: description,
        twitterCard: 'summary',
        twitterTitle: title,
        ogImage: image,
        ogImageWidth: '1200',
        ogImageHeight: '700',
        twitterImage: image,
        ogUrl: joinURL(siteUrl, document.url || path),
    })
}
