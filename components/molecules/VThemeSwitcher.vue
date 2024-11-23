<script  lang="ts" setup>
import { useThemeState } from '~/composables/use-theme-state'

const theme = useThemeState()

function switchTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
}
</script>

<template>
    <div :class="[$style.root, $style[`root--theme-${theme}`]]">
        <VIcon name="sun" />
        <button
            :class="$style.button"
            :aria-label="$t('switch_theme_to', { theme })"
            @click="switchTheme"
        />
        <VIcon name="moon" />
    </div>
</template>

<style lang="scss" module>
.root {
    z-index: 1;
    display: flex;
    height: $v-footer-height;
    align-items: center;
    justify-content: center;
    gap: rem(14);
}

.button {
    --v-theme-switcher-width: #{rem(50)};
    --v-theme-switcher-paddding: #{rem(5)};

    width: var(--v-theme-switcher-width);
    padding: var(--v-theme-switcher-paddding);
    border: none;
    border-radius: rem(25);
    margin: 0;
    background-color: var(--theme-color-primary);
    cursor: pointer;

    .root--theme-dark & {
        border: 1px solid var(--theme-color-primary, currentColor);
        background-color: initial;
    }

    &::before {
        position: relative;
        display: block;
        width: rem(16);
        height: rem(16);
        border-radius: 100%;
        background-color: var(--theme-color-secondary);
        content: '';
        transition: translate 0.4s ease(out-cubic);
    }

    .root--theme-dark &::before {
        translate: calc(var(--v-theme-switcher-width) - (var(--v-theme-switcher-paddding) * 2) - 100%) 0;
    }
}
</style>
