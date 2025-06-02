import { prismicDocumentRoutes } from '~/constants/prismic-page'
import type { PrismicDocumentType, ReachableDocument } from '~/types/api'
import { I18N_LOCALES } from '~/constants/i18n'


function findLocalizedPrismicRouteType(routeName: string | undefined, routesNameSeparator?: string) {
    return prismicDocumentRoutes.find((registerPrismicRoute) => {
        const storedName = registerPrismicRoute.name
        if (storedName === routeName) return true

        // match localized route name
        // e.g. 'index___fr' => 'index'
        return routesNameSeparator && I18N_LOCALES.find(locale => {
            return storedName === routeName?.toString().replace(`${routesNameSeparator}${locale}`, '')
        })
    })?.type
}

export async function useFetchPage<T extends ReachableDocument>(type?: PrismicDocumentType) {
    const route = useRoute()

    const config = useRuntimeConfig()
    const i18nConfig = config.public.i18n
    const routesNameSeparator = i18nConfig.strategy !== 'no_prefix' ? i18nConfig.routesNameSeparator : undefined

    const internalRouteType = type || findLocalizedPrismicRouteType(route.name?.toString(), routesNameSeparator)

    const { isPreview } = usePrismicPreviewRoute()
    
    if (!internalRouteType && !isPreview.value) {
        throw createError({ message: 'can\'t interpret route name during page fetch', status: 500 })
    }

    const { document, error } = await usePrismicFetchDocument<T>(internalRouteType)

    if (!document.value || !document.value?.data) {
        throw createError({
            statusCode: 404,
            message: `Can't find page document for ${internalRouteType} ${route.params.uid ? 'with uid ' + route.params.uid : ''}`,
        })
    }
    else if (error.value) {
        throw showError(error.value)
    }

    const currentPage = useCurrentPage()
    currentPage.value = {
        document: document.value,
    }

    usePrismicSeoMeta(document.value)

    useHead({
        title: `${document.value.data?.meta_title || document.value?.data?.title} | ${config.public.site.name}`,
    })

    return { 
        document: document.value as T, 
        documentData: document.value.data as T['data'],  
        error 
    }
}
