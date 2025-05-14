<script lang="ts" setup>
import type { PropType } from 'vue'
import { commonVideoProps, videoAttributes } from '~/utils/video/video-props'
import { VPrismicImage } from '#components'
import type { PossibleImageMedia, PossibleVideoMedia } from '~/composables/use-prismic-media'
import { isVideoEmbedField } from '~/utils/prismic/guard'

type VImageProps = InstanceType<typeof VPrismicImage>['$props']

const props = defineProps({
    ...commonVideoProps,
    ...videoAttributes,
    media: { type: Object as PropType<PossibleVideoMedia> },
    thumbnail: { type: Object as PropType<PossibleImageMedia> },
    thumbnailProps: { type: Object as PropType<VImageProps> },
})

const hasThumbnail = computed(() => !!usePrismicMedia(props.thumbnail).url.value)

const slots = useSlots()
const hasLazyVideoPlayer = computed(() => {
    return hasThumbnail.value || !!slots.default?.()
})

const videoData = computed(() => {
    const embedData = {}

    if (isVideoEmbedField(props.media)) {
        const embedUrl = new URL(props.media.embed_url)
        const id = embedUrl?.pathname?.substring(1)

        Object.assign(embedData, {
            embedPlatform: props.media.provider_name,
            embedId: id === 'watch' ? embedUrl.searchParams.get('v') : id,
            autoplay: hasLazyVideoPlayer.value || props.autoplay,
        })
    }

    return {
        ...embedData,
        ...(props.media || {}),
        src: props.media?.src || props.media?.url,
    }
})

const videoAttrs = computed(() => {
    const width = props.media?.width || props?.width || 1920
    const height = props.media?.height || props?.height || 1080

    const attrs = Object.entries(props).reduce((acc, [key, value]) => {
        if ((key in commonVideoProps || key in videoAttributes)) acc[key] = value
        return acc
    }, {})

    return {
        ...attrs,
        width,
        height,
    }
})

const thumbnailProps = computed(() => {
    const result = {
        media: props.thumbnail,
        ...(props.thumbnailProps || {}),
    }

    if (videoAttrs.value.width && videoAttrs.value.height) {
        Object.assign(result, {
            fit: 'crop',
            ar: `${videoAttrs.value.width}:${videoAttrs.value.height}`,
            width: videoAttrs.value.width,
            height: videoAttrs.value.height,
        })
    }

    return result
})

const videoProps = computed(() => {
    return {
        ...videoData.value,
        ...videoAttrs.value,
    }
})

const videoRatio = computed(() => {
    return Number(videoAttrs.value.width) / Number(videoAttrs.value.height)
})

// Video interaction
const hadInteraction = ref(false)
const onClick = (event: Event) => {
    if (event.defaultPrevented || !props.playsinline) return

    hadInteraction.value = true
}

const onVideoEnded = () => (hadInteraction.value = false)
</script>

<template>
    <div
        v-if="hasLazyVideoPlayer"
        :class="[$style.root, hadInteraction && $style['root--had-interaction']]"
        :style="!!videoRatio && { aspectRatio: videoRatio }"
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
            v-bind="videoProps"
            :autoplay="true"
            :plyr="{ listeners: { ended: onVideoEnded } }"
            :class="[$style.video, $style['video--with-thumbnail']]"
        />
    </div>
    <VVideoPlayer
        v-else
        v-bind="videoProps"
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
