<script  lang="ts" setup>
// const splashScreenState = useSplashScreen()
const settingDocument = await usePrismicSettingsDocument()
const showreelVideo = settingDocument?.data.showreel

console.log(showreelVideo)

const theme = useThemeState()
const $style = useCssModule()

const rootClasses = computed(() => {
    return [$style.root, $style[`root--theme-${theme.value}`]]
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
        <NuxtPage />
        <VPrismicVideo
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
        <VNav
            :class="$style.nav"
            class="grid-item-aside"
        />
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

        &::after {
            position: absolute;
            top: 0;
            left: calc(var(--gutter) + #{flex-grid-value(11, 14, '%', false)});
            width: 1px;
            height: 100%;
            background-color: currentcolor;
            content: '';
        }
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
    @include media('>=md') {
        > * {
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

.footer {
    grid-column: 1 / -1;
}
</style>
