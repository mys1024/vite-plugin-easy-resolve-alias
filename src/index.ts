import type { Plugin } from 'vite'
import { resolve } from 'pathe'

import type { Aliases, Options } from './types'
import { resolveAliases } from './util'

export default (aliases: Aliases, options?: Options): Plugin => {
  const {
    base = resolve(process.cwd()),
  } = options || {}

  return {
    name: 'vite-plugin-easy-resolve-alias',
    config: () => ({
      resolve: {
        alias: resolveAliases(aliases, base),
      },
    }),
  }
}
