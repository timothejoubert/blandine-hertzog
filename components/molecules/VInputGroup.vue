<script  lang="ts" setup>
import type { LocationQueryValue } from '#vue-router'

interface VInputProps {
    value: string
    label: string
}

const props = defineProps<{
    name: string
    type: 'checkbox' | 'radio'
    inputs: VInputProps[]
}>()

defineOptions({
    inheritAttrs: false,
})

const activeValue = defineModel<LocationQueryValue | LocationQueryValue[]>({ default: [] })

function onChange(newValue: string) {
    if (props.type === 'radio') {
        activeValue.value = newValue
    }
    else if (props.type === 'checkbox') {
        // TODO: mutate activeValue depending if value already exist in activeValue
    }
}

function isChecked(value: string) {
    if (Array.isArray(activeValue.value)) return !!activeValue?.value.find(v => v === value)
    else return activeValue.value === value
}
</script>

<template>
    <div
        v-for="input in inputs"
        :key="input.value"
        :class="[$style.root, $attrs.class]"
    >
        <input
            :id="input.value"
            :type="type"
            :name="name"
            :value="input.value"
            :checked="isChecked(input.value)"
            :class="$style.input"
            @input="onChange(input.value)"
        >
        <VCheckbox
            :class="$style.checkbox"
            @click="onChange(input.value)"
        />
        <label
            :for="input.value"
            :class="$style.label"
        >{{ input.label }}</label>
    </div>
</template>

<style lang="scss" module>
.root {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    gap: rem(2);
}

.input {
    display: none;
}

// .checkbox {
//     pointer-events: none;
// }

.label {
    cursor: inherit;
    opacity: 0.6;

    .root:has(input:checked) & {
        opacity: 1;
    }
}
</style>
