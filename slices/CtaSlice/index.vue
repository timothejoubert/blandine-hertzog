<script setup lang="ts">
import type { Content } from '@prismicio/client'
import VSlice from '~/components/molecules/VSlice.vue'

const props = defineProps(
    getSliceComponentProps<Content.CtaSliceSlice>(),
)

const primary = computed(() => props.slice.primary)
</script>

<template>
    <VSlice
        :spacing="primary.spacing || 'xl'"
        :slice="slice"
        :class="$style.root"
    >
        <VPrismicLink
            :to="primary.link"
            :label="primary.link?.text || 'aucun label rempli'"
            :class="$style.link"
            :target="primary.link?.target"
            class="text-h2"
        />
        <VAsteriskPill
            v-if="primary.title"
            :class="$style.pill"
            :label="primary.title"
        />
    </VSlice>
</template>

<style lang="scss" module>
.root {
	display: flex;
	align-items: center;
	justify-content: center;
}

.link {
	display: block;
	color: inherit;
	text-align: center;
	margin-inline: auto;
	text-decoration: none;
    z-index: 1;
}

.pill {
	position: absolute;
    translate: -50% 50%;

    @media (hover: hover) {
        .link:hover + & {
            --v-text-ring-animation-play-state: running;
        }
    }
}
</style>
