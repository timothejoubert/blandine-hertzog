<script lang="ts" setup>
import type { PageComponentProps } from '~/types/app'

const props = defineProps<PageComponentProps<'default_page'>>()
const data = props.document.data
</script>

<template>
    <VHeader
        :title="data.title"
        :content="data.content"
        class="grid-item-main"
    />
<!--    <pre> {{ data }}</pre> -->
</template>

<!-- <style lang="scss" module></style> -->
