import type { SettingsDocument } from '~/prismicio-types'

const DATA_KEY = 'menu-document'
export async function usePrismicMenuDocument() {
    const cachedData = useNuxtData<SettingsDocument>(DATA_KEY)

    const { data } = cachedData.data.value
        ? cachedData
        : await useAsyncData(DATA_KEY, async () => {
            const prismicClient = usePrismic().client

            return await prismicClient.getSingle('menu')
        })

    return data
}
