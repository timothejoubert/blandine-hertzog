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
</script>

<template>
    <footer
        :class="$style.root"
        class="text-body-xs grid-width"
    >
        <div :class="$style['app-copyright']">
            {{ appCopyright }}
        </div>
        <div :class="$style['developer-copyright']">
            {{ $t('development') }} :
            <VPrismicLink
                :to="developerCopyright.url"
                :label="developerCopyright.label"
            />
        </div>
    </footer>
</template>

<style lang="scss" module>
@use 'assets/scss/v-footer' as *;
@use 'assets/scss/functions/flex-grid' as *;

.root {
    position: relative;
    height: $v-footer-height;
    display: grid;
    grid-template-columns: subgrid;
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

.app-copyright {
    grid-column: span 5;
}

.developer-copyright {
    grid-column: span 6;
    text-align: right;

    a {
        color: inherit;
    }
}
</style>
