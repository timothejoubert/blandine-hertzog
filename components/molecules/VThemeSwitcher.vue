<script  lang="ts" setup>
import { useUiThemeState } from '~/composables/use-ui-theme-state'

const theme = useUiThemeState()

function switchTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
}
</script>

<template>
    <div :class="[$style.root, $style[`root--theme-${theme}`]]">
        <VIcon
            name="sun"
            :class="$style.icon"
            @click="() => theme = 'light'"
        />
        <button
            :class="$style.button"
            :aria-label="$t('switch_theme_to', { theme })"
            @click="switchTheme"
        />
        <VIcon
            name="moon"
            :class="$style.icon"
            @click="() => theme = 'dark'"
        />
    </div>
</template>

<style lang="scss" module>
@use 'assets/scss/functions/rem' as *;
@use 'assets/scss/v-footer' as *;
@use 'assets/scss/functions/ease' as *;

.root {
    z-index: 1;
    display: flex;
    height: $v-footer-height;
    align-items: center;
    justify-content: center;
    gap: rem(8);
}

.button {
    --v-theme-switcher-width: #{rem(40)};
    --v-theme-switcher-paddding-inline: #{rem(6)};
    --v-theme-switcher-paddding-block: #{rem(5)};

    width: var(--v-theme-switcher-width);
    padding: var(--v-theme-switcher-paddding-block) var(--v-theme-switcher-paddding-inline);
    border: none;
    border-radius: rem(6);
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
        width: rem(13);
        height: rem(13);
        border-radius: rem(4);
        background-color: var(--theme-color-secondary);
        content: '';
        transition: translate 0.4s ease(out-cubic);
    }

    .root--theme-dark &::before {
        translate: calc(var(--v-theme-switcher-width) - (var(--v-theme-switcher-paddding-inline) * 2) - 100%) 0;
    }
}

.icon {
    cursor: pointer;
}
</style>
