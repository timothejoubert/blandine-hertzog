<script  lang="ts" setup>
import type { VTextContent } from '~/components/atoms/VText.vue'
import type { PossibleMedia } from '~/composables/use-prismic-media'

defineProps<{
    title: string | null
    content?: VTextContent
    media?: PossibleMedia
}>()

// TODO: use VRevealText
</script>

<template>
    <header
        :class="$style.root"
        class="grid-width"
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
        <VPrismicMedia
            v-if="media?.url"
            :media="media"
            :class="$style.media"
            :image="{ sizes: 'xs:95vw md:95vw lg:95vw xl:95vw xxl:95vw qhd:95vw' }"
        />
    </header>
</template>

<style lang="scss" module>
.content {
    max-width: 62ch;
    margin-block: initial;
    padding-block: rem(42) 0;
}

.media {
    margin-top: rem(48);
}
</style>
