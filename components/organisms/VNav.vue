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
    font-family: $font-noi;
    font-size: rem(15);
    font-weight: 600;
    text-decoration: none;
    text-transform: uppercase;

    &[aria-current="page"] {
    }

    @include media('>=lg') {
    }
}
</style>
