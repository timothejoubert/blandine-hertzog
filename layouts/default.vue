<script  lang="ts" setup>
import { components } from '~/slices'
import themeProperties from '~/assets/scss/export/_themes.module.scss'
import elementId from '~/constants/element-id'

// const splashScreenState = useSplashScreen()

const route = useRoute()
const isSliceSimulatorRoute = computed(() => route.name === 'slice-simulator')

callOnce(async () => {
    if(!isSliceSimulatorRoute.value) await useFetchPage()
})

const theme = useUiThemeState()
const primaryColor = computed(() => themeProperties[`${theme.value}-color-primary`])

// COMMON SLICES
const settings = await usePrismicSettingsDocument()
const commonSlices = computed(() => settings?.data.slices)
</script>

<template>
    <ClientOnly>
        <VGridVisualizer />
        <VMediaViewer />
        <NuxtLoadingIndicator :color="primaryColor" />
        <VToast />
    </ClientOnly>

    <!-- <VSplashScreen v-if="splashScreenState !== 'done'" /> -->

    <VTopBar v-if="!isSliceSimulatorRoute" />
    <slot>
        <NuxtPage :id="elementId?.PAGE_CONTENT" />
    </slot>
    <LazySliceZone
        v-if="commonSlices?.length"
        :slices="commonSlices"
        :components="components"
    />
    <VFooter id="footer" />
</template>
