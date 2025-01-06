<script  lang="ts" setup>
import type { SharedSlice } from '@prismicio/client/src/types/value/sharedSlice'

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
@use 'assets/scss/functions/rem' as *;

.root {
    border-top: 1px solid var(--theme-color-line);
    padding-block: rem(94);
}
</style>
