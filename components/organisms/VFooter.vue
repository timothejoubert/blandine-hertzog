<script  lang="ts" setup>
const settingsDocument = await usePrismicSettingsDocument()
const runtimeConfig = useRuntimeConfig()

const appCopyright = computed(() => {
    const name = settingsDocument?.data.site_name || runtimeConfig.public.site.name

    const currentYear = new Date().getFullYear()
    return `${name} © ${currentYear}`
})

const developerCopyright = computed(() => {
    return { label: 'Timothé Joubert', url: 'https://timothejoubert.com' }
})
</script>

<template>
    <footer
        :class="$style.root"
        class="grid"
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
.root {
    --grid-width: 100%;

    position: relative;
    height: $v-footer-height;
    align-items: center;
    margin-top: $v-footer-margin-top;
    margin-bottom: $v-footer-margin-bottom;

    &::after {
        position: absolute;
        right: calc(var(--gutter) * -1);
        bottom: 0;
        left: 0;
        height: 1px;
        background-color: currentcolor;
        content: '';
    }
}

.app-copyright {
    grid-column: span 4;
}

.developer-copyright {
    grid-column: span 5;
}
</style>
