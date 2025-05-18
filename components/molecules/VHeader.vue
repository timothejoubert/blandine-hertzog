<script  lang="ts" setup>
import type { ImageField } from '@prismicio/types'
import type { VTextContent } from '~/components/atoms/VText.vue'

defineProps<{
    title: string | null
    content?: VTextContent
    media?: ImageField
}>()

// TODO: use VRevealText
</script>

<template>
    <header
        :class="$style.root"
        class="grid-container"
    >
        <VPageTitle
            v-if="title"
            :title="title"
            :class="$style.title"
        />
        <VText
            v-if="content"
            :content="content"
            class="text-h5"
            :class="$style.content"
            tag="p"
        />
        <VImg
            v-if="media?.url"
            :src="media.url"
            :width="media.dimensions.width"
            :height="media.dimensions.height"
            sizes="xs:95vw md:95vw lg:95vw xl:95vw xxl:95vw qhd:95vw"
            provider="imgix"
            :alt="media.alt ?? undefined"
            :class="$style.media"
        />
    </header>
</template>

<style lang="scss" module>
.root {
    overflow-x: clip; // Prevent horizontal scroll before Mango font face loaded
}

.content {
    max-width: 62ch;
    margin-block: initial;
    padding-block: rem(42) 0;
}

.media {
    margin-top: rem(48);
}
</style>
