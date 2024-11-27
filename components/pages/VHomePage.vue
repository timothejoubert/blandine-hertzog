<script  lang="ts" setup>
import type { PageComponentProps } from '~/types/app'
import { components } from '~/slices'

const props = defineProps<PageComponentProps<'home_page'>>()
const data = computed(() => props.document.data)

const slices = computed(() => {
    const slideKey = Object.keys(data.value).findLast(dataKey => dataKey.includes('slice')) || 'slices'
    return data.value?.[slideKey] || []
})

const mainId = 'home-main'
</script>

<template>
    <VHeader
        :class="$style.header"
        :title="data.title"
        anchor-title
        :anchor-href="`#${mainId}`"
        class="grid-item-main"
    />
    <LazySliceZone
        v-if="slices?.length"
        :id="mainId"
        :slices="slices"
        wrapper="main"
        :components="components"
        :class="$style.slices"
        class="grid-item-main"
    />
</template>

<style lang="scss" module>
.header {
    grid-column: var(--left-grid-column);
}

.slices {
    grid-column: var(--left-grid-column);
}
</style>
