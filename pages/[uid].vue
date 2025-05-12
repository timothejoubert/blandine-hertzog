<script lang="ts" setup>
import { components } from '~/slices'

const { document, documentData } = await useFetchPage('default_page')
</script>

<template>
    <div :id="document?.id">
        <VPageTitle
            v-if="documentData.title"
            :title="documentData.title"
            class="grid-width"
        />
        <VText
            v-if="documentData.content"
            :content="documentData.content"
            class="text-h5"
            :class="$style['content']"
        />
        <VPrismicImage
            v-if="documentData.image?.url"
            :document="documentData.image"
            :class="$style.media"
            class="grid-width"
            sizes="xs:95vw md:95vw lg:95vw xl:95vw xxl:95vw qhd:95vw"
        />
        <LazySliceZone
            v-if="documentData.slices?.length"
            :slices="documentData.slices"
            wrapper="main"
            :components="components"
        />
    </div>
</template>

<style lang="scss" module>
.content {
    margin-top: rem(42);
    max-width: 62ch;
    margin-inline: var(--gutter);

    & *:last-child {
        margin-bottom: 0;
    }
}

.media {
    margin-top: rem(48);
}
</style>