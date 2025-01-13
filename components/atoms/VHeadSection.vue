<script  lang="ts" setup>
import type { PossibleRouteReference } from '~/composables/use-link-resolver'

defineProps<{
    title?: string | null
    linkLabel?: string
    linkReference?: PossibleRouteReference
}>()
</script>

<template>
    <header :class="$style.root">
        <h2
            :class="$style.title"
            class="text-over-title-sm"
        >
            {{ title }}
        </h2>
        <slot />
        <VPrismicLink
            v-if="linkReference || linkLabel"
            class="text-over-title-sm"
            :to="linkReference"
            :label="linkLabel"
            :class="$style.link"
        />
    </header>
</template>

<style lang="scss" module>
@use 'assets/scss/variables/fonts' as *;
@use 'assets/scss/functions/rem' as *;
@use 'assets/scss/functions/flex-grid' as *;

.root {
    position: relative;
    display: flex;
    align-items: center;

    &::before,
    &::after {
        position: absolute;
        content: '';
        width: calc(100% + var(--gutter) *2);
        left: calc(var(--gutter) * -1);
        height: 1px;
        background-color: var(--theme-color-line);
    }

    &::before {
        top: 0;
    }

    &::after {
        bottom: 0;
    }
}

.title {
    --over-title-padding-inline: 0;

    font-weight: 600;
    margin-block: 0;
}

.link {
    text-decoration: none;
    display: block;
    min-width: flex-grid(2, 14);
    margin-left: auto;
    border-left: 1px solid var(--theme-color-line);
    border-right: 1px solid var(--theme-color-line);

    @at-root span#{&} {
        opacity: 0.6;
    }
}
</style>
