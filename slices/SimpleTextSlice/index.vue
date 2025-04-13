<script setup lang="ts">
import type { Content } from '@prismicio/client'

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
const props = defineProps(
    getSliceComponentProps<Content.SimpleTextSliceSlice>(),
)

const sliceData = computed(() => props.slice.primary)
</script>

<template>
    <VSlice
        :slice="slice"
        class="grid"
        :class="[$style.root, $style[`root--spacing-block-${sliceData.spacing}`]]"
    >
        <div
            v-if="sliceData.title"
            :class="$style.title"
            class="text-h4"
        >
            {{ sliceData.title }}
        </div>
        <VText
            v-if="sliceData.content"
            :content="sliceData.content"
            :class="$style.content"
            class="text-body-lg"
            tag="p"
        />
    </VSlice>
</template>

<style lang="scss" module>
@use "assets/scss/mixins/property-fluid" as *;

.root {
    row-gap: rem(18);

    &--spacing-block-xs {
      @include property-fluid('margin-block', (xs: 10, xl: 24));
    }

    &--spacing-block-sm {
      @include property-fluid('margin-block', (xs: 24, xl: 48));
    }

    &--spacing-block-md {
      @include property-fluid('margin-block', (xs: 48, xl: 96));
    }

    &--spacing-block-lg {
      @include property-fluid('margin-block', (xs: 96, xl: 144));
    }
}

.title {
  grid-column: 1 /-1;

  @include media('>=lg') {
    grid-column: 1 / span 5;
  }
}

.content {
  grid-column: 1 /-1;
  margin-block: initial;

  @include media('>=lg') {
    grid-column: 8 / -1;
  }
}
</style>
