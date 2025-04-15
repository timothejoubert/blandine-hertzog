<script lang="ts" setup>
import { components } from '~/slices'
import type { ProjectPageDocument } from '~/prismicio-types'
import VCrossProjects from '~/components/molecules/VCrossProjects.vue'

const { document, documentData } = await useFetchPage<ProjectPageDocument>('project_page')
const { tags, date } = useProjectUtils(document.value)

const slices = computed(() => documentData.value?.slices || [])
const content = computed(() => documentData.value?.short_content || documentData.value?.content)
</script>

<template>
    <div
        :id="document?.id"
        :class="$style.root"
    >
        <header
            class="grid-width"
            :class="$style.header"
        >
            <VPageTitle
                v-if="documentData?.title"
                :title="documentData.title"
                :class="$style.title"
            />
            <VText
                v-if="content"
                :content="content"
                class="text-h5"
                :class="$style['intro-text']"
            />
            <VTime
                :date="date"
                :class="$style.date"
            />
            <template v-if="tags.length">
                <VTag
                    v-for="tag in tags"
                    :key="tag"
                    :class="$style.tag"
                    :label="tag"
                />
            </template>
        </header>

        <LazySliceZone
            v-if="slices?.length"
            :slices="slices"
            :components="components"
            wrapper="main"
        />
        <VCrossProjects :active-project-document="document" />
    </div>
</template>

<style lang="scss" module>
@use 'assets/scss/functions/flex-grid' as *;

.root {
    --v-slice-margin-top: var(--gutter);
    --v-slice-margin-bottom: var(--gutter);
}

.header {
    margin-bottom: rem(72);
}

.intro-text {
    width: flex-grid(8, 12);
    max-width: 58ch;
    margin-block: 0 rem(24);

    @include media('>=lg') {
        width: flex-grid(8, 12);
    }
}

.date {
    margin-right: rem(18);
}

.tag {
    margin-right: rem(18);

    &:last-child {
        margin-right: 0;
    }
}
</style>
