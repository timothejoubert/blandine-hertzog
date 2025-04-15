<script lang="ts" setup>
const nuxtApp = useNuxtApp()
const el = getCurrentInstance()?.vnode.el
const renderedIndex = el?.getAttribute('data-index')

const index = computed(() => {
    if (renderedIndex && nuxtApp.isHydrating) return renderedIndex
    return Math.ceil(Math.random() * 5)
})

const VIcon = defineAsyncComponent({
    loader: () => import(`~/assets/images/icons/asterix-${index.value}.svg?component`), // have to keep the base path (ie ~/assets/images/) in the loader for Vite to resolve the path correctly
    errorComponent: defineAsyncComponent(() => import(`~/assets/images/logo.svg?component`)),
})
</script>

<template>
    <VIcon
        :data-index="index"
        :class="$style.root"
    />
</template>

<style lang="scss" module>
.root {
    color: var(--theme-color-primary);
}
</style>
