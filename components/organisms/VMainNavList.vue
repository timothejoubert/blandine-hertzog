<script lang="ts" setup>
import type { MenuDocument } from '~/prismicio-types'

defineProps<{
    links: MenuDocument['data']['links']
}>()
</script>

<template>
    <ul
        :class="$style.list"
    >
        <li
            v-for="(link, i) in links"
            :key="i"
            :class="$style.item"
        >
            <VPrismicLink
                :to="link.internal_page"
                :url="link.external_url"
                :class="$style.link"
            >
                <span :class="$style.label">{{ link.label }}</span>
            </VPrismicLink>
        </li>
    </ul>
</template>

<style lang="scss" module>
@use 'assets/scss/variables/fonts' as *;

.list {
    display: flex;
    flex-direction: column;
    padding: initial;
    margin-block: initial;

    @include media('<md') {
        .toggle[aria-expanded="false"] + & {
            display: none;
        }
    }

    @include media('>=md') {
        position: relative;
        flex-direction: row;
        justify-content: center;
        margin-inline: initial;

    }
}

.item {
    list-style: none;
}

.link {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    color: color-mix(in srgb, var(--theme-color-on-background), transparent 30%);
    font-family: $font-hanken-grostesk-family;
    font-size: rem(15);
    font-weight: 600;
    text-decoration: none;
    text-transform: uppercase;
    transition: color 0.3s ease(out-quad);

    &::after {
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 100%;
        height: 1px;
        background-color: color-mix(in srgb, var(--theme-color-on-background), transparent 70%);
        content: '';
        scale: 0 1;
        transform-origin: right;
        transition: scale 0.3s ease(out-quad), background-color 0.3s ease(out-quad);
    }

    @media(hover: hover) {
        &:hover {
            color: color-mix(in srgb, var(--theme-color-on-background), transparent 10%);

            &::after {
                scale: 1;
                transform-origin: left;
            }
        }
    }

    &[aria-current="page"] {
        color: var(--theme-color-on-background);

        &::after {
            background-color: color-mix(in srgb, var(--theme-color-primary), transparent 30%);
            scale: 1;
        }
    }
}
</style>
