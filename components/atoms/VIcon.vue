<script setup lang="ts">
defineProps({
    name: {
        type: String,
        required: true,
    },
})
</script>

<template>
    <NuxtIcon
        aria-hidden="true"
        :name="'icon:' + name"
    />
</template>
