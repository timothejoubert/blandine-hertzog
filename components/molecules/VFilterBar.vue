<script  lang="ts" setup>
import { useRouteQuery } from '~/composables/use-route-query'

interface InputGroup {
    value: string
    type: 'checkbox' | 'radio' | 'select'
    isActive: boolean | undefined
}

interface VFilterBarInputGroup {
    title: string
    inputs: InputGroup[]
    queryKey: string
}

export interface VFilterBarProps {
    inputGroup: VFilterBarInputGroup[]
}

const props = defineProps<VFilterBarProps>()

const { toggleQuery } = useRouteQuery(props.queryKey)
</script>

<template>
    <div :class="$style.root">
        <VChip
            v-for="filter in filters"
            :key="filter.value"
            :label="filter.value"
            :active="filter.isActive"
            @click="toggleQuery(filter.value)"
        />
    </div>
</template>

<style lang="scss" module>
@use 'assets/scss/functions/rem' as *;

.root {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: rem(12);
}
</style>
