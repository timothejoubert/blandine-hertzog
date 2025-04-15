<script lang="ts" setup>
import { components } from '~/slices'

const { documentData } = await useFetchPage('default_page')
</script>

<template>
    <div>
        <VPageTitle
            v-if="documentData.title"
            :title="documentData.title"
            class="grid-width"
        />
        <LazySliceZone
            v-if="documentData.slices?.length"
            :slices="documentData.slices"
            wrapper="main"
            :components="components"
        />
    </div>
</template>

<style lang="scss" module></style>
