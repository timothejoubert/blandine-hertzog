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
@use 'assets/scss/functions/rem' as *;

.root {
    padding-inline: rem(11);
    padding-block: rem(5) rem(2);
    border-radius: rem(2);
    color: var(--theme-color-on-background);
    //background-color: var(--theme-color-primary);
    background-color: color-mix(in srgb, var(--theme-color-primary) 10%, var(--theme-color-background));
}
</style>
