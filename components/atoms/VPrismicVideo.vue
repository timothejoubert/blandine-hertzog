<script lang="ts" setup>
import type { PropType } from 'vue'
import type { EmbedField, ImageField } from '@prismicio/types'
import { commonVideoProps, videoAttributes } from '~/utils/video/video-props'
import type { PrismicVideoField } from '~/utils/prismic/prismic-media'

const props = defineProps({
    ...commonVideoProps,
    ...videoAttributes,
    embedField: { type: Object as PropType<EmbedField> },
    video: { type: Object as PropType<PrismicVideoField> },
    thumbnail: { type: Object as PropType<ImageField> },
})

console.log('ref', props.embedField)

const slots = useSlots()
const hasLazyVideoPlayer = computed(() => {
    return !!props.thumbnail?.url || !!slots.default?.()
})

const displayThumbnail = computed(() => {
    return props.thumbnail?.url
})

const thumbnailProps = computed(() => {
    if (!displayThumbnail.value) return undefined

    else if (props.thumbnail?.url) {
        return {
            document: props.thumbnail,
        }
    }
    // else if (props.embedField?.provider_url && props.embedField?.thumbnail_url) {
    //     return {
    //         src: props.embedField?.thumbnail_url,
    //         width: props.embedField.width?.toString(),
    //         height: props.embedField.height?.toString(),
    //         provider: '',
    //         sizes: '',
    //         crossorigin: 'anonymous',
    //         modifiers: {},
    //     }
    // }

    return undefined
})

const videoRatio = computed(() => {
    const embedRatio = (Number(props.embedField?.width) || 16) / (Number(props.embedField?.height) || 9)
    return embedRatio
})

const videoProps = computed(() => {
    if (props.embedField?.embed_url) {
        const embedId = new URL(props.embedField.embed_url)?.pathname?.substring(1)

        return {
            width: props.embedField.width,
            height: props.embedField.height,
            embedPlatform: props.embedField.provider_name,
            embedId,
            autoplay: hasLazyVideoPlayer.value,
        }
    }

    return {}
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
            :class="$style.button"
            @click="onClick"
        >
            <VIcon
                name="play"
                aria-hidden="true"
            />
        </button>
        <slot>
            <VPrismicImage
                v-if="displayThumbnail"
                v-bind="thumbnailProps"
                :class="$style.thumbnail"
                @click="onClick"
            />
            <div
                v-else
                :class="[$style.thumbnail, $style['thumbnail--placeholder']]"
                :style="{ aspectRatio: videoRatio || 16 / 9 }"
            />
        </slot>
        <VVideoPlayer
            v-if="hadInteraction"
            v-bind="videoProps"
            :autoplay="true"
            :plyr="{ listener: { ended: onVideoEnded } }"
        />
    </div>
    <VVideoPlayer
        v-else
        v-bind="videoProps"
    />
</template>

<style lang="scss" module="">
.root {
    --v-player-position: absolute;
    --v-player-height: 100%;
    --v-player-width: 100%;

    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}

.button {
    --v-button-position: absolute;

    position: absolute;
    z-index: 1;
    top: 50%;
    left: 50%;
    width: rem(52);
    height: rem(52);
    border: none;
    border-radius: 100%;
    background-color: white;
    cursor: pointer;
    transform: translate(-50%, -50%);

    .root--had-interaction & {
        pointer-events: none;
        visibility: hidden;
    }
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

        //background-color: color(grey-50);

        &::after {
            position: absolute;
            background: linear-gradient(45deg, rgba(0, 0, 0, 80%) 0%, transparent 100%);
            content: '';
            inset: 0;
        }
    }
}
</style>
