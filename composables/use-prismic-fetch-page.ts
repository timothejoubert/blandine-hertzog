import type { PrismicDocumentType } from '~/types/api'
import { isDynamicDocument, isExistingDocumentType } from '~/utils/prismic/document-type'
import { usePrismicPreviewRoute } from '~/composables/use-prismic-preview-route'

// TODO: enabled preview
export async function usePrismicFetchPage(prismicDocument: PrismicDocumentType) {
    const route = useRoute()
    const routeUid = route.params?.uid || ''
    // get last uid when has subPage route, ex: /project/project-uid => project-uid
    const uid = Array.isArray(routeUid) ? routeUid.at(-1) : routeUid

    const { documentId, isPreview } = usePrismicPreviewRoute()

    const key = `fetched-page-${prismicDocument}-${uid || documentId || 'unique'}`

    const prismicClient = usePrismic().client

    const { data } = await useAsyncData(key, async () => {
        try {
            const { fetchLocaleOption } = useLocale()

            if (isPreview && documentId) {
                return await prismicClient.getByID(documentId, { ...fetchLocaleOption.value })
            }
            else if (uid && isDynamicDocument(prismicDocument)) {
                return await prismicClient.getByUID(prismicDocument, uid, { ...fetchLocaleOption.value })
            }
            else if (isExistingDocumentType(prismicDocument)) {
                return await prismicClient.getSingle(prismicDocument, { ...fetchLocaleOption.value })
            }
        }
        catch (error: unknown) {
            // @ts-expect-error cannot know the error type
            return { error: createError(error) }
        }
    })

    const response = data.value

    return {
        webResponse: (!!response && !('error' in response)) ? response : undefined,
        error: (!!response && ('error' in response)) ? response.error : undefined,
    }
}
