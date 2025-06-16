<script  lang="ts" setup>
const navWrapper = ref<HTMLElement | null>(null)
const { isOpen } = useMobileMenu(navWrapper)

const menu = await usePrismicMenuDocument()
const links = computed(() => menu.value?.data.links)
</script>

<template>
    <div
        
        :class="[$style.root, isOpen && $style['root--is-open']]"
        class="grid"
    >
        <VMainLogo
            :class="$style.link"
            to="/"
        />
        <VMenuButton :class="$style['menu-button']" />
        <div
            ref="navWrapper"
            :class="$style['nav-wrapper']"
        >
            <nav
                v-if="links?.length"
                aria-label="Main"
                :class="$style.nav"
            >
                <VMainNavList
                    :links="links"
                    :class="$style['nav-list']"
                />
            </nav>
            <VSocials :class="$style.socials" />
        </div>
    </div>
</template>

<style lang="scss" module>
$background-color: var(--theme-color-background);
$transparent-background: color-mix(in srgb, $background-color, transparent 100%);
$flatter-background: color-mix(in srgb, $background-color, transparent 20%);

.root {
    --v-top-bar-height: #{rem(62)};

    position: sticky;
    z-index: 101;
    top: 0;
    height: var(--v-top-bar-height);
    align-items: center;
    margin-bottom: rem(12);
    grid-column: 1 / -1;

    &::before {
        position: absolute;
        backdrop-filter: blur(10px);
        background: color-mix(in srgb, $background-color, transparent 20%);
        content: '';
        inset: 0 calc(var(--gutter) * -1);
        pointer-events: none;

        // background: linear-gradient(to bottom, $flatter-background 50%, $transparent-background 80%);
    }


    &::after {
        position: fixed;
        background-color: rgba(0, 0, 0, 40%);
        content: '';
        inset: 0;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.4s ease(out-quad);
    }

    &--is-open::after {
        opacity: 1;
        pointer-events: initial;
    }

    @include media('>=md') {
        &::after {
            display: none !important
        }
    }
}

.menu-button {
    position: relative;
    z-index: 101;
    grid-column: 2 / -1;
    justify-self: flex-end;

    @include media('>=md') {
        display: none;
    }
}

.nav-wrapper {
    position: fixed;
    z-index: 100;
    top: 0;
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin-left: calc(var(--gutter) * -1);
    background-color: var(--theme-color-background);
    box-shadow: 0 -10px 40px black;
    gap: rem(62) 0;
    grid-column: 1 / -1;
    padding-block: calc(var(--v-top-bar-height) + rem(32)) rem(62);
    transition: translate 0.3s ease(out-quad);    
    translate: 0 -100%;

    .root--is-open & {
        translate: 0;
    }

    @include media('>=md') {
        display: contents;
    }
}

.nav {
    grid-column: 1 / -1;

    @include media('>=md') {
        grid-column: 4 / span 8;
    }
}

.nav-list {
    position: relative;
    gap: rem(18);

    @include media('>=md') {
        gap: rem(32);
    }
}

.socials {
    --v-socials-link-padding: 6px;

    align-items: center;
    justify-content: center;
    gap: rem(12);
    grid-column: 12 / -1;
    justify-self: flex-end;
}

.slide-in {
    &:global(#{'-enter-active'}),
    &:global(#{'-leave-active'}) {
        transition: translate 0.3s ease(out-quad);
    }

    &:global(#{'-enter-from'}),
    &:global(#{'-leave-to'}) {
        translate: 0 -100%;
    }
}
</style>
