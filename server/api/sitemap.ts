import type { Client, ClientConfig } from '@prismicio/client'
import {createClient} from "@prismicio/client"
import { I18N_LOCALES } from '../../constants/i18n'

export async function getSitemap(apiClient: Client, locale?: { multi: boolean, current: string }) {
    const fetchOptions = { pageSize: 60}
    // lang key can't have undefined value
    if (locale?.current) Object.assign(fetchOptions, { lang: locale.current })

    const response = await apiClient.get(fetchOptions)
    
    const urls = response.results?.filter((document) => document?.url).map(d => d.url as string)
    return urls
}

function getPrismicClient(endpoint: string, config: ClientConfig) {
    return createClient(endpoint, config)
}

export default defineSitemapEventHandler(async (event) => {
//   console.log('----- event ------', event)
  const runtimeConfig = event.context.nitro.runtimeConfig
  const prismicData = runtimeConfig.public.prismic
  
  const apiClient = getPrismicClient(prismicData.endpoint, prismicData.clientConfig)

    if(I18N_LOCALES.length > 1) {
        return I18N_LOCALES.map((locale: string) => getSitemap(apiClient, { current: locale, multi: true}))
    }

    return getSitemap(apiClient)
})
