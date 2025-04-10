<script lang="ts" setup>
defineProps<{
    label: string
    rootTag?: string
}>()
</script>

<template>
    <component
        :is="rootTag || 'div'"
        :class="$style.root"
    >
        <VAsterixIcon :class="$style.icon" />
        {{ label }}
    </component>
</template>

<style lang="scss" module>
.root {
    display: flex;
    align-items: center;
    font-family: $font-hanken-grostesk-family;
    font-size: 16px;
    text-transform: uppercase;
}

.icon {
  width: 42px;
  height: auto;
  margin-right: 20px;
}
</style>
