import { isAbsolute, normalize, resolve } from 'pathe'

import type { AliasArr, AliasMap, Aliases } from './types'

export function resolveReplacement(
  replacement: string,
  baseDir = './',
): string {
  return isAbsolute(replacement)
    ? normalize(replacement)
    : `${resolve(baseDir)}/${normalize(replacement)}`
}

export function resolveAliasArr(
  aliasArr: AliasArr,
  baseDir?: string,
): AliasArr {
  const resolved: AliasArr = []
  for (const { find, replacement } of aliasArr) {
    resolved.push({
      find,
      replacement: resolveReplacement(replacement, baseDir),
    })
  }
  return resolved
}

export function resolveAliasMap(
  aliasMap: AliasMap,
  baseDir?: string,
): AliasMap {
  const resolved: AliasMap = {}
  for (const find of Object.keys(aliasMap)) {
    const replacement = aliasMap[find]
    resolved[find] = resolveReplacement(replacement, baseDir)
  }
  return resolved
}

export function resolveAliases(
  aliases: Aliases,
  baseDir?: string,
): Aliases {
  return Array.isArray(aliases)
    ? resolveAliasArr(aliases, baseDir)
    : resolveAliasMap(aliases, baseDir)
}
