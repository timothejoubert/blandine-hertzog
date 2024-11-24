<script  lang="ts" setup>
import type { PropType } from 'vue'
import type { PossibleRouteReference } from '~/composables/use-link-resolver'
import { vArrowProps } from '~/components/atoms/VArrow.vue'

const props = defineProps({
    iconPosition: {
        type: String as PropType<'start' | 'end'>,
        default: 'start',
    },
    arrowDirection: vArrowProps.direction,
    to: [Object, String] as PropType<PossibleRouteReference>,
    label: String,
})

const $style = useCssModule()
const rootClasses = computed(() => {
    return [$style.root, $style[`root--icon-position-${props.iconPosition}`]]
})
</script>

<template>
    <VPrismicLink
        :class="rootClasses"
        :to="to"
        fallback-tag="div"
    >
        <VArrow
            size="sm"
            :direction="arrowDirection"
        />
        <span :class="$style.label">{{ label }}</span>
    </VPrismicLink>
</template>

<style lang="scss" module>
.root {
    display: flex;
    gap: rem(14);
    color: currentColor;
    text-decoration: none;

    &--icon-position-end {
        flex-direction: row-reverse;
        text-align: right;
    }
}

.label {
    display: block;
    text-transform: uppercase;
    font-family: $font-mango;
    font-weight: 500;
    line-height: 1;
    max-width: 11ch;

    @include font-size-fluid((xs: 32, xl: 42));
}
</style>
