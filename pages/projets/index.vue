<script lang="ts" setup>
import type { ProjectListingPageDocument } from '~/prismicio-types'
import { components } from '~/slices'

const { document, documentData } = await useFetchPage<ProjectListingPageDocument>('project_listing_page')

// COMMONS
const { t } = useI18n()
const router = useRouter()
const route = useRoute()

// Filters
const TAG_QUERY_KEY = 'tags'

const { queryValues } = useRouteQuery(TAG_QUERY_KEY)

const DEFAULT_TAG_INPUT = { label: t('all'), value: 'all' }
const activeTags = ref(queryValues.value?.length ? queryValues.value : [DEFAULT_TAG_INPUT.value])

const isDefaultSelected = computed(() => {
    const activeValue = Array.isArray(activeTags.value) ? activeTags.value[0] : activeTags.value

    return activeValue === DEFAULT_TAG_INPUT.value || !activeValue
})

watch(activeTags, (value) => {
    router.replace({ ...route, query: { ...route.query, [TAG_QUERY_KEY]: value } })
})

// Project
const projects = await usePrismicMainProjects()
const isPending = computed(() => !!projects.value.length && projects.value.every(p => !p))

const renderedProjects = computed(() => {
    if (!activeTags.value.length || isDefaultSelected.value) return projects.value

    if (!projects.value.filter(t => !!t).length) return projects.value

    return projects.value.filter((project) => {
        return project?.tags.some(tag => activeTags.value.includes(tag))
    })
})

// const projectLength = computed(() => renderedProjects.value.length)
</script>

<template>
    <div
        :id="document?.id"
        :class="$style.root"
    >
        <VHeader
            :title="documentData.title"
            :content="documentData.content"
            :media="documentData.image"
            :class="$style.header"
        /> 
        <main>
            <VProjectTagFilter
                v-model="activeTags"
                :default-input="DEFAULT_TAG_INPUT"
                :class="$style.filters"
                :query="TAG_QUERY_KEY"
            />
            <ul
                v-if="renderedProjects.length"
                :class="$style.list"
                class="grid"
            >
                <VProjectCard
                    v-for="(project, index) in renderedProjects"
                    :key="project?.id || index"
                    :class="$style.item"
                    root-tag="li"
                    :project="project"
                    :skeleton="isPending || !project"
                />
            </ul>
            <div
                v-else
            >
                {{ $t('no_result') }}
            </div>
        </main>
        <LazySliceZone
            v-if="documentData.slices?.length"
            :slices="documentData.slices"
            :components="components"
        />
    </div>
</template>

<style lang="scss" module>
@use 'assets/scss/functions/fluid' as *;

.root {
    position: relative;
}

.filters {
    display: flex;
    margin-top: rem(112);
    margin-inline: var(--gutter);
}

.reset {
    display: flex;
    align-items: center;
    border: none;
    background-color: initial;
    color: inherit;
    cursor: pointer;
    font-size:  rem(14);
    gap: rem(4);
    text-transform: uppercase;
    transition: opacity 0.3s;

    &[disabled] {
        cursor: initial;
        opacity: 0.6;
    }
}

.list {
    margin-top: rem(60);
    row-gap: rem(42);
}

.item {
    grid-column: 1 / -1;

    @include media('>=md') {
        grid-column: span 7;
    }
}
</style>
