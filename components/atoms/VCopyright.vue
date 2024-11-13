<script  lang="ts" setup>
defineProps<{
    content: string
}>()
</script>

<template>
    <figcaption :class="$style.root">
        {{ content }}
    </figcaption>
</template>

<style lang="scss" module>
.root {
    font-family: $font-noi;
    margin-block: rem(12) rem(22);
}
</style>
