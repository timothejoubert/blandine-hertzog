<script  lang="ts" setup>
import type { PossibleProjectPageDocument } from '~/types/app'

interface VProjectCardProps {
    project: PossibleProjectPageDocument | null
    skeleton?: boolean
    rootTag?: string
    size?: 'fullwidth' | 'half'
}

const props = defineProps<VProjectCardProps>()
const { image, title, client } = useProjectUtils(props.project)


const isFullwidth = computed(() => props.size === 'fullwidth')

const imageSizes = computed(() => {
    return isFullwidth.value
            ? 'xs:92vw md:92vw lg:92vw xl:92vw hq:92vw qhd:92vw' 
            : 'xs:92vw md:92vw lg:45vw xl:45vw hq:45vw qhd:45vw'
})

const imageDimension = computed(() => {
    return isFullwidth.value ? { width: 1376, height: 768} : { width: 460, height: 248 }
})
</script>

<template>
    <component
        :is="rootTag || 'div'"
        :class="[$style.root, skeleton && $style['root--skeleton']]"
    >
        <VPrismicLink
            :to="project"
            :class="$style.title"
            :label="title"
            class="text-h5"
        />
        <span
            v-if="client && size === 'fullwidth'"
            class="text-body-md"
            :class="$style.client"
        >
            {{ client }}
        </span>
        <VPrismicLink
            :to="project"
            :class="$style['media-wrapper']"
            rel="noopener nofollow"
            tabindex="-1"
        >
            <VImg
                v-if="image"
                :src="image.url"
                :width="imageDimension.width"
                :height="imageDimension.height"
                :sizes="imageSizes"
                provider="imgix"
                :alt="image.alt ?? undefined"
                :modifiers="{ 
                    fit: 'crop', 
                    ar: `${imageDimension.width}:${imageDimension.height}`, 
                }"
                :class="$style.image"
            />
            <div
                v-else
                :class="[$style.image, $style['image--placeholder']]"
            />
        </VPrismicLink>
    </component>
</template>

<style lang="scss" module>
.root {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.title {
    display: inline-block;
    margin-top: 2%;
    color: inherit;
    line-height: 0.75;
    text-decoration: none;
    text-transform: uppercase;
}

.client {
    align-self: flex-end;
    text-transform: uppercase;
}

.media-wrapper {
    display: contents;
}

.image {
    width: 100%;
    margin-top: rem(12);

    &--placeholder {
        aspect-ratio: 460 / 248;
        background-color: lightgrey;
    }
}
</style>
