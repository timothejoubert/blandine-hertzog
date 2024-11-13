<script  lang="ts" setup="">
defineProps({
    label: String,
})
</script>

<template>
    <div :class="$style.root">
        {{ label }}
    </div>
</template>

<style lang="scss" module>
.root {
    padding: rem(7) rem(14);
    background-color: var(--color-main-lighter-60);
    border-radius: rem(2);
}
</style>
