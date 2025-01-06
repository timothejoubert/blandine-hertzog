<script  lang="ts" setup="">
const settings = await usePrismicSettingsDocument()
const socials = settings?.data.socials
</script>

<template>
    <nav
        :aria-label="$t('socials')"
        :class="$style.root"
    >
        <ul :class="$style.list">
            <li
                v-for="(social, i) in socials"
                :key="social.external_url || i"
                :class="$style.item"
            >
                <VPrismicLink
                    :to="social.external_url"
                    :aria-label="social.icon || social.label"
                    :class="$style.link"
                >
                    <VIcon
                        v-if="social.icon"
                        :name="`social-${social.icon}`"
                    />
                    <template v-else-if="social.label">
                        {{ social.label }}
                    </template>
                </VPrismicLink>
            </li>
        </ul>
    </nav>
</template>

<style lang="scss" module>
@use 'assets/scss/functions/rem' as *;

.root {
    border: solid var(--theme-color-line);
    border-width: 0 1px;
}

.list {
    display: flex;
    align-items: center;
    margin: 0;
    height: 100%;
    gap: var(--v-top-bar-padding-inline-item);
    padding-inline: var(--v-top-bar-padding-inline-item);
}

.item {
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: center;
}

.link {
    display: contents;
    color: inherit;
}
</style>
