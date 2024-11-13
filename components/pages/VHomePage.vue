<script  lang="ts" setup>
import type { PageComponentProps } from '~/types/app'

const props = defineProps<PageComponentProps<'home_page'>>()
const data = props.document.data
</script>

<template>
    <div :class="$style.root">
        <VHeader
            :title="data.title"
        />
        <pre>{{ data }}</pre>
    </div>
</template>

<style lang="scss" module>
.root {
}
</style>
