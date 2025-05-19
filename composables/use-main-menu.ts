
import breakpoints from '~/assets/scss/export/_breakpoints.module.scss'

export const MAIN_MENU_ID = 'main-menu'

export function useMainMenu(target: Ref<HTMLElement | null>) {
  const isOpen = useMainMenuState()

  const close = () => {
    if (isLargeScreen.value) return 
    isOpen.value = false
  }

    // Close menu when pressing Escape
  const windowRef = ref<Window | null>(null)
  onMounted(() => windowRef.value = window)
  useEventListener(windowRef, 'keyup', (event: KeyboardEvent) => {
    if (event.key === 'Escape') close()
  })
  
  // Toggle scroll lock
  const isLocked = useScrollLock(windowRef)
  watch(isOpen, (value) => isLocked.value = value && !isLargeScreen.value)

  const isLargeScreen = useMediaQuery(`(min-width: ${breakpoints['breakpoint-md']})`, { ssrWidth: 1024 })
  watch(isLargeScreen, (isLarge) => {
      isOpen.value = isLarge
      isLocked.value = !isLarge && isOpen.value
  }, { immediate: true })

  
  // Close menu when navigating to a new page
  const page = useCurrentPage()
  watch(page, close)

  // Close menu when clicking outside
  onClickOutside(target, close)



  return { isOpen }
}