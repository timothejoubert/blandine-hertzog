import type { ProjectPageDocument } from '~/prismicio-types'

export function useProjectUtils(project: ProjectPageDocument | undefined | null) {
    const data = computed(() => project?.data)

    const image = computed(() => data.value?.image?.url && data.value.image)
    const title = computed(() => data.value?.title)
    const date = computed(() => data.value?.creation_date)
    const year = computed(() => date.value?.split('-')?.[0])
    const tags = computed(() => project?.tags || [])

    return {
        image,
        title,
        date,
        year,
        tags,
    }
}
