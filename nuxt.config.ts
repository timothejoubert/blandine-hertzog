import svgLoader from 'vite-svg-loader'
import slicemachine from './slicemachine.config.json'
import { version } from './package.json'
import { I18N_DEFAULT_LOCALE, I18N_LOCALES } from './constants/i18n'
import { prismicDocumentRoutes } from './constants/prismic-page'
import { PREVIEW_PATH } from './constants/prismic-preview'

const isDev = process.env.NODE_ENV === 'development'

export default defineNuxtConfig({
    modules: ['@nuxt/image', '@nuxtjs/prismic', '@nuxt/image', '@nuxtjs/i18n', '@vueuse/nuxt', '@nuxt/eslint', '@rezo-zero/nuxt-stories', '@nuxtjs/sitemap', '@nuxtjs/robots', '@nuxt/icon'],
    plugins: [],
    components: [
        '~/components/atoms',
        '~/components/molecules',
        '~/components/organisms',
    ],
    devtools: { enabled: true },
    app: {
        layoutTransition: false, // Prevent issue with layout without root element
        head: {
            htmlAttrs: {
                lang: I18N_DEFAULT_LOCALE,
                class: 'app',
            },
            link: [
                { rel: 'icon', href: '/favicon.svg' },
                { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png' },
                { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
                { rel: 'manifest', href: '/site.webmanifest' },
                { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#fff' },
            ],
            script: [
                {
                    src: `https://static.cdn.prismic.io/prismic.js?new=true&repo=${slicemachine.repositoryName}`,
                    async: true,
                    defer: true,
                },
            ],
        },
    },
    css: ['~/assets/scss/main.scss'],
    runtimeConfig: {
        public: {
            version,
            site: {
                name: 'Blandine hertzog dev',
                url: 'http://localhost:3000',
                environment: 'development',
            },
        },
    },
    alias: {
        '#root': __dirname,
    },
    ignore: [
        isDev ? undefined : 'pages/_stories/**',
        'assets/backup/**',
    ],
    experimental: {
        asyncContext: true,
        appManifest: false, // We don't need client route rules for now, and Nuxt makes an extra request to get them.
    },
    compatibilityDate: '2024-07-09',
    nitro: {
        routeRules: {
            '/**': {
                headers: {
                    // 'Access-Control-Allow-Origin': 'Same-Origin \'self\' \'http://localhost:3000\' \'https://i.ytimg.com\'',
                    'Access-Control-Allow-Origin': '*',
                    // https://web.dev/articles/floc?hl=fr#can_websites_opt_out_of_being_included_in_the_floc_computation
                    'Permissions-Policy': 'interest-cohort=()',
                    // Hardening client security policies
                    // https://developer.mozilla.org/fr/docs/Web/HTTP/CSP
                    'Content-Security-Policy': [
                        // Only allows these iframe origins
                        'frame-src \'self\' https://blandine-hertzog.prismic.io *.youtube-nocookie.com *.youtube.com *.vimeo.com *.instagram.com *.soundcloud.com *.google.com *.deezer.com *.spotify.com',
                        // Only allows these script origins
                        'script-src \'self\' \'unsafe-inline\' https://html2canvas.hertzen.com https://prismic.io https://static.cdn.prismic.io *.googletagmanager.com *.youtube.com *.google.com *.googleapis.com *.gstatic.com',
                        // Only allows these images origins
                        // "img-src 'self' 'unsafe-inline' *.googleapis.com *.gstatic.com",
                    ].join('; '),
                },
            },
            [PREVIEW_PATH]: {
                prerender: false,
                ssr: false,
            },
            '/slice-simulator': {
                prerender: false,
                ssr: false,
            },
        },
    },
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@use "assets/scss/_resources.scss" as *;',
                    quietDeps: true,
                },
            },
        },
        plugins: [
            // https://github.com/jpkleemans/vite-svg-loader?tab=readme-ov-file#setup
            svgLoader({
                svgoConfig: {
                    multipass: true,
                    plugins: [
                        {
                            name: 'preset-default',
                            params: {
                                overrides: {
                                    removeTitle: false,
                                    // viewBox is required to resize SVGs with CSS.
                                    // @see https://github.com/svg/svgo/issues/1128
                                    removeViewBox: false,
                                },
                            },
                        },

                    ],
                },
                defaultImport: 'url',
            }),
        ],
    },
    // https://eslint.nuxt.com/packages/module
    eslint: {
        config: {
            stylistic: {
                indent: 4,
            },
        },
    },
    // https://i18n.nuxtjs.org/docs/getting-started
    i18n: {
        strategy: I18N_LOCALES.length > 1 ? 'prefix_except_default' : 'no_prefix',
        detectBrowserLanguage: false,
        defaultLocale: I18N_DEFAULT_LOCALE,
        locales: I18N_LOCALES.map(locale => ({
            code: locale,
            file: `nuxt.${locale}.json`,
        })),
        // langDir: 'i18n/locales/',
        lazy: true,
        compilation: {
            strictMessage: false, // Allow value to include HTML
        },
        bundle: {
            optimizeTranslationDirective: false,
        },
    },
    // https://nuxt.com/modules/icon#usage
    icon: {
        componentName: 'NuxtIcon',
        class: '',
        fallbackToApi: false,
        localApiEndpoint: '/_nuxt_icon',
        customCollections: [
            {
                normalizeIconName: false,
                prefix: 'icon',
                dir: './assets/images/icons',
            },
        ],
    },
    // https://image.nuxt.com/get-started/configuration
    image: {
        imgix: {
            baseURL: '',
        },
        quality: 75,
        // https://image.nuxt.com/get-started/configuration#screens
        screens: {
            xs: 375,
            sm: 480,
            vl: 1280, // initially xl
            xl: 1440,
            xxl: 1600,
            hd: 1920,
            qhd: 2500,
        },
        // @ts-expect-error not working with [1]
        densities: '1',
        presets: {
            default: {
                sizes: 'xs:100vw md:100vw lg:100vw xl:100vw hd:100vw qhd:100vw',
            },
        },
    },
    prismic: {
        endpoint: slicemachine.endpoint,
        preview: PREVIEW_PATH,
        toolbar: true,
        clientConfig: {
            routes: prismicDocumentRoutes,
        },
    },
    robots: {
    // provide simple disallow rules for all robots `user-agent: *`
        disallow: ['/slice-simulator', '/slice-smulator', '/prismic-preview'],
    },
    // https://www.nuxtseo.com/sitemap/getting-started/installation
    sitemap: {
    // enabled: !isGenerateMaintenance,
        exclude: ['/slice-simulator', '/slice-smulator', '/prismic-preview'],
    },
    // https://github.com/rezozero/nuxt-stories
    stories: {
        pattern: [
            '**/*.stories.vue',
        ],
    },
    // https://github.com/nuxt-modules/svg-sprite#options
    svgSprite: {
        input: '~/assets/images/icons',
        output: '~/assets/images/sprites',
    },
})
