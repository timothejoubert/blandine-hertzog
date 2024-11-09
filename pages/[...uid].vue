<script lang="ts" setup>
import type {
    DefaultPageDocument,
    HomePageDocument,
    ProjectListingPageDocument,
    ProjectPageDocument,
} from '~/prismicio-types'
import { getDocumentTypeByUrl } from '~/utils/prismic/route-resolver'

const route = useRoute()
const pageType = getDocumentTypeByUrl(route.path)

// TODO: error triggered on stories layout
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

usePage({
    webResponse,
    alternateLinks: webResponse?.alternate_languages,
})

const homeDocument = computed(() => pageType === 'home_page' && webResponse as HomePageDocument)
const projectListingDocument = computed(() => pageType === 'project_listing_page' && webResponse as ProjectListingPageDocument)
const projectDocument = computed(() => pageType === 'project_page' && webResponse as ProjectPageDocument)
const defaultPageDocument = computed(() => pageType === 'default_page' && webResponse as DefaultPageDocument)

const documentFind = computed(() => {
    return !!projectListingDocument.value
        || !!homeDocument.value
        || !!defaultPageDocument.value
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
    <LazyVDefaultPage
        v-else-if="defaultPageDocument"
        :document="defaultPageDocument"
    />
</template>
