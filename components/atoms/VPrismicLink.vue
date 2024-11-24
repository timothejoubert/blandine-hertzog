<script lang="ts">
import { h, type PropType } from 'vue'
import type { NuxtLinkProps } from '#app/components/nuxt-link'
import { NuxtLink } from '#components'
import { type PossibleRouteReference, useLinkResolver } from '~/composables/use-link-resolver'

export const vPrismicLinkProps = {
    to: [Object, String] as PropType<PossibleRouteReference>,
    nuxtLinkProps: Object as PropType<NuxtLinkProps>,
    custom: Boolean, // use scoped slot
    label: [String, null],
    fallbackTag: String,
}

export default defineComponent({
    inheritAttrs: false,
    props: vPrismicLinkProps,
    setup(props, { attrs, slots }) {
        const { isRelative, isExternal, url } = useLinkResolver(props.to)

        // Define attributes
        const attributes = computed(() => {
            const result = { ...attrs, ...props.nuxtLinkProps }

            if (isRelative.value) {
                Object.assign(result, { to: url })
            }
            else if (isExternal) {
                Object.assign(result, {
                    target: attrs?.target || '_blank',
                    rel: attrs?.rel || 'noopener noreferrer',
                    href: url.value,
                })
            }

            return result
        })

        return () => {
            if (props.custom) {
                // Render scoped slot data
                const vNode = slots.default?.({ ...attributes.value })

                if (vNode?.length) return vNode[0]
            }
            // A VPrismicLink without URL or reference will render slot
            else if (!url.value) {
                return props.fallbackTag
                    ? h(props.fallbackTag, { class: attrs.class }, slots.default?.())
                    : slots.default?.()
            }

            // By default return a NuxtLink component
            return h(NuxtLink, attributes.value, slots.default || (() => props.label))
        }
    },
})
</script>
