<script  lang="ts" setup>
import type { SharedSlice } from '@prismicio/types'
import type { PossibleRouteReference } from '~/composables/use-link-resolver'

defineProps<{
    slice: SharedSlice
    tag?: string
    title?: string | null
    linkLabel?: string
    linkReference?: PossibleRouteReference
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
