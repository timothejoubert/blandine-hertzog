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

const imageProps = computed(() => {
    const isFullwidth = props.size === 'fullwidth'
    const width = isFullwidth ? '1376' : '460'
    const height = isFullwidth ? '768' : '248'

    return {
        fit: 'crop',
        ar: `${width}:${height}`,
        width,
        height,
        sizes: isFullwidth ? 'xs:92vw sm:92vw md:92vw lg:92vw xl:92vw xxl:92vw hq:92vw qhd:92vw' : 'xs:92vw sm:92vw md:32vw lg:32vw xl:32vw xxl:32vw hq:32vw qhd:32vw',
    }
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
            <VPrismicImage
                v-if="image"
                :document="image"
                :class="$style.image"
                v-bind="imageProps"
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
