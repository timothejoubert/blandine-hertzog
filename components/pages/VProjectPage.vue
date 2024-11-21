<script lang="ts" setup>
import type { PageComponentProps } from '~/types/app'
import { components } from '~/slices'

const props = defineProps<PageComponentProps<'project_page'>>()
const data = computed(() => props.document.data)

const { tags, date } = useProjectUtils(props.document)

const slices = computed(() => {
    const sliceKey = Object.keys(data.value).findLast(dataKey => dataKey.includes('slice')) || 'slices'
    return data.value?.[sliceKey] || []
})
</script>

<template>
    <VHeader
        :title="data.title"
        :content="data.content"
        class="grid-item-main"
    >
        <VArrow
            to="/projects"
            :aria-label="$t('back_to_project_listing')"
            :class="$style.back"
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
</template>

<style lang="scss" module>
.root {
    position: relative;
}

.back {
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
</style>
