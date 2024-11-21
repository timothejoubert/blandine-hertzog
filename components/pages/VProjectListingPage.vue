<script lang="ts" setup>
import type { ProjectPageDocument } from '~/prismicio-types'
import type { PageComponentProps } from '~/types/app'

const props = defineProps<PageComponentProps<'project_listing_page'>>()
const data = computed(() => props.document.data)

const prismicFilter = usePrismic().filter
const fetchListing = await usePrismicFetchDocuments<ProjectPageDocument>('project_page', {
    orderings: {
        field: 'my.project.date',
        direction: 'desc',
    },
    filters: [prismicFilter.at('my.project_page.archived', false)],
})

const isPending = computed(() => fetchListing.status.value === 'pending')
const projects = computed(() => fetchListing.data.value?.results || [])
</script>

<template>
    <VHeader
        :title="data.title"
        :content="data.content"
        class="grid-item-main"
    />
    <ul
        v-if="projects.length"
        :class="$style.list"
        class="grid-item-main"
    >
        <li
            v-for="(project, index) in projects"
            :key="project?.uid || index"
            :class="$style.item"
        >
            <VProjectCard
                :project="project"
                :skeleton="isPending"
            />
        </li>
    </ul>
</template>

<style lang="scss" module>
.root {
    position: relative;
}

.title {
    margin-block: initial;
}

.list {
    --v-project-listing-page-columns: 1;

    display: grid;
    gap: rem(24);
    grid-template-columns: repeat(var(--v-project-listing-page-columns), minmax(0 , 1fr));

    @include media('>=md') {
        --v-project-listing-page-columns: 2;
    }

}

.item {
    list-style: none;
}
</style>
