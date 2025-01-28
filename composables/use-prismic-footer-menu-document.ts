import type { MenuDocument } from '~/prismicio-types'

const DATA_KEY = 'footer-menu-document'
export async function usePrismicFooterMenuDocument() {
    const cachedData = useNuxtData<MenuDocument>(DATA_KEY)

    const { data } = cachedData.data.value
        ? cachedData
        : await useAsyncData(DATA_KEY, async () => {
            const prismicClient = usePrismic().client

            return await prismicClient.getSingle('footer_menu')
        })

    return data
}
