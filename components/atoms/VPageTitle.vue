<script lang="ts" setup>
const props = defineProps<{
    title: string
}>()

const titleSplitted = computed(() => {
    const words = props.title.split(' ')
    const halfIndex = Math.ceil(words.length / 2)

    return words.reduce((acc, curr, i) => {
        if (i < halfIndex) {
            acc[0].push(curr)
        }
        else {
            acc[1].push(curr)
        }

        return acc
    }, [[], []] as string[][])
})

const { y } = useWindowScroll()
</script>

<template>
    <h1
        :class="$style.root"
        class="text-h1"
    >
        {{ titleSplitted[0].join(' ') }}
        <VAsterisk
            :class="$style.asterix"
            :style="{ rotate: `${y / 5}deg` }"
        />
        {{ titleSplitted[1].join(' ') }}
    </h1>
</template>

<style lang="scss" module>
@use 'assets/scss/variables/font-metrics' as *;
@use 'assets/scss/mixins/font-size-fluid' as *;
@use 'sass:math';
@use 'sass:map';

.root {
    display: flex;
    align-items: center;
    justify-content: var(--v-page-title-justify-content, space-between);
    margin-top: 2%;
    margin-bottom: -3%;
    column-gap: rem(10);
    text-transform: uppercase;
    white-space: nowrap;
    
    @include media('>=md') {   
        column-gap: rem(22);
    }
}

.asterix {
    max-width: max(8%, rem(20));
    height: auto;
    margin-top: -3.5%;
    transform-origin: center;
    transition: rotate 0.2s ease(out-quad);
    
    @include media('>=md') {
        max-width: rem(100);
        flex-grow: 1;
    }
}
</style>
