<script setup lang="ts">
import type { NuxtError } from 'nuxt/app'

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

// Log the error for debugging purposes
console.error('Error page:', props.error)

// TODO: add seo page title
</script>

<template>
    <NuxtLayout name="default">
        <VHeader
            :title="title"
            :content="message"
        />
        <VPrismicLink
            :to="homeUrl"
            :label="$t('back_home')"
        />
        <pre>{{ error }}</pre>
    </NuxtLayout>
</template>

<!-- <style lang="scss" module></style> -->
