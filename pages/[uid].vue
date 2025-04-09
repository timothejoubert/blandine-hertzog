<script lang="ts" setup>
const { documentData } = await useFetchPage()
</script>

<template>
    <div>
        <div>default [uid] page</div>
        <pre>{{ documentData }}</pre>
    </div>
</template>

<style lang="scss" module>

</style>
