<script  lang="ts">
export const sizes = ['sm', 'md'] as const

export const props = {
    tag: String,
    label: String,
    size: {
        type: String as PropType<typeof sizes[number]>,
        default: 'sm',
    },
}

export default defineComponent({
    props,
    setup(props) {
        const $style = useCssModule()

        return () => h(
            props.tag || 'span', 
            { class: [$style.root, props.size && $style[`root--size-${props.size}`]] }, 
            props.label
        )
    },
})
</script>

<style lang="scss" module>
@use './v-tag';
@use 'assets/scss/mixins/sizes' as *;
@use 'assets/scss/variables/fonts' as *;

.root {
    border-radius: rem(3);
    background-color: color-mix(in srgb, var(--theme-color-primary) 10%, var(--theme-color-background));
    color: var(--theme-color-on-background);
    font-size: var(--v-tag-font-size);
    font-weight: 500;
    line-height: 1;
    padding-block: rem(8) rem(7);
    padding-inline: rem(16);
    // text-transform: uppercase;

    @include sizes(v-tag.$vars, 'v-tag');
}
</style>
