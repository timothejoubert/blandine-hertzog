import { joinURL } from 'ufo'
import type { PrismicDocument } from '@prismicio/types'

export async function usePrismicSeoMeta(webResponse?: PrismicDocument) {
    const nuxtApp = useNuxtApp()
    const settingDocument = (await usePrismicSettingsDocument()).value
    const runtimeConfig = useRuntimeConfig()

    const siteName = settingDocument?.data?.site_name || (nuxtApp.$config.siteName as string) || ''
    const title = webResponse?.data?.meta_title || webResponse?.data?.title || siteName
    const description = webResponse?.data?.meta_description || (settingDocument?.data as { metaDescription?: string })?.metaDescription

    const img = useImage()
    const image = () => {
        const image = settingDocument?.data?.meta_image?.url

        if (image) {
        // TODO: change img provider
            return img(
                image,
                {
                    width: 1200,
                    crop: '1200x630',
                    quality: 70,
                },
                {
                    provider: 'interventionRequest',
                },
            )
        }
        else {
            return joinURL(runtimeConfig.public.site.url, '/images/share.jpg')
        }
    }

    useServerSeoMeta({
        description,
        ogTitle: title,
        ogSiteName: siteName,
        ogDescription: description,
        ogImage: image(),
        twitterCard: 'summary',
        twitterTitle: title,
        twitterDescription: description,
    })
}
