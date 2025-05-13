import { throttle } from 'lodash'
import { getHtmlElement, type TemplateElementRef } from '~/utils/ref/get-html-element'

interface UseMouseFollowOptions {
  element: TemplateElementRef
  container: TemplateElementRef
}

// Remplace by useMouseInElement from vueUse if work at same 
// https://vueuse.org/core/useMouseInElement/

export function useMouseFollow(options: UseMouseFollowOptions) {
  const { x: windowX, y: windowY } = useWindowScroll()

  const container = computed(() => getHtmlElement(options.container))
  const containerRect = computed(() => {
      if(!container.value) return { x: 0, y: 0 }
      
      return container.value.getBoundingClientRect()
  })

  const rootOffset = computed(() => {
      if (!container.value) return { x: 0, y: 0 }

      return {
          x: container.value.offsetLeft - windowX.value - containerRect.value.x,
          y: container.value.offsetTop - windowY.value - containerRect.value.y,
      }
  })

  const element = computed(() => getHtmlElement(options.element))
  const elementRect = computed(() => {
      if(!element.value) return 
      
      const { left, top, width, height} = element.value.getBoundingClientRect()

      return { 
          left: left + width / 2,
          top: top + height / 2
      }
  })

  const init = ref(true)
  const x = ref(0)
  const y = ref(0)

  function onMouseMove(event: MouseEvent) {
      if (!elementRect.value) return 

      if (init.value) {
          x.value = event.clientX - elementRect.value.left - rootOffset.value.x
          y.value = event.clientY - elementRect.value.top - rootOffset.value.y
      } else {
          x.value = 0
          y.value = 0
      }
  }

  const mouseMoveCallback = throttle(onMouseMove, 50)

  function initMouseFollow() {
      if(!container.value) return 

      init.value = true 
      container.value.addEventListener("mousemove", mouseMoveCallback);
  }

  function killMouseFollow() {
      if(!container.value) return 

      init.value = false
      container.value.removeEventListener("mousemove", mouseMoveCallback);
  }

  onMounted(() => {
      if(!container.value) return 
      container.value.addEventListener("mouseenter", initMouseFollow);
      container.value.addEventListener("mouseleave", killMouseFollow);
    })

    onBeforeUnmount(() => {
      if(!container.value) return 
      container.value.removeEventListener("mouseenter", initMouseFollow);
      container.value.removeEventListener("mouseleave", killMouseFollow);
    })

    return { 
      x, 
      y, 
      init,
      element,
      container
    }
}
