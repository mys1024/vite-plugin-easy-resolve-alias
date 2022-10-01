import type { Plugin } from 'vite'
import type { Aliases, Options } from './types'

import { resolve, isAbsolute } from 'pathe'

export default (aliases: Aliases, options?: Options): Plugin => {
  const {
    base = resolve(process.cwd())
  } = options || {}

  const resolvedAlias: Record<string, string> = {}
  for (const alias of Object.keys(aliases)) {
    const to = aliases[alias]
    resolvedAlias[alias] = isAbsolute(to)
      ? to
      : resolve(base, to)
  }

  return {
    name: 'vite-plugin-easy-resolve-alias',
    config: () => ({
      resolve: {
        alias: resolvedAlias,
      },
    })
  }
}
