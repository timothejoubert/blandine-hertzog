<script lang="ts" setup>
import type {
    ArchivePageDocument,
    DefaultPageDocument,
    HomePageDocument,
    ProjectListingPageDocument,
    ProjectPageDocument,
} from '~/prismicio-types'
import { getDocumentTypeByUrl } from '~/utils/prismic/route-resolver'
import { defaultPageTransition } from '~/transitions/default-page-transition'

definePageMeta({
    pageTransition: defaultPageTransition,
})

const route = useRoute()
const pageType = getDocumentTypeByUrl(route.path)

if (!pageType) {
    throw createError({
        statusCode: 404,
        statusMessage: `can't getDocumentTypeByUrl on ${route.path}`,
    })
}

const { webResponse, error } = await usePrismicFetchPage(pageType)

if (error) {
    showError(error)
}
else if (!webResponse) {
    showError({ status: 404, statusText: 'can\'t find prismic document' })
}

await usePrismicSeoMeta(webResponse)
const alternateLinks = usePrismicHead(webResponse)

const runtimeConfig = useRuntimeConfig()
const title = computed(() => {
    const pageTitle = webResponse?.data.meta_title || webResponse?.data.title
    return `${pageTitle} | ${runtimeConfig.public.site.name}`
})

usePage({
    title: title.value,
    webResponse,
    alternateLinks,
})

useHead({
    title: title.value,
})

const homeDocument = computed(() => pageType === 'home_page' && webResponse as HomePageDocument)
const projectListingDocument = computed(() => pageType === 'project_listing_page' && webResponse as ProjectListingPageDocument)
const projectDocument = computed(() => pageType === 'project_page' && webResponse as ProjectPageDocument)
const archiveDocument = computed(() => pageType === 'archive_page' && webResponse as ArchivePageDocument)
const defaultDocument = computed(() => pageType === 'default_page' && webResponse as DefaultPageDocument)

const documentFind = computed(() => {
    return !!projectListingDocument.value
        || !!homeDocument.value
        || !!defaultDocument.value
        || !!projectDocument.value
        || !!archiveDocument.value
})

if (!documentFind.value) {
    showError({
        status: 404,
        message: `Le composant associé a ce type (${pageType}) de page n'existe pas.`,
    })
}
</script>

<template>
    <div>
        <LazyVHomePage
            v-if="homeDocument"
            :document="homeDocument"
        />
        <LazyVProjectListingPage
            v-else-if="projectListingDocument"
            :document="projectListingDocument"
        />
        <LazyVProjectPage
            v-else-if="projectDocument"
            :document="projectDocument"
        />
        <LazyVArchivePage
            v-else-if="archiveDocument"
            :document="archiveDocument"
        />
        <LazyVDefaultPage
            v-else-if="defaultDocument"
            :document="defaultDocument"
        />
    </div>
</template>
