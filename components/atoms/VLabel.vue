<script lang="ts" setup>
defineProps<{
    label?: string
    rootTag?: string
}>()
</script>

<template>
    <slot :component-class="$style.root">
        <component
            :is="rootTag || 'div'"
            :class="[$style.root, $style['root--styled']]"
        >
            {{ label }}
        </component>
    </slot>
</template>

<style lang="scss" module>
.root {
    position: relative;

    &--styled {
        padding-left: 24px;
        font-family: $font-mango-family;
        font-size: 54px;
    }

    &::before {
        position: absolute;
        top: 0;
        left: 0;
        width: 2px;
        height: 100%;
        background-color: var(--theme-color-line);
        content: '';
    }
}
</style>
