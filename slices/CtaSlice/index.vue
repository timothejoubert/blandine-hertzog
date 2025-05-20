<script setup lang="ts">
import type { Content } from '@prismicio/client'
import VSlice from '~/components/molecules/VSlice.vue'

const props = defineProps(
    getSliceComponentProps<Content.CtaSliceSlice>(),
)

// HYDRATION
const primary = computed(() => props.slice.primary)
</script>

<template>
    <VSlice
        :spacing="primary.spacing"
        :slice="slice"
        :class="$style.root"
    >
        <VLinkMouseFollow
            :title="primary.title"
            :link-label="primary.link?.text || 'aucun label rempli'"
            :href="primary.link?.url"
            :class="$style['link-follow']"
        />
    </VSlice>
</template>

<style lang="scss" module>
.root {
    // background-color: red;
}

.link-follow {

}
</style>
