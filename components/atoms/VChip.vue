<script  lang="ts" setup>
export interface VChipProp {
    label: string
    active?: boolean
}
defineProps<VChipProp>()
</script>

<template>
    <button :class="[$style.root, active && $style['root--active']]">
        {{ label }}
        <span :class="$style.icon" />
    </button>
</template>

<style lang="scss" module>
.root {
    display: flex;
    align-items: center;
    cursor: pointer;
    gap: rem(6);
    padding-block: rem(9);
    padding-inline: rem(12);
    border-radius: rem(4);
    border: none;
    color: var(--theme-color-primary);
    background-color: var(--theme-color-secondary-variant);
}

.icon {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: rem(16);
    height: rem(16);
    border: 1px solid currentColor;
    border-radius: rem(4);
    transition: opacity 0.2s ease(out-quad);

    &::before,
    &::after {
        position: absolute;
        opacity: 0;
        content: '';
        background-color: currentColor;
        transform-origin: center;
        rotate: 45deg;
        transition: opacity 0.3s ease(out-quad);
    }

    &::before {
        height: 1px;
        width: 100%;
    }

    &::after {
        width: 1px;
        height: 100%;
    }

    .root--active &::before,
    .root--active &::after {
        opacity: 1;
    }
}
</style>
