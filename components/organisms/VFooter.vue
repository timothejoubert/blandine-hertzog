<script  lang="ts" setup>
import { usePrismicFooterMenuDocument } from '~/composables/use-prismic-footer-menu-document'

const settingsDocument = await usePrismicSettingsDocument()
const runtimeConfig = useRuntimeConfig()

const appCopyright = computed(() => {
    const name = settingsDocument?.data.site_name || runtimeConfig.public.site.name

    const currentYear = new Date().getFullYear()
    return `${name} © ${currentYear}`
})

const developerCopyright = computed(() => {
    return {
        label: 'T. Joubert',
        url: 'https://timothejoubert.com',
    }
})

const menu = await usePrismicFooterMenuDocument()
const links = menu.value?.data.links || []
console.log('menu', menu)
</script>

<template>
    <footer
        :class="$style.root"
        class="grid"
    >
        <div :class="$style.copyright">
            <div
                class="text-body-xs"
            >
                {{ appCopyright }}
            </div>
            <div
                :class="$style['copyright__developer']"
                class="text-body-xs"
            >
                {{ $t('code_by') }}
                <VPrismicLink
                    :to="developerCopyright.url"
                    :label="developerCopyright.label"
                />
            </div>
        </div>
        <nav
            v-if="links.length"
            :class="$style.nav"
            aria-label="Secondaire"
        >
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
                        class="text-body-xs"
                    >
                        {{ link.label }}
                    </VPrismicLink>
                </li>
            </ul>
        </nav>
    </footer>
</template>

<style lang="scss" module>
@use 'assets/scss/functions/flex-grid' as *;
@use 'assets/scss/functions/rem' as *;
@use 'assets/scss/mixins/include-media' as *;
@use 'assets/scss/v-footer' as *;

.root {
    position: relative;
    display: grid;
    height: $v-footer-height;
    align-items: center;
    margin-top: $v-footer-margin-top;

    &::after {
        position: absolute;
        top: 0;
        right: calc(var(--gutter) * -1);
        left: calc(var(--gutter) * -1);
        height: 1px;
        background-color: var(--theme-color-line);
        content: '';
    }
}

.copyright {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--gutter);
    grid-column: 1 / -1;
    opacity: 0.7;

    @include media('>=lg') {
        grid-column: 1 / span 8;
    }
}

.copyright__developer {
    a {
        color: inherit;
        text-decoration: initial;

        @media (hover: hover) {
            &:hover {
                text-decoration: underline;
            }
        }
    }

}

.nav {
    grid-column: 1 / -1;
    grid-row: 1;

    @include media('>=lg') {
        grid-column: 9 / -1;
        grid-row: initial;
    }
}

.list {
    display: flex;
    gap: rem(12);

    @include media('>=lg') {
        justify-content: flex-end;
    }
}

.item {
    display: contents;
}

.link {
    color: inherit;
    text-decoration: none;
}
</style>
