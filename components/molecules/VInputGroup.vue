<script  lang="ts" setup>
interface VInputProps {
    value: string
    label: string
}

export interface VInputGroupProps {
    name: string
    type: 'select' | 'checkbox' | 'radio'
    queryKey: string
    inputs: VInputProps[]
    customInput?: boolean
    default?: string
}

defineOptions({
    inheritAttrs: false,
})

const props = defineProps<VInputGroupProps>()
const { queryValues, toggleQuery } = useRouteQuery(props.queryKey, props.type === 'checkbox')

const activeValue = ref(queryValues.value.length ? queryValues.value : [props.default])

function onChange(event: Event) {
    const newValue = (event.target as HTMLInputElement)?.value || ''
    toggleQuery(newValue)
}

const $attrs = useAttrs()
const $style = useCssModule()
const rootClasses = computed(() => {
    return [
        $style.root,
        props.customInput && $style['root--custom-input'],
        $attrs.class,
    ]
})
</script>

<template>
    <label
        v-for="input in inputs"
        :key="input.value"
        :for="input.value"
        :class="rootClasses"
    >
        <input
            :id="input.value"
            type="radio"
            :name="name"
            :value="input.value"
            :checked="!!activeValue.find(v => v === input.value)"
            :class="$style.input"
            @input="onChange"
        >
        <span :class="$style.text">{{ input.label }}</span>
    </label>
</template>

<style lang="scss" module>
@use 'assets/scss/variables/fonts' as *;
@use 'assets/scss/functions/rem' as *;

.root {
    cursor: pointer;
    display: flex;
    align-items: center;
    font-family: $font-space-mono-family;
    font-size: rem(12);
    text-transform: uppercase;

    &--custom-input::before {
        position: relative;
        content: '';
        width: rem(7);
        height: rem(7);
        background-color: var(--theme-color-on-background);
        border-radius: 100%;
        margin-right: rem(5);
        opacity: 0;
    }

    &--custom-input:has(input:checked)::before {
        opacity: 1 !important;
    }
}

.input {
    display: none;
}

.text {
    opacity: 0.6;

    .root:has(input:checked) & {
        opacity: 1;
    }
}
</style>
