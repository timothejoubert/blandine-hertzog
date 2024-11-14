<script setup lang="ts">
import type { Content } from '@prismicio/client'
import { usePrismic } from '@prismicio/vue'
import type { ProjectPageDocument } from '~/prismicio-types'

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
        const prismicFilter = usePrismic().filter
        const fetchListing = await usePrismicFetchDocuments<ProjectPageDocument>('project_page', {
            orderings: {
                field: 'my.project.date',
                direction: 'desc',
            },
            pageSize: listLength.value,
            filters: [prismicFilter.at('my.project_page.archived', false)],
        })

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
    </VSlice>
</template>

<style lang="scss" module>
.list {
    margin-top: rem(77);
}
</style>
