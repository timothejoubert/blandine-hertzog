export const prismicDocumentRoutes = [
    {
        name: 'index',
        type: 'home_page',
        path: '/:lang?',
    },
    {
        name: 'archive',
        type: 'archive_page',
        path: '/:lang?/archive',
    },
    {
        name: 'projets',
        type: 'project_listing_page',
        path: '/:lang?/projets',
        alias: ['/:lang?', '/:lang?/projets', '/:lang?/projects'],
    },
    {
        name: 'projets-uid',
        type: 'project_page',
        path: '/:lang?/projets/:uid',
        alias: ['/:lang?/projects/:uid'],
    },
    {
        name: 'uid',
        type: 'default_page',
        path: '/:lang?/:uid',
    },
    // {
    //     name: 'about',
    //     type: 'about_page',
    //     path: '/:lang?/a-propos',
    // },
] as const

export type PrismicDocumentRoutes = typeof prismicDocumentRoutes
export type PrismicDocumentRoute = PrismicDocumentRoutes[number]

export type PrismicDocumentType = Pick<PrismicDocumentRoute, 'type'>

export const prismicDocumentName = prismicDocumentRoutes.reduce((acc, route) => {
    const type = route.type
    Object.assign(acc, { [type]: type })

    return acc
}, {} as Record<PrismicDocumentType, PrismicDocumentType>)

export const prismicDocumentRoute = prismicDocumentRoutes.reduce((acc, route) => {
    const type = route.type
    Object.assign(acc, { [type]: route })

    return acc
}, {} as Record<PrismicDocumentType, PrismicDocumentRoute>)
