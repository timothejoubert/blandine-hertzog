<script  lang="ts" setup>
import { parseDate } from '~/utils/prismic/prismic-date'
import type { ArchivePageDocument, ProjectPageDocument } from '~/prismicio-types'
import { components } from '~/slices'

const { document, documentData } = await useFetchPage<ArchivePageDocument>('archive_page')

const projects = await usePrismicArchivedProjects()

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

        return {
            year: group[0], 
            projectList: group[1],
            previousProjectLength: iterateIndex
        }
    })
})

const mouseOnBottom = ref(false)
const onmouseenter = () => mouseOnBottom.value = false
const onmouseleave = (event: MouseEvent) => {
    const target = event.target as HTMLElement
    const { top, height } =target.getBoundingClientRect()
    mouseOnBottom.value = event.clientY >= top + height / 2
}
</script>

<template>
    <div
        :style="{
            '--v-archive-item-bg-translate-y-init': mouseOnBottom ? '100%' : '-100%',
        }"
    >
        <VHeader
            :title="documentData.title"
            :content="documentData.content"
            :media="documentData.image"
            :class="$style.header"
        /> 
        <main
            :id="document?.id"
            :class="$style.main"
        >
            <ol
                ref="mainList"
                class="grid"
                :class="$style['main-list']"
                @mouseenter="onmouseenter"
                @mouseleave="onmouseleave"
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
.header {
    padding-bottom: rem(72);
}

.main-list {
    position: relative;
    padding-top: 24px;
    margin-bottom: rem(120);
    margin-block: initial;;
}

.year-group {
    --v-project-row-height: #{rem(56)};
    --v-project-row-padding-block: #{rem(8)};

    position: relative;
    display: grid;
    align-items: baseline;
    margin-top: rem(28);
    grid-column: 1 / -1;
    grid-template-columns: subgrid;

    @include media('>=md') {
        --v-project-row-padding-block: #{rem(14)};

        margin-top: initial;

        &::before {
            position: absolute;
            top: -1px;
            left: 0;
            width: 100%;;
            height: 1px;
            background-color: var(--theme-color-line);
            content: '';
            pointer-events: none;
        }
    }
}

.year {
    display: flex;
    width: calc(100% + var(--gutter) * 2);
    align-items: center;
    margin-left: calc(var(--gutter) * -1);
    background-color: color-mix(in srgb, var(--theme-color-on-background), transparent 95%);
    grid-column: 1 / -1;
    padding-block: var(--v-project-row-padding-block);
    padding-inline: var(--gutter);

    @include media('>=md') {
        background-color: initial;
        grid-column: span 1;
        grid-row: 1;
    }
}

.projects {
    grid-column: 1 / -1;
    margin-block: initial;

    @include media('>=md') {
        grid-column: 2 / -1;
        grid-row: 1;
    }
}

.item {
    position: relative;
    overflow: hidden;
    list-style: none;

    @include media('>=md') {
        &::before {
            position: absolute;
            top: var(--archive-item-top, 0);
            width: 100%;
            height: var(--archive-item-height, rem(56));
            background-color: color-mix(in srgb, var(--theme-color-primary), transparent 90%);
            content: '';
            pointer-events: none;
            transition: translate 0.3s ease(out-quart);
            translate: 0 100%;
        }
        
        .main-list:not(:has(&:hover)) &::before {
            translate: 0 var(--v-archive-item-bg-translate-y-init, -100%);
        }

        @media(hover: hover) {
            /// select all items after element that is hovered or selected 
            // Actual item has previous sibling hovered or selected
            &:where(:hover, [data-active="true"]) ~ &::before {
                translate: 0 -100%;
            }

            // Previous year-group has hovered or selected item
            .year-group:has(&:where(:hover, [data-active="true"])) ~ .year-group &::before {
                translate: 0 -100%;
            }

            // Active item
            &:where(:hover, [data-active="true"])::before {
                translate: 0 0;
            }
        }
    }
}

.project {
    border-top: 1px solid var(--theme-color-line);

    .item:first-child & {
        border-top: none;
    }

    .year-group:last-child .item:last-child & {
        border-bottom: 1px solid var(--theme-color-line);
    }

    @include media('>=md') {
        padding-inline: var(--gutter);
    }
}
</style>
