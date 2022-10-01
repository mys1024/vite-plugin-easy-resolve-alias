import type { Aliases } from './types'

import { resolve, isAbsolute, normalize } from 'pathe'

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
