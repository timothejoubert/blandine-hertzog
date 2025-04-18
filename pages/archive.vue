<script  lang="ts" setup>
import { parseDate } from '~/utils/prismic/prismic-date'
import type { ArchivePageDocument, ProjectPageDocument } from '~/prismicio-types'

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
        <main
            :id="document?.id"
            class="grid"
            :class="$style.root"
        >
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
        </main>
    </div>
</template>

<style lang="scss" module>
.root {
    margin-top: rem(120);
}

.year-group {
    --v-project-row-height: #{rem(56)};
    --v-project-row-padding-block: #{rem(14)};

    position: relative;
    display: grid;
    flex-direction: row-reverse;
    align-items: baseline;
    grid-column: 1 / -1;
    grid-template-columns: subgrid;

    &:nth-last-child(1 of &) {
        min-height: 30vh;
    }

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
    // flex-grow: 1;
    grid-column: 1 / 13;
    grid-row: 1;
    margin-block: initial;
}

.item {
    list-style: none;
}
</style>
