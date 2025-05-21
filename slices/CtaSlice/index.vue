<script setup lang="ts">
import type { Content } from '@prismicio/client'
import VSlice from '~/components/molecules/VSlice.vue'

const props = defineProps(
    getSliceComponentProps<Content.CtaSliceSlice>(),
)

// HYDRATION
const primary = computed(() => props.slice.primary)
const isMinified = computed(() => props.slice.variation === 'minified')
</script>

<template>
    <VSlice
        :spacing="primary.spacing"
        :slice="slice"
        :class="$style.root"
    >
        <VCta
            v-if="isMinified && primary.link?.url"
            :to="primary.link.url"
            :label="primary.link.text"
            icon-name="auto"
        />
        <VLinkMouseFollow
            v-else
            :title="primary.title"
            :link-label="primary.link?.text || 'aucun label rempli'"
            :href="primary.link?.url"
            :class="$style['link-follow']"
        />
    </VSlice>
</template>

<style lang="scss" module>
.root {
    display: flex;
    justify-content: center;
}
</style>
