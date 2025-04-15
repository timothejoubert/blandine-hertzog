<script setup lang="ts">
import type { Content } from '@prismicio/client'
import { isFilled } from '@prismicio/client'
import type { ProjectPageDocument } from '~/prismicio-types'

const props = defineProps(
    getSliceComponentProps<Content.ProjectFeedSliceSlice>(),
)
const primary = computed(() => props.slice.primary)

const allProjects = await usePrismicMainProjects()

const manualProjectRelations = computed(() => {
    if (!isFilled.group(primary.value.custom_projects)) return []

    return primary.value.custom_projects?.filter((group) => {
        return isFilled.contentRelationship(group.project)
    }).map(group => group.project)
})

const projects = computed(() => {
    if (!manualProjectRelations.value.length) {
        return allProjects.value.slice(0, primary.value.automatic_projects_length || 3)
    }

    // Keep same order as contentRelationField
    return manualProjectRelations.value.reduce((acc: ProjectPageDocument[], project) => {
        const sameFilledProject = allProjects.value.find(p => p?.id === project?.id)
        if (sameFilledProject) acc.push(sameFilledProject)
        return acc
    }, [])
})
</script>

<template>
    <VSlice
        :slice="slice"
        class="grid-width"
    >
        <VSectionTitle
            v-if="primary.title"
            :label="primary.title"
            :class="$style.title"
        />
        <ul
            v-if="projects?.length"
            :class="$style.list"
        >
            <VProjectCard
                v-for="(project, index) in projects"
                :key="project?.id || index"
                root-tag="li"
                :project="project"
                :class="$style.project"
                size="fullwidth"
            />
        </ul>
    </VSlice>
</template>

<style lang="scss" module>
.title {
    margin-bottom: 142px;
}

.list {
    display: flex;
    flex-direction: column;
    gap: 110px;
}
</style>
