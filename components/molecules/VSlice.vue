<script  lang="ts" setup>
import type { SharedSlice } from '@prismicio/types'
import VHeadSection from '~/components/atoms/VHeadSection.vue'
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
        <VHeadSection
            :title="title"
            :link-label="linkLabel"
            :link-reference="linkReference"
            :class="$style.head"
        />
        <slot />
    </component>
</template>

<style lang="scss" module>
@use 'assets/scss/functions/rem' as *;

.root {
    padding-block: rem(94);
}

.head {
    grid-column: 1 /-1;
}
</style>
