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
            acc.push([curr])
        }
        return acc
    }, [[]] as string[][])
})
</script>

<template>
    <h1 :class="$style.title">
        {{ titleSplitted[0].join('') }}
        <VAsterixIcon
            :class="$style.asterix"
            aria-hidden="true"
        />
        {{ titleSplitted[1].join('') }}
    </h1>
</template>

<style lang="scss" module>
@use 'assets/scss/variables/font-metrics' as *;
@use 'assets/scss/mixins/font-size-fluid' as *;
@use 'sass:math';
@use 'sass:map';

.title {
    font-family: $font-mango-family;
    font-weight: 800;
    margin-block: 0;
    text-transform: uppercase;
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-bottom: -1.5%;
    margin-top: 1%;

    @include font-size-fluid((xs: 60, xl: 280));
}

.asterix {
    margin-inline: rem(20);
    width: rem(70);
    height: auto;
    margin-top: -40px;
}
</style>
