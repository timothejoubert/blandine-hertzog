<script lang="ts" setup>
const menu = await usePrismicMenuDocument()

const links = menu.value?.data.links || []

const isOpen = ref(false)
const id = 'main-nav'

const toggleNav = () => isOpen.value = !isOpen.value

const page = useCurrentPage()
watch(page, () => {
    isOpen.value = false
})
</script>

<template>
    <nav
        v-if="links.length"
        aria-label="Main"
        :class="$style.root"
    >
        <button
            :class="$style.toggle"
            :aria-expanded="isOpen"
            :aria-controls="id"
            :aria-label="$t('toggle_main_nav.aria')"
            class="text-over-title-md"
            @click="toggleNav"
        >
            {{ $t('toggle_main_nav') }}
        </button>
        <ul
            :id="id"
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
    </nav>
</template>

<style lang="scss" module>
@use 'assets/scss/functions/rem' as *;
@use 'assets/scss/functions/flex-grid' as *;
@use 'assets/scss/variables/fonts' as *;
@use "assets/scss/mixins/include-media" as *;
@use "assets/scss/functions/ease" as *;

.root {
    @include media('>=lg') {
        width: flex-grid(11, 14);
    }
}

.toggle {
    background-color: initial;
    color: inherit;
    border: none;
    padding-block: var(--spacing-over-title-padding-block);
    padding-inline: rem(24);
    border-left: 1px solid var(--theme-color-line);
    border-right: 1px solid var(--theme-color-line);

    @include media('>=lg') {
        display: none;
    }

}

.list {
    position: absolute;
    display: flex;
    flex-direction: column;
    padding: initial;
    margin-block: initial;
    width: 100%;

    @include media('<lg') {
        .toggle[aria-expanded="false"] + & {
            display: none;
        }
    }

    @include media('>=lg') {
        position: relative;
        margin-inline: initial;
        flex-direction: row;

    }

}

.item {
    list-style: none;

    @include media('>=lg') {
        width: calc(#{flex-grid-value(2, 11)} + var(--gutter));
    }
}

.link {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-block: var(--spacing-over-title-padding-block);
    padding-inline: rem(18);
    border-left: 1px solid var(--theme-color-line);
    color: inherit;
    font-family: $font-noi;
    font-size: rem(15);
    font-weight: 600;
    text-decoration: none;
    text-transform: uppercase;
    background-color: var(--theme-color-background);
    border-bottom: 1px solid var(--theme-color-line);
    border-right: 1px solid var(--theme-color-line);

    &[aria-current="page"] {
        background-color: var(--theme-color-on-background);
        color: var(--theme-color-background);
    }

    @include media('>=lg') {
        border-bottom: none;

        .item:not(:last-child) & {
            border-right: none;
        }
    }

}
</style>
