<script  lang="ts" setup="">
import type { ProjectPageDocument } from '~/prismicio-types'

const props = defineProps<{
    currentProjectDocument?: ProjectPageDocument
}>()

const projectList = await usePrismicMainProjects()
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
.root {
    padding-block: rem(100) rem(140);
}
</style>