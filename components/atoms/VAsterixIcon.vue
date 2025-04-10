<script lang="ts" setup>
const index = useState(() => Math.ceil(Math.random() * 5))
const VIcon = defineAsyncComponent({
    loader: () => import(`~/assets/images/icons/asterix-${index.value}.svg?component`), // have to keep the base path (ie ~/assets/images/) in the loader for Vite to resolve the path correctly
    errorComponent: defineAsyncComponent(() => import(`~/assets/images/logo.svg?component`)),
})

// console.log(index.value)
</script>

<template>
    <VIcon />
</template>
