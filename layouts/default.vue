<script  lang="ts" setup>
// const splashScreenState = useSplashScreen()
// const settingDocument = await usePrismicSettingsDocument()
// const showreelVideo = settingDocument?.data.showreel
</script>

<template>
    <!--        <VSplashScreen v-if="splashScreenState !== 'done'" /> -->
    <NuxtLoadingIndicator />
    <VTopBar />
    <NuxtPage />
    <VFooter />
    <DevOnly>
        <VGridVisualizer />
    </DevOnly>
</template>

<style lang="scss" module>
@use "assets/scss/mixins/include-media" as *;
@use "assets/scss/functions/flex-grid" as *;

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
}
</style>
