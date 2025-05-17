import type { FilledContentRelationshipField } from '@prismicio/types'
import { isFilled } from '@prismicio/client'
import type { PossibleProjectPageDocument } from '~/types/app'
import { isContentRelationshipField, isPrismicDocument } from '~/utils/prismic/guard'
import type { ProjectPageDocument } from '~/prismicio-types'

export function useProjectUtils(project: PossibleProjectPageDocument | undefined | null) {
    const projectFilled = computed(() => {
        if (isContentRelationshipField(project)) return project as FilledContentRelationshipField<'project_page', string, ProjectPageDocument['data']>
        else if (isPrismicDocument(project)) return project // as ProjectPageDocument

        return undefined
    })

    const data = computed(() => projectFilled.value?.data)
    const tags = computed(() => projectFilled.value?.tags || [])
    
    const title = computed(() => data.value?.title)
    const content = computed(() => isFilled.richText(data.value?.content) ? data.value?.content : undefined)
    const image = computed(() => isFilled.image(data.value?.image) ? data.value.image: undefined)
    const date = computed(() => data.value?.creation_date)
    const client = computed(() => data.value?.client)

    return {
        title,
        content,
        image,
        date,
        tags,
        client
    }
}
