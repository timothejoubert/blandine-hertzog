export function usePrismicPreviewRoute() {
    const route = useRoute()

    const searchParams = computed(() => new URLSearchParams(route.fullPath))
    const documentId = computed(() => searchParams.value.get('documentId'))
    const previewToken = computed(() => searchParams.value.get('token'))
    const websitePreviewId = computed(() => searchParams.value.get('websitePreviewId'))

    const runtimeConfig = useRuntimeConfig()
    const previewPath = runtimeConfig.public?.prismic?.preview

    const isPreview = computed(() => {
        return route.path.includes(`${previewPath}`) && !!documentId.value
    })

    return { isPreview, documentId, previewToken, websitePreviewId }
}
