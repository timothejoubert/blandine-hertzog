<script  lang="ts" setup>
import type { PageComponentProps } from '~/types/app'
import { parseDate } from '~/utils/prismic/prismic-date'
import type { ProjectPageDocument } from '~/prismicio-types'

const props = defineProps<PageComponentProps<'archive_page'>>()
const data = computed(() => props.document.data)

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
    }).map(([key, value]) => ({ year: key, projects: value }))
})
</script>

<template>
    <VHeader
        :title="data.title"
        :content="data.content"
    />
    <div
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
        <ul
            v-if="group.projects.length"
            :class="$style.projects"
        >
            <li
                v-for="(project, index) in group.projects"
                :key="project?.uid || index"
                :class="$style.item"
            >
                <VProjectRow :project="project" />
            </li>
        </ul>
    </div>
</template>

<style lang="scss" module>
@use 'assets/scss/functions/rem' as *;

.year-group {
    --v-project-row-height: #{rem(56)};
    --v-project-row-padding-block: #{rem(14)};

    grid-column: 1 / -1;
    position: relative;
    display: grid;
    grid-template-columns: subgrid;
    flex-direction: row-reverse;
    align-items: baseline;

    &:nth-last-child(1 of &) {
        min-height: 30vh;
    }

    &::before {
        content: '';
        position: absolute;
        width: 100%;
        left: 0;
        top: -1px;
        background-color: var(--theme-color-line);;
        height: 1px;
    }
}

.year {
    display: flex;
    align-items: center;
    justify-content: center;
    grid-row: 1;
    grid-column: span 2;
}

.projects {
    margin-block: initial;
    //flex-grow: 1;
    grid-column: 1 / 10;
    grid-row: 1;
}

.item {
    list-style: none;
}
</style>
