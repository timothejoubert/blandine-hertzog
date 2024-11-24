<script lang="ts" setup>
import type { PageComponentProps } from '~/types/app'
import { components } from '~/slices'
import { usePrismicFetchProjects } from '~/composables/use-prismic-fetch-projects'
import type { ProjectPageDocumentData } from '~/prismicio-types'

const props = defineProps<PageComponentProps<'project_page'>>()
const data = computed(() => props.document.data)

const { tags, date } = useProjectUtils(props.document)

const slices = computed(() => {
    const sliceKey = (Object.keys(data.value).findLast(dataKey => dataKey.includes('slice')) || 'slices') as keyof ProjectPageDocumentData
    return data.value?.[sliceKey] || []
})

// Cross Projects
const prevProjectResponse = await usePrismicFetchProjects({
    pageSize: 1,
    after: props.document.id,
    orderings: {
        field: 'my.project.date',
        direction: 'asc',
    },
})
const prevProject = computed(() => prevProjectResponse.data.value.results[0])

const nextProjectResponse = await usePrismicFetchProjects({
    pageSize: 1,
    after: props.document.id,
    orderings: {
        field: 'my.project.date',
        direction: 'desc',
    },
})
const nextProject = computed(() => nextProjectResponse.data.value.results[0])

// TODO: fetch previous project
// https://community.prismic.io/t/find-the-next-and-previous-posts-pagination/652/3
console.log('prevProject', prevProjectResponse.data.value)
console.log('nextProject', nextProjectResponse.data.value)
</script>

<template>
    <VHeader
        :title="data.title"
        :content="data.content"
        class="grid-item-main"
    >
        <VArrow
            to="/projects"
            :aria-label="$t('project_page.back')"
            :class="$style.back"
            direction="left"
        />
    </VHeader>
    <div
        :class="$style.attributes"
        class="grid-item-main"
    >
        <VTime
            :date="date"
            :class="$style.date"
        />
        <template v-if="tags.length">
            <VTag
                v-for="tag in tags"
                :key="tag"
                :class="$style.tag"
                :label="tag"
            />
        </template>
    </div>

    <LazySliceZone
        v-if="slices?.length"
        :slices="slices"
        wrapper="main"
        :components="components"
        :class="$style.slices"
        class="grid-item-main"
    />

    <section
        v-if="prevProject || nextProject"
        class="grid-item-main"
        :class="$style['cross-projects']"
    >
        <VArrowButton
            v-if="prevProject"
            :to="prevProject"
            :label="$t('previous_project')"
            arrow-direction="left"
            :aria-label="prevProject.data.title"
            :class="$style['cross-projects__link']"
        />
        <VArrowButton
            v-if="nextProject"
            :to="nextProject"
            :label="$t('next_project')"
            arrow-direction="right"
            icon-position="end"
            :aria-label="nextProject.data.title"
            :class="$style['cross-projects__link']"
        />
    </section>
</template>

<style lang="scss" module>
.root {
    position: relative;
}

.back {
    width: flex-grid(2, 11);
    margin-bottom: rem(32);
}

.attributes {
    display: flex;
    align-items: center;
    gap: rem(20);
    margin-block: rem(42);
}

.slices {
    display: flex;
    flex-direction: column;
    gap: rem(75);
}

.cross-projects {
    display: grid;
    height: min-content;
    align-items: center;
    grid-template-columns: 1fr 1fr;
    margin-block: rem(192) rem(40);
}

.cross-projects__link {
    justify-self: center;
}
</style>
