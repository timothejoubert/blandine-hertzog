<script  lang="ts" setup>
// const splashScreenState = useSplashScreen()
// const settingDocument = await usePrismicSettingsDocument()
// const showreelVideo = settingDocument?.data.showreel

import { getDocumentTypeByUrl } from '~/utils/prismic/route-resolver'

const route = useRoute()
// fill CurrentPage data
if (route.name === 'uid' || route.name?.includes('uid___')) {
    const pageType = getDocumentTypeByUrl(route.path)
    if (pageType) {
        const { webResponse } = await usePrismicFetchPage(pageType)
        useCurrentPage({ webResponse })
    }
}
</script>

<template>
    <!--        <VSplashScreen v-if="splashScreenState !== 'done'" /> -->
    <NuxtLoadingIndicator />
    <VPageTitle />
    <VTopBar />
    <NuxtPage />
    <VFooter />
    <DevOnly>
        <VGridVisualizer />
    </DevOnly>
    <VToast />
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
