export function useActiveElementPosition() {
  const list = useTemplateRefsList<HTMLDivElement>()

  const activeIndex = ref(0)
  const offsetTop = ref(0)
  const offsetLeft = ref(0)
  const targetRect = ref<DOMRect | null>(null)

  function onMouseEnter(event: Event) {
      const target = event.currentTarget as HTMLDivElement
      const targetIndex = list.value.findIndex((item) => item === target)
      if (targetIndex === -1) return
  
      activeIndex.value = targetIndex
  }

  
  watch(activeIndex, (index) => {
      const target = list.value[index]
      if (!target) return
  
      const targetBounding = target?.getBoundingClientRect()
      const parentRect = target?.parentElement?.getBoundingClientRect()
  
      offsetTop.value = targetBounding.top - (parentRect?.top ?? 0)
      offsetLeft.value = targetBounding.left - (parentRect?.left ?? 0)
      targetRect.value = targetBounding
  })
  
  function initListener() {
    if(!list.value.length) return

    list.value.forEach((item) => {
        item.addEventListener('mouseenter', onMouseEnter)
    })

    const parent = list.value[0]?.parentElement
    if(parent) {
      useResizeObserver(parent, onResize)
    }    
  }

  function onResize() {
    targetRect.value = list.value[0]?.getBoundingClientRect()
   }

  onMounted(initListener)

  onBeforeUnmount(() => {
      if(!list.value.length) return
  
      list.value.forEach((item) => {
          item.removeEventListener('mouseenter', onMouseEnter)
      })
  })
  
  return {
    setRefList: list.value.set,
    activeIndex,
    offsetTop, 
    offsetLeft,
    targetRect
  }
}
