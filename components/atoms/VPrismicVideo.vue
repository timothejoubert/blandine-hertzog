<script lang="ts" setup>
import type { PropType } from 'vue'
import type * as Prismic from "@prismicio/client";
import pick from 'lodash/pick'
import { videoProps, videoAttributes } from '~/utils/video/video-props'
import { VPrismicImage } from '#components'

type VImageProps = InstanceType<typeof VPrismicImage>['$props']

const props = defineProps({
    ...videoProps,
    ...videoAttributes,
    thumbnail: { type: Object as PropType<Prismic.ImageField> },
    thumbnailProps: { type: Object as PropType<VImageProps> },
    embedField: { type: Object as PropType<Prismic.EmbedField> },
})

// THUMBNAIL
const hasThumbnail = computed(() => props.thumbnail?.url)
const slots = useSlots()
const hasLazyVideoPlayer = computed(() => hasThumbnail.value || !!slots.default?.())

const fieldData = computed(() => {
    if (props.embedField) {
        const embedUrl = new URL(props.embedField.embed_url)
        const id = embedUrl?.pathname?.substring(1)

        return {
            embedPlatform: props.embedField.provider_name || undefined,
            embedId: (id === 'watch' ? embedUrl.searchParams.get('v') : id) || undefined,
        }
    }

    return {}
})

const dimensions = computed(() => {
    return {
        width: props?.width || props.embedField?.width as number || 1920,
        height: props?.height || props.embedField?.height as number || 1080,
    }
})

const videoRatio = computed(() => {
    return Number(dimensions.value.width) / Number(dimensions.value.height)
})

const parsedProps = computed(() => {
    const extractedVideoProps = pick(props, Object.keys(videoProps))
    const extractedVideoAttrs = pick(props, Object.keys(videoAttributes))

    return {
        ...extractedVideoProps,
        ...extractedVideoAttrs,
        ...fieldData.value,
        ...dimensions.value,
    }
})

const thumbnailProps = computed(() => {
    const { width, height } = dimensions.value
    const thumbWidth = props.thumbnailProps?.width || width.toString()
    const thumbHeight = props.thumbnailProps?.height || height.toString()

    return {
        ...(props.thumbnailProps || {}),
        imageField: props.thumbnail,
        modifiers: { 
            fit: props.thumbnailProps?.modifiers?.fit || 'crop', 
            ar: `${thumbWidth}:${thumbHeight}` 
        },
        width: thumbWidth,
        height: thumbHeight,
    } as VImageProps
})

// Video interaction
const hadInteraction = ref(false)
const onClick = (event: Event) => {
    if (event.defaultPrevented || !props.playsinline) return

    hadInteraction.value = true
}
// const onVideoEnded = () => (hadInteraction.value = false)
</script>

<template>
    <div
        v-if="hasLazyVideoPlayer"
        :class="[$style.root, hadInteraction && $style['root--had-interaction']]"
    >
        <button
            :aria-label="$t('play_video')"
            :class="$style['play-button']"
            @click="onClick"
        >
            <VIcon
                name="play"
                :class="$style['play-icon']"
            />
        </button>
        <VPrismicImage
            v-if="hasThumbnail"
            v-bind="thumbnailProps"
            :class="$style.thumbnail"
            @click="onClick"
        />
        <div
            v-else
            :class="[$style.thumbnail, $style['thumbnail--placeholder']]"
            :style="{ aspectRatio: videoRatio || 16 / 9 }"
        />
        <VVideoPlayer
            v-if="hadInteraction"
            v-bind="parsedProps"
            :autoplay="true"
            :class="[$style.video, $style['video--with-thumbnail']]"
        />
    </div>
    <VVideoPlayer
        v-else
        v-bind="parsedProps"
        :class="$style.video"
    />
</template>

<style lang="scss" module>
.root {
    --v-player-position: absolute;
    --v-player-height: 100%;
    --v-player-width: 100%;

    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}

.play-button {
    --v-button-position: absolute;

    position: absolute;
    z-index: 1;
    top: 50%;
    left: 50%;
    display: flex;
    width: rem(38);
    height: rem(38);
    align-items: center;
    justify-content: center;
    padding: initial;
    border: none;
    border-radius: 100%;
    background-color: white;
    cursor: pointer;
    transform: translate(-50%, -50%);
    transition: color 0.3s ease(out-quad), background-color 0.3s ease(out-quad);

    .root--had-interaction & {
        pointer-events: none;
        visibility: hidden;
    }

    @media (hover: hover) {
        .root:hover & {
            background-color: var(--theme-color-background);
            color: var(--themeo-color-on-background);
        }
    }
}

.play-icon {
    font-size: rem(14);
}

.thumbnail {
    width: 100%;
    cursor: pointer;

    .root--had-interaction & {
        display: none;
        pointer-events: none;
        visibility: hidden;
    }

    &--placeholder {
        position: relative;
        aspect-ratio: 16 / 9;

        // background-color: color(grey-50);

        &::after {
            position: absolute;
            background: linear-gradient(45deg, rgba(0, 0, 0, 80%) 0%, transparent 100%);
            content: '';
            inset: 0;
        }
    }
}

.video {
    --v-player-video-height: 100%;

    display: block;
}
</style>
