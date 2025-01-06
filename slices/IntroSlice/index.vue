<script setup lang="ts">
import type { Content } from '@prismicio/client'

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(
    getSliceComponentProps<Content.IntroSliceSlice>([
        'slice',
        'index',
        'slices',
        'context',
    ]),
)
</script>

<template>
    <VSlice
        :slice="slice"
    >
        <VText
            class="text-h4"
            :content="slice.primary.content"
        />
    </VSlice>
</template>
