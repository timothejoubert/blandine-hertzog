<script  lang="ts" setup>
const settings = await usePrismicSettingsDocument()
const runtimeConfig = useRuntimeConfig()

const appCopyright = computed(() => {
    const name = settings.value?.data.site_name || runtimeConfig.public.site.name
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
    align-items: center;
    height: $v-footer-height;
    margin-top: $v-footer-margin-top;
    margin-bottom: $v-footer-margin-bottom;

    &::after {
        position: absolute;
        bottom: 0;
        content: '';
        left: 0;
        right: calc(var(--gutter) * -1);
        height: 1px;
        background-color: var(--color-main-darker-80);
    }
}

.app-copyright {
    grid-column: span 4;
}

.developer-copyright {
    grid-column: span 5;
}
</style>
