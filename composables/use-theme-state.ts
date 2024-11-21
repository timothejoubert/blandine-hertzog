type Theme = 'light' | 'dark'

export function useThemeState() {
    return useState<Theme>('useTheme', () => 'light')
}
