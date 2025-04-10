<script lang="ts" setup>
import type { KeyTextField, RichTextField } from '@prismicio/types'
import { isFilled } from '@prismicio/client'

export type VTextContent = string | RichTextField | KeyTextField | null

interface VTextProps {
    tag?: string
    textClass?: string
    content?: VTextContent
}

const props = defineProps<VTextProps>()

const richTextFilled = computed(() => {
    if (props.content && typeof props.content !== 'string' && isFilled.richText(props.content)) return props.content

    return undefined
})

const contentString = computed(() => {
    if (typeof props.content === 'string') return props.content
    if (richTextFilled.value && richTextFilled.value.length === 1) return richTextFilled.value[0].text

    return undefined
})
</script>

<template>
    <component
        :is="tag || 'div'"
        v-if="contentString"
    >
        {{ contentString }}
    </component>
    <PrismicRichText
        v-else-if="!!richTextFilled?.[0]"

        :field="richTextFilled"
        wrapper="div"
    />
</template>
