<script  lang="ts" setup>
import type { LocationQueryValue } from '#vue-router'

export interface VInputProps {
    value: string
    label: string
}

defineOptions({
    inheritAttrs: false,
})

const props = defineProps<{
    name: string
    type: 'checkbox' | 'radio'
    inputs: VInputProps[]
}>()
const activeValue = defineModel<LocationQueryValue | LocationQueryValue[]>()



function isChecked(value: string) {
    if (Array.isArray(activeValue.value) && props.type === 'checkbox') {
        return !!activeValue.value?.find(v => v === value)
    }
    else if (Array.isArray(activeValue.value) && props.type === 'radio') {
        return activeValue.value?.[0] === value
    }
    else return activeValue.value === value
}

const inputList = computed(() => {
    return props.inputs.map((input) => {
        return {
            ...input,
            checked: isChecked(input.value),
        }
    })
})

function onChange(newValue: string) {
    if (props.type === 'radio') {
        activeValue.value = newValue
    }
    else if (props.type === 'checkbox') {
        // TODO: mutate activeValue depending if value already exist in activeValue
    }
}
</script>

<template>
    <div
        v-for="input in inputList"
        :key="input.value"
        :class="[$style.root, $attrs.class]"
    >
        <input
            :id="input.value"
            :type="type"
            :name="name"
            :value="input.value"
            :checked="input.checked"
            :class="$style.input"
            @input="onChange(input.value)"
        >
        <VCheckbox
            type="radio"
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

.label {
    cursor: inherit;
    opacity: 0.6;

    .root:has(input:checked) & {
        opacity: 1;
    }
}
</style>
