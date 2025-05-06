

<script lang="ts" setup>
import type { UseMouseEventExtractor } from '@vueuse/core'
import { useMouse, useParentElement } from '@vueuse/core'

const parentEl = useParentElement()

// TODO: custom x and y extractor depending on parent position
// https://github.com/vueuse/vueuse/blob/main/packages/core/useMouse/index.ts
const extractor: UseMouseEventExtractor = event => (
  event instanceof MouseEvent
    ? [event.offsetX, event.offsetY]
    : null
)
const { x, y } = useMouse({ target: parentEl, type: extractor })

const parentWidth = computed(() => Math.floor(parentEl.value?.clientWidth ?? 0))
const parentHeight = computed(() => Math.floor(parentEl.value?.clientHeight ?? 0))

const xLeaved = computed(() => x.value <= 0 || x.value >= parentWidth.value)  
const yLeaved = computed(() => y.value <= 0 || y.value >= parentHeight.value)

const xPosition = computed(() => {
  if (xLeaved.value){
    return parentWidth.value / 2
  }

  return Math.floor(x.value - parentWidth.value / 2)
})

const yPosition = computed(() => {
  if (yLeaved.value){
    return parentHeight.value / 2
  }  
  
  return Math.floor(y.value - parentHeight.value / 2)
})

watchEffect(() => {
  console.log('parentEl', parentEl.value)
})

watchEffect(() => {
  console.log('x', x.value)
})
</script>

<template>
    <slot
        :x="xPosition"
        :y="yPosition"
        :x-leaved="xLeaved"
        :y-leaved="yLeaved"
    />
</template>

<style>

</style>