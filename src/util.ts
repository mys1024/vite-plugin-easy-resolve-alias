import { isAbsolute, normalize, resolve } from 'pathe'

import type { AliasTarget, Aliases } from './types'

export function resolveAliasTarget(
  target: AliasTarget,
  baseDir = './',
) {
  return isAbsolute(target)
    ? normalize(target)
    : `${resolve(baseDir)}/${normalize(target)}`
}

export function resolveAliases(
  aliases: Aliases,
  baseDir?: string,
) {
  const resolvedAlias: Record<string, string> = {}
  for (const alias of Object.keys(aliases)) {
    const target = aliases[alias]
    resolvedAlias[alias] = resolveAliasTarget(target, baseDir)
  }
  return resolvedAlias
}
