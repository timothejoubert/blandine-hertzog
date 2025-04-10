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
@use 'assets/scss/variables/fonts' as *;

.root {
}

.toggle {
    @include media('>=lg') {
        display: none;
    }
}

.list {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: initial;
    margin-block: initial;

    @include media('<lg') {
        .toggle[aria-expanded="false"] + & {
            display: none;
        }
    }

    @include media('>=lg') {
        position: relative;
        flex-direction: row;
        justify-content: center;
        gap: rem(32);
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
    text-transform: uppercase;
    text-underline-offset: 6px;
    text-decoration-color: transparent;

    &[aria-current="page"] {
        text-decoration-color: color-mix(in srgb, var(--theme-color-on-background), transparent 60%);
    }
}
</style>
