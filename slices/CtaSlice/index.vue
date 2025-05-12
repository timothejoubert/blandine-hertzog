<script setup lang="ts">
import type { Content } from '@prismicio/client'
import VSlice from '~/components/molecules/VSlice.vue'
import { ease } from '~/utils/ease'

const props = defineProps(
    getSliceComponentProps<Content.CtaSliceSlice>(),
)

// HYDRATION
const primary = computed(() => props.slice.primary)

// MOUSE FOLLOW
const rootRef = ref<HTMLElement | null>(null) 
const pill = ref<HTMLElement | null>(null)

const { x, y, element, init } = useMouseFollow({ element: pill, container: rootRef })

watchEffect(() => {
    if(!element.value) return

    element.value.animate(
        { transform: `translate(${x.value}px, ${y.value}px)` },
        { 
            duration: init.value ? 200 : 400, 
            fill: "forwards",
            easing: ease('out-quad'),
        },
    );
})
</script>

<template>
    <VSlice
        ref="rootRef"
        :spacing="primary.spacing || 'xl'"
        :slice="slice"
        :class="$style.root"
    >
        <VAsteriskPill
            v-if="primary.title"
            ref="pill"
            :class="$style.pill"
            :label="primary.title"
        />
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
    position: relative;
	display: flex;
	align-items: center;
    justify-content: center;
    overflow-x: clip;

    @media (hover: hover) {
        &:hover {
            --v-text-ring-animation-play-state: running;
        }
    }
}

.link {
    z-index: 1;
	display: block;
	color: inherit;
	margin-inline: auto;
	text-align: center;
	text-decoration: none;
    transition: color 0.3s ease(out-quad);
}

.pill {
	position: absolute;
    z-index: -1;
    opacity: 0.8;
    pointer-events: none;
    scale: 0.9;
    transition: opacity 0.3s ease(out-quad), scale 0.3s ease(out-quad);

    // translate: -50% 50%;

    @media (hover: hover) {
        .root:hover & {
            opacity: 1;
            scale: 1;
        }
    }
}
</style>
