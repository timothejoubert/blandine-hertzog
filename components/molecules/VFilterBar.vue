<script  lang="ts" setup>
import { useRouteQuery } from '~/composables/use-route-query'

export interface VFilterBarProps {
    filters: { value: string, isActive: boolean | undefined }[]
    queryKey: string
}

const props = defineProps<VFilterBarProps>()

const { toggleQuery } = useRouteQuery(props.queryKey)
</script>

<template>
    <div :class="$style.root">
        <div class="text-over-title-sm">
            {{ $t('filters') }}
        </div>
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
