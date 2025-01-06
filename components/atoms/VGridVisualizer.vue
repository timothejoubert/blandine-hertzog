<script  lang="ts" setup>
import ScssGrid from 'assets/scss/export/_grid.module.scss'

const maxColumnLength = Math.max(...Object.values(ScssGrid).map(v => Number(v)))

const isVisible = ref(true)
useEventListener('keydown', (e) => {
    if (e.shiftKey && (e.key === 'g' || e.key === 'G')) isVisible.value = !isVisible.value
})
</script>

<template>
    <ul
        v-show="isVisible"
        :class="$style.root"
        class="grid"
        aria-hidden="true"
    >
        <li
            v-for="index in maxColumnLength"
            :key="index"
            :class="$style.item"
        />
    </ul>
</template>

<style lang="scss" module>
.root {
    position: fixed;
    top: 0;
    bottom: 0;
    grid-template-rows: 1fr;
    pointer-events: none;
    z-index: 1001;
    margin-block: initial;
    left: var(--gutter);
}

.item {
    background-color: rgba(255, 0, 0, 0.1);
    list-style: none;
}
</style>
