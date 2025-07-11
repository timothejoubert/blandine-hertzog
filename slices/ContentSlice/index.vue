<script setup lang="ts">
import type { Content } from '@prismicio/client'
import VPrismicVideo from '~/components/atoms/VPrismicVideo.vue'
import { getText } from '~/utils/prismic/prismic-rich-field'

const props = defineProps(
    getSliceComponentProps<Content.ContentSliceSlice>(),
)

const primary = computed(() => props.slice.primary)

const columns = computed(() => {
    return primary.value.columns?.filter((item) => {
        return item.embed?.embed_url || item.image?.url || getText(item.text) || item.external_url
    }) || []
})

const columnLength = computed(() => columns.value.length || 1)

const imgSizes = computed(() => {
    if (columnLength.value === 1) return 'xs:95vw md:95vw lg:95vw xl:95vw xxl:95vw qhd:95vw'
    if (columnLength.value === 2) return 'xs:90vw md:90vw lg:40vw xl:40vw xxl:40vw qhd:40vw'
    else if (columnLength.value === 3) return 'xs:90vw md:90vw lg:25vw xl:25vw xxl:25vw qhd:25vw'
    else return 'xs:90vw md:90vw lg:75vw vl:75vw xl:75vw xxl:75vw qhd:75vw'
})

const $style = useCssModule()
const rootClasses = computed(() => {
    return [$style.root, $style[`root--layout-${columnLength.value}`]]
})
</script>

<template>
    <VSlice
        :slice="slice"
        tag="div"
        :class="rootClasses"
        :spacing="primary.spacing"
        class="grid-container"
    >
        <template
            v-for="(column, columnIndex) in columns"
            :key="columnIndex"
        >
            <VPrismicVideo
                v-if="column.embed?.embed_url"
                :embed-field="column.embed"
                :thumbnail="column.image"
                :thumbnail-props="{
                    sizes: imgSizes,
                }"
                :class="[$style.item, $style['item--video']]"
            />
            <VPrismicImage
                v-else-if="column.image?.url"
                :image-field="column.image"
                :sizes="imgSizes"
                :class="[$style.item, $style['item--image']]"
            />
            <VText
                v-if="column.text"
                :content="column.text"
                class="text-body-md"
                :class="[$style.item, $style['item--text']]"
            />
            <VCta
                v-if="column.external_url"
                :to="column.external_url"
                :label="column.link_label"
                :class="[$style.item, $style['item--link']]"
                icon-name="auto"
            />
        </template>
    </VSlice>
</template>

<style lang="scss" module>
@use "assets/scss/functions/fluid" as *;

.root {
    display: grid;
    gap: var(--v-slice-padding-block) var(--v-slice-padding-block-xs, var(--gutter));
    grid-template-columns: 1fr;

    @include media('>=md') {
        grid-template-columns: repeat(v-bind('columnLength'), 1fr);
    }
}

.item {
    &--image {
        width: 100%;
    }

    &--video {
        iframe {
            --v-player-video-height: 100%;

            height: 100%;
        }
    }

    &--text {
        max-width: 44ch;
    }

    &--link {
        place-self: center center;
    }
}
</style>
