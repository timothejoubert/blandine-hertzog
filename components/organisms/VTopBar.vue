<script  lang="ts" setup>
import VLogo from '~/assets/images/logo.svg?component'
</script>

<template>
    <div
        :class="$style.root"
    >
        <VLogo :class="$style.logo" />
        <VNav :class="$style.nav" />
        <!-- <VThemeSwitcher :class="$style.themes" /> -->
        <VSocials :class="$style.socials" />
    </div>
</template>

<style lang="scss" module>
$color: var(--theme-color-background);
$transparent-background: color-mix(in srgb, $color, transparent 100%);
$flatter-background: color-mix(in srgb, $color, transparent 20%);

.root {
    position: sticky;
    z-index: 101;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    backdrop-filter: blur(1px);
    background: linear-gradient(to bottom, $flatter-background 50%, $transparent-background 80%);
    grid-column: 1 / -1;
    padding-block: rem(18);
    padding-inline: var(--gutter);
}

.logo {
    width: rem(41);
    height: auto;
}

.nav {
}

.socials {
    // width: flex-grid(2, 6);
    // border: solid var(--theme-color-line);
    // border-width: 0 1px;

    // @include media('>=md') {
    //     width: flex-grid(2, 14);
    // }
}
</style>
