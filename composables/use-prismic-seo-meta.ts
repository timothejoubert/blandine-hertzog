import { joinURL } from 'ufo'
import { getText } from '~/utils/prismic/prismic-rich-field'
import type { ReachableDocument } from '~/types/api'

export async function usePrismicSeoMeta(document: ReachableDocument) {
    // const settingDocument = await usePrismicSettingsDocument()
    const configSite = useRuntimeConfig().public.site

    // const siteName = settingDocument?.data?.site_name || configSite.name || ''
    const siteName = configSite.name || ''
    const title = document.data?.meta_title || document.data?.title || siteName

    const description = document.data?.meta_description || getText(document.data?.content)
    const apiImgUrl = document.data?.meta_image?.url || document.data?.image?.url

    const generateImg = useImage()
    const image = apiImgUrl
        ? generateImg(
            apiImgUrl,
            {
                fit: 'crop',
                width: 800,
            },
            {
                provider: 'imgix',
            },
        )
        : joinURL(configSite.url, '/share.jpg')

    const { fullPath } = useRoute()
    const canonicalUrl = joinURL(configSite.url, fullPath)

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
