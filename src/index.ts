import type { Plugin } from 'vite'

import type { Aliases, Options } from './types'
import { resolveAliases } from './util'

export default (aliases: Aliases, options?: Options): Plugin => {
  const { baseDir } = options || {}
  return {
    name: 'vite-plugin-easy-resolve-alias',
    config: () => ({
      resolve: {
        alias: resolveAliases(aliases, baseDir),
      },
    }),
  }
}
