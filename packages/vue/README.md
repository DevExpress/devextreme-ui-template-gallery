# Vue 3 + TypeScript + Vite

This template provides a minimal setup to get Vue 3 working in Vite with TypeScript support and some ESLint rules.

## Project Setup

```bash
pnpm install
```

### Compiles and hot-reloads for development

```bash
pnpm run dev
```

### Type-check, compile and minify for production

```bash
pnpm run build
```

### Preview production build

```bash
pnpm run preview
```

### Lint with ESLint

```bash
pnpm run lint
```

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) extension

## Type Support For `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

