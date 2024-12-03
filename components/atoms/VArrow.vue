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
        type: String as PropType<'up' | 'down' | 'left' | 'right' >,
        default: 'right',
    },
    href: String,
    to: String,
}

export default defineComponent({
    props: vArrowProps,
    setup(props) {
        const $style = useCssModule()

        const rootTag = computed(() => {
            if (props.tag) return props.tag
            else if (props.href) return 'a'
            else if (props.to) return NuxtLink
            return 'span'
        })

        return () => {
            const attrs = {
                'class': [
                    $style.root,
                    $style[`root--size-${props.size}`],
                ],
                'aria-hidden': rootTag.value === 'button' || rootTag.value === 'a' ? undefined : 'true',
                'href': props.href,
                'to': props.to,
            }
            return h(rootTag.value, attrs,
                h(VIcon, { class: $style.icon, name: `arrow-${props.direction}` }),
            )
        }
    },
})
</script>

<style lang="scss" module>
@use 'assets/scss/functions/rem' as *;
@use 'assets/scss/mixins/property-fluid' as *;

.root {
    position: relative;
    display: var(--v-arrow-display, inline-flex);
    align-items: var(--v-arrow-align-items, center);
    justify-content: center;
    background-color: var(--theme-color-secondary);

    &--size-sm {
        padding: rem(3);
        border-radius: rem(5);
    }

    &--size-md {
        padding: rem(6);
        border-radius: rem(6);
    }

    &--size-lg {
        padding: rem(9);
        border-radius: rem(16);
    }
}

.icon {
    height: auto;
    color: var(--theme-color-primary);
    transform-origin: center;

    :global(.global--theme-dark) & {
        color: var(--theme-color-background);
    }

    .root--size-sm & {
        @include property-fluid('width', (xs: 18, xl: 26), $breakpoint: null);
    }

    .root--size-md & {
        @include property-fluid('width', (xs: 24, xl: 38), $breakpoint: null);
    }

    .root--size-lg & {
        @include property-fluid('width', (xs: 32, xl: 48), $breakpoint: null);
    }
}
</style>
