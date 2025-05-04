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
        <!-- <VMouseFollow v-slot="{ x, y }"> -->
        <!-- :style="{ transform: `translate(${x}px, ${y}px)` }" -->
        <VAsteriskPill
            v-if="primary.title"
            :class="$style.pill"
            :label="primary.title"
        />
        <!-- </VMouseFollow> -->
        <VPrismicLink
            :to="primary.link"
            :label="primary.link?.text || 'aucun label rempli'"
            :class="$style.link"
            :target="primary.link?.target"
            class="text-h2"
        />
    </VSlice>
</template>

<style lang="scss" module>
.root {
	display: flex;
    overflow: hidden;
    max-width: 100%;
	align-items: center;
    justify-content: center;
    pointer-events: all;
}

.link {
    z-index: 1;
	display: block;
	color: inherit;
	margin-inline: auto;
	text-align: center;
	text-decoration: none;

}

.pill {
	position: absolute;
    pointer-events: none;
    translate: -50% 50%;

    @media (hover: hover) {
        .link:hover + & {
            --v-text-ring-animation-play-state: running;
        }
    }
}
</style>
