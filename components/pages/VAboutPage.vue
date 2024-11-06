<script  lang="ts" setup>
import type { PageComponentProps } from '~/types/app'

const props = defineProps<PageComponentProps<'about'>>()
const data = props.document.data
</script>

<template>
    <div :class="$style.root">
        <h1>About page: {{ data.meta_title }}</h1>
        <pre>{{ data }}</pre>
    </div>
</template>

<style lang="scss" module>
.root {
    position: relative;
}
</style>
