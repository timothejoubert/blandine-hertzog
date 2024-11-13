<script lang="ts" setup>
import type { PageComponentProps } from '~/types/app'
import { components } from '~/slices'
import { useProjectUtils } from '~/composables/use-project-utils'

const props = defineProps<PageComponentProps<'project_page'>>()
const data = computed(() => props.document.data)

const { tags, date } = useProjectUtils(props.document)

const sliceKey = computed(() => {
    const slideKey = Object.keys(data.value).findLast(dataKey => dataKey.includes('slice'))
    return slideKey || 'slices'
})

const slices = computed(() => {
    return data.value?.[sliceKey.value] || []
})
</script>

<template>
    <div :class="$style.root">
        <NuxtLink to="/projects">
            <VIcon name="fullscreen" />
        </NuxtLink>
        <VHeader
            :title="data.title"
            :content="data.content"
        />
        <div :class="$style.attributes">
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
        />
    </div>
</template>

<style lang="scss" module>
.root {
    position: relative;
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
