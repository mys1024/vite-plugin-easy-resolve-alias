import { describe, expect, it } from 'vitest'
import { resolve } from 'pathe'

import type { Aliases } from '../src/types'
import { resolveAliases } from '../src/util'

describe('resolveAlias()', () => {
  const aliases: Aliases = {
    '~/': 'src/',
    '@/': 'src/components/',
    'conf': 'src/config.js',
  }

  describe('resolve aliases with POSIX style Path', () => {
    it('absolute base dir', async () => {
      expect(resolveAliases(aliases, '/path/to/project')).toMatchInlineSnapshot(`
        {
          "@/": "/path/to/project/src/components/",
          "conf": "/path/to/project/src/config.js",
          "~/": "/path/to/project/src/",
        }
      `)
    })

    it('relative base dir', async () => {
      const cwd = resolve(process.cwd())
      const resolvedAliases = resolveAliases(aliases, 'path/to/project')
      const relativeAliases: Record<string, string> = {}
      for (const alias of Object.keys(resolvedAliases))
        relativeAliases[alias] = resolvedAliases[alias].replace(`${cwd}/`, '')
      expect(relativeAliases).toMatchInlineSnapshot(`
        {
          "@/": "path/to/project/src/components/",
          "conf": "path/to/project/src/config.js",
          "~/": "path/to/project/src/",
        }
      `)
    })

    it('absolute target path', async () => {
      expect(resolveAliases({
        '@/': '/project/src/components/',
        'conf': '/project/src/config.js',
        '~/': '/project/src/',
      }, '/default/base/dir/is/cwd')).toMatchInlineSnapshot(`
        {
          "@/": "/project/src/components/",
          "conf": "/project/src/config.js",
          "~/": "/project/src/",
        }
      `)
    })
  })

  describe('resolve aliases with Windows style path', () => {
    it('absolute base dir', async () => {
      expect(resolveAliases(aliases, 'C:\\path\\to\\project')).toMatchInlineSnapshot(`
        {
          "@/": "C:/path/to/project/src/components/",
          "conf": "C:/path/to/project/src/config.js",
          "~/": "C:/path/to/project/src/",
        }
      `)
    })

    it('relative base dir', async () => {
      const cwd = resolve(process.cwd())
      const resolvedAliases = resolveAliases(aliases, 'path\\to\\project')
      const relativeAliases: Record<string, string> = {}
      for (const alias of Object.keys(resolvedAliases))
        relativeAliases[alias] = resolvedAliases[alias].replace(`${cwd}/`, '')
      expect(relativeAliases).toMatchInlineSnapshot(`
        {
          "@/": "path/to/project/src/components/",
          "conf": "path/to/project/src/config.js",
          "~/": "path/to/project/src/",
        }
      `)
    })

    it('absolute target path', async () => {
      expect(resolveAliases({
        '@/': 'C:\\project\\src\\components\\',
        'conf': 'C:\\project\\src\\config.js',
        '~/': 'C:\\project\\src\\',
      }, 'C:\\default\\base\\dir\\is\\cwd')).toMatchInlineSnapshot(`
        {
          "@/": "C:/project/src/components/",
          "conf": "C:/project/src/config.js",
          "~/": "C:/project/src/",
        }
      `)
    })
  })

  describe('special cases', () => {
    it('complex base dir', async () => {
      const cwd = resolve(process.cwd())
      const resolvedAliases = resolveAliases(aliases, './path/to/../to/project')
      const relativeAliases: Record<string, string> = {}
      for (const alias of Object.keys(resolvedAliases))
        relativeAliases[alias] = resolvedAliases[alias].replace(`${cwd}/`, '')
      expect(relativeAliases).toMatchInlineSnapshot(`
        {
          "@/": "path/to/project/src/components/",
          "conf": "path/to/project/src/config.js",
          "~/": "path/to/project/src/",
        }
      `)
    })
  })
})
