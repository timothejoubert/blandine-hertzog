<script lang="ts" setup>
import type { PageComponentProps } from '~/types/app'
import { components } from '~/slices'
import type { ProjectPageDocumentData } from '~/prismicio-types'
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

const content = computed(() => data.value.short_content || data.value.content)
</script>

<template>
    <div
        :id="mainId"
        :class="$style.root"
    >
        <header
            class="grid-width"
            :class="$style.header"
        >
            <VText
                v-if="content"
                :content="content"
                class="text-h5"
                :class="$style['intro-text']"
            />
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
        </header>

        <LazySliceZone
            v-if="slices?.length"
            :slices="slices"
            :components="components"
            wrapper="main"
        />
    </div>
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
    --v-slice-margin-top: var(--gutter);
    --v-slice-margin-bottom: var(--gutter);
}

.header {
    margin-block: rem(72);
}

.intro-text {
    width: flex-grid(8, 12);
    max-width: 58ch;
    margin-block: 0 rem(24);

    @include media('>=lg') {
        width: flex-grid(8, 12);
    }
}

.date {
    margin-right: rem(18);
}

.tag {
    margin-right: rem(18);

    &:last-child {
        margin-right: 0;
    }
}
</style>
