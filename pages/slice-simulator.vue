<script setup lang="ts">
import { SliceSimulator } from '@slicemachine/adapter-nuxt/simulator'
import { components } from '~/slices'
import themeProperties from '~/assets/scss/export/_themes.module.scss'

const primaryColor = computed(() => themeProperties[`dark-color-background`])
console.log('color', primaryColor.value)
</script>

<template>
    <SliceSimulator
        v-slot="{ slices }"
        :background="primaryColor"
    >
        <SliceZone
            :slices="slices"
            :components="components"
        />
    </SliceSimulator>
</template>
