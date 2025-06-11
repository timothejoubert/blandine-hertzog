type SplashScreenState = 'disabled' | 'pending' | 'enter' | 'leave' | 'done'

export function useSplashScreenState() {
    const appConfig = useAppConfig()
    const enabled = appConfig.featureFlags.splashScreen

    return useState<SplashScreenState>('splashScreenState', () => enabled ? 'pending' : 'disabled')
}
