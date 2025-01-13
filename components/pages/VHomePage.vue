<script  lang="ts" setup>
import type { PageComponentProps } from '~/types/app'
import { components } from '~/slices'

const props = defineProps<PageComponentProps<'home_page'>>()
const data = computed(() => props.document.data)

const slices = computed(() => {
    const slideKey = Object.keys(data.value).findLast(dataKey => dataKey.includes('slice')) || 'slices'
    return data.value?.[slideKey] || []
})

const mainId = computed(() => props.document.id)
</script>

<template>
    <main :id="mainId">
        <LazySliceZone
            v-if="slices?.length"
            :slices="slices"
            :components="components"
        />
    </main>
</template>

<!-- <style lang="scss" module></style> -->
