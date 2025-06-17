<script  lang="ts" setup>
import themeProperties from '~/assets/scss/export/_themes.module.scss'
import elementId from '~/constants/element-id'

const route = useRoute()
const isSliceSimulatorRoute = computed(() => route.name === 'slice-simulator')

// useRuntimeConfig in callOnce create [nuxt] instance unavailable error
// callOnce(async () => {
if (!isSliceSimulatorRoute.value) await useFetchPage()
// })

// TODO: use composable tyo get current color theme dictionnary 
const theme = useUiThemeState()
const primaryColor = computed(() => themeProperties[`${theme.value}-color-primary`])

const state = useSplashScreenState()
</script>

<template>
    <template v-if="!isSliceSimulatorRoute">
        <ClientOnly>
            <VGridVisualizer />
            <VMediaViewer />
            <NuxtLoadingIndicator :color="primaryColor" />
            <VToast />
        </ClientOnly>

        <LazyVSplashScreen v-if="state !== 'disabled'" />
        <VTopBar />
    </template>

    <NuxtPage :id="elementId?.PAGE_CONTENT" />
    <VCommonSlices />
    
    <LazyVFooter
        v-if="!isSliceSimulatorRoute"
        id="footer"
        data-nosnippet
    />
</template>
