<script  lang="ts" setup>
import type { SharedSlice } from '@prismicio/types'

defineProps<{
    slice: SharedSlice
    tag?: string
    spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'none'
}>()

const root = ref<HTMLElement | null>(null)
const isVisible = useElementVisibility(root)
const isShowed = ref(false)

watch(isVisible, (value) => {
  if(value) isShowed.value = true
})
</script>

<template>
    <component
        :is="tag || 'section'"
        ref="root"
        :class="[$style.root, $style[`root--spacing-block-${spacing}`], isShowed && $style['root--is-visible']]"
        :data-slice-type="slice.slice_type"
        :data-slice-variation="slice.variation"
    >
        <slot />
    </component>
</template>
  
<style lang="scss" module>
@use "assets/scss/mixins/property-fluid" as *;

.root {
    opacity: 0;
    translate: 0 40px;
    transition: 0.6s 0.3s ease(out-quad);

    &--is-visible {
      opacity: 1;
      translate: 0 0;
    }

    &--spacing-block-xs {
      --v-slice-spacing-mobile: var(--gutter) * 0.5;
      @include property-fluid('padding-block', (xs: 10, xl: 24));
    }
    
    &--spacing-block-sm {
      --v-slice-spacing-mobile: rem(24);
      @include property-fluid('padding-block', (xs: 24, xl: 48));
    }
    
    &--spacing-block-md {
      --v-slice-spacing-mobile: rem(48);
      @include property-fluid('padding-block', (xs: 48, xl: 96));
    }
    
    &--spacing-block-lg {
      --v-slice-spacing-mobile: rem(96);
      @include property-fluid('padding-block', (xs: 96, xl: 144));
    }
    
    &--spacing-block-xl {
      --v-slice-spacing-mobile: rem(144);
      @include property-fluid('padding-block', (xs: 144, xl: 222));
    }
    
    &--spacing-block-xxl {
      --v-slice-spacing-mobile: rem(194);
      @include property-fluid('padding-block', (xs: 194, xl: 322));
    }
}
</style>
