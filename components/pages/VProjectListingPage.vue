<script lang="ts" setup>
import type { PageComponentProps } from '~/types/app'
import type { VInputGroupProps } from '~/components/molecules/VInputGroup.vue'

const props = defineProps<PageComponentProps<'project_listing_page'>>()
const data = computed(() => props.document.data)
// Common
const { t } = useI18n()

// FILTERS: tag
const TAG_QUERY_kKEY = 'tags'
const FALLBACK_TAG = 'all'
const { queryValues: selectedTags, hasQuery: hasTags } = useRouteQuery(TAG_QUERY_kKEY)

const tagFilter = computed(() => {
    const tags = projects.value.reduce((acc: string[], curr) => {
        curr?.tags.forEach((tag) => {
            if (!acc.includes(tag)) acc.push(tag)
        })
        return acc
    }, [])

    return {
        name: 'tag',
        type: 'radio',
        queryKey: 'tags',
        default: FALLBACK_TAG,
        inputs: [
            {
                label: t('all_projects'),
                value: FALLBACK_TAG,
            },
            ...tags.map((tag) => {
                return {
                    value: tag,
                    label: tag,
                }
            }),
        ],
    } as const
})

// FILTERS: layout
const LAYOUT_QUERY_KEY = 'layout'
const { queryValues: selectedLayouts } = useRouteQuery(LAYOUT_QUERY_KEY)

const layoutFilter: VInputGroupProps = {
    name: 'layout',
    type: 'radio',
    queryKey: LAYOUT_QUERY_KEY,
    default: 'grid',
    inputs: [{ value: 'grid', label: t('grid') }, { value: 'list', label: t('list') }],
}

// Project
const projects = await usePrismicMainProjects()
const isPending = computed(() => !!projects.value.length && projects.value.every(p => !p))

const renderedProjects = computed(() => {
    if (!hasTags.value || selectedTags.value[0] === FALLBACK_TAG) return projects.value

    if (!projects.value.filter(t => !!t).length) return projects.value

    return projects.value.filter((project) => {
        return project?.tags.some(tag => selectedTags.value.includes(tag))
    })
})

const mainId = computed(() => props.document.id)

const $style = useCssModule()
const rootClasses = computed(() => {
    return [
        $style.root,
        selectedLayouts.value[0] === 'list' && $style['root--project-list'],
    ]
})
</script>

<template>
    <main
        :id="mainId"
        :class="rootClasses"
    >
        <VText
            v-if="data.content"
            :content="data.content"
            :class="$style.content"
            class="text-h5"
        />
        <section class="grid">
            <VHeadSection
                :class="$style.head"
                title="mes projets"
            />
            <ul
                v-if="renderedProjects.length"
                :class="$style.list"
            >
                <VProjectCard
                    v-for="(project, index) in renderedProjects"
                    :key="project?.id || index"
                    :class="$style.item"
                    root-tag="li"
                    :project="project"
                    :skeleton="isPending || !project"
                />
            </ul>
            <div
                v-else
            >
                {{ $t('no_result') }}
            </div>
            <aside :class="$style.filters">
                <div
                    :class="$style['filters__title']"
                    class="text-over-title-sm"
                >
                    {{ $t('filter_by') }}
                </div>
                <div :class="$style.filters__type">
                    <VInputGroup
                        v-bind="tagFilter"
                        custom-input
                        :class="$style['tag-input']"
                    />
                </div>
                <div
                    v-if="false"
                    :class="$style.filters__layout"
                >
                    <VInputGroup
                        v-bind="layoutFilter"
                        :class="$style['layout-input']"
                    />
                </div>
            </aside>
        </section>
    </main>
</template>

<style lang="scss" module>
@use 'assets/scss/functions/rem' as *;
@use 'assets/scss/functions/flex-grid' as *;
@use 'assets/scss/functions/fluid' as *;
@use "assets/scss/mixins/include-media" as *;

.root {
    position: relative;
}

.content {
    margin-top: fluid((xs: 40, xl: 130));
    margin-bottom: fluid((xs: 40, xl: 80));
    margin-inline: var(--gutter);

    @include media('>=lg') {
        width: flex-grid(10, 14);
    }
}

.head {
    grid-column: 1 / -1;

    @include media('>=lg') {
        grid-column: 1 / -4;
    }
}

.filters {
    position: sticky;
    top: 0;
    width: 100%;
    align-self: flex-start;
    border-right: 1px solid var(--theme-color-line);
    border-left: 1px solid var(--theme-color-line);
    background-color: var(--theme-color-background);
    grid-column: 1 / -1;
    grid-row: 2;

    &::before,
    &::after {
        position: absolute;
        left: 0;
        width: 100%;
        height: 1px;
        background-color: var(--theme-color-line);
        content: '';
    }

    &::before {
        top: 0;
        display: none;
    }

    &::after {
        bottom: 0;
    }

    @include media('>=lg') {
        width: calc(100% + var(--gutter));
        border-right: none;
        grid-column: 12 / -1;
        grid-row: 1 / 3;

        &::before {
            display: initial;
        }
    }
}

.filters__title {
    position: relative;
    padding-block: var(--spacing-over-title-padding-block);
    padding-inline: calc(var(--gutter) * 0.5);
}

.filters__type {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    gap: rem(6) rem(18);
    padding-block: rem(32);
    padding-inline: calc(var(--gutter) * 0.5);

    &::before {
        position: absolute;
        top: -1px;
        left: 0;
        width: 100%;
        height: 1px;
        background-color: var(--theme-color-line);
        content: '';
    }

    &:last-child {
        border-bottom: 1px solid var(--theme-color-line);
    }

    @include media('>=lg') {
        flex-direction: column;
    }

}

.filters__layout {
    display: flex;
    border: 1px solid var(--theme-color-line);
    border-right: none;
}

.layout-input {
    display: flex;
    width: 50%;
    height: rem(44);
    align-items: center;
    justify-content: center;

    &:not(:first-child) {
        border-left: 1px solid var(--theme-color-line);
    }

    &:has(input:checked) {
        background-color: var(--theme-color-on-background);
        color: var(--theme-color-background);
    }

    input {
        position: absolute;
        opacity: 0;
    }
}

.title {
    margin-block: initial;
}

.list {
    display: grid;
    gap: rem(16) var(--gutter);
    grid-column: 1 / -1;
    margin-block: 0;
    padding-block: rem(16);

    @include media('>=lg') {
        grid-column: 1 / 12;
        grid-template-columns: repeat(11, minmax(0, 1fr));
    }
}

.item {
    grid-column: 1 / -1;
    list-style: none;

    @include media('>=lg') {
        width: calc(100% + var(--gutter) + #{flex-grid-value(1, 5)} * 0.33);
        grid-column: span 5;

        &:nth-child(even) {
            margin-left: calc(#{flex-grid-value(1, 5)} * 0.66);
        }
    }
}
</style>
