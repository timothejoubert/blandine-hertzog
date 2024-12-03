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
        class="grid grid-item-main text-body-xs"
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
    --grid-columns: 11;
    --grid-width: 100%;

    position: relative;
    height: $v-footer-height;
    align-items: center;
    margin-top: $v-footer-margin-top;

    &::after {
        position: absolute;
        top: 0;
        right: calc((#{flex-grid-value(3, 11)} + var(--gutter) * 2) * -1);
        left: 0;
        height: 1px;
        background-color: currentcolor;
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
