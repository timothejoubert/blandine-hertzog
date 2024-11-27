<script  lang="ts" setup>
// const splashScreenState = useSplashScreen()
const settingDocument = await usePrismicSettingsDocument()
const showreelVideo = settingDocument?.data.showreel

const theme = useUiThemeState()
const $style = useCssModule()

const rootClasses = computed(() => {
    return [$style.root,
        `global--theme-${theme.value}`,
        $style[`root--theme-${theme.value}`]]
})
</script>

<template>
    <div
        :class="rootClasses"
        class="grid"
    >
        <!--        <VSplashScreen v-if="splashScreenState !== 'done'" /> -->
        <!--        <VSplashScreen /> -->
        <NuxtLoadingIndicator />
        <VNav
            :class="$style.nav"
            class="grid-item-aside"
        >
            <VPrismicVideo
                v-if="showreelVideo?.url"
                :link-to-media-field="showreelVideo"
                autoplay
                width="295"
                height="675"
                :controls="false"
                playsinline
                muted
                loop
                :class="$style.video"
                class="grid-item-aside"
            />
        </VNav>
        <NuxtPage />

        <VThemeSwitcher
            :class="$style.theme"
        />
        <VFooter :class="$style.footer" />
    </div>
</template>

<style lang="scss">
.grid-item-main {
    // min-height: calc(100vh - ($v-footer-height + $v-footer-margin-bottom + $v-footer-margin-top));
    grid-column: var(--left-grid-column);
}

.grid-item-aside {
    grid-column: var(--right-grid-column);

    @include media('>=md') {
        width: calc(100% + var(--gutter));
    }
}
</style>

<style lang="scss" module>
.root {
    --left-grid-column: 1 / -1;
    --right-grid-column: 1 / -1;

    position: relative;
    color: var(--theme-color-primary);
    grid-auto-flow: dense;

    @include theme-variants;

    &::before {
        position: absolute;
        z-index: -1;
        background-color: var(--theme-color-background);
        content: '';
        inset: 0 calc(var(--gutter) * -1);
    }

    @include media('>=md') {
        --left-grid-column: 1 / 12;
        --right-grid-column: 12 / -1;
    }
}

.video {
    --v-player-video-max-width: none;

    min-height: 100%;
    max-height: 30vh;
    aspect-ratio: 295 / 675;
    grid-row: 1;
    object-fit: cover;
}

.nav {
    position: relative;
    grid-row: 1;
    background-color: var(--color-theme-background);

    @include media('>=md') {
        grid-row: 1 / span 100;
        //translate: calc(#{flex-grid-value(1, 3)} - var(--gutter) / 3) 0;
        transition: translate 0.4s ease(out-quad);

        @media (hover: hover) {
            &:hover {
                translate: 0 0;
            }
        }

        &::before {
            position: absolute;
            top: 0;
            left: 0;
            width: 1px;
            height: 100%;
            background-color: var(--theme-color-line-primary);
            content: '';
        }

        > ul {
            position: sticky;
            top: 0;
        }
    }
}

.theme {
    position: fixed;
    right: var(--gutter);
    bottom: 0;
    width: 100%;

    @include media('>=md') {
        right: 0;
        width: calc(#{flex-grid-value(3, 14, '%', true)} + var(--gutter));
    }
}
</style>
