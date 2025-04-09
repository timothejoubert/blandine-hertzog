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
        font-family: $font-mango-family;
        font-size: 54px;
        padding-left: 24px;
    }

    &::before {
        position: absolute;
        top: 0;
        height: 100%;
        left: 0px;
        content: '';
        width: 2px;
        background-color: var(--theme-color-line);
    }
}
</style>
