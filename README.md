# vite-plugin-easy-resolve-alias

Make it easy to config [Vite](https://vitejs.dev/)'s [resolve alias](https://vitejs.dev/config/shared-options.html#resolve-alias).

## Install

```shell
npm install -D vite-plugin-easy-resolve-alias
```

## Usage

```javascript
import { defineConfig } from 'vite'
import ResolveAlias from 'vite-plugin-easy-resolve-alias'

export default defineConfig({
  plugins: [
    ResolveAlias({ '~/': 'src/' })
  ]
})
```

It equals to:

```javascript
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(process.cwd(), 'src')}/`
    }
  }
})
```

## License

MIT
