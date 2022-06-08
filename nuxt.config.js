export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'jihaz',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Boutchamir zakaria , Dari Jihane et leurs familles,ont le plaisir de vous annoncer leur mariage' },
      { property: 'og:image',itemprop:'image' ,content:'https://www.jihaneandzakaria2022.tk/wedd.png' },
      { property: 'og:image:secure_url',itemprop:'image' ,content:'https://www.jihaneandzakaria2022.tk/wedd.png' },
      { property: 'og:image:width',content:'256' },
      { property: 'og:image:height',content:'256' },
      { property: 'og:url', content:'https://www.jihaneandzakaria2022.tk' },
      { property: 'og:site_name', content:'jihaz' },
      { property: 'og:title', content:'jihaz' },
      { itemprop:'thumbnailUrl' ,content:'https://www.jihaneandzakaria2022.tk/wedd.png' },

    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'ant-design-vue/dist/antd.css',
    'sakura-js/dist/sakura.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/antd-ui',
    // { src: '@/plugins/sakura.js',  mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/fontawesome',
    '@nuxtjs/pwa',
    
  ],
  fontawesome: {
    icons: {
      solid: true,
      brands: true,
    }
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/i18n',
  ],
  i18n: {
    locales: ['fr', 'ar'],
    defaultLocale: 'fr',
    vueI18n: {
      fallbackLocale: 'fr',
      messages: {
        fr: {
          welcome: 'Bienvenue'
        },
        es: {
          welcome: 'Bienvenido'
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      vue: {
        transformAssetUrls: {
          audio: 'src'
        }
      }
    },

    extend(config, ctx) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      })
    }
  },
  pwa: {
    manifest: {
      name: 'Zakaria et Jihane',
      description:'Boutchamir zakaria , Dari Jihane et leurs familles,ont le plaisir de vous annoncer leur mariage',
      lang: 'en',
      useWebmanifestExtension: false,
      icons:[
        {
          src: './static/leme.svg',
          sizes: "any"
        }
      ]
    }
  }
}
