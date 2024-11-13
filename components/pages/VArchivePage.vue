<script  lang="ts" setup>
import type { PageComponentProps } from '~/types/app'
import type { ProjectPageDocument } from '~/prismicio-types'

const props = defineProps<PageComponentProps<'archive_page'>>()
const data = computed(() => props.document.data)

const prismicFilter = usePrismic().filter
const fetchListing = await usePrismicFetchDocuments<ProjectPageDocument>('project_page', {
    orderings: {
        field: 'my.project.date',
        direction: 'desc',
    },
    filters: [prismicFilter.at('my.project_page.archived', true)],
})

const projects = computed(() => fetchListing.data.value?.results || [])
</script>

<template>
    <div :class="$style.root">
        <VHeader
            :title="data.title"
            :content="data.content"
        />
        <ul
            v-if="projects.length"
            :class="$style.list"
        >
            <li
                v-for="(project, index) in projects"
                :key="project?.uid || index"
                :class="$style.item"
            >
                <VProjectRow :project="project" />
            </li>
        </ul>
    </div>
</template>

<style lang="scss" module>
.root {
    position: relative;
}

.item {
    list-style: none;
}
</style>
