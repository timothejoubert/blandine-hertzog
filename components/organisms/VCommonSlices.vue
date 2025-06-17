<script lang="ts" setup>
import { components } from '~/slices'

// commonSlices aren't displayed in default layout because
// useFetchPage throw error prevent usePrismicSettingsDocument to load
const settings = await usePrismicSettingsDocument()
const commonSlices = computed(() => settings?.data.slices)
</script>

<template>
    <LazySliceZone
        v-if="commonSlices?.length"
        :slices="commonSlices"
        :components="components"
    />
</template>