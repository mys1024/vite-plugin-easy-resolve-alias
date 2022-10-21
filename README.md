# vite-plugin-easy-resolve-alias

Make it easy to config [Vite](https://vitejs.dev/)'s [resolve alias](https://vitejs.dev/config/shared-options.html#resolve-alias).

## Install

```shell
npm install -D vite-plugin-easy-resolve-alias
```

## Usage

### Basic

Add this plugin in your `vite.config.js`:

```javascript
import { defineConfig } from 'vite'
import ResolveAlias from 'vite-plugin-easy-resolve-alias'

export default defineConfig({
  plugins: [
    ResolveAlias({ '~/': 'src/' })
  ]
})
```

then you can use the alias you configured:

```javascript
import foo from '~/foo'
const bar = foo()
```

### Use RegExp

Regular expression is allowed while passing in an array like this:

```javascript
import { defineConfig } from 'vite'
import ResolveAlias from 'vite-plugin-easy-resolve-alias'

export default defineConfig({
  plugins: [
    ResolveAlias([{ find: /^~\//, replacement: 'src/' }])
  ]
})
```

## TypeScript Support

If you are using **TypeScript**, don't forget to configure your `tsconfig.json` like this:

```json
{
  "compilerOptions": {
    "paths": {
      "~/*": ["./src/*"]
    }
  }
}
```

## Comparison

Before:

```javascript
import { defineConfig } from 'vite'
import path from 'path'
import Vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    Vue()
  ],
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`
    }
  }
})
```

After:

```javascript
import { defineConfig } from 'vite'
import ResolveAlias from 'vite-plugin-easy-resolve-alias'
import Vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    ResolveAlias({ '~/': 'src/' }),
    Vue()
  ]
})
```

## License

MIT
