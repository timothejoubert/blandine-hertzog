<script  lang="ts" setup>
import { components } from '~/slices'
import themeProperties from '~/assets/scss/export/_themes.module.scss'
import elementId from '~/constants/element-id'

// const splashScreenState = useSplashScreen()

const route = useRoute()

callOnce(async () => {
    if(route.name !== 'slice-simulator')  await useFetchPage()
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

    <VTopBar />
    <slot>
        <NuxtPage :id="elementId?.PAGE_CONTENT" />
    </slot>
    <LazySliceZone
        v-if="commonSlices?.length"
        :slices="commonSlices"
        :components="components"
    />
    <VFooter />
</template>
