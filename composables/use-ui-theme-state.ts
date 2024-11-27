type Theme = 'light' | 'dark'

export function useUiThemeState() {
    return useState<Theme>('use_ui_theme', () => 'light')
}
