<script setup lang="ts">
import type { Content } from '@prismicio/client'
import { usePrismic } from '@prismicio/vue'
import type { ProjectPageDocument } from '~/prismicio-types'
import { usePrismicFetchProjects } from '~/composables/use-prismic-fetch-projects'
import { prismicDocumentRoute } from '~/utils/prismic/route-resolver'
import { useLinkResolver } from '~/composables/use-link-resolver'

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
const props = defineProps(
    getSliceComponentProps<Content.ProjectFeedSliceSlice>([
        'slice',
        'index',
        'slices',
        'context',
    ]),
)

const primary = computed(() => props.slice.primary)

const manualProjectIds = computed(() => {
    return primary.value.custom_projects.filter((group) => {
        const projectRelation = group.project
        return 'id' in projectRelation && !!projectRelation.id
    }).map(group => group.project.id)
})
const listLength = computed(() => manualProjectIds.value.length || 4)

const projects = ref<(ProjectPageDocument | null)[]>([])

const prismicClient = usePrismic().client

async function setProjects() {
    if (manualProjectIds.value.length) {
        const fetchListingResponse = await prismicClient.getByIDs<ProjectPageDocument>(manualProjectIds.value)
        projects.value = fetchListingResponse.results
    }
    else {
        const fetchListing = await usePrismicFetchProjects({ pageSize: listLength.value })
        projects.value = fetchListing.data.value?.results || []
    }
}

await setProjects()

watch(primary, async () => {
    await setProjects()
}, { deep: true })

const { url: projectListingUrl } = useLinkResolver(prismicDocumentRoute.project_listing_page)
const listingUrl = computed(() => primary.value.internal_page?.url ? primary.value.internal_page : projectListingUrl.value)
</script>

<template>
    <VSlice
        :slice="slice"
    >
        <VHeadSection
            :title="primary.title"
            :link-label="primary.link_label || $t('see_all_projects')"
            :link-reference="listingUrl"
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
            />
        </ul>
    </VSlice>
</template>

<style lang="scss" module>
@use 'assets/scss/functions/rem' as *;
@use 'assets/scss/mixins/include-media' as *;

.list {
    --v-grid-list-column: 1;

    position: relative;
    display: grid;
    gap: rem(24) var(--gutter);
    grid-template-columns: repeat(var(--v-grid-list-column), minmax(0 , 1fr));
    margin-block: 0;

    @include media('>=lg') {
        --v-grid-list-column: 2;

        &::before {
            position: absolute;
            top: 0;
            left: 50%;
            width: 1px;
            height: 100%;
            background-color: var(--theme-color-line);
            content: '';
        }
    }
}

.project {
    position: relative;
    list-style: none;
    padding-block: calc(var(--gutter) * 0.5);

    &::before {
        position: absolute;
        right: calc(var(--gutter) * -1);
        bottom: 0;
        left: calc(var(--gutter) * -1);
        height: 1px;
        background-color: var(--theme-color-line);
        content: '';
    }
}

.cta {
    margin-top: rem(54);
}
</style>
