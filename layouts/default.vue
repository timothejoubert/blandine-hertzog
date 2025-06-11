<script  lang="ts" setup>
import { components } from '~/slices'
import themeProperties from '~/assets/scss/export/_themes.module.scss'
import elementId from '~/constants/element-id'

// const splashScreenState = useSplashScreen()

const route = useRoute()
const isSliceSimulatorRoute = computed(() => route.name === 'slice-simulator')


// useRuntimeConfig in callOnce create [nuxt] instance unavailable error
// callOnce(async () => {
if (!isSliceSimulatorRoute.value) await useFetchPage()
// })

const theme = useUiThemeState()
const primaryColor = computed(() => themeProperties[`${theme.value}-color-primary`])

// COMMON SLICES
const settings = await usePrismicSettingsDocument()
const commonSlices = computed(() => settings?.data.slices)

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
