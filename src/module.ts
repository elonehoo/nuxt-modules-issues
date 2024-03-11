import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'
import { defu } from 'defu'

// Module options TypeScript interface definition
export interface ModuleOptions {
  plugins?: ()=>void
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'my-module',
    configKey: 'myModule'
  },
  // Default configuration options of the Nuxt module
  defaults: {
    plugins: ()=>{}
  },
  setup (options, nuxt) {
    const resolver = createResolver(import.meta.url)

    nuxt.options.runtimeConfig.public.myModules = defu(nuxt.options.runtimeConfig.public.myModules, {
      plugins: options.plugins!,
    })

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))
  }
})

declare module '@nuxt/schema' {
  interface RuntimeConfig {
    myModules: {
      plugins:ModuleOptions['plugins']
    }
  }
  interface PublicRuntimeConfig {
    myModules: {
      plugins:ModuleOptions['plugins']
    }
  }

  interface ConfigSchema {
    runtimeConfig: {
      public?: {
        myModules: {
          plugins:ModuleOptions['plugins']
        }

      }
    }
  }
}
