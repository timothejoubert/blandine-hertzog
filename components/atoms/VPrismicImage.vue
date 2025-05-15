<script lang="ts">
import type { PropType } from 'vue'
import pick from 'lodash/pick'
import type * as Prismic from "@prismicio/client";
import { VImg, VPicture } from '#components'
import { imgProps, pictureProps } from '#image/components/_base'
import { imgixProviderAttributes } from '~/utils/image/imgix'

export const vPrismicImageProps = {
    ...imgProps,
    ...pictureProps,
    ...imgixProviderAttributes,
    imageField: { type: Object as PropType<Prismic.ImageField>, required: true },
    tag: String as PropType<'picture' | 'img'>,
}

export default defineComponent({
    props: vPrismicImageProps,
    setup(props, { slots }) {
        const imgixModifiers = computed(() => {
            return pick(props, Object.keys(imgixProviderAttributes))
        })

        const dimensions = computed(() => {
            const dimensions = imgixModifiers.value?.crop?.split('x') || props.ar?.split(':') || []

            return {
                width: props.width || dimensions[0] || props.imageField?.dimensions?.width,
                height: props.height || dimensions[1] || props.imageField?.dimensions?.height,
            }
        })

        const src = computed(() => {
            const src = props.imageField?.url || props.src
                
            if (!src) return

            const queryIndex = src.indexOf('?')
            return queryIndex === -1 ? src : src.substring(0, queryIndex)
        })

        
        const isPicture = computed(() => !!slots.default || props.tag === 'picture')
        const imageAttrs = computed(() => {
            return {
                ...pick(props, Object.keys(isPicture.value ? pictureProps : imgProps)),
                src: src.value,
                width: dimensions.value.width,
                height: dimensions.value.height,
                alt: props.alt || props.imageField?.alt || undefined,
                placeholder: props.placeholder || '#ddd',
                provider: props.provider ?? 'imgix',
                modifiers: {
                        ...imgixModifiers.value,
                        ...props.modifiers,
                        auto: props.auto || 'format,compress',
                    },
            }
        })

        return () => h((isPicture.value ? VPicture : VImg), imageAttrs.value, slots.default)
    },
})
</script>
