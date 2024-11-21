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
        :data-slice-type="slice.slice_type"
        :data-slice-variation="slice.variation"
    >
        <slot />
    </component>
</template>

<style lang="scss" module>
.root {
    border-top: 1px solid currentcolor;
    padding-block: rem(72);
}
</style>
