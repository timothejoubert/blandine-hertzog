<script  lang="ts" setup>
</script>

<template>
    <div
        :class="$style.root"
        class="grid-width"
    >
        <VNav :class="$style.nav" />
        <VThemeSwitcher :class="$style.themes" />
        <VSocials :class="$style.socials" />
    </div>
</template>

<style lang="scss" module>
@use 'assets/scss/functions/rem' as *;
@use 'assets/scss/functions/flex-grid' as *;
@use 'assets/scss/mixins/include-media' as *;

.root {
    --v-top-bar-padding-inline-item: #{rem(18)};

    position: sticky;
    z-index: 101;
    top: 0;
    display: flex;
    // background-color: var(--theme-color-background);
    background-color: color-mix(in srgb, var(--theme-color-background) 80%, transparent);
    grid-column: 1 / -1;

    &::before,
    &::after {
        position: absolute;
        right: calc(var(--gutter) * -1);
        left: calc(var(--gutter) * -1);
        height: 1px;
        background-color: var(--theme-color-line);
        content: '';
        z-index: 1;
    }

    &::before {
        top: 0;
    }

    &::after {
        bottom: 0;
    }
}

.nav {
    &::before {
        position: absolute;
        content: '';
        inset: 0 calc(var(--gutter) * -1);
        z-index: -10;
        backdrop-filter: blur(6px);
    }
}

.themes {
    width: flex-grid(1, 6);
    min-width: var(--gutter);
    border-right: 1px solid var(--theme-color-line) !important;
    border-left: 1px solid var(--theme-color-line) !important;
    margin-right: var(--gutter);
    margin-left: auto;

    @include media('>=md') {
        width: flex-grid(1, 14);
    }

}

.socials {
    width: flex-grid(2, 6);
    border: solid var(--theme-color-line);
    border-width: 0 1px;

    @include media('>=md') {
        width: flex-grid(2, 14);
    }
}
</style>
