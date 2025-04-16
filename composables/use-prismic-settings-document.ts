const DATA_KEY = 'settings-document'

export async function usePrismicSettingsDocument() {
    const prismic = usePrismic()

    const { data } = await useAsyncData(DATA_KEY, () => {
        return prismic.client.getSingle('settings')
    }, {
        getCachedData: (key, nuxtApp) => nuxtApp.static.data[key] ?? nuxtApp.payload.data[key], 
        dedupe: 'defer',
        deep: false,
    })

    return data.value
}
