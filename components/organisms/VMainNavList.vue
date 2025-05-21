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
    display: flex;
    align-items: center;
    justify-content: center;
    color: color-mix(in srgb, var(--theme-color-on-background), transparent 30%);
    font-family: $font-hanken-grostesk-family;
    font-size: rem(15);
    font-weight: 600;
    text-transform: uppercase;
    position: relative;
    text-decoration: none;
    transition: color 0.3s ease(out-quad);

    &::after {
        position: absolute;
        content: '';
        bottom: 0;
        left: 0;
        width: 100%;
        background-color: color-mix(in srgb, var(--theme-color-on-background), transparent 70%);
        height: 1px;
        scale: 0 1;
        transform-origin: right;
        transition: scale 0.3s ease(out-quad), background-color 0.3s ease(out-quad);
    }

    @media(hover: hover) {
        &:hover {
            color: color-mix(in srgb, var(--theme-color-on-background), transparent 10%);

            &::after {
                transform-origin: left;
                scale: 1;
            }
        }
    }

    &[aria-current="page"] {
        color: var(--theme-color-on-background);

        &::after {
            scale: 1;
            background-color: color-mix(in srgb, var(--theme-color-primary), transparent 30%);
        }
    }
}
</style>
