<script lang="ts" setup>
defineProps<{
    label: string
    rootTag?: string
}>()

const { y } = useWindowScroll()
</script>

<template>
    <component
        :is="rootTag || 'h2'"
        :class="$style.root"
    >
        <VAsterisk
            aria-hidden="true"
            :class="$style.icon" 
            :style="{ rotate: `${y / 10}deg` }"
        />
        {{ label }}
    </component>
</template>

<style lang="scss" module>
.root {
    display: flex;
    align-items: center;
    margin-top: initial;
    font-family: $font-hanken-grostesk-family;
    font-size: 16px;
    text-transform: uppercase;
}

.icon {
  width: 42px;
  height: auto;
  margin-right: 20px;
  transform-origin: center;
  transition: rotate 0.5s ease(out-quad);
}
</style>
