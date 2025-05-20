<script  lang="ts" setup>
import type { HomePageDocument } from '~/prismicio-types'
import { components } from '~/slices'
import { getHtmlElement, type TemplateElement } from '~/utils/ref/get-html-element'
import type { StaticMedia } from '~/composables/use-prismic-media'

const { documentData } = await useFetchPage<HomePageDocument>('home_page')

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

useEventListener(videoEl, 'fullscreenchange', () => {
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
    <div
        v-if="documentData"
        :class="$style.root"
    >
        <header
            class="grid"
            :class="$style.header"
        >
            <VPageTitle
                v-if="documentData.title"
                :title="documentData.title"
                :class="$style.title"
            />
            <VText
                v-if="documentData.tagline"
                tag="h2"
                :content="documentData.tagline"
                :class="$style.tagline"
            />
            <VText
                v-if="documentData.location"
                tag="h2"
                :content="documentData.location"
                :class="$style.location"
            />
            <div
                :class="$style['video-wrapper']"
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
                    :class="$style.video"
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
        <LazySliceZone
            v-if="documentData.slices?.length"
            :slices="documentData.slices"
            :components="components"
            wrapper="main"
        />
    </div>
</template>

 <style lang="scss" module>
.header {
    row-gap: rem(32);
 }

 .video-wrapper {
    position: relative;
    display: flex;
    overflow: hidden;
    width: 100%;
    align-items: center;
    justify-content: center;
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
     width: calc(#{flex-grid-value(1, 12)} - var(--fullsreen-position) * 2);
     align-items: center;
     justify-content: center;
     border: initial;
     aspect-ratio: 1;
     background-color: initial;
     cursor: pointer;

     > span {
         flex-shrink: 0;
     }

     &--play-state {
         position: absolute;
         border-radius: 3px;
         backdrop-filter: blur(7px);
         color: var(--theme-color-on-background);
     }

     &--fullscreen {
         --fullsreen-position: #{rem(8)};

         right: var(--fullsreen-position);
         bottom: var(--fullsreen-position);
         color: var(--theme-color-on-primary);

         &::before {
             position: absolute;
             z-index: -1;
             width: rem(32);
             height: rem(32);
             border-radius: 100%;
             background-color: var(--theme-color-primary);
             content: "";
         }
     }
 }

 .video {
     --v-player-video-position: absolute;
     --v-player-video-width: 100%;
     --v-player-video-height: 100%;
     --v-player-video-object-fit: cover;
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
     grid-column: 1 / -1;

    @include media('>=lg') {
        grid-column: 1 / span 6;
    }
 }

 .location {
    grid-column: 1 / -1;

    @include media('>=lg') {
        grid-column: 7 / -1;
        text-align: right;
    }
 }
 </style>
