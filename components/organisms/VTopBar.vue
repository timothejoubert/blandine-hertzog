<script  lang="ts" setup>
</script>

<template>
    <div
        :class="$style.root"
        class="grid-width"
    >
        <VNav />
        <VThemeSwitcher :class="$style.themes" />
        <VSocials />
    </div>
</template>

<style lang="scss" module>
@use 'assets/scss/functions/rem' as *;

.root {
    --v-top-bar-padding-inline-item: #{rem(18)};

    position: sticky;
    z-index: 101;
    top: 0;
    display: flex;
    background-color: var(--theme-color-background);
    grid-column: 1 / -1;

    &::before,
    &::after {
        position: absolute;
        right: calc(var(--gutter) * -1);
        left: calc(var(--gutter) * -1);
        height: 1px;
        background-color: var(--theme-color-line);
        content: '';
    }

    &::before {
        top: 0;
    }

    &::after {
        bottom: 0;
    }
}

.themes {
    margin-left: auto;
    border-left: 1px solid var(--theme-color-line) !important;
    padding-inline: var(--v-top-bar-padding-inline-item);
}
</style>
