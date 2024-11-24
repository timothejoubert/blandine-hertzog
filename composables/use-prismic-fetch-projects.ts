import type { BuildQueryURLArgs } from '@prismicio/client'
import { usePrismic } from '@prismicio/vue'
import type { ProjectPageDocument } from '~/prismicio-types'

type PrismicFetchDocumentsOptions = Partial<BuildQueryURLArgs>
export function usePrismicFetchProjects(options: PrismicFetchDocumentsOptions = {}, isArchived = false) {
    const prismicFilter = usePrismic().filter

    return usePrismicFetchDocuments<ProjectPageDocument>('project_page', {
        orderings: {
            field: 'my.project.date',
            direction: 'desc',
        },
        pageSize: options.pageSize || 30,
        filters: [prismicFilter.at('my.project_page.archived', isArchived)],
        ...options,
    })
}
