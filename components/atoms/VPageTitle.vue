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
</script>

<template>
    <h1
        :class="$style.title"
        class="text-h1"
    >
        {{ titleSplitted[0].join(' ') }}
        <VAsterixIcon
            :class="$style.asterix"
            aria-hidden="true"
        />
        {{ titleSplitted[1].join(' ') }}
    </h1>
</template>

<style lang="scss" module>
@use 'assets/scss/variables/font-metrics' as *;
@use 'assets/scss/mixins/font-size-fluid' as *;
@use 'sass:math';
@use 'sass:map';

.title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 2%;
    margin-bottom: -2%;
    text-transform: uppercase;
}

.asterix {
    width: rem(70);
    height: auto;
    margin-top: -40px;
    margin-inline: rem(20);
}
</style>
