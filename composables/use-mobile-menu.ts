
import breakpoints from '~/assets/scss/export/_breakpoints.module.scss'

export const MAIN_MENU_ID = 'main-menu'

export function useMobileMenu(target: Ref<HTMLElement | null>) {
  const isOpen = useMobileMenuState()
  
    // Close menu when pressing Escape
  const windowRef = ref<Window | null>(null)
  onMounted(() => windowRef.value = window)
  useEventListener(windowRef, 'keyup', (event: KeyboardEvent) => {
    if (event.key === 'Escape') close()
  })

  // Toggle scroll lock
  const isLocked = useScrollLock(windowRef)
  watch(isOpen, (value) => isLocked.value = value && !isLargeScreen.value)
  
  // const open = () => {
  //   if(isOpen.value) return

  //   isLocked.value = true
  //   isOpen.value = true
  // }

  const close = () => {
    if(!isOpen.value) return

    isLocked.value = false
    isOpen.value = false
  }

  const isLargeScreen = useMediaQuery(`(min-width: ${breakpoints['breakpoint-md']})`)

  watch(isLargeScreen, (isLarge) => {
    if (isLarge && isOpen.value) close()
  })

  // Close menu when navigating to a new page
  const page = useCurrentPage()
  watch(page, close)

  // Close menu when clicking outside
  onClickOutside(target, (e) => {
    const target = e.target as HTMLElement
    if(target?.getAttribute('aria-controls') === MAIN_MENU_ID) return
    if (isOpen.value) close()
  })

  return { isOpen }
}