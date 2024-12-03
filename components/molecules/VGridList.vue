<script  lang="ts" setup generic="Item">
defineProps<{
    items: Item[]
}>()

defineSlots<{
    default(props: { item: Item }): unknown
}>()
</script>

<template>
    <ul
        :class="$style.root"
    >
        <li
            v-for="(item, index) in items"
            :key="index"
            :class="$style.item"
        >
            <slot :item="item" />
        </li>
    </ul>
</template>

<style lang="scss" module>
@use 'assets/scss/functions/rem' as *;
@use "assets/scss/mixins/include-media" as *;

.root {
    --v-grid-list-column: 1;

    display: grid;
    gap: rem(24) var(--gutter);
    grid-template-columns: repeat(var(--v-grid-list-column), minmax(0 , 1fr));

    @include media('>=md') {
        --v-grid-list-column: 2;
    }

}

.item {
    list-style: none;
}
</style>
