<script  lang="ts" setup>
import type { HomePageDocument } from '~/prismicio-types'
import { components } from '~/slices'

const { documentData } = await useFetchPage<HomePageDocument>('home_page')
</script>

<template>
    <div>
        <VHeaderHome
            :title="documentData.title"
            :tagline="documentData.tagline"
            :location="documentData.location"
            :embed-field="documentData.media[0]?.video_embed"
            :image-field="documentData.media[0]?.image"
        />
        <LazySliceZone
            v-if="documentData.slices?.length"
            :slices="documentData.slices"
            :components="components"
            wrapper="main"
        />
    </div>
</template>
