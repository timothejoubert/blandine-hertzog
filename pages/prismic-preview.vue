<script lang="ts" setup>
const { documentData } = await useFetchPage()
</script>

<template>
    <div>
        <div>Prismic preview</div>
        <pre>documentData: {{ documentData }}</pre>
    </div>
</template>

<style></style>
