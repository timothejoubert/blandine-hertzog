<script lang="ts" setup>
import type { LocationQueryValue } from '#vue-router'
import type { VInputProps } from '~/components/molecules/VInputGroup.vue'

const props = defineProps<{
    query: string
    defaultInput?: VInputProps
}>()

const activeValue = defineModel<LocationQueryValue | LocationQueryValue[]>()

const projects = await usePrismicMainProjects()
const projectTags = computed(() => {
    return projects.value
        .filter(project => project?.tags?.length)
        .map(project => project!.tags).flat(2) as string[]
})

const inputs = computed(() => {
    const uniqueTags = [...new Set(projectTags.value)]

    const tagInputs = uniqueTags.map((tag) => {
        return {
            value: tag,
            label: tag,
        }
    })

    if (props.defaultInput) tagInputs.unshift(props.defaultInput)

    return tagInputs
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
