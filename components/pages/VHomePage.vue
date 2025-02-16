<script  lang="ts" setup>
import type { PageComponentProps } from '~/types/app'
import { components } from '~/slices'
import { getHtmlElement, type TemplateElement } from '~/utils/ref/get-html-element'

const props = defineProps<PageComponentProps<'home_page'>>()
const data = computed(() => props.document.data)

const slices = computed(() => {
    const slideKey = Object.keys(data.value).findLast(dataKey => dataKey.includes('slice')) || 'slices'
    return data.value?.[slideKey] || []
})

const mainId = computed(() => props.document.id)

const { open } = useMediaViewer()

const isPaused = ref(false)
const videoInstance = ref<TemplateElement>(null)
const videoEl = computed(() => getHtmlElement<HTMLVideoElement>(videoInstance))

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

function OpenMediaViewer() {
    open([{ src: '/assets/showreel.mp4', type: 'public_video' }])
}
</script>

<template>
    <main
        :id="mainId"
        :class="$style.root"
    >
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
                src="/assets/showreel.mp4"
                :class="$style.video"
                width="1920"
                height="900"
                :controls="false"
                muted
                autoplay
                loop
            />
            <button
                :class="[$style.button, $style['button--fullscreen']]"
                :aria-label="$t('media_viewer.open')"
                @click="OpenMediaViewer"
            >
                <VIcon
                    name="fullscreen"
                    width="20"
                    height="20"
                />
            </button>
        </div>
        <LazySliceZone
            v-if="slices?.length"
            :slices="slices"
            :components="components"
        />
    </main>
</template>

 <style lang="scss" module>
 @use 'assets/scss/functions/rem' as *;
 @use 'assets/scss/functions/flex-grid' as *;
 @use 'assets/scss/mixins/include-media' as *;

 .root {
     --v-home-page-video-margin-block: #{rem(80)};

     .video-wrapper + * {
         --v-slice-margin-top: var(--v-home-page-video-margin-block);

     }
 }

 .video-wrapper {
    position: relative;
    display: flex;
    overflow: hidden;
    width: calc(100% - var(--gutter) * 2);
    align-items: center;
    justify-content: center;
    border-radius: rem(8);
    margin-top: var(--v-home-page-video-margin-block);
    margin-left: var(--gutter);
    aspect-ratio: 375 / 300;
    background-color: color-mix(in srgb, var(--theme-color-on-background) 10%, transparent);

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
        width: flex-grid(12, 14, '%', true);
         aspect-ratio: 1920 / 900;
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

     > svg {
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
 </style>
