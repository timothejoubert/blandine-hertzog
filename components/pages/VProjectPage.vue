<script lang="ts" setup>
import type { PageComponentProps } from '~/types/app'

const props = defineProps<PageComponentProps<'project_page'>>()
const data = props.document.data
</script>

<template>
    <div :class="$style.root">
        <h1>Project page: {{ data.title }} {{ $t('cta.label') }}</h1>
        <pre>{{ data }}</pre>
    </div>
</template>

<style lang="scss" module>
.root {
    position: relative;
}
</style>
