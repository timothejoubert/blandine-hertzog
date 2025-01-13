<script setup lang="ts">
import type { Content } from '@prismicio/client'

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
const props = defineProps(
    getSliceComponentProps<Content.AboutSliceSlice>(),
)

const data = computed(() => props.slice.primary)
</script>

<template>
    <VSlice
        :slice="slice"
        :class="$style.root"
        :title="data.title"
        class="grid"
    >
        <VPrismicImage
            v-if="data.image.url"
            :document="data.image"
            fit="crop"
            ar="413:460"
            :class="$style.image"
            sizes="xs:92vw sm:92vw md:30vw lg:30vw xl:30vw xxl:30vw hq:30vw qhd:30vw"
        />
        <VText
            v-if="data.content"
            :class="$style.content"
            :content="data.content"
            class="text-body-md"
        />
    </VSlice>
</template>

<style lang="scss" module>
@use 'assets/scss/functions/rem' as *;
@use "assets/scss/mixins/include-media" as *;

.root {

}

.image {
    margin-top: rem(24);
    grid-column: 1 / -1;

    @include media('>=lg') {
        grid-column: 8 / -1;
    }
}

.content {
    grid-column: 1 / -1;
    max-width: 48ch;
    margin-top: rem(16);
    grid-area: content;

    @include media('>=lg') {
        grid-column: 1 / span 6;
    }

}

.link {
    grid-column: 1 / -1;

    @include media('>=lg') {
        grid-column: 1 / span 6;
    }
}
</style>
