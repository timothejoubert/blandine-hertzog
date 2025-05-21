<script  lang="ts" setup>
const props = defineProps<{
    displayLabel?: boolean
    filter?: boolean
}>()

const settings = await usePrismicSettingsDocument()
const socials = computed(() => {
    const socials = settings?.data.socials
    return props.filter ? socials?.filter(social => social.show_in_contact_slice) : socials
})
</script>

<template>
    <ul
        :class="$style.list"
        :aria-label="$t('socials')"
    >
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
                    v-if="social.icon && !displayLabel"
                    :name="`social-${social.icon}`"
                    :class="$style.icon"
                    size="1.1rem"
                />
                <template v-else-if="social.label">
                    {{ social.label }}
                </template>
            </VPrismicLink>
        </li>
    </ul>
</template>

<style lang="scss" module>
.list {
    display: flex;
    margin: 0;
}

.item {
    display: flex;
    align-items: center;
    justify-content: center;
    list-style: none;
}

.link {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--v-socials-link-padding);
    color: inherit;
    text-decoration: none;
    transition: opacity 0.3s ease(out-quad);

    .list:has(&:hover) & {
        opacity: 0.5;
    }

    &:hover {
        opacity: 1 !important;
    }
}
</style>
