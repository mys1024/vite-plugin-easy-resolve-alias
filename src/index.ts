import type { Plugin } from 'vite'
import type { Aliases, Options } from './types'

import { resolve } from 'pathe'
import { resolveAlias } from './util'

export default (aliases: Aliases, options?: Options): Plugin => {
  const {
    base = resolve(process.cwd())
  } = options || {}

  return {
    name: 'vite-plugin-easy-resolve-alias',
    config: () => ({
      resolve: {
        alias: resolveAlias(aliases, base),
      },
    })
  }
}
