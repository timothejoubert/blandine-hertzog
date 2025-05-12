<script  lang="ts" setup>
import { parseDate } from '~/utils/prismic/prismic-date'
import type { ArchivePageDocument, ProjectPageDocument } from '~/prismicio-types'
import { components } from '~/slices'

const { document, documentData } = await useFetchPage<ArchivePageDocument>('archive_page')

const projects = await usePrismicArchivedProjects()
watch(projects, (p) => {
    console.log('watch project', p)
})

const projectGroups = computed(() => {
    const groups = projects.value.reduce((yearGroup, project) => {
        const projectYear = parseDate(project?.data.creation_date)?.year

        if (!project || !projectYear) {
            return yearGroup
        }
        else if (!(projectYear in yearGroup)) {
            yearGroup[projectYear] = [project]
        }
        else if (projectYear in yearGroup) {
            // Fetched projects order is desc
            yearGroup[projectYear].push(project)
        }

        return yearGroup
    }, {} as Record<string, ProjectPageDocument[]>)

    return Object.entries(groups).sort(([aKey], [bKey]) => {
        return Number(bKey) - Number(aKey)
    }).map(([key, value]) => ({ year: key, projects: value }))
})
</script>

<template>
    <div>
        <VPageTitle
            v-if="documentData?.title"
            :title="documentData.title"
            :class="$style.title"
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
        <main
            :id="document?.id"
            :class="$style.main"
        >
            <ol
                class="grid"
                :class="$style.list"
            >
                <li
                    v-for="group in projectGroups"
                    :key="group.year"
                    :class="$style['year-group']"
                >
                    <div
                        :class="$style.year"
                        class="text-over-title-md"
                    >
                        {{ group.year }}
                    </div>
                    <ol
                        v-if="group.projects.length"
                        :class="$style.projects"
                    >
                        <li
                            v-for="(project, index) in group.projects"
                            :key="project?.uid || index"
                            :class="$style.item"
                        >
                            <VProjectRow
                                :project="project"
                                :class="$style.project"
                            />
                        </li>
                    </ol>
                </li>
            </ol>
            <LazySliceZone
                v-if="documentData.slices?.length"
                :slices="documentData.slices"
                :components="components"
            />
        </main>
    </div>
</template>

<style lang="scss" module>
.main {
    margin-top: rem(72);
}

.content {
    max-width: 62ch;
    margin-top: rem(42);
    margin-inline: var(--gutter);

    & *:last-child {
        margin-bottom: 0;
    }
}

.media {
    margin-top: rem(48);
}

.year-group {
    --v-project-row-height: #{rem(56)};
    --v-project-row-padding-block: #{rem(14)};

    position: relative;
    display: grid;
    align-items: baseline;
    grid-column: 1 / -1;
    grid-template-columns: subgrid;

    &::before {
        position: absolute;
        top: -1px;
        left: 0;
        width: 100%;;
        height: 1px;
        background-color: var(--theme-color-line);
        content: '';
    }
}

.year {
    display: flex;
    align-items: center;
    justify-content: center;
    grid-column: span 2;
    grid-row: 1;
}

.projects {
    grid-column: 3 / -1;
    grid-row: 1;
    margin-block: initial;
}

.item {
    list-style: none;
}

.project {
    border-top: 1px solid var(--theme-color-line);

    .item:first-child & {
        border-top: none;
    }

    .year-group:last-child .item:last-child & {
        border-bottom: 1px solid var(--theme-color-line);
    }
}
</style>
