<script  lang="ts" setup>
import VLogo from '~/assets/images/logo.svg?component'
</script>

<template>
    <div
        :class="$style.root"
        class="grid"
    >
        <NuxtLink
            to="/"
            :class="$style.link"
        >
            <VLogo :class="$style.logo" />
        </NuxtLink>
        <VNav :class="$style.nav" />
        <VSocials :class="$style.socials" />
    </div>
</template>

<style lang="scss" module>
$background-color: var(--theme-color-background);
$transparent-background: color-mix(in srgb, $background-color, transparent 100%);
$flatter-background: color-mix(in srgb, $background-color, transparent 20%);

.root {
    position: sticky;
    z-index: 101;
    top: 0;
    align-items: center;
    grid-column: 1 / -1;
    padding-block: rem(12);

    &::before {
        position: absolute;
        backdrop-filter: blur(1px);
        background: linear-gradient(to bottom, $flatter-background 50%, $transparent-background 80%);
        content: '';
        inset: 0;
    }
}

.link {
    position: relative;
}

.logo {
    width: rem(36);
    height: auto;
}

.nav {
    position: relative;
    grid-column: 1 / -1;

    @include media('>=lg') {
        grid-column: 5 / span 6;
    }
}

.socials {
    --v-socials-link-padding: 6px;

    align-items: center;
    justify-content: center;
    gap: rem(12);
    grid-column: 11 / -1;
    justify-self: flex-end;
}
</style>
