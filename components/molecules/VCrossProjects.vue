<script  lang="ts" setup="">
import type { ProjectPageDocument } from '~/prismicio-types'

const props = defineProps<{
    currentProjectDocument?: ProjectPageDocument
}>()

const isProjectArchived = computed(() => props.currentProjectDocument?.data.archived)
const archivedProjects = await usePrismicArchivedProjects()
const mainProjects = await usePrismicMainProjects()

const projectList = computed(() => {
    return isProjectArchived.value ? archivedProjects.value : mainProjects.value
})
const currentProjectIndex = computed(() => projectList.value.findIndex(p => p?.id === props.currentProjectDocument?.id))

const nextProject = computed(() => {
    const nextIndex = currentProjectIndex.value + 1
    const index = (nextIndex >= projectList.value.length) ? 0 : nextIndex
    return projectList.value[index]
})
</script>

<template>
    <VLinkMouseFollow
        root-tag="section"
        :class="$style.root"
        :title="nextProject?.data.title || undefined"
        link-label="Projet suivant"
        :href="nextProject?.url || undefined"
    />
</template>

<style lang="scss" module>
@use "assets/scss/mixins/property-fluid" as *;

.root {
    @include property-fluid('margin-top', (xs: 10, xl: 100));
    @include property-fluid('margin-bottom', (xs: 100, xl: 180));
}
</style>