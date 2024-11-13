<script  lang="ts" setup>
import { getHtmlElement, type TemplateElementRef } from '~/utils/ref/get-html-element'

defineProps({
    content: [String, null, undefined],
})

const reveal = defineModel<boolean>({ default: false })

const root = ref<TemplateElementRef>(null)

const $style = useCssModule()
const rootClasses = computed(() => {
    return [$style.root, reveal.value && $style['root--reveal']]
})

watch(reveal, () => {
    const elements = getHtmlElement(root.value)
    console.log('elements', elements)
})
</script>

<template>
    <VSplitText
        v-if="content"
        ref="root"
        :content="content"
        :class="rootClasses"
    />
</template>

<style lang="scss" module>
.root {
    > *[data-char-content] {
        position: relative;
        display: inline-block;
        color: transparent;
        opacity: 1;
        overflow: hidden;
    }

    > *[data-char-content]::after {
        position: absolute;
        inset: 0;
        content: attr(data-char-content);
        translate: 0 112%;
        color: var(--color-main-darker-80);
        transition: translate 0.3s calc(var(--data-char-index, 1) * 50ms) ease(out-quart);
    }

    &--reveal *[data-char-content]::after {
        translate: 0 10%;
    }
}
</style>
