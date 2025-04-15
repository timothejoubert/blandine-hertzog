// import stylistic from '@stylistic/eslint-plugin'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
    {
        ignores: [
            'dist', // autogenerated by Nuxt
            '.output', // autogenerated by Nuxt
            '.nuxt', // autogenerated by Nuxt
            'types/roadiz.d.ts', // filled with autogenerated types from Roadiz
            'node_modules',
        ],
    },
).append({
    files: ['**/*.stories.vue'],
    rules: {
        'vue/multi-word-component-names': 'off',
    },
}).override('nuxt/stylistic', {
    rules: {
        '@stylistic/indent': ['error', 4],
        '@stylistic/function-paren-newline': ['error', 'consistent'],
        'no-tabs': 0,
        // '@stylistic/allowIndentationTabs': ['off'],
        // '@stylistic/indent': ['error', 4],
        // '@stylistic/quotes': ['error', 'single', { allowTemplateLiterals: true }],
        // '@stylistic/semi': ['error', 'never'],
    },
}).override('nuxt/vue/rules', {
    rules: {
        'vue/max-len': ['warn', {
            code: 120,
            ignoreUrls: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true,
            ignoreTrailingComments: true,
            ignoreHTMLAttributeValues: true,
        }],
    },
}).override('nuxt/typescript/rules', {
    rules: {
        '@typescript-eslint/no-empty-object-type': ['error', {
            allowInterfaces: 'with-single-extends',
        }],
    },
}).append({
    files: ['**/*.ts', '**/*.js', '**/*.mjs', '**/*.jsx', '**/*.tsx'],
    rules: {
        '@stylistic/max-len': ['warn', {
            code: 120,
            ignoreUrls: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true,
            ignoreTrailingComments: true,
        }],
    },
})
