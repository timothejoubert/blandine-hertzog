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
        :spacing="sliceData.spacing"
        :class="$style.root"
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
            class="text-body-md"
            tag="p"
        />
    </VSlice>
</template>

<style lang="scss" module>
.root {
    row-gap: rem(18);
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
