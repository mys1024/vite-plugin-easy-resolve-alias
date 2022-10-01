import { describe, expect, it } from 'vitest'
import { resolve } from 'pathe'
import { resolveAlias } from '../src/util'
import { Aliases } from '../src/types'

describe('util/resolveAlias()', () => {
  const aliases: Aliases = {
    '~/': 'src/',
    '@/': 'src/components/',
    'conf': 'src/config.js'
  }

  it('Absolute base dir on POSIX', async () => {
    expect(resolveAlias(aliases, '/path/to/project')).toMatchInlineSnapshot(`
      {
        "@/": "/path/to/project/src/components/",
        "conf": "/path/to/project/src/config.js",
        "~/": "/path/to/project/src/",
      }
    `)
  })

  it('Absolute base dir on Windows', async () => {
    expect(resolveAlias(aliases, 'C:\\path\\to\\project')).toMatchInlineSnapshot(`
      {
        "@/": "C:/path/to/project/src/components/",
        "conf": "C:/path/to/project/src/config.js",
        "~/": "C:/path/to/project/src/",
      }
    `)
  })

  it('Relative base dir on POSIX', async () => {
    const cwd = resolve(process.cwd())
    const resolvedAliases = resolveAlias(aliases, 'path/to/project')
    const relativeAliases: Record<string, string> = {}
    for (const alias of Object.keys(resolvedAliases)) {
      relativeAliases[alias] = resolvedAliases[alias].replace(`${cwd}/`, '')
    }
    expect(relativeAliases).toMatchInlineSnapshot(`
      {
        "@/": "path/to/project/src/components/",
        "conf": "path/to/project/src/config.js",
        "~/": "path/to/project/src/",
      }
    `)
  })

  it('Relative base dir on Windows', async () => {
    const cwd = resolve(process.cwd())
    const resolvedAliases = resolveAlias(aliases, 'path\\to\\project')
    const relativeAliases: Record<string, string> = {}
    for (const alias of Object.keys(resolvedAliases)) {
      relativeAliases[alias] = resolvedAliases[alias].replace(`${cwd}/`, '')
    }
    expect(relativeAliases).toMatchInlineSnapshot(`
      {
        "@/": "path/to/project/src/components/",
        "conf": "path/to/project/src/config.js",
        "~/": "path/to/project/src/",
      }
    `)
  })

  it('Complex relative base dir', async () => {
    const cwd = resolve(process.cwd())
    const resolvedAliases = resolveAlias(aliases, './path/to/../to/project')
    const relativeAliases: Record<string, string> = {}
    for (const alias of Object.keys(resolvedAliases)) {
      relativeAliases[alias] = resolvedAliases[alias].replace(`${cwd}/`, '')
    }
    expect(relativeAliases).toMatchInlineSnapshot(`
      {
        "@/": "path/to/project/src/components/",
        "conf": "path/to/project/src/config.js",
        "~/": "path/to/project/src/",
      }
    `)
  })
})
