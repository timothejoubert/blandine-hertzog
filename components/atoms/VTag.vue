<script  lang="ts" setup="">
defineProps({
    label: String,
})
</script>

<template>
    <div
        :class="$style.root"
        class="text-tag-md"
    >
        {{ label }}
    </div>
</template>

<style lang="scss" module>
.root {
    padding: rem(5) rem(11);
    border-radius: rem(2);
    background-color: var(--theme-color-secondary-variant);
}
</style>
