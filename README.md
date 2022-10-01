# vite-plugin-easy-resolve-alias

Make it easy to config [Vite](https://vitejs.dev/)'s [resolve alias](https://vitejs.dev/config/shared-options.html#resolve-alias).

## Install

```shell
npm install -D vite-plugin-easy-resolve-alias
```

## Usage

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

it equals to:

```javascript
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(process.cwd(), 'src')}/`
    }
  }
})
```

then you can use the alias you configured:

```javascript
import bar from '~/bar'
const foo = bar()
```

## TypeScript Support

If you are using **TypeScript**, don't forget to configure your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "~/*": ["./src/*"]
    }
  }
}
```

## License

MIT
