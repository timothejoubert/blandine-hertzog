<script lang="ts" setup>
const menu = await usePrismicMenuDocument()

const links = menu.value?.data.links || []
</script>

<template>
    <nav
        v-if="links.length"
        :class="$style.root"
        aria-label="Main"
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
.root {
    --v-nav-color: var(--color-main-darker-80);
}

.list {
    display: flex;
    flex-direction: column;
    padding: initial;
    margin: initial;
}

.item {
    list-style: none;
}

.link {
    --v-nav-item-gap: #{rem(14)};
    --v-nav-item-active-symbol-width: #{rem(14)};

    display: flex;
    align-items: center;
    padding: rem(9) rem(24);
    border: 1px solid var(--v-nav-color);
    border-bottom-width: 0;
    color: var(--v-nav-color);
    font-family: $font-noi;
    font-size: rem(18);
    font-variation-settings: "wght" 600;
    gap: var(--v-nav-item-gap);
    text-decoration: none;
    text-transform: uppercase;

    .item:last-of-type & {
        border-width: 1px;
    }

    &::before {
        position: relative;
        width: var(--v-nav-item-active-symbol-width);
        height: var(--v-nav-item-active-symbol-width);
        flex-shrink: 0;
        background-color: currentcolor;
        content: '';
        opacity: 0;
        transition: opacity 0.3s ease(out-quad);
    }

    &:global(.router-link-active) {
        &::before {
            opacity: 1;
        }
    }
}

.label {
    transition: translate 0.3s ease(out-quad);
    translate: calc((var(--v-nav-item-gap) + var(--v-nav-item-active-symbol-width)) * -1);

    .link:global(.router-link-active) & {
        translate: 0;
    }

    @media (hover: hover) {
        .link:not(:global(.router-link-active)):hover & {
            translate: calc(var(--v-nav-item-active-symbol-width) * -0.8);
        }
    }
}
</style>
