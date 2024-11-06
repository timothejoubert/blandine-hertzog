<script lang="ts" setup>
import type { ProjectPageDocument } from '~/prismicio-types'
import type { PageComponentProps } from '~/types/app'

const props = defineProps<PageComponentProps<'project_listing_page'>>()
const data = props.document.data

const prismicFilter = usePrismic().filter
const fetchListing = await usePrismicFetchDocuments<ProjectPageDocument>('project_page', {
    orderings: {
        field: 'my.project.date',
        direction: 'desc',
    },
    filters: [prismicFilter.at('my.project_page.archived', true)],
})

const isPending = computed(() => fetchListing.status.value === 'pending')
const projects = computed(() => fetchListing.data.value?.results || [])
</script>

<template>
    <div :class="$style.root">
        <h1>Project listing page: {{ data.meta_title }}</h1>
        <div>isPending: {{ isPending }}</div>
        <ol
            v-if="projects.length"
            :class="$style.list"
        >
            <li
                v-for="(project, index) in projects"
                :key="project?.uid || index"
            >
                <VProjectCard
                    :project="project"
                    :skeleton="isPending"
                />
            </li>
        </ol>
    </div>
</template>

<style lang="scss" module>
.root {
    position: relative;
}

.list {
    --v-project-listing-page-columns: 4;
    display: grid;
    grid-template-columns: repeat(var(--v-project-listing-page-columns), minmax(0 , 1fr));
    gap: rem(24);
}
</style>
