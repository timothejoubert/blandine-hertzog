<script  lang="ts" setup>
import { components } from '~/slices'

// const splashScreenState = useSplashScreen()
import themeProperties from '~/assets/scss/export/_themes.module.scss'
import elementId from '~/constants/element-id'

await useFetchPage()

const theme = useUiThemeState()
const primaryColor = computed(() => themeProperties[`${theme.value}-color-primary`])

// COMMON SLICE
const settings = await usePrismicSettingsDocument()
const commonSlices = computed(() => settings?.data.slices)
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
    <NuxtPage :id="elementId.PAGE_CONTENT" />
    <LazySliceZone
        v-if="commonSlices?.length"
        :slices="commonSlices"
        :components="components"
    />
    <VFooter />
</template>
