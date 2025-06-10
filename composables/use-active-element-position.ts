import throttle from 'lodash/throttle'
import { getHtmlElement, type TemplateElementRef } from '~/utils/ref/get-html-element'

interface UseActiveElementPositionOptions {
  parentElement?: TemplateElementRef
  defaultIndex?: number
  resetOnLeave?: boolean
}

export function useActiveElementPosition(options?: UseActiveElementPositionOptions) {
    const list = useTemplateRefsList<HTMLDivElement>()

    const activeIndex = ref<null | number>(options?.defaultIndex ?? null)
    const offsetTop = ref(0)
    const offsetLeft = ref(0)
    const targetRect = ref<DOMRect | null>(null)

    const parentElement = computed(() => {
        if (options?.parentElement) return getHtmlElement(options?.parentElement)
        return list.value[activeIndex.value || 0]?.parentElement
    })

    const activeElement = computed(() => {
        if (typeof activeIndex.value !== 'number') return 
        return list.value[activeIndex.value]
    })

    function resetIndex() {
        activeIndex.value = null
    }

    // Reset activeIndex on mouse leave parent element
    const { stop } = watch(parentElement, (el) => {
        if (!el) return 
        if (options?.resetOnLeave) useEventListener(el, 'mouseleave', resetIndex)
        stop()
    })

    function updateCurrentTargetValues() {
        if (!activeElement.value) return 

        const _targetRect = activeElement.value.getBoundingClientRect()
        const parentRect = parentElement.value?.getBoundingClientRect()

        offsetTop.value = _targetRect.top - (parentRect?.top ?? 0)
        offsetLeft.value = _targetRect.left - (parentRect?.left ?? 0)
        targetRect.value = _targetRect
    }

    async function update() {
        if (!activeElement.value) return 

        await nextTick()
        const animations = activeElement.value.getAnimations()
        if (animations.length) {
            activeElement.value.addEventListener('transitionend', updateCurrentTargetValues, { once: true })
        } else {
            updateCurrentTargetValues()
        }
    }

    watch(activeIndex, update)
  
    const isTouchDevice = useMediaQuery('(hover: none)')

    function onMouseEnter(event: Event) {
        const touchDevice = isTouchDevice.value || (event as { sourceCapabilities?: { firesTouchEvents?: boolean }})?.sourceCapabilities?.firesTouchEvents
        if (touchDevice) return 

        const target = event.currentTarget as HTMLDivElement      
        const targetIndex = list.value.findIndex((item) => item === target)
        if (targetIndex === -1) return

        activeIndex.value = targetIndex
    }

    // INIT LISTENERS
    useEventListener(list, 'mouseenter', onMouseEnter)

    const parentResizeCallback = throttle(update, 200)
    useResizeObserver(parentElement, parentResizeCallback)

    return {
        listElements: list,
        setRefList: list.value.set,
        activeIndex,
        offsetTop, 
        offsetLeft,
        targetRect
    }
}
 