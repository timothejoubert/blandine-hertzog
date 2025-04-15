<script lang="ts" setup>
const { documentData } = await useFetchPage()
// preview url exemple 
// prismic-preview?token=https://blandine-hertzog.prismic.io/previews/Z_6y6BEAAC0AqEQa?websitePreviewId=ZzUxtBIAACwAI9Jj&documentId=Z0NoYBEAACoAFEKz

// prismic-preview
// ?token=https://blandine-hertzog.prismic.io/previews/Z_6y6BEAAC0AqEQa
// ?websitePreviewId=ZzUxtBIAACwAI9Jj
// &documentId=Z0NoYBEAACoAFEKz
</script>

<template>
    <div>
        <div>Prismic preview</div>
        <pre>documentData: {{ documentData }}</pre>
    </div>
</template>

<style></style>
