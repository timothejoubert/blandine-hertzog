<script lang="ts" setup>
import type Plyr from 'plyr'

const id = useId()

const { documents, index: slideIndex, close, nextSlide, previousSlide } = useMediaViewer()

const snapLength = ref(documents.value?.length || 1)

useEventListener('keyup', onKeyPressed)

function onKeyPressed(event: KeyboardEvent) {
    if (event.key === 'Escape') close()
    else if (event.key === 'ArrowLeft') previousSlide()
    else if (event.key === 'ArrowRight') nextSlide()
}

const plyrInstances = ref<{ index: number, plyr: Plyr }[]>([])

function onPlyrReady(plyr: Plyr, index: number) {
    const isAlreadyInit = plyrInstances.value.find(item => item.index === index)

    if (!isAlreadyInit) {
        plyrInstances.value.push({
            index,
            plyr,
        })
    }
}

watch(
    slideIndex,
    (currentSlideIndex) => {
        const inertVideos = plyrInstances.value.find((item) => {
            return item.index !== currentSlideIndex && !item.plyr.paused
        })

        if (inertVideos) inertVideos.plyr?.pause()
    },
    { flush: 'post' },
)

const root = ref<HTMLDialogElement | null>(null)

onMounted(() => {
    root.value?.showModal()
})

onBeforeUnmount(() => {
    root.value?.close()
})

const $style = useCssModule()
const rootClasses = computed(() => {
    return [$style.root]
})
</script>

<template>
    <dialog
        :id="id"
        ref="root"
        :class="rootClasses"
    >
        <button
            :class="$style.close"
            :aria-label="$t('media_viewer.close')"
            @click="close"
        >
            <VIcon
                name="close-small"
                width="14"
                height="14"
            />
        </button>
        <div
            :class="$style.medias"
        >
            <VPrismicMedia
                v-for="(document, index) in documents"
                :key="index"
                :document="document"
            />
        </div>
    </dialog>
</template>

<style lang="scss" module>
@use 'assets/scss/mixins/include-media' as *;
@use 'assets/scss/functions/rem' as *;
@use 'assets/scss/functions/flex-grid' as *;

.root {
    position: fixed;
    z-index: 101;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: initial;
    height: 100%;
    max-height: initial;
    padding: initial;
    margin: initial;
    border: initial;
    background-color: var(--theme-color-background);
    color: var(--theme-color-on-background);
    inset: 0;
}

.close {
    position: absolute;
    z-index: 2;
    top: rem(16);
    right: var(--gutter);
    display: flex;
    align-items: center;
    justify-content: center;
    border: initial;
    background-color: initial;
    cursor: pointer;
    color: var(--theme-color-on-background);

    @include media('>=lg') {
        top: rem(24);
        right: rem(24);
    }
}

.medias {
    width: calc(100% - var(--gutter) * 4);
    max-height: 90vh;
}
</style>
