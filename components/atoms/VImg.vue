<script lang="ts">
import type { ExtractPropTypes } from 'vue'
import type { ImageOptions } from '@nuxt/image'
import { imgProps } from '#image/components/_base'
import { getInt, parseSize } from '#image/utils'

export const vImgProps = {
    ...imgProps,
    loading: {
        type: imgProps.loading.type,
        // overrides NuxtImg default value
        default: 'lazy',
    },
}

export type VImgProps = ExtractPropTypes<typeof vImgProps>

export default defineComponent({
    props: {
        ...vImgProps,
    },
    emits: ['load', 'error'],
    setup(props, context) {

        // PLACEHOLDER COLOR
        const placeholderColor = computed(() => {
            return typeof props.placeholder === 'string'
                && !props.placeholder.includes('.') // assumes a placeholder with a dot (i.e. a file extension) is a file (e.g. `image.png`)
                && props.placeholder
        })

        // STYLE
        const $style = useCssModule()
        const style = computed(() => ({ '--v-img-placeholder': placeholderColor.value }))

        // LOAD
        const root = ref<HTMLImageElement | null>(null)
        const loaded = ref(false)
        
        const onLoad = (event?: Event) => {
            loaded.value = true
            if (event) context.emit('load', event)
        }

        const onError = () => {
            context.emit('error')
        }

        onMounted(() => {
            if (!root.value) return

            if (root.value?.complete) onLoad()
        })

        // DATA 
        const $img = useImage()
        const width = computed(() => parseSize(props.width))
        const height = computed(() => parseSize(props.height))

        const modifiers = computed<ImageOptions['modifiers']>(() => ({
            ...props.modifiers,
            auto: 'format,compress',
            width: width.value,
            height: height.value,
            quality: getInt(props.quality || props.modifiers?.quality) || $img.options.quality,
            format: props.format || props.modifiers?.format,
        }))

        const options = computed<ImageOptions>(() => ({
            provider: props.provider,
            preset: props.preset,
            densities: props.densities,
            modifiers: modifiers.value,
        }))

        function getSrc() {
            if (!props.src) return ''

            // https://images.prismic.io/blandine-hertzog/Z6dXY5bqstJ9-ZAp_lustucru14.png?auto=format,compress
            const autoParams = (new URL(props.src)).searchParams.get('auto')
            return props.src.replace(`?auto=${autoParams}`, '') // remove auto params
        }

        const src = computed(() => {
            const src = getSrc()
            if (!src) return 

            return $img(src, modifiers.value, options.value)
        })

        const responsiveImageData = computed(() => {
            if((!props.sizes && !props.densities) || !props.src) return 

            return $img.getSizes(getSrc(), 
                {
                    ...options.value,
                    sizes: props.sizes,
                })
        })

        const internalSizes = computed(() => {
            const result = responsiveImageData.value && responsiveImageData.value.sizes
            
            // do not output sizes="100vw" as it is the default value
            return result === '100vw' ? undefined : result
        })

        // @see https://github.com/nuxt/image/blob/main/src/runtime/components/NuxtImg.vue
        if (props.preload) {
            const isResponsive = responsiveImageData.value && Object.values(responsiveImageData.value).every(v => v)

            useHead({
                link: [
                    {
                        rel: 'preload',
                        as: 'image',
                        nonce: props.nonce,
                        ...(!isResponsive
                            ? { href: src.value }
                            : {
                                href: responsiveImageData.value.src,
                                imagesizes: responsiveImageData.value.sizes,
                                imagesrcset: responsiveImageData.value.srcset,
                            }),
                        ...(typeof props.preload !== 'boolean' && props.preload.fetchPriority
                            ? { fetchpriority: props.preload.fetchPriority }
                            : {}),
                    },
                ],
            })
        }

        return () =>
            h('img', {
                src: src.value,
                srcset: responsiveImageData.value?.srcset,
                sizes: internalSizes.value,
                ref: root,
                width: width.value,
                height: height.value,
                alt: props.alt,
                loading: props.loading,
                crossorigin: props.crossorigin,
                decoding: props.decoding,
                longdesc: props.longdesc,
                style: style.value,
                class: [$style.root, loaded.value && $style['root--loaded']],
                onLoad,
                onError,
            })
    },
})
</script>

<style lang="scss" module>
.root {
    display: var(--v-img-display, block);
    max-width: var(--v-img-max-width, 100%); // responsive image
    height: var(--v-img-height, auto); // responsive image
    background: var(--v-img-background, var(--v-img-placeholder));

    &--loaded {
        // Remove background when image is loaded. This is useful for hiding antialiasing artifacts.
        --v-img-background: none;
    }
}
</style>
