<script  lang="ts" setup>
import type { PageComponentProps } from '~/types/app'
import { components } from '~/slices'

const props = defineProps<PageComponentProps<'home_page'>>()
const data = computed(() => props.document.data)

const slices = computed(() => {
    const slideKey = Object.keys(data.value).findLast(dataKey => dataKey.includes('slice')) || 'slices'
    return data.value?.[slideKey] || []
})

const mainId = computed(() => props.document.id)

const { open } = useMediaViewer()

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
            @click="OpenMediaViewer"
        >
            <button
                :class="$style.fullscreen"
                :aria-label="$t('media_viewer.open')"
            >
                <VIcon
                    name="fullscreen"
                    width="20"
                    height="20"
                />
            </button>
            <VVideoPlayer
                src="/assets/showreel.mp4"
                :class="$style.video"
                width="1920"
                height="500"
                :controls="false"
                muted
                autoplay
                loop
            />
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
     --v-home-page-video-margin-block: #{rem(130)};
     .video-wrapper + * {
         --v-slice-margin-top: var(--v-home-page-video-margin-block);

     }
 }

 .video-wrapper {
     position: relative;
     aspect-ratio: 1920 / 500;
     border-radius: rem(8);
     background-color: color-mix(in srgb, var(--theme-color-on-background) 10%, transparent);
     width: 100%;
     margin-top: var(--v-home-page-video-margin-block);
     overflow: hidden;
     margin-left: var(--gutter);

     @include media('>=lg') {
        width: flex-grid(12, 14, '%', true);
     }
 }

 .fullscreen {
     --fullsreen-position: #{rem(8)};

     display: flex;
     align-items: center;
     justify-content: center;
     z-index: 1;
     width: calc(#{flex-grid-value(1, 12)} - var(--fullsreen-position) * 2);
     aspect-ratio: 1;
     position: absolute;
     right: var(--fullsreen-position);
     bottom: var(--fullsreen-position);
     border: initial;
    background-color: initial;
     cursor: pointer;

     &::before {
         position: absolute;
         content: "";
         background-color: var(--theme-color-primary);
         width: rem(32);
         height: rem(32);
         border-radius: 100%;
         z-index: -1;
     }
 }

 .video {
     --v-player-video-position: absolute;
     --v-player-video-width: 100%;
     --v-player-video-height: 100%;
     --v-player-video-object-fit: cover;
 }
 </style>
