export interface Alias {
  find: string | RegExp
  replacement: string
}

export type AliasArr = Alias[]

export type AliasMap = Record<string, string>

export type Aliases = AliasMap | AliasArr

export interface Options {
  baseDir?: string
}
