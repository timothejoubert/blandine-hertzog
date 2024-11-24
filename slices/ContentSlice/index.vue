<script setup lang="ts">
import type { Content } from '@prismicio/client'
import VPrismicVideo from '~/components/atoms/VPrismicVideo.vue'
import { getText } from '~/utils/prismic/prismic-rich-field'

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
const props = defineProps(
    getSliceComponentProps<Content.ContentSliceSlice>([
        'slice',
        'index',
        'slices',
        'context',
    ]),
)

const contents = computed(() => {
    return props.slice.primary.contents.filter((item) => {
        return item.embed_video_url?.embed_url || item.image?.url || getText(item.text) || item.external_url
    }) || []
})

const itemLength = computed(() => contents.value.length)

const $style = useCssModule()

const rootClasses = computed(() => {
    return [$style.root, $style[`root--layout-${itemLength.value}`]]
})

const imgSizes = computed(() => {
    if (itemLength.value === 2) return 'xs:90vw sm:90vw md:90vw lg:35vw vl:35vw xl:35vw xxl:35vw hd:35vw qhd:35vw'
    if (itemLength.value === 3) return 'xs:90vw sm:90vw md:90vw lg:22vw vl:22vw xl:22vw xxl:22vw hd:22vw qhd:22vw'

    return 'xs:90vw sm:90vw md:90vw lg:75vw vl:75vw xl:75vw xxl:75vw hd:75vw qhd:75vw'
})
</script>

<template>
    <section
        :data-slice-type="slice.slice_type"
        :data-slice-variation="slice.variation"
        :class="rootClasses"
        :style="{ '--content-slice-column-length': contents.length }"
    >
        <template
            v-for="(item, columnIndex) in contents"
            :key="columnIndex"
        >
            <VPrismicVideo
                v-if="item.embed_video_url?.embed_url"
                :embed-field="item.embed_video_url"
                :thumbnail="item.image"
                :class="[$style.item, $style['item--video']]"
            />
            <VPrismicImage
                v-else-if="item.image?.url"
                :document="item.image"
                :class="[$style.item, $style['item--image']]"
                :copyright="true"
                :sizes="imgSizes"
            />
            <VText
                v-if="item.text"
                :content="item.text"
                class="text-body-md"
                :class="[$style.item, $style['item--text']]"
            />
            <VPrismicLink
                v-if="item.external_url"
                :to="item.external_url"
                label="Static link label"
                :class="[$style.item, $style['item--link']]"
            />
        </template>
    </section>
</template>

<style lang="scss" module="">
.root {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: rem(32);

    @include media('>=md') {
        column-gap: rem(82);
        grid-template-columns: repeat(var(--content-slice-column-length, 1), 1fr);

        &--layout-3 {
            column-gap: rem(32);
        }
    }
}

.item {
    &--link {
        place-self: center center;
    }
}
</style>
