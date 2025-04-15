<script lang="ts" setup>
defineProps<{
    label: string
}>()
</script>

<template>
    <div :class="$style.root">
        <VAsterisk />
        <VTextRing
            v-if="label"
            :label="label"
        />
    </div>
</template>

<style lang="scss" module>
.root {
    --v-text-ring-position: absolute;

    display: flex;
    width: rem(125);
    height: rem(125);
    align-items: center;
    justify-content: center;
}
</style>
