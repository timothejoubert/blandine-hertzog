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
    >
        <div
            class="text-h3"
            :class="$style.title"
        >
            {{ data.title }}
        </div>
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
.root {
    display: grid;
    grid-template-areas:
            'title'
            'image'
            'content'
            'link';

    @include media('>=md') {
        column-gap: var(--gutter);
        grid-template-areas:
            'title image'
            'content image'
            'link image';
        grid-template-columns: repeat(2, minmax(0 , 1fr));
    }

}

.title {
    grid-area: title;
}

.image {
    margin-top: rem(24);
    grid-area: image;

    @include media('>=md') {
        margin-top: initial;
    }
}

.content {
    max-width: 48ch;
    margin-top: rem(16);
    grid-area: content;
}

.link {
    grid-area: linl;
}
</style>
