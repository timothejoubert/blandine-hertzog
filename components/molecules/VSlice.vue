<script  lang="ts" setup>
import type { SharedSlice } from '@prismicio/types'

defineProps<{
    slice?: SharedSlice
    tag?: string
    spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'none'
}>()

const root = ref<HTMLElement | null>(null)
const isVisible = useElementVisibility(root, { rootMargin: '-20% 0px -20% 0px' })
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
        :data-slice-type="slice?.slice_type"
        :data-slice-variation="slice?.variation"
    >
        <slot />
    </component>
</template>
  
<style lang="scss" module>
@use "assets/scss/mixins/property-fluid" as *;
@use "assets/scss/functions/fluid" as *;

.root {
	--v-slice-padding-block-xs: #{fluid((xs: 10, xl: 24))}; 

    margin-block: var(--v-slice-padding-block);
    opacity: 0;
    transition: opacity 0.6s 0.1s ease(out-quad), translate 0.6s 0.1s ease(out-quad);

    // translate: 0 40px;

    &--is-visible {
      opacity: 1;
      translate: 0 0;
    }

    &--spacing-block-xs {
		--v-slice-padding-block: #{fluid((xs: 10, xl: 24))};
    }
    
    &--spacing-block-sm {
        --v-slice-padding-block: #{fluid((xs: 24, xl: 48))};
    }
    
    &--spacing-block-md {
        --v-slice-padding-block: #{fluid((xs: 48, xl: 96))};
    }
    
    &--spacing-block-lg {
        --v-slice-padding-block: #{fluid((xs: 86, xl: 144))};
    }
    
    &--spacing-block-xl {
        --v-slice-padding-block: #{fluid((xs: 112, xl: 222))};
	}
      
    &--spacing-block-xxl {
		--v-slice-padding-block: #{fluid((xs: 194, xl: 322))};
    }
}
</style>
