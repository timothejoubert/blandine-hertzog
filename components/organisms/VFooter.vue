<script  lang="ts" setup>
const settingsDocument = await usePrismicSettingsDocument()
const runtimeConfig = useRuntimeConfig()

const appCopyright = computed(() => {
    const name = settingsDocument?.data.site_name || runtimeConfig.public.site.name

    const currentYear = new Date().getFullYear()
    return `${name} © ${currentYear}`
})

const developerCopyright = computed(() => {
    return {
        label: 'Timothé Joubert',
        url: 'https://timothejoubert.com',
    }
})

// TODO: add footer menu
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
                {{ $t('development') }} :
                <VPrismicLink
                    :to="developerCopyright.url"
                    :label="developerCopyright.label"
                />
            </div>
        </div>
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
    align-items: center;
    gap: var(--gutter);
    grid-column: 1 / -1;

    @include media('>=lg') {
        grid-column: 1 / span 8;
    }
}

.copyright__developer {
    a {
        color: inherit;
    }
}
</style>
