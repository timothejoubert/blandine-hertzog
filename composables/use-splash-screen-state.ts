import { toBoolean } from '~/utils/to-boolean'

type SplashScreenState = 'disabled' | 'pending' | 'enter' | 'leave' | 'done'

export function useSplashScreenState() {
    const config = useRuntimeConfig()
    const enabled = toBoolean(config.public.featureFlag.splashScreen)

    return useState<SplashScreenState>('splashScreenState', () => enabled ? 'pending' : 'disabled')
}
