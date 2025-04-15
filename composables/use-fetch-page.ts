import { prismicDocumentRoutes } from '~/constants/prismic-page'
import type { PrismicDocumentType, ReachableDocument } from '~/types/api'

export async function useFetchPage<T extends ReachableDocument>(type?: PrismicDocumentType) {
    const route = useRoute()
    
    const internalRouteType = type
        || prismicDocumentRoutes.find((registerPrismicRoute) => {
            return registerPrismicRoute.name === route.name
        })?.type


    if (!internalRouteType) {
        throw createError({ message: 'can\'t interpret route name during page fetch', status: 500 })
    }

    const { document, documentData, error } = await usePrismicFetchDocument<T>(internalRouteType)

    if (!documentData.value) {
        throw createError({
            statusCode: 404,
            message: 'Can\'t find page document',
        })
    }
    else if (error.value) {
        throw showError(error.value)
    }

    const currentPage = useCurrentPage()
    currentPage.value = {
        document: document.value,
    }

    return { document, documentData, error }
}
