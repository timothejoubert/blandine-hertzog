<script lang="ts" setup>
import type { PageComponentProps } from '~/types/app'
import { components } from '~/slices'
import type { ProjectPageDocumentData } from '~/prismicio-types'
import { prismicDocumentRoute } from '~/utils/prismic/route-resolver'
import { useLinkResolver } from '~/composables/use-link-resolver'
import VCrossProjects from '~/components/molecules/VCrossProjects.vue'

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

const mainId = computed(() => props.document.id)
</script>

<template>
    <main
        :id="mainId"
        :class="$style.root"
    >
        <VText
            v-if="data.short_content"
            :content="data.short_content"
            class="text-h4"
            :class="$style['short-content']"
        />
        <div
            :class="$style.attributes"
            class="grid"
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
            :components="components"
        />
    </main>
    <VCrossProjects
        :next-project="nextProject"
        :prev-project="prevProject"
    />
</template>

<style lang="scss" module>
@use 'assets/scss/functions/rem' as *;
@use 'assets/scss/functions/flex-grid' as *;
@use 'assets/scss/mixins/include-media' as *;

.root {
    --v-slice-margin-top: #{rem(100)};
    --v-slice-margin-bottom: #{rem(100)};

    position: relative;

    @include media('>=lg') {
        width: flex-grid(12, 14, '%', true);
        margin-left: var(--gutter);
    }

}

.short-content {
    margin-top: rem(100);
}

.attributes {
    display: flex;
    align-items: center;
    gap: rem(20);
    margin-block: rem(24) rem(48);
}

.slices {
    display: flex;
    flex-direction: column;
    gap: rem(42);
}
</style>
