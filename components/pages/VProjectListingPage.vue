<script lang="ts" setup>
import type { ProjectPageDocument } from '~/prismicio-types'
import type { PageComponentProps } from '~/types/app'
import { useRouteQuery } from '~/composables/use-route-query'

const props = defineProps<PageComponentProps<'project_listing_page'>>()
const data = computed(() => props.document.data)

const prismicFilter = usePrismic().filter
const fetchListing = await usePrismicFetchDocuments<ProjectPageDocument>('project_page', {
    orderings: {
        field: 'my.project.date',
        direction: 'desc',
    },
    pageSize: 30,
    filters: [prismicFilter.at('my.project_page.archived', false)],
})

const isPending = computed(() => fetchListing.status.value === 'pending')
const projects = computed(() => fetchListing.data.value?.results || [])

// Filters
const QUERY_KEY = 'tags'
const tags = computed(() => {
    return projects.value.reduce((acc: string[], curr) => {
        curr?.tags.forEach((tag) => {
            if (!acc.includes(tag)) acc.push(tag)
        })
        return acc
    }, [])
})

const route = useRoute()
const filters = computed(() => {
    return tags.value.map((tag) => {
        return {
            value: tag,
            isActive: !!route.query[QUERY_KEY]?.includes(tag),
        }
    })
})

const { currentQueries, hasQuery } = useRouteQuery(QUERY_KEY)

// Rendered project
const renderedProjects = computed(() => {
    if (!hasQuery.value) return projects.value

    if (!projects.value.filter(t => !!t).length) return projects.value

    return projects.value.filter((project) => {
        return project?.tags.some(tag => currentQueries.value.includes(tag))
    })
})
</script>

<template>
    <VHeader
        :title="data.title"
        :content="data.content"
        class="grid-item-main"
    />
    <VFilterBar
        :filters="filters"
        :query-key="QUERY_KEY"
        :class="$style.filters"
    />
    <ul
        v-if="projects.length"
        :class="$style.list"
        class="grid-item-main"
    >
        <li
            v-for="(project, index) in renderedProjects"
            :key="(project?.uid || index)"
            :class="$style.item"
        >
            <VProjectCard
                :project="project"
                :skeleton="isPending || !project"
            />
        </li>
    </ul>
</template>

<style lang="scss" module>
.root {
    position: relative;
}

.filters {
    width: 100%;
    grid-column: 1 / -1;
    margin-block: rem(32);
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
