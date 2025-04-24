<script lang="ts" setup>
const { document } = await usePrismicFetchDocument(undefined)
// preview url exemple 
// /prismic-preview?token=https://blandine-hertzog.prismic.io/previews/aApAZBEAACMAygXb?websitePreviewId=ZzUxtBIAACwAI9Jj&documentId=ZzTWWxIAACgAI0P5

const route = useRoute()
if(document.value.url) {
    await navigateTo({ 
        path: document.value.url, 
        query: { 
            ...route.query, 
        } 
    })
} else {
    await navigateTo('/')
}
</script>

<template>
    <div>
        <h1 class="text-h2">
            Preview Page...
        </h1>
        <pre>document: {{ document }}</pre>
    </div>
</template>

<style></style>
