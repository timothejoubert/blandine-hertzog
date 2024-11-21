<script  lang="ts" setup>
import type { PropType } from 'vue'
import type { VTextContent } from '~/components/atoms/VText.vue'

const props = defineProps({
    title: [String, null],
    content: [String, null, Array] as PropType<VTextContent>,
})

const hasContent = computed(() => {
    const c = props.content
    return Array.isArray(c) ? !!c.length : !!c
})

const $style = useCssModule()
const rootClasses = computed(() => {
    return [$style.root, hasContent.value && $style['root--has-content']]
})

// TODO: use VRevealText
// const revealTitle = ref(true)
</script>

<template>
    <header
        :class="rootClasses"
    >
        <slot />
        <h1
            :class="$style.title"
            class="text-h1"
        >
            {{ title }}
        </h1>
        <VText
            v-if="content"
            :content="content"
            :class="$style.content"
            class="text-body-lg"
            tag="p"
        />
    </header>
</template>

<style lang="scss" module>
.root {
    position: relative;
    padding-block: rem(72) rem(44);

    &::after {
        position: absolute;
        bottom: 0;
        left: 0;
        width: calc(100% + var(--gutter));
        height: 1px;
        background-color: currentcolor;
        content: '';
    }

    @include media('>=md') {
        &--has-content {
            padding-block: rem(72) rem(26);
        }
    }
}

.title {
    display: flex;
    flex-wrap: wrap;

    //gap: rem(24);
    margin-block: initial;
}

.content {
    width: calc(#{flex-grid-value(6, 11, '%', false)} + var(--gutter));
    margin-block: rem(41) 0;
}
</style>
