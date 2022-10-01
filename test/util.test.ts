import { describe, expect, it } from 'vitest'
import { resolve } from 'pathe'

import type { AliasArr, AliasMap, Aliases } from '../src/types'
import {
  resolveAliasArr,
  resolveAliasMap,
  resolveAliases,
  resolveReplacement,
} from '../src/util'

describe('resolveReplacement()', () => {
  describe('POSIX style path', () => {
    it('absolute replacement', () => {
      expect(
        resolveReplacement('/path/to/project/src/'),
      ).toMatchInlineSnapshot('"/path/to/project/src/"')
    })

    it('absolute base dir', () => {
      expect(
        resolveReplacement('src/', '/path/to/project'),
      ).toMatchInlineSnapshot('"/path/to/project/src/"')
    })

    it('relative base dir', () => {
      const cwd = resolve('./')
      expect(
        resolveReplacement('src/', 'relative/path/to/project').replace(`${cwd}/`, ''),
      ).toMatchInlineSnapshot('"relative/path/to/project/src/"')
    })

    it('default base dir', () => {
      const cwd = resolve('./') // default base dir is CWD
      expect(resolveReplacement('src/')).toBe(`${cwd}/src/`)
    })
  })

  describe('Windows style path', () => {
    it('absolute replacement', () => {
      expect(
        resolveReplacement('C:\\path\\to\\project\\src\\'),
      ).toMatchInlineSnapshot('"C:/path/to/project/src/"')
    })

    it('absolute base dir', () => {
      expect(
        resolveReplacement('src\\', 'C:\\path\\to\\project'),
      ).toMatchInlineSnapshot('"C:/path/to/project/src/"')
    })

    it('relative base dir', () => {
      const cwd = resolve('.\\')
      expect(
        resolveReplacement('src\\', 'relative\\path\\to\\project').replace(`${cwd}/`, ''),
      ).toMatchInlineSnapshot('"relative/path/to/project/src/"')
    })

    it('default base dir', () => {
      const cwd = resolve('.\\') // default base dir is CWD
      expect(resolveReplacement('src\\')).toBe(`${cwd}/src/`)
    })
  })
})

describe('resolveAliasArr()', () => {
  it('basic', () => {
    const aliasArr: AliasArr = [
      { find: '~/', replacement: 'src/' },
      { find: /^@\//, replacement: 'src/components/' },
    ]
    expect(
      resolveAliasArr(aliasArr, '/project'),
    ).toMatchInlineSnapshot(`
      [
        {
          "find": "~/",
          "replacement": "/project/src/",
        },
        {
          "find": /\\^@\\\\//,
          "replacement": "/project/src/components/",
        },
      ]
    `)
  })
})

describe('resolveAliasMap()', () => {
  it('basic', () => {
    const aliasMap: AliasMap = {
      '~/': 'src/',
      '@/': 'src/components/',
    }
    expect(
      resolveAliasMap(aliasMap, '/project'),
    ).toMatchInlineSnapshot(`
      {
        "@/": "/project/src/components/",
        "~/": "/project/src/",
      }
    `)
  })
})

describe('resolveAlias()', () => {
  it('alias map', () => {
    const aliases: Aliases = {
      '~/': 'src/',
      '@/': 'src/components/',
      'conf': 'src/config.js',
    }
    expect(resolveAliases(aliases, '/project')).toMatchInlineSnapshot(`
      {
        "@/": "/project/src/components/",
        "conf": "/project/src/config.js",
        "~/": "/project/src/",
      }
    `)
  })

  it('alias arr', () => {
    const aliases: Aliases = [
      { find: '~/', replacement: 'src/' },
      { find: 'conf', replacement: 'src/config.js' },
      { find: /^@\//, replacement: 'src/components/' },
    ]
    expect(resolveAliases(aliases, '/project')).toMatchInlineSnapshot(`
      [
        {
          "find": "~/",
          "replacement": "/project/src/",
        },
        {
          "find": "conf",
          "replacement": "/project/src/config.js",
        },
        {
          "find": /\\^@\\\\//,
          "replacement": "/project/src/components/",
        },
      ]
    `)
  })
})
