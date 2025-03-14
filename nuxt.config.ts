// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4,
  },

  experimental: {
    scanPageMeta: 'after-resolve',
    sharedPrerenderData: false,
    compileTemplate: true,
    resetAsyncDataToUndefined: true,
    templateUtils: true,
    relativeWatchPaths: true,
    normalizeComponentNames: false,
    spaLoadingTemplateLocation: 'within',
    defaults: {
      useAsyncData: {
        deep: true
      }
    }
  },

  unhead: {
    renderSSRHeadOptions: {
      omitLineBreaks: false
    }
  },
  modules: [
    '@nuxtjs/tailwindcss',
    // ['@nuxtjs/google-fonts', {
    //   fontFamily: { 
    //     Satoshi: ['Satoshi', 'sans-serif'],  
    //   },
    // }],
    '@nuxt/image',
    '@nuxt/icon',  
    '@vee-validate/nuxt',
    '@pinia/nuxt', 
    ['@nuxtjs/tailwindcss', {
      exposeConfig: true,
      viewer: true, 
    }]
  ],
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'stylesheet',
          href: 'https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap',
        },
      ]
    }, 
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
      storage: process.env.NUXT_PUBLIC_STORAGE,
    }
  },

  typescript: {
    typeCheck: true
  },

  css: [
    './assets/css/style.css'
  ],
 
})