<script  lang="ts" setup="">
import type { DateField } from '@prismicio/types'

const props = withDefaults(defineProps<{
    date: string | undefined | DateField
    output?: 'year' | 'month' | 'day' | 'full'
}>(), {
    output: 'year',
})

const parsedDate = computed(() => {
    const [years, month, day] = props.date?.split('-') || [null, null, null]

    return { years, month, day }
})

const output = computed(() => {
    if (props.output === 'year') return parsedDate.value.years
    else if (props.output === 'month') return parsedDate.value.month
    else if (props.output === 'day') return parsedDate.value.day

    return props.date
})
</script>

<template>
    <time
        v-if="date"
        :datetime="date"
        :class="$style.root"
    >{{ output }}</time>
</template>

<style lang="scss" module>
.root {}
</style>
