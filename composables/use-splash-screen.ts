export function useSplashScreen() {
    const state = useSplashScreenState()
    const isHidden = computed(() => state.value === 'disabled' || state.value === 'done')

    return { 
        isHidden 
    }
}
