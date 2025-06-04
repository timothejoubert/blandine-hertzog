<script setup lang="ts">
import type { Content } from '@prismicio/client'
import { isFilled } from '@prismicio/client'
import type { ProjectPageDocument } from '~/prismicio-types'


// UTILS
const mapNumRange = (num:number, inMin:number, inMax:number, outMin:number, outMax:number) => {
    const value = ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
    return Math.min(Math.max(value, 0), 1)
}

// SETUP
const props = defineProps(
    getSliceComponentProps<Content.ProjectFeedSliceSlice>(),
)

// HYDRATION
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
    rowGapSM: '40px',
    rowGapMD: '120px',
    stickyTopSM: '60px',
    stickyTopMD: '100px',
})
const isLargeScreen = useMediaQuery('(min-width: 1024px)')
const stickyValue = computed(() => {
    return parseInt(cssValues.value[isLargeScreen.value ? 'stickyTopMD' : 'stickyTopSM'])
})

// SCROLL EFFECT 
const projectRefs = useTemplateRef<HTMLDivElement[]>('templateProjects')
const projectEls = computed<[] | HTMLElement[]>(() => {
    if(!projectRefs.value?.length) return []

    return projectRefs.value
        .filter(comp => unrefElement(comp))
        .map(comp => unrefElement(comp) as HTMLElement)
})

const getDistanceToTop = (el: HTMLElement) => window.scrollY + el.getBoundingClientRect().top
// const getDistanceToTop = (element: HTMLElement) => {
//   const scrollOnWindow = window.pageYOffset !== undefined
//       ? window.pageYOffset
//       : (document.documentElement || document.body.parentNode || document.body).scrollTop

//   const rect = element.getBoundingClientRect();
//   let distanceFromTopOfPage = rect.top;

//   if (scrollOnWindow !== 0) {
//     distanceFromTopOfPage = rect.top + scrollOnWindow;
//   }

//   return distanceFromTopOfPage;
// };


const parentData = ref<{topDist: number, rectTop: number,hasReachSticky: boolean}>()
const listEL = useTemplateRef('listRef')
function setParentData() {
    const el = unrefElement(listEL)
    if(!el) return

    const rectTop = el.getBoundingClientRect().top

    parentData.value = {
        topDist: getDistanceToTop(el),
        rectTop: rectTop,
        hasReachSticky: rectTop < stickyValue.value,
    }
}

useResizeObserver(listEL, setParentData)
watch(parentData, () => {
    // console.log('watch parentData', parentData.value)
    setProjectDate()
})

onMounted(async () => {
    await nextTick()
    setProjectDate()
})

const projectElData = ref<{el: HTMLElement, start: number, end: number}[]>()

function setProjectDate() {
    if (!parentData.value) return 
    const { topDist, hasReachSticky, rectTop} = parentData.value

    projectElData.value = projectEls.value.map((el) => {
        const top = topDist + el.offsetTop
        const start = top - stickyValue.value + (hasReachSticky ? rectTop : 0)

        return { 
            el, 
            offsetTop: el.offsetTop,
            threshold: rectTop + el.offsetTop,
            defaultStart: top - stickyValue.value,
            start, 
            end: start + el.offsetHeight,
        }
    })
}

// watch(projectElData, (v) => {
//     console.log('watch projectElData', v)
// })

const projectScrollDist = ref([0,0,0])
const { y } = useWindowScroll()
watch(y, () => {
    if(!projectElData.value?.length) return 

    const topDist = y.value
    // console.log(topDist)

    projectElData.value.forEach((data, index) => {
        const value = mapNumRange(topDist, data.start, data.end, 0, 1)  
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
            <!-- :style="index !== projects.length -1 && { '--card-scroll-percent': projectScrollDist[index] }" -->
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
    row-gap: v-bind('cssValues.rowGapSM');
    
    @include media('>=lg') {
        row-gap: v-bind('cssValues.rowGapMD');
    }
}

.project {
    position: sticky;
    top: v-bind('cssValues.stickyTopSM');
    filter: blur(calc(var(--card-scroll-percent) * 10px));
    grid-column: 1 / -1;
    opacity: calc(1 - var(--card-scroll-percent));
    scale: clamp(1 - (var(--card-scroll-percent) * 0.1), 0.88, 1);

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
