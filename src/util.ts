import { isAbsolute, normalize, resolve } from 'pathe'

import type { Aliases } from './types'

export function resolveAlias(aliases: Aliases, base: string) {
  const resolvedAlias: Record<string, string> = {}

  for (const alias of Object.keys(aliases)) {
    const to = aliases[alias]
    resolvedAlias[alias] = isAbsolute(to)
      ? normalize(to)
      : `${resolve(base)}/${normalize(to)}`
  }

  return resolvedAlias
}
