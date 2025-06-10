<script lang="ts" setup>
defineProps<{
    label: string
}>()
const mainProject = await usePrismicMainProjects()
const archivedProject = await usePrismicArchivedProjects()

const titleLengthList = computed(() => {
    const projectTitles = [...mainProject.value, ...archivedProject.value]
        .filter(p => p?.data.title)
        .map(p => p?.data.title as string) 
    if (!projectTitles.length) return [7, 30]
    
    return projectTitles.map((title) => title.length)
})

const minTitleLength = computed(() => Math.min(...titleLengthList.value))
const maxTitleLength = computed(() => Math.max(...titleLengthList.value))
</script>

<template>
    <div :class="$style.root">
        <VAsterisk />
        <VTextRing
            v-if="label"
            :min-length="minTitleLength"
            :max-length="maxTitleLength"
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
