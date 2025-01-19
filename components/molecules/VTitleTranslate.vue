<script  lang="ts">
export default defineComponent({
    props: {
        tag: String,
        title: [String, null],
        active: Boolean,
    },
    setup(props) {
        const tag = props.tag || 'div'
        const $style = useCssModule()

        const isMounted = ref(false)
        onMounted(() => isMounted.value = true)

        const enterDirection = ref('top')

        function onMouseEnter(event: MouseEvent) {
            const el = event.target as HTMLElement
            if (!el) return
            const elCenter = el.getBoundingClientRect().top + el.getBoundingClientRect().height / 2

            enterDirection.value = event.clientY > elCenter ? 'bottom' : 'top'
        }

        return () => {
            if (!props.title) return () => {}

            const mountedNode = h('span', { class: $style.item }, props.title)
            const children = isMounted.value ? h('div', { class: $style.wrapper }, [mountedNode, mountedNode, mountedNode]) : props.title

            return h(tag, {
                onMouseenter: onMouseEnter,
                onMouseleave: onMouseEnter,
                class: [
                    $style.root,
                    $style[`root--translate-direction-${enterDirection.value}`],
                    props.active && $style['root--active'],
                    $style['root--mounted'],
                ],
            }, children)
        }
    },
})
</script>

<template>
    <component
        :is="tag || 'div'"
        :class="$style.root"
    >
        <span>{{ title }}</span>
    </component>
</template>

<style lang="scss" module>
@use 'assets/scss/functions/ease' as *;

.root {
    position: relative;

    &--mounted {
        overflow: hidden;
    }
}

.wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    transition: translate 0.3s ease(out-quad);

    .root--translate-direction-top:not(.root--active) & {
        translate: 0 -100%;
    }

    .root--translate-direction-bottom:not(.root--active) & {
        translate: 0 100%;
    }

    .root--active & {
        translate: 0 0;
    }
}

.item {
    &:first-child,
    &:last-child {
        position: absolute;
    }

    &:first-child {
        translate: 0 -100%;
    }

    &:last-child {
        translate: 0 100%;
    }
}
</style>
