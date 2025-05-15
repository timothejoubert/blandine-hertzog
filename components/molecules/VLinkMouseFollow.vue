<script lang="ts" setup>
import type { Component } from 'vue';

defineProps<{
  rootTag?: string | Component
  title: string | undefined
  href?: string
  linkLabel: string | undefined
}>()

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
    <component
        :is="rootTag || 'div'"
        ref="rootRef"
        :class="$style.root"
    >
        <VAsteriskPill
            v-if="title"
            ref="pill"
            :class="$style.pill"
            :label="title"
        />
        <VPrismicLink
            v-if="linkLabel || href"
            :to="href"
            :label="linkLabel || 'aucun label rempli'"
            :class="$style.link"
            class="text-h2"
        />
    </component>
</template>

<style lamg="scss" module>
.root {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-x: clip;

  @media (hover: hover) {
    *:has( > .root--container-interactive):hover &,
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

  @media (hover: hover) {
    *:has( > .root--container-interactive):hover &,
      .root:hover & {
          opacity: 1;
          scale: 1;
      }
  }
}
</style>