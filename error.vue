<script setup lang="ts">
import type { NuxtError } from 'nuxt/app'

import { components } from '~/slices'

useSeoMeta({ robots: 'noindex, nofollow' })

const props = defineProps<{
    error: NuxtError
}>()

const { t } = useI18n()

const statusCode = computed(() => props.error?.statusCode)

const title = computed(() => {
    return t('error_code', { code: statusCode.value })
})

const message = computed(() => {
    if (statusCode.value === 404) return t('error_page.not_found.body')
    return t('error_page.body')
})

onMounted(() => {
    // force reload if navigation occurs
    const router = useRouter()
    const unwatchRouter = router.afterEach(() => {
        unwatchRouter()

        // reload
        window.history.go(0)
    })
})

const config = useRuntimeConfig()
const homeUrl = config.public.site.url

// COMMON SLICES
// commonSlices aren't displayed in default layout because
// useFetchPage throw error prevent usePrismicSettingsDocument to load
const settings = await usePrismicSettingsDocument()
const commonSlices = computed(() => settings?.data.slices)

// Log the error for debugging purposes
console.error('Error page:', props.error)

useHead({
    title: `${t('error_page.title')} | ${config.public.site.name}`,
})
</script>

<template>
    <NuxtLayout
        name="default"
    >
        <VHeader
            :title="title"
            :content="message"
            :class="$style.header"
        />
        <main
            class="grid-container"
            :class="$style.main"
        >
            <VCta
                :to="homeUrl"
                :label="$t('back_home')"
                :class="$style.cta"
                icon-name="auto"
            />
            <LazySliceZone
                v-if="commonSlices?.length"
                :slices="commonSlices"
                :components="components"
            />
        </main>
    </NuxtLayout>
</template>

<style lang="scss" module>
.header {
    --v-page-title-justify-content: flex-start;
}

.main {
    margin-top: rem(30);
}

.cta {
    margin-bottom: rem(60);
    
    @include media('>=md') {
        margin-bottom: rem(166);
    }
}
</style>
