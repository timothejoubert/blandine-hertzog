import throttle from 'lodash/throttle'
import { getHtmlElement, type TemplateElementRef } from '~/utils/ref/get-html-element'

interface UseActiveElementPositionOptions {
  parentElement: TemplateElementRef
}

export function useActiveElementPosition(options?: UseActiveElementPositionOptions) {
    const list = useTemplateRefsList<HTMLDivElement>()

    const activeIndex = ref(0)
    const offsetTop = ref(0)
    const offsetLeft = ref(0)
    const targetRect = ref<DOMRect | null>(null)

    const parentElement = computed(() => {
        if (options?.parentElement) return getHtmlElement(options?.parentElement)
        return list.value[activeIndex.value]?.parentElement
    })

    function updateValues() {
        const target = list.value[activeIndex.value]
        if (!target) return

        const _targetRect = target.getBoundingClientRect()
        const parentRect = parentElement.value?.getBoundingClientRect()

        offsetTop.value = _targetRect.top - (parentRect?.top ?? 0)
        offsetLeft.value = _targetRect.left - (parentRect?.left ?? 0)
        targetRect.value = _targetRect
    }

    watch(activeIndex, updateValues)
  
    function onMouseEnter(event: Event) {
        const target = event.currentTarget as HTMLDivElement      
        const targetIndex = list.value.findIndex((item) => item === target)
        if (targetIndex === -1) return

        activeIndex.value = targetIndex
    }

    // INIT LISTENERS
    useEventListener(list, 'mouseenter', onMouseEnter)

    const parentResizeCallback = throttle(updateValues, 200)
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
