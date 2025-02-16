<script  lang="ts">
export const sizes = ['sm', 'md'] as const

export const props = {
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

        return () => h('span', { class: [
            $style.root,
            props.size && $style[`root--size-${props.size}`],
        ] }, props.label)
    },
})
</script>

<style lang="scss" module>
@use './v-tag';
@use 'assets/scss/mixins/sizes' as *;
@use 'assets/scss/variables/fonts' as *;

.root {
    background-color: color-mix(in srgb, var(--theme-color-primary) 10%, var(--theme-color-background));
    color: var(--theme-color-on-background);
    border-radius: var(--v-tag-border-radius);
    padding-block: var(--v-tag-padding-block);
    padding-inline: var(--v-tag-padding-inline);
    font-size: var(--v-tag-font-size);
    font-family: $font-noi-family;
    font-weight: 500;
    line-height: 1;
    text-transform: uppercase;

    @include sizes(v-tag.$vars, 'v-tag');
}
</style>
