<script  lang="ts" setup generic="Item">
defineProps<{
    items: Item[]
}>()

defineSlots<{
    default(props: { item: Item | null }): unknown
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
.root {
    --v-grid-list-column: 1;

    display: grid;
    grid-template-columns: repeat(var(--v-grid-list-column), minmax(0 , 1fr));
    gap: rem(24) var(--gutter);

    @include media('>=md') {
        --v-grid-list-column: 2;
    }

}

.item {
    list-style: none;
}
</style>
