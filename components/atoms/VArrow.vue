<script lang="ts">
import type { PropType } from 'vue'
import { NuxtLink, VIcon } from '#components'

export const vArrowProps = {
    tag: String,
    size: {
        type: String as PropType<'sm' | 'md' | 'lg' >,
        default: 'md',
    },
    direction: {
        type: String as PropType<'top' | 'bottom' | 'left' | 'right' >,
        default: 'right',
    },
    href: String,
    to: String,
}

export default defineComponent({
    props: vArrowProps,
    setup(props) {
        const $style = useCssModule()
        const rootClasses = computed(() => {
            return [
                $style.root,
                $style[`root--direction-${props.direction}`],
                $style[`root--size-${props.size}`],
            ]
        })

        const rootTag = computed(() => {
            if (props.tag) return props.tag
            else if (props.href) return 'a'
            else if (props.to) return NuxtLink
            return 'span'
        })

        const rootAttrs = computed(() => {
            return {
                'aria-hidden': rootTag.value === 'button' || rootTag.value === 'a' ? undefined : 'true',
                'href': props.href,
                'to': props.to,
            }
        })

        return () => h(
            rootTag.value,
            { class: rootClasses.value, ...rootAttrs.value },
            h(VIcon, { class: $style.icon, name: 'arrow-right-small' }),
        )
    },
})
</script>

<style lang="scss" module>
.root {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: var(--theme-color-secondary);
    color: var(--theme-color-primary);

    &--size-sm {
        padding: rem(3);
        border-radius: rem(12);
    }

    &--size-md {
        padding: rem(6);
        border-radius: rem(16);
    }

    &--size-lg {
        padding: rem(9);
        border-radius: rem(30);
    }
}

.icon {
    height: auto;
    transform-origin: center;

    .root--size-sm & {
        @include property-fluid('width', (xs: 16, xl: 24), $breakpoint: null);
    }

    .root--size-md & {
        @include property-fluid('width', (xs: 24, xl: 38), $breakpoint: null);
    }

    .root--size-lg & {
        @include property-fluid('width', (xs: 28, xl: 60), $breakpoint: null);
    }

    .root--direction-top & {
        rotate: -90deg;
    }

    .root--direction-bottom & {
        rotate: 90deg;
    }

    .root--direction-left & {
        rotate: 180deg;
    }
}
</style>
