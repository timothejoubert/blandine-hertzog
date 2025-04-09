<script  lang="ts" setup="">
import type { ProjectPageDocument } from '~/prismicio-types'
import { useLinkResolver } from '~/composables/use-link-resolver'
import { prismicDocumentName } from '~/constants/prismic-page'

defineProps<{
    prevProject?: ProjectPageDocument | null
    nextProject?: ProjectPageDocument | null
}>()

const { url: projectListingUrl } = useLinkResolver(prismicDocumentName.project_listing_page)
</script>

<template>
    <section
        v-if="prevProject || nextProject"
        class="grid"
        :class="$style.root"
    >
        <VHeadSection
            :class="$style.head"
            title="En voir davantage"
            :link-label="$t('see_all_projects')"
            :link-reference="projectListingUrl"
        />
        <VArrowButton
            v-if="prevProject"
            :to="prevProject"
            :label="$t('previous_project')"
            arrow-direction="left"
            :aria-label="prevProject.data.title"
            :class="$style.project"
        />
        <VArrowButton
            v-if="nextProject"
            :to="nextProject"
            :label="$t('next_project')"
            arrow-direction="right"
            icon-position="end"
            :aria-label="nextProject.data.title"
            :class="$style.project"
        />
    </section>
</template>

<style lang="scss" module>
@use 'assets/scss/functions/rem' as *;

.root {
    display: grid;
    height: min-content;
    align-items: center;
    grid-template-columns: 1fr 1fr;
    margin-block: rem(192);
}

.head {
    margin-bottom: rem(124);
    grid-column: 1 /-1;
}

.project {
    justify-self: center;
}
</style>
