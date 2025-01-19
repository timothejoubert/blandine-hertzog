<script lang="ts" setup>
const menu = await usePrismicMenuDocument()

const links = menu.value?.data.links || []
</script>

<template>
    <nav
        v-if="links.length"
        aria-label="Main"
        :class="$style.nav"
    >
        <ul :class="$style.list">
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
    </nav>
</template>

<style lang="scss" module>
@use 'assets/scss/functions/rem' as *;
@use 'assets/scss/functions/flex-grid' as *;
@use 'assets/scss/variables/fonts' as *;
@use "assets/scss/mixins/include-media" as *;
@use "assets/scss/functions/ease" as *;

.nav {
    width: flex-grid(10, 14);
}

.list {
    display: flex;
    min-width: 100%;
    padding: initial;
    margin: initial;
}

.item {
    width: calc(#{flex-grid-value(2, 10)} + var(--gutter));
    list-style: none;
}

.link {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: rem(9) rem(24);
    border-left: 1px solid var(--theme-color-line);
    color: inherit;
    font-family: $font-noi;
    font-size: rem(15);
    font-weight: 600;
    text-decoration: none;
    text-transform: uppercase;

    &[aria-current="page"] {
        background-color: var(--theme-color-on-background);
        color: var(--theme-color-background);
    }

    .item:last-child & {
        border-right: 1px solid var(--theme-color-line);
    }
}
</style>
