<script lang="ts" setup>
import type { AboutDocument, ArchiveDocument, ProjectDocument, ProjectListingPageDocument } from '~/prismicio-types'
import { getDocumentTypeByUrl } from '~/utils/prismic/route-resolver'

// import {defaultPageTransition} from "~/transitions/default-page-transition";
// definePageMeta({
// pageTransition: defaultPageTransition,
// })

const route = useRoute()
const pageType = getDocumentTypeByUrl(route.path)

if (!pageType) {
    throw createError({
        statusCode: 404,
        statusMessage: `can't resolvePrismicDocumentFromPath on ${route.path}`,
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

usePage({
    webResponse,
    alternateLinks: webResponse?.alternate_languages,
})

const projectListingDocument = computed(() => pageType === 'project_listing_page' && webResponse as ProjectListingPageDocument)
const archiveDocument = computed(() => pageType === 'archive' && webResponse as ArchiveDocument)
const aboutDocument = computed(() => pageType === 'about' && webResponse as AboutDocument)
const projectDocument = computed(() => pageType === 'project' && webResponse as ProjectDocument)

const documentFind = computed(() => {
    return !!projectListingDocument.value
        || !!archiveDocument.value
        || !!aboutDocument.value
        || !!projectDocument.value
})

if (!documentFind.value) {
    showError({
        status: 404,
        message: `Le composant associé a ce type (${pageType}) de page n'existe pas.`,
    })
}
</script>

<template>
    <LazyVProjectListingPage
        v-if="projectListingDocument"
        :document="projectListingDocument"
    />
    <LazyVArchivePage
        v-else-if="archiveDocument"
        :document="archiveDocument"
    />
    <LazyVAboutPage
        v-else-if="aboutDocument"
        :document="aboutDocument"
    />
    <LazyVProjectPage
        v-else-if="projectDocument"
        :document="projectDocument"
    />
</template>
