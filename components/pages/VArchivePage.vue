<script lang="ts" setup>
import type { PageComponentProps } from '~/types/app'

const props = defineProps<PageComponentProps<'archive'>>()
const data = props.document.data
</script>

<template>
    <div :class="$style.root">
        <h1>Archive page</h1>
        <pre> {{ data }}</pre>
    </div>
</template>

<style lang="scss" module>
.root {
    position: relative;
}
</style>
