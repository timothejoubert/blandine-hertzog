// https://prismic.io/docs/route-resolver#resolvers
// https://prismic.io/docs/nuxt-3-define-routes
import { extractValueBetweenOccurrence } from '#root/utils/string/extract'
import { I18N_LOCALES } from '#root/i18n/i18n.config'
import type { PrismicDocumentType } from '~/types/api'

interface prismicDocumentRoute {
    type: PrismicDocumentType
    path: string
    alias?: string[]
}

export const prismicDocumentRoutes: prismicDocumentRoute[] = [
    {
        type: 'project_listing_page',
        path: '/:lang?',
        alias: ['/:lang?', '/:lang?/projects', '/:lang?/projets'],
    },
    {
        type: 'archive',
        path: '/:lang?/archive',
    },
    {
        type: 'home_page',
        path: '/not-exist',
    },
    {
        type: 'about',
        path: '/:lang?/a-propos',
        alias: ['/:lang?/bio'],
    },
    {
        type: 'project',
        path: '/:lang?/projets/:uid',
        alias: ['/:lang?/projects/:uid'],
    },
]

// TODO: find item by alias too
export function getDocumentTypeByUrl(path: string) {
    const firstSegment = extractValueBetweenOccurrence(path, '/', [1, 2]) || ''

    const route = prismicDocumentRoutes.find((prismicRoute) => {
        if (path === prismicRoute.path) return true

        // Replace locale or uid if exist
        const hasLocale = I18N_LOCALES.includes(firstSegment as (typeof I18N_LOCALES)[number])
        const dynamicUid = prismicRoute.path?.includes(':uid') && path.substring(path.lastIndexOf('/') + 1)

        const filteredPath = prismicRoute.path
            ?.replace('/:lang?', hasLocale ? `/${firstSegment}` : '')
            .replace(':uid', dynamicUid || '') || '/'

        return path === filteredPath
    })

    if (route) return route.type

    return undefined
}

export function getDocumentRoutePath(documentType: PrismicDocumentType) {
    const currentRoute = prismicDocumentRoutes.find(route => route.type === documentType)

    return currentRoute?.path?.replace('/:lang?', '').replace(':uid', '')
}
