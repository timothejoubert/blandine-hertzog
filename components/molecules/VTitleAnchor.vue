<script  lang="ts" setup>
import { createTextVNode } from 'vue'
import { VArrow } from '#components'

const props = defineProps({
    title: { type: String, required: true },
    anchorHref: String,
})

const { t } = useI18n()
const $style = useCssModule()
const arrowNode = computed(() => {
    return h(VArrow,
        {
            'class': $style.arrow,
            'href': props.anchorHref,
            'direction': 'down',
            'size': 'lg',
            'border': '1 0 0 1',
            'aria-label': t('scroll_to_main_section'),
        })
})

const nodes = computed(() => {
    const words = props.title.split(' ').map(word => (createTextVNode(word)))
    words.splice(1, 0, 'br')
    words.splice(2, 0, arrowNode.value)

    return words
})

// TODO: usefull to clean raw h1 tag for seo purpose ?
</script>

<template>
    <h1
        class="text-h1"
        :class="$style.root"
    >
        <component
            :is="node"
            v-for="(node, i) in nodes"
            :key="i"
        />
    </h1>
</template>

<style lang="scss" module>
@use 'assets/scss/functions/rem' as *;

.root {
    line-height: 0.75 !important;
}

.arrow {
    --v-arrow-align-items: none;

    margin-right: rem(6);
    height: 1lh;
    translate: 0 rem(-9);
}
</style>
