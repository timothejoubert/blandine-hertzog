<script setup lang="ts">
import { SliceSimulator } from '@slicemachine/adapter-nuxt/simulator'
import { components } from '~/slices'

// import themeProperties from '~/assets/scss/export/_themes.module.scss'
// const theme = useUiThemeState()
// const primaryColor = computed(() => themeProperties[`${theme.value || 'dark'}-color-primary`])
</script>

<template>
    <SliceSimulator
        v-slot="{ slices }"
        background="#161A2B"
    >
        <SliceZone
            :slices="slices"
            :components="components"
        />
    </SliceSimulator>
</template>
