<script lang="ts" setup>
import type { Component } from 'vue';
import throttle from 'lodash/throttle'
import { getHtmlElement } from '~/utils/ref/get-html-element';
import { ease } from '~/utils/ease'

defineProps<{
  rootTag?: string | Component
  title: string | undefined | null
  href?: string
  linkLabel: string | undefined
}>()

// MOUSE FOLLOW
const rootRef = ref<HTMLElement | null>(null) 
const pill = ref<HTMLElement | null>(null)
const pillElement = computed(() => getHtmlElement(pill))

const { elementX, elementY, isOutside } = useMouseInElement(rootRef)
const initPos = ref({ x: 0, y: 0 })

function setInitPos() {
  const parentBound = rootRef.value?.getBoundingClientRect()
  const targetBound = pillElement.value?.getBoundingClientRect()

  if (!parentBound || !targetBound) return { x: 0, y: 0 }

  initPos.value.x = targetBound.left - parentBound.left + targetBound.width / 2
  initPos.value.y = targetBound.y - parentBound.y + targetBound.height / 2 
}

onMounted(setInitPos)
useResizeObserver(rootRef, setInitPos)


function setAnimation(x: number, y: number) {
    if(!pillElement.value) return

    pillElement.value.animate(
        { transform: `translate(${x}px, ${y}px)` },
        { 
            duration: 400, 
            fill: "forwards",
            easing: ease('out-quad'),
        },
    )
}

const setAnimationCallBack = throttle(setAnimation, 50)

watchEffect(() => {
    if(!pillElement.value) return

    const x = isOutside.value ? 0 : elementX.value - initPos.value.x
    const y = isOutside.value ? 0 : elementY.value - initPos.value.y

    setAnimationCallBack(x, y)
})
</script>

<template>
    <component
        :is="rootTag || 'div'"
        ref="rootRef"
        :class="$style.root"
    >
        <VPrismicLink
            v-if="linkLabel || href"
            :to="href"
            :label="linkLabel || 'aucun label rempli'"
            :class="$style.link"
            class="text-h2"
        />
        <VAsteriskPill
            v-if="title"
            ref="pill"
            :class="$style.pill"
            :label="title"
        />
    </component>
</template>

<style lang="scss" module>
.root {
    position: relative;
    display: flex;
    min-width: 80%;
    justify-content: center;

    @media (hover: hover) {
        &:hover {
            --v-text-ring-animation-play-state: running;
        }
    }
}

.link {
    position: relative;
    z-index: 1;
    display: block;
    width: 100%;
    color: inherit;
    padding-block: 120px;
    padding-inline: max(var(--gutter), 6%);
    text-align: center;
    text-decoration: none;
    white-space: nowrap;
    transition: opacity 0.3s ease(out-quad);
    
    @media (hover: hover) {
        opacity: 0.7;

        .root:hover & {
            opacity: 1;  
        }
    }
}

.pill {
    position: absolute;
    z-index: -1;
    bottom: 0;
    margin-inline: auto;
    opacity: 0.8;
    pointer-events: none;
    scale: 0.9;
    transition: opacity 0.3s ease(out-quad), scale 0.3s ease(out-quad);

    @media (hover: hover) {
        .root:hover & {
            opacity: 1;
            scale: 1;
        }
    }
}
</style>