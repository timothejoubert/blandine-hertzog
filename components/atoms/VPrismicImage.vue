<script lang="ts">
import type { PropType } from 'vue'
import pick from 'lodash/pick'
import { VImg, VPicture } from '#components'
import { imgProps, pictureProps } from '#image/components/_base'

import type { Writeable } from '~/utils/types'
import { imgixProviderAttributes, type ImgixProviderPropsKeys } from '~/utils/image/imgix'
import type { PossibleMedia } from '~/composables/use-prismic-media'

export const vPrismicImageProps = {
    ...imgProps,
    ...pictureProps,
    ...imgixProviderAttributes,
    media: Object as PropType<PossibleMedia>,
    tag: String as PropType<'picture' | 'img'>,
}

export default defineComponent({
    props: vPrismicImageProps,
    setup(props, { slots }) {
        const $style = useCssModule()

        const modifiers = computed(() => {
            return pick<Writeable<typeof props>, ImgixProviderPropsKeys>(
                props,
                Object.keys(imgixProviderAttributes) as Array<ImgixProviderPropsKeys>,
            )
        })

        const cropDimensions = computed(() => modifiers.value?.crop?.split('x') || props.ar?.split(':') || [])

        const width = computed(() => cropDimensions.value[0] || props?.width || props.media?.dimensions?.width)
        const height = computed(() => cropDimensions.value[1] || props?.height || props.media?.dimensions?.height)

        const isPicture = computed(() => !!slots.default || props.tag === 'picture')
        const src = computed(() => {
            const src = props.media?.thumbnail?.relativePath 
                || props.media?.url 
                || props.media?.src 
                || props.src
                
            if (!src) return

            const queryIndex = src.indexOf('?')
            return queryIndex === -1 ? src : src.substring(0, queryIndex)
        })

        const $img = useImage()

        const provider = computed(() => {
            if (typeof props.provider === 'string') return props.provider
            else if (props.media?.type === 'public_image') return undefined

            return 'imgix'
        })

        const sizes = computed(() => {
            if (!provider.value) {
                return undefined
            }
            else if (typeof props.sizes === 'string') {
                return props.sizes
            }
            else if (!isPicture.value && !props.densities) {
                return $img.options.presets?.default?.sizes || $img.options.screens
            }
            return undefined
        })

        const imageAttrs = computed(() => {
            return {
                ...pick(props, Object.keys(isPicture.value ? pictureProps : imgProps)),
                src: src.value,
                width: width.value,
                height: height.value,
                alt: props.alt || props.media?.alt || props.media?.name,
                placeholder: props.media?.imageAverageColor || '#ddd',
                sizes: sizes.value,
                provider: provider.value,
                fit: props.fit || cropDimensions.value.length ? 'crop' : undefined,
                modifiers: provider.value
                    ? {
                        ...modifiers.value,
                        auto: props.auto || 'format,compress',
                    }
                    : undefined,
            }
        })

        return () => {
            return h((isPicture.value ? VPicture : VImg), {
                ...imageAttrs.value,
                class: $style.root,
            }, slots.default)
        }
    },
})
</script>

<style lang="scss" module>
.root {
    &--copyright {
        position: relative;
        margin: initial;

        img {
            display: block;
        }
    }
}
</style>
