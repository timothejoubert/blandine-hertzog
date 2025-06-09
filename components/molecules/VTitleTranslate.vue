<script  lang="ts">
import type { MaybeRefOrGetter } from 'vue'
import { ClientOnly } from '#components'
import {ease} from '~/utils/ease'

export default defineComponent({
    inheritAttrs: false,
    props: {
        tag: String,
        title: [String, null],
        hoverElement: [Object, null] as PropType<MaybeRefOrGetter<HTMLElement> | null>,
    },
    setup(props, { slots, attrs }) {
        // COMMONS
        const $style = useCssModule()

        // TEMPLATE REFS
        const root = ref<HTMLElement | null>(null)
        const wrapper = ref<HTMLElement | null>(null)

        watch(() => props.hoverElement, (target) => {
            if(!target) return 
            useEventListener(target, 'mouseenter', onMouseEnter)
        })

        // HOVER DIRECTION
        const enterDirection = ref('top')

        function onMouseEnter(event: MouseEvent) {
            const customEl = unrefElement(props.hoverElement)
            const el = event.target === customEl ? customEl : event.target as HTMLElement

            if (!el) return
            
            const elCenter = el.getBoundingClientRect().top + el.getBoundingClientRect().height / 2
            enterDirection.value = event.clientY > elCenter ? 'bottom' : 'top'

            if (enterDirection.value === 'bottom') slideBottom()
            else slideTop()
        }

        // ANIMATIONS
        const animationOptions = {
            duration: 300,
            easing: ease('out-quad'),
            fill: 'forwards'
        } as const

        function slideBottom() {
            if(!wrapper.value) return 

            wrapper.value.style.translate = '0 0'
            wrapper.value.animate([
                { translate: '0 0'}, 
                { translate: '0 -100%'}
            ], animationOptions)
        }

        function slideTop() {
            if(!wrapper.value) return 

            wrapper.value.style.translate = '0 0'
            wrapper.value.animate([
                { translate: '0 0'}, 
                { translate: '0 100%'}
            ], animationOptions)
        }

        return () => {
            const clienComponent = h(props.tag || 'div', 
                    {
                        ...attrs,
                        ref: root,
                        onMouseenter: props.hoverElement ? undefined : onMouseEnter,
                        class: [ attrs.class, $style.root ],
                    }, 
                    [
                        h('div', 
                            { 
                                ref: (el) => wrapper.value = el, 
                                class: $style.wrapper,
                            }, 
                            Array.from({ length: 3 }).map(() => {
                                return h('div', { class: $style.item }, props.title || '')
                            })
                        ), 
                        slots.default?.()
                    ]
                )

            return h(ClientOnly, null, { default: () => clienComponent, placeholder: () => (props.title || slots.default?.()) })

            }
    },
})
</script>

<style lang="scss" module>
.root {
    position: relative;
    overflow: hidden;
}

.wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    padding-block: var(--v-title-translate-wrapper-padding-block);
}

.item {
    height: 100%;
    translate: 0 var(--v-title-translate-item-offset-top, 0px); // add extra space for accent character

    &:first-child,
    &:last-child {
        position: absolute;
    }

    &:first-child {
        translate: 0 calc(-100% + var(--v-title-translate-item-offset-top, 0px));
    }

    &:last-child {
        translate: 0 100%;
        translate: 0 calc(100% + var(--v-title-translate-item-offset-top, 0px));
    }
}
</style>
