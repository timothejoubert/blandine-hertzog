<script  lang="ts" setup>
// const splashScreenState = useSplashScreen()
import themeProperties from '~/assets/scss/export/_themes.module.scss'

await useFetchPage()

const theme = useUiThemeState()
const primaryColor = computed(() => themeProperties[`${theme.value}-color-primary`])
</script>

<template>
    <!-- <VSplashScreen v-if="splashScreenState !== 'done'" /> -->
    <ClientOnly>
        <VGridVisualizer />
        <VMediaViewer />
        <NuxtLoadingIndicator :color="primaryColor" />
        <VToast />
    </ClientOnly>

    <VTopBar />
    <NuxtPage />
    <VFooter />
</template>
