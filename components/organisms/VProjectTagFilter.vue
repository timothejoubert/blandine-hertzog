<script lang="ts" setup>
import type { LocationQueryValue } from '#vue-router'

defineProps<{
    query: string
}>()

const activeValue = defineModel<LocationQueryValue | LocationQueryValue[]>({ default: [] })

const projects = await usePrismicMainProjects()

const allTags = computed(() => {
    return projects.value
        .filter(project => project?.tags?.length)
        .map(project => project!.tags).flat(2) as string[]
})

const tags = computed(() => [...new Set(allTags.value)])

const inputs = computed(() => {
    return tags.value.map((tag) => {
        return {
            value: tag,
            label: tag,
        }
    })
})
</script>

<template>
    <div
        role="group"
        :class="$style.root"
    >
        <legend :class="$style.title">
            {{ $t('filter_by') }}
        </legend>
        <VInputGroup
            v-model="activeValue"
            :name="query"
            type="radio"
            :inputs="inputs"
            :class="$style.input"
        />
    </div>
</template>

<style lang="scss" module>
.root {
    display: flex; // display: flex; not working with fieldset
    flex-wrap: wrap;
    align-items: center;
    padding: inherit;
    border: none;
    column-gap: rem(12);
}

.title {
  display: inline;
  text-transform: uppercase;
}
</style>
