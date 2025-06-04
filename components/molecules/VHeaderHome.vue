<script lang="ts" setup>
import { getHtmlElement, type TemplateElement } from '~/utils/ref/get-html-element'
import type { StaticMedia } from '~/composables/use-prismic-media'

defineProps<{
  title: string | null
  tagline: string | null
  location: string | null
}>()

const videoInstance = ref<TemplateElement>(null)
const videoEl = computed(() => getHtmlElement<HTMLVideoElement>(videoInstance))

const isPaused = ref(false)
function onVideoClicked(_event: MouseEvent) {
    if (!videoEl.value) return

    if (videoEl.value.paused) {
        videoEl.value.play()
    }
    else {
        videoEl.value.pause()
    }

    isPaused.value = videoEl.value.paused
}

const showrealVideo: StaticMedia = {
    src: "/showreel.mp4",
    width: "1376",
    height: "627",
    type: 'public_video',
}

const isFullScreen = ref(false)
useEventListener(videoEl, 'fullscreenchange', () => {
    isFullScreen.value = !!document.fullscreenElement;

    if(!videoEl.value) return 
    videoEl.value.muted = !document.fullscreenElement
})


function openFullscreen() {
    const vid = videoEl.value
    if(!vid) return 
    
    vid.volume = 0.4

    if (vid.requestFullscreen) {
        vid.requestFullscreen();
    } else if (vid.webkitRequestFullscreen) { /* Safari */
        vid.webkitRequestFullscreen();
    } else if (vid.msRequestFullscreen) { /* IE11 */
        vid.msRequestFullscreen();
    }
}
</script>

<template>
    <header
        class="grid"
        :class="$style.header"
    >
        <VPageTitle
            v-if="title"
            :title="title"
            :class="$style.title"
        />
        <VText
            v-if="tagline"
            tag="h2"
            :content="tagline"
            :class="$style.tagline"
        />
        <VText
            v-if="location"
            tag="h2"
            :content="location"
            :class="$style.location"
        />
        <div
            :class="[$style['video-wrapper']]"
        >
            <button
                :class="[$style.button, $style['button--play-state']]"
                @click="onVideoClicked"
            >
                <VIcon
                    :name="isPaused ? 'pause' : 'play'"
                    width="20"
                    height="20"
                />
            </button>
            <VVideoPlayer
                ref="videoInstance"
                v-bind="showrealVideo"
                :class="[$style.video, isFullScreen && $style['video--fullscreen-displayed']]"
                :controls="false"
                muted
                autoplay
                loop
            />
            <button
                :class="[$style.button, $style['button--fullscreen']]"
                :aria-label="$t('media_viewer.open')"
                @click="openFullscreen"
            >
                <VIcon
                    name="fullscreen"
                    size="1.2rem"
                />
            </button>
        </div>
    </header>
</template>

<style lang="scss" module>
.header {
    // row-gap: rem(32);
 }

 .video-wrapper {
    position: relative;
    display: flex;
    overflow: hidden;
    width: 100%;
    align-items: center;
    justify-content: center;
    margin-top: rem(24);
    aspect-ratio: 375 / 300;
    background-color: color-mix(in srgb, var(--theme-color-on-background) 10%, transparent);
    grid-column: 1 / -1;

    &::after {
        position: absolute;
        background: linear-gradient(4deg, var(--theme-color-background) -6%, transparent 40%, transparent 60%, var(--theme-color-background) 110%);
        content: '';
        inset: 0;
        opacity: 0.5;
    }

     @include media('>=md') {
         aspect-ratio: 768 / 300;
     }

     @include media('>=lg') {
         aspect-ratio: 1376 / 627;
     }
 }

 .button {
     position: absolute;
     z-index: 2;
     display: flex;
     align-items: center;
     justify-content: center;
     border: initial;
     cursor: pointer;
     
    > span {
        flex-shrink: 0;
    }
        
    &--play-state {
        position: absolute;
        padding: rem(10);
        border-radius: 3px;
        backdrop-filter: blur(7px);
        background-color: initial;
        color: var(--theme-color-on-background);
        transition: background-color 0.3s; 
    }

     &--fullscreen {
        right: var(--gutter);
        bottom: var(--gutter);
        padding: rem(8);
        border-radius: 100%;
        background-color: var(--theme-color-primary);
        color: var(--theme-color-on-primary);
        transition: background-color 0.3s, color 0.3s; 
     }

     @media (hover: hover) {
        &--play-state:hover {
            background-color: var(--theme-color-background);
        }

        &--fullscreen:hover {
            // color: var(--theme-color-on-background);
            background-color: color-mix(in srgb, var(--theme-color-primary), white 30%);
        }
     }

     @include media('>=md') {
        &--fullscreen {
            right: rem(12);
            bottom: rem(10);
        }
     }
 }

 .video {
     --v-player-video-position: absolute;
     --v-player-video-width: 100%;
     --v-player-video-height: 100%;
     --v-player-video-object-fit: cover;

    &--fullscreen-displayed {
        --v-player-video-object-fit: contain;
    }
 }

.title {
    grid-column: 1 / -1;
}

.tagline,
.location {
    font-family: $font-hanken-grostesk-family;
    font-size: rem(22);
    font-variation-settings: "wght" 400;
    margin-block: initial;
    text-transform: uppercase;
 }

 .tagline {
     margin-top: rem(24);
     grid-column: 1 / -1;

    @include media('>=md') {
        grid-column: 1 / span 6;
    }
 }

 .location {
    grid-column: 1 / -1;

    @include media('>=md') {
        margin-top: rem(24);
        grid-column: 7 / -1;
        text-align: right;
    }
 }
</style>