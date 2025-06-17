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

useHead({
    title: `${t('error_page.title')} | ${config.public.site.name}`,
    meta: [{ name: 'robots', content: 'noindex' }],

})
</script>

<template>
    <div :class="$style.root">
        <VTopBar />
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
            <VCommonSlices />
        </main>
        <VFooter />
    </div>
</template>

<style lang="scss" module>
.root {
    --v-footer-margin-top: auto;
    
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}
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
