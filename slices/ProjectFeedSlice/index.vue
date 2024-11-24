<script setup lang="ts">
import type { Content } from '@prismicio/client'
import { usePrismic } from '@prismicio/vue'
import type { ProjectPageDocument } from '~/prismicio-types'
import { usePrismicFetchProjects } from '~/composables/use-prismic-fetch-projects'
import { prismicDocumentRoute } from '~/utils/prismic/route-resolver'

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

const data = computed(() => props.slice.primary)

const manualProjectIds = computed(() => {
    return data.value.custom_projects.filter((group) => {
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
        projects.value = fetchListing.data.value.results
    }
}

await setProjects()

watch(data, async () => {
    await setProjects()
}, { deep: true })
</script>

<template>
    <VSlice
        :slice="slice"
        :class="$style.root"
    >
        <div
            class="text-h3"
            :class="$style.title"
        >
            {{ data.title }}
        </div>
        <VGridList
            v-if="projects?.length"
            v-slot="{ item }"
            :class="$style.list"
            :items="projects"
        >
            <VProjectCard
                :project="item"
            />
        </VGridList>
        <VArrowButton
            :label="data.link_label || $t('see_all_projects')"
            arrow-direction="right"
            icon-position="start"
            :to="data.internal_page?.url ? data.internal_page : prismicDocumentRoute.project_listing_page.path"
            :class="$style['cta']"
        />
    </VSlice>
</template>

<style lang="scss" module>
.list {
    margin-top: rem(54);
}

.cta {
    margin-top: rem(42);
}
</style>
