<script lang="ts" setup>
import { components } from '~/slices'
import type { ProjectPageDocument } from '~/prismicio-types'
import VCrossProjects from '~/components/molecules/VCrossProjects.vue'

const { document, documentData } = await useFetchPage<ProjectPageDocument>('project_page')
const { tags, date, image, content } = useProjectUtils(document)

const slices = computed(() => documentData?.slices || [])
</script>

<template>
    <div
        :id="document?.id"
        :class="$style.root"
    >
        <header
            class="grid-container"
            :class="$style.header"
        >
            <h1
                :class="$style.title"
                class="text-h2"
            >
                {{ documentData?.title }}
            </h1>
            <div
                v-if="tags?.length"
                :class="$style.tags"
            >
                <VTag
                    v-for="tag in tags"
                    :key="tag"
                    :class="$style.tag"
                    :label="tag"
                />
            </div>
            <VTime
                :date="date"
                class="text-h5"
                :class="$style.date"
            />
            <VPrismicImage 
                v-if="image"
                :image-field="image"
                :class="$style.media"
            >
                <VPictureSource
                    media="(max-width: 1023px)"
                    sizes="xs:95vw sm:95vw md:95vw"
                    width="450"
                    height="275"
                    :modifiers="{ fit: 'crop', ar: '450:275' }"
                />
                <VPictureSource 
                    sizes="lg:95vw xl:95vw xxl:95vw qhd:95vw"
                    width="1368"
                    height="520"
                    :modifiers="{ fit: 'crop', ar: '1368:520' }"
                />
            </VPrismicImage>
        </header>
        <VText
            v-if="content"
            :content="content"
            class="text-h5 grid-container"
            :class="$style['intro-text']"
        />
        <LazySliceZone
            v-if="slices?.length"
            :slices="slices"
            :components="components"
            wrapper="main"
        />
        <VCrossProjects :current-project-document="document" />
    </div>
</template>

<style lang="scss" module>
@use 'assets/scss/functions/flex-grid' as *;

.root {
    --v-slice-margin-top: var(--gutter);
    --v-slice-margin-bottom: var(--gutter);
}

.header {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;;
    gap: rem(24) var(--gutter);
    margin-block: rem(72) rem(24);
}

.root .title {
    margin-top: 2%;
    line-height: 0.56;
    margin-block: 0;
    text-transform: uppercase;
}

.tags {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
}

.tag {
    margin-right: rem(18);

    &:last-child {
        margin-right: 0;
    }
}

.root .date {
    margin-top: 2%;
    margin-left: auto;
    line-height: 0.56;
}

.media {
    width: 100%;
    grid-column: 1 / -1;

    img {
        width: 100%;
    };
}

.intro-text {
    width: flex-grid(8, 12);
    max-width: 58ch;
    margin-block: 0 rem(24);

    @include media('>=lg') {
        width: flex-grid(8, 12);
    }
}
</style>
