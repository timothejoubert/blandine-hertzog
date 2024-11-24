<script  lang="ts" setup>
import type { PossibleProjectPageDocument } from '~/types/app'

interface VProjectCardProps {
    project: PossibleProjectPageDocument | null
}

const props = defineProps<VProjectCardProps>()

const { image, title, date, tags } = useProjectUtils(props.project)
</script>

<template>
    <div :class="$style.root">
        <VPrismicLink
            :to="props.project"
            :class="$style['media-wrapper']"
        >
            <VPrismicImage
                v-if="image"
                :document="image"
                fit="crop"
                ar="460:248"
                width="460"
                height="248"
                :class="$style.image"
                sizes="xs:92vw sm:92vw md:32vw lg:32vw xl:32vw xxl:32vw hq:32vw qhd:32vw"
            />
            <div
                v-else
                :class="[$style.image, $style['image--placeholder']]"
            />
        </VPrismicLink>
        <VPrismicLink
            :to="props.project"
            :class="$style.title"
            :label="title"
            class="text-over-title-md"
        />
        <div :class="$style.footer">
            <VTime
                v-if="date"
                :date="date"
            />
            <template v-if="tags.length">
                <VTag
                    v-for="tag in tags"
                    :key="tag"
                    :class="$style.tag"
                    :label="tag"
                />
            </template>
        </div>
    </div>
</template>

<style lang="scss" module>
.root {
    position: relative;
    display: block;
}

.image {
    width: 100%;
}

.title {
    display: block;
    color: inherit;
    font-weight: 800;
    margin-block: rem(14);
    text-decoration: none;
}

.footer {
    display: flex;
    align-items: center;
    gap: rem(12);
}
</style>
