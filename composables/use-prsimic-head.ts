import { joinURL } from 'ufo'
import type { Link, Script } from '@unhead/schema'
import { getFormattedLocale } from '~/composables/use-locale'
import { I18N_DEFAULT_LOCALE } from '~/constants/i18n'
import type { ReachableDocument } from '~/types/api'


export function usePrismicHead(webResponse?: ReachableDocument) {
    const nuxtApp = useNuxtApp()
    const route = useRoute()
    const runtimeConfig = useRuntimeConfig()



    const script: (Script<['script']> | string)[] = []
    const link: Link[] = [
        {
            rel: 'canonical',
            href: joinURL(runtimeConfig.public.site.url, webResponse?.url || route.fullPath),
        },
    ]

    // ALTERNATE LINKS
    const alternateLinks = [
        ...(webResponse?.alternate_languages || []), 
        { id: 'default', type: webResponse?.type || '', lang: I18N_DEFAULT_LOCALE }
    ]

    alternateLinks.forEach((alternateLink) => {
        const formattedLocale = getFormattedLocale(alternateLink.lang)
        const locale = formattedLocale === I18N_DEFAULT_LOCALE ? '' : formattedLocale

        link.push({
            hid: `alternate-${alternateLink.lang}`,
            rel: 'alternate',
            hreflang: alternateLink.lang,
            href: joinURL(runtimeConfig.public.site.url, locale, route.fullPath),
        })
    })

    //
    const { $i18n } = nuxtApp
    useHead({
        htmlAttrs: {
            lang: $i18n.locale.value,
        },
        script,
        link,
        meta: [
            { name: 'version', content: runtimeConfig.public.version },
        ],
    })
}
