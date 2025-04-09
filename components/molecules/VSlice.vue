<script  lang="ts" setup>
import type { SharedSlice } from '@prismicio/types'

defineProps<{
    slice: SharedSlice
    tag?: string
}>()
</script>

<template>
    <component
        :is="tag || 'section'"
        :class="$style.root"
        class="grid-width"
        :data-slice-type="slice.slice_type"
        :data-slice-variation="slice.variation"
    >
        <slot />
    </component>
</template>

<style lang="scss" module>
@use 'assets/scss/functions/fluid' as *;

.root {
    margin-block: var(--v-slice-margin-top, fluid((xs: 160, hd: 380))) var(--v-slice-margin-bottom, fluid((xs: 160, hd: 380)));
}
</style>
