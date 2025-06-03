<script setup lang="ts">
import type { Content } from '@prismicio/client'
import { isFilled } from '@prismicio/client'
import type { ProjectPageDocument } from '~/prismicio-types'

const props = defineProps(
    getSliceComponentProps<Content.ProjectFeedSliceSlice>(),
)
const primary = computed(() => props.slice.primary)

const allProjects = await usePrismicMainProjects()

const manualProjectRelations = computed(() => {
    if (!isFilled.group(primary.value.custom_projects)) return []

    return primary.value.custom_projects?.filter((group) => {
        return isFilled.contentRelationship(group.project)
    }).map(group => group.project)
})

const projects = computed(() => {
    if (!manualProjectRelations.value.length) {
        const t = allProjects.value.slice(0, primary.value.automatic_projects_length || 3)
        return t.filter(p => p) as ProjectPageDocument[]
    }

    // Keep same order as contentRelationField
    return manualProjectRelations.value.reduce((acc: ProjectPageDocument[], project) => {
        const sameFilledProject = allProjects.value.find(p => p?.id === project?.id)
        if (sameFilledProject) acc.push(sameFilledProject)
        return acc
    }, [])
})

// CSS VALUE 
const cssValues = ref({
    rowGap: '70px',
    stickyTopSM: '60px',
    stickyTopMD: '100px',
})

// SCROLL EFFECT 
const { y } = useWindowScroll()

const projectRefs = useTemplateRef<HTMLDivElement[]>('templateProjects')
const projectEls = computed(() => {
    if(!projectRefs.value?.length) return []

    return projectRefs.value
        .filter(comp => unrefElement(comp))
        .map(comp => unrefElement(comp) as HTMLElement)
})

// const listEl = useTemplateRef<HTMLDivElement>('listRef')
// TODO: make data consistant when user start with scrollY setup by default
const projectElData = computed(() => {
    return projectEls.value.map((el, index, list) => {
        const start = el.offsetTop
        const nextEl = list[index + 1]        

        return { 
            el, 
            start, 
            end: nextEl ? nextEl.offsetTop : start + el.offsetHeight 
        }
    })
})

// watch(projectElData, () => {
//     console.log('list', listEl.value, listEl.value?.getBoundingClientRect().top)
//     console.log('projectElData', projectElData.value)
// }, {deep: true})

const mapNumRange = (num:number, inMin:number, inMax:number, outMin:number, outMax:number) => {
    const value = ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
    return Math.min(Math.max(value, 0), 1)
}

const projectScrollDist = ref([0,0,0])

watch(y, () => {
    projectElData.value.forEach((data, index) => {
        const value = mapNumRange(data.el.offsetTop, data.start, data.end, 0, 1.2)  
        // if(index === 1) console.log('data', data.el.offsetTop, data.start, data.end, value)
        projectScrollDist.value[index] = value
    })
})
</script>

<template>
    <VSlice
        ref="root"
        :slice="slice"
        :spacing="primary.spacing || 'none'"
    >
        <VSectionTitle
            v-if="primary.title"
            :label="primary.title"
            :class="$style.title"
            class="grid-container"
        />
        <ul
            v-if="projects?.length"
            ref="listRef"
            :class="$style.list"
            class="grid"
        >
            <VProjectCard
                v-for="(project, index) in projects"
                :key="project?.id"
                ref="templateProjects"
                root-tag="li"
                :project="project"
                :class="$style.project"
                size="fullwidth"
                :style="{ '--card-scroll-percent': projectScrollDist[index] }"
            />
        </ul>
        <VCta
            v-if="primary.link?.url"
            :to="primary.link.url"
            :label="primary.link.text || primary.link.url"
            :class="$style.cta"
            icon-name="auto"
        />
    </VSlice>
</template>

<style lang="scss" module>
.title {
    margin-bottom: rem(120);
}

.list {
    position: relative;
    margin-block: initial;
    row-gap: v-bind('cssValues.rowGap');
}

.project {
    position: sticky;
    top: v-bind('cssValues.stickyTopSM');
    filter: blur(calc(var(--card-scroll-percent) * 15px));
    grid-column: 1 / -1;
    opacity: calc(1 - var(--card-scroll-percent));
    scale: clamp(1 - (var(--card-scroll-percent) * 0.1), 0.85, 1);

    @include media('>=lg') {
        top: v-bind('cssValues.stickyTopMD');
        grid-column: 3 / -3;
    }
}

.cta {
    width: fit-content;
    margin-top: rem(72);
    margin-inline: auto;
}
</style>
