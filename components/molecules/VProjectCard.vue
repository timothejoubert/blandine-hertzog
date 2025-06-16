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
    return isFullwidth.value ? { width: 1376, height: 668} : { width: 460, height: 248 }
})

const rootEl = useTemplateRef<HTMLElement>('rootRef')
</script>

<template>
    <component
        :is="rootTag || 'div'"
        ref="rootRef"
        :class="[$style.root, skeleton && $style['root--skeleton']]"
    >
        <VPrismicLink
            :to="project"
            :class="[$style.title, isFullwidth ? 'text-h5' : 'text-h6']"
            :label="title"
        >
            <VTitleTranslate
                :hover-element="rootEl"
                :title="title"
            />
        </VPrismicLink>
        <span
            v-if="client"
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
                    ar: imageDimension.width / imageDimension.height, 
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
    --v-title-translate-item-offset-top: #{rem(7)};

    display: inline-block;
    color: inherit;
    text-decoration: none;
    text-transform: uppercase;

    // margin-top: 2%;
    // line-height: 0.75;

    // TODO: fis layout shift
    &:not(:has(> div)) {
        margin-top: var(--v-title-translate-item-offset-top);
    }
}

.client {
    align-self: flex-end;
    text-transform: uppercase;
}

.media-wrapper {
    position: relative;
    display: block;
    overflow: hidden;
    width: 100%;
    margin-top: rem(6);

    &::after {
        position: absolute;
        background: linear-gradient(20deg, color-mix(in srgb, var(--theme-color-background), transparent 50%), transparent 40%);
        content: '';
        inset: 0;
        opacity: 0.4;
        transition: all 0.3s ease(out-quad);

        @media (hover: hover) {
            .root:hover & {
                opacity: 0;
            }
        }
    }

    @include media('>=md') {
        &::after {
            opacity: 1;
        }
    }
}

.image {
    width: 100%;
    transition: scale 0.3s ease(out-quad);

    @media (hover: hover) {
        .root:hover & {
            scale: 1.015;
        }
    }

    &--placeholder {
        aspect-ratio: 460 / 248;
        background-color: lightgrey;
    }
}
</style>
