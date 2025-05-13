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
    })
})

const projectsByYears = computed(() => {
    let iterateIndex = 0

    return projectGroups.value.map((group, index) => { 
        const previousGroupProjectLength = projectGroups.value[index - 1]?.[1].length ?? 0
        iterateIndex += previousGroupProjectLength

        console.log('previousGroupProject', index, previousGroupProjectLength)

        return {
            year: group[0], 
            projectList: group[1],
            previousProjectLength: iterateIndex
        }
    })
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
                ref="mainList"
                class="grid"
                :class="$style['main-list']"
            >
                <li
                    v-for="group in projectsByYears"
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
                        v-if="group.projectList?.length"
                        :class="$style.projects"
                    >
                        <li
                            v-for="(project, projectIndex) in group.projectList"
                            :key="project?.uid || projectIndex"
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
.content {
    max-width: 62ch;
    padding-bottom: rem(72);
    margin-top: rem(42);
    margin-inline: var(--gutter);

    & *:last-child {
        margin-bottom: 0;
    }
}

.media {
    margin-top: rem(48);
}

.main-list {
    position: relative;
    margin-bottom: rem(120);
    margin-block: initial;
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
    grid-column: span 1;
    grid-row: 1;
}

.projects {
    grid-column: 2 / -1;
    grid-row: 1;
    margin-block: initial;
}

.item {
    position: relative;
    overflow: hidden;
    list-style: none;

    &::before {
        position: absolute;
        top: var(--archive-item-top, 0);
        width: 100%;
        height: var(--archive-item-height, rem(56));
        background-color: color-mix(in srgb, var(--theme-color-primary), transparent 90%);
        content: '';
        transition: translate 0.3s ease(out-quad);
        translate: 0 100%;
    }

    // select all items after element that is hovered or selected 
    &:where(:hover, [data-active="true"]) ~ &::before,
    .year-group:has(&:where(:hover, [data-active="true"])) ~ .year-group &::before {
        translate: 0 -100%;
    }

    &:where(:hover, [data-active="true"])::before {
        translate: 0 0;
    }

    *:hover ~ .main &::before {
        translate: 0 -100%;
    }
}

.project {
    border-top: 1px solid var(--theme-color-line);
    padding-inline: var(--gutter);

    .item:first-child & {
        border-top: none;
    }

    .year-group:last-child .item:last-child & {
        border-bottom: 1px solid var(--theme-color-line);
    }
}
</style>
