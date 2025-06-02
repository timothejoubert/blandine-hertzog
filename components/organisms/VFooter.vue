<script  lang="ts" setup>
import { usePrismicFooterMenuDocument } from '~/composables/use-prismic-footer-menu-document'

const settingsDocument = await usePrismicSettingsDocument()
const runtimeConfig = useRuntimeConfig()

const appCopyright = computed(() => {
    const name = settingsDocument?.data.site_name || runtimeConfig.public.site.name

    const currentYear = new Date().getFullYear()
    return `©${currentYear} ${name}`
})

const developerCopyright = computed(() => {
    return {
        label: 'T. Joubert',
        url: 'https://timothejoubert.com',
    }
})

const menu = await usePrismicFooterMenuDocument()
const links = computed(() => menu.value?.data.links || [])
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
                    :key="`${link.label}-${i}`"
                    :class="$style.item"
                >
                    <VPrismicLink
                        :to="link.internal_page"
                        :url="link.external_url"
                        :class="$style.link"
                        class="text-body-xs"
                        :label="link.label"
                    />
                </li>
            </ul>
            <a
                href="#body"
                :class="$style['arrow-link']"
            >
                <VIcon
                    name="arrow-up"
                    :class="$style['icon-arrow']"
                    :aria-label="$t('scroll_to_top')"
                />
            </a>
        </nav>
    </footer>
</template>

<style lang="scss" module>
@use 'assets/scss/v-footer' as *;

.root {
    position: relative;
    display: grid;
    align-items: center;
    margin-top: $v-footer-margin-top;
    padding-block: rem(42) rem(36);
    row-gap: rem(32);

    &::after {
        position: absolute;
        top: 0;
        right: calc(var(--gutter) * -1);
        left: calc(var(--gutter) * -1);
        height: 1px;
        background-color: var(--theme-color-line);
        content: '';
    }

    @include media('>=md') {
        padding-block: rem(22);
    }
}

.copyright {
    display: flex;
    flex-flow: column wrap;
    gap: rem(4);
    grid-column: 1 / -1;
    opacity: 0.7;
    
    @include media('>=md') {
        flex-direction: initial;
        align-items: center;
        gap: var(--gutter);
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
    display: flex;
    align-items: center;
    gap: rem(42);
    grid-column: 1 / -1;
    grid-row: 1;

    
    @include media('>=md') {
        justify-content: flex-end;
        grid-column: 9 / -1;
        grid-row: initial;
    }
}

.list {
    display: flex;
    gap: rem(42);
    margin-block: initial;

    @include media('>=md') {
        justify-content: flex-end;
    }
}

.item {
    display: contents;
}

.link {
    color: inherit;
    text-decoration-color: transparent;
    text-underline-offset: 6px;

    &[aria-current="page"] {
        text-decoration-color: color-mix(in srgb, var(--theme-color-on-background), transparent 60%);
    }
}

.arrow-link {
    display: contents;
    color: var(--theme-color-primary);
}

.icon-arrow {
    @include media('<md') {
        position: absolute;
        right: 0;
        bottom: rem(36);
        width: rem(32);
        height: rem(32);
    }
}
</style>
