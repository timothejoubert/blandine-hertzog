<script  lang="ts" setup="">
import type { ProjectPageDocument } from '~/prismicio-types'
// import { useLinkResolver } from '~/composables/use-link-resolver'
// import { prismicDocumentName } from '~/constants/prismic-page'

const props = defineProps<{
    activeProjectDocument?: ProjectPageDocument
}>()

// Cross Projects
const projectList = await usePrismicMainProjects()

const currentProjectIndex = computed(() => projectList.value.findIndex(p => p?.id === props.activeProjectDocument?.id))

const prevProject = computed(() => {
    const index = currentProjectIndex.value - 1
    const prevIndex = index < 0 ? projectList.value.length - 1 : index

    return projectList.value[prevIndex]
})

const nextProject = computed(() => {
    const index = currentProjectIndex.value + 1
    const nextIndex = index > projectList.value.length - 1 ? 0 : index

    return projectList.value[nextIndex]
})

// const { url: projectListingUrl } = useLinkResolver(prismicDocumentName.project_listing_page)
</script>

<template>
    <section
        v-if="prevProject || nextProject"
        class="grid"
        :class="$style.root"
    >
        <VArrowButton
            v-if="prevProject"
            :to="prevProject"
            :label="$t('previous_project')"
            arrow-direction="left"
            :aria-label="prevProject.data.title"
            :class="$style.project"
        />
        <VArrowButton
            v-if="nextProject"
            :to="nextProject"
            :label="$t('next_project')"
            arrow-direction="right"
            icon-position="end"
            :aria-label="nextProject.data.title"
            :class="$style.project"
        />
    </section>
</template>

<style lang="scss" module>
@use 'assets/scss/functions/rem' as *;

.root {
    display: grid;
    height: min-content;
    align-items: center;
    grid-template-columns: 1fr 1fr;
    margin-block: rem(192);
}

.head {
    margin-bottom: rem(124);
    grid-column: 1 /-1;
}

.project {
    justify-self: center;
}
</style>
