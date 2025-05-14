<script lang="ts" setup>
import { components } from '~/slices'

const { document, documentData } = await useFetchPage('default_page')
</script>

<template>
    <div :id="document?.id">
        <VHeader
            :title="documentData.title"
            :content="documentData.content"
            :media="documentData.image"
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