<script lang="ts" setup>
import type { PageComponentProps } from '~/types/app'
import { components } from '~/slices'
import type { ProjectPageDocumentData } from '~/prismicio-types'
import { prismicDocumentRoute } from '~/utils/prismic/route-resolver'
import { useLinkResolver } from '~/composables/use-link-resolver'

const props = defineProps<PageComponentProps<'project_page'>>()
const data = computed(() => props.document.data)

const { tags, date } = useProjectUtils(props.document)

const slices = computed(() => {
    const sliceKey = (Object.keys(data.value).findLast(dataKey => dataKey.includes('slice')) || 'slices') as keyof ProjectPageDocumentData
    return data.value?.[sliceKey] || []
})

// Cross Projects
const mainProjectList = await usePrismicMainProjects()

const currentProjectIndex = computed(() => mainProjectList.value.findIndex(p => p?.id === props.document.id))

const prevProject = computed(() => {
    const index = currentProjectIndex.value - 1
    const prevIndex = index < 0 ? mainProjectList.value.length - 1 : index

    return mainProjectList.value[prevIndex]
})

const nextProject = computed(() => {
    const index = currentProjectIndex.value + 1
    const nextIndex = index > mainProjectList.value.length - 1 ? 0 : index

    return mainProjectList.value[nextIndex]
})

const { url: listingUrl } = useLinkResolver(prismicDocumentRoute.project_listing_page)
</script>

<template>
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
@use 'assets/scss/functions/rem' as *;

.root {
    position: relative;
}

.back {
    width: flex-grid(2, 11);
    margin-bottom: rem(32);
}

.main {
    display: contents;
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
    gap: rem(42);
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
