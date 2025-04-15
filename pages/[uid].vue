<script lang="ts" setup>
import { components } from '~/slices'

const { document, documentData } = await useFetchPage('default_page')
</script>

<template>
    <div :id="document?.id">
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
