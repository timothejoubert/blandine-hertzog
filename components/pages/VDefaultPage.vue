<script lang="ts" setup>
import type { PageComponentProps } from '~/types/app'
import { components } from '~/slices'

const props = defineProps<PageComponentProps<'default_page'>>()
const data = computed(() => props.document.data)

const slices = computed(() => {
    const slideKey = Object.keys(data.value).findLast(dataKey => dataKey.includes('slice')) || 'slices'
    return data.value?.[slideKey] || []
})
</script>

<template>
    <main>
        <LazySliceZone
            v-if="slices?.length"
            :slices="slices"
            wrapper="main"
            :components="components"
            :class="$style.slices"
            class="grid-item-main"
        />
    </main>
<!--    <pre> {{ data }}</pre> -->
</template>

<!-- <style lang="scss" module></style> -->
