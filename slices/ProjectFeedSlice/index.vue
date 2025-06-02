<script setup lang="ts">
import type { Content } from '@prismicio/client'
import { isFilled } from '@prismicio/client'
import type { ProjectPageDocument } from '~/prismicio-types'

const props = defineProps(
    getSliceComponentProps<Content.ProjectFeedSliceSlice>(),
)
const primary = computed(() => props.slice.primary)

const allProjects = await usePrismicMainProjects()

const manualProjectRelations = computed(() => {
    if (!isFilled.group(primary.value.custom_projects)) return []

    return primary.value.custom_projects?.filter((group) => {
        return isFilled.contentRelationship(group.project)
    }).map(group => group.project)
})

const projects = computed(() => {
    if (!manualProjectRelations.value.length) {
        const t = allProjects.value.slice(0, primary.value.automatic_projects_length || 3)
        return t.filter(p => p) as ProjectPageDocument[]
    }

    // Keep same order as contentRelationField
    return manualProjectRelations.value.reduce((acc: ProjectPageDocument[], project) => {
        const sameFilledProject = allProjects.value.find(p => p?.id === project?.id)
        if (sameFilledProject) acc.push(sameFilledProject)
        return acc
    }, [])
})

// SCROLL EFFECT 
// const projectRefs = useTemplateRef<HTMLDivElement[]>('templateProjects')
</script>

<template>
    <VSlice
        ref="root"
        :slice="slice"
        :spacing="primary.spacing || 'none'"
    >
        <VSectionTitle
            v-if="primary.title"
            :label="primary.title"
            :class="$style.title"
            class="grid-container"
        />
        <ul
            v-if="projects?.length"
            :class="$style.list"
            class="grid"
        >
            <VProjectCard
                v-for="project in projects"
                :key="project?.id"
                ref="templateProjects"
                root-tag="li"
                :project="project"
                :class="$style.project"
                size="fullwidth"
            />
        </ul>
        <VCta
            v-if="primary.link?.url"
            :to="primary.link.url"
            :label="primary.link.text || primary.link.url"
            :class="$style.cta"
            icon-name="auto"
        />
    </VSlice>
</template>

<style lang="scss" module>
.title {
    margin-bottom: rem(120);
}

.list {
    margin-block: initial;
    row-gap: 70px;
}

.project {
    position: sticky;
    top: rem(100);
    background-color: var(--theme-color-background);
    grid-column: 1 / -1;
    
    @include media('>=lg') {
        grid-column: 3 / -3;
    }
}

.cta {
    width: fit-content;
    margin-top: rem(72);
    margin-inline: auto;
}
</style>
