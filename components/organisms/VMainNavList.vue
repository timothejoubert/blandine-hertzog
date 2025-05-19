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
    color: inherit;
    font-family: $font-hanken-grostesk-family;
    font-size: rem(15);
    font-weight: 600;
    text-decoration-color: transparent;
    text-transform: uppercase;
    text-underline-offset: 6px;

    &[aria-current="page"] {
        text-decoration-color: color-mix(in srgb, var(--theme-color-on-background), transparent 60%);
    }
}
</style>
