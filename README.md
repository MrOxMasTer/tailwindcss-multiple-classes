<div align="center">
<h1>tailwindcss-multiple-classes</h1>

<p>Defining several classes at once for one variant</p>
</div>

---

## Advantages

1. options for defining your separator, and brackets
2. support for nested variants
3. There is a postCSS plugin to support css files
4. support for Vite

## Reference

- [Why are other similar plugins not suitable for me?](https://github.com/tailwindlabs/tailwindcss/discussions/11701#discussioncomment-9314628)
- [Installation](#installation)

## Demonstration

### jsx

#### Example 1 { separator = "," }:
[One of the proposed syntaxes in X, which is voted for the most](https://x.com/adamwathan/status/1849509712368226792)

`Before:`

```jsx
const Main = () => {
	return <main className="flex mm:bg-red,text-green,hover:text-3xl">...</main>;
};
```

`After:`

```jsx
const Main = () => {
	return <main className="flex mm:bg-red mm:text-green mm:hover:text-3xl ">...</main>;
};
```

#### Example 2 { separator = ",", opBracket = "(", clBracket = ")" }:

```jsx
const main = () => {
  return <main className="flex supports-[not(**)]:min-height-[10.1px]:h-10,sm:h-20,md:h-30, lg:h-40,xl:h-50,hover:(pl-4,py-3) pl-3">...</main>;};
```

`After:`

```jsx
const main = () => {
        return <main className="flex supports-[not(**)]:min-height-[10.1px]:h-10 supports-[not(**)]:min-height-[10.1px]:sm:h-20 supports-[not(**)]:min-height-[10.1px]:md:h-30 supports-[not(**)]:min-height-[10.1px]:lg:h-40 supports-[not(**)]:min-height-[10.1px]:xl:h-50 supports-[not(**)]:min-height-[10.1px]:hover:pl-4 supports-[not(**)]:min-height-[10.1px]:hover:py-3 pl-3">...</main>;};
```
### css

`IMPORTANT`: You need to connect the PostCSS plugin

`Before:`

```css
.class {
	@apply mm:bg-red,text-green;
}
```

`After:`

```css
.class {
	@apply mm:bg-red mm:text-green;
}
```

## Remark

1. Using `SPACE` for `separator` will result in an error. This is done for several reasons:
  - more precisely in prettier-plugin-tailwindcss
  - One of the posts in X by the creator of `tailwindcss`, talked about how incompatible this syntax is with different templates (like unoCSS)
2.  The problem with auto-completion (is not displayed) (tailwindcss intelliSense) (you can solve it in the settings using: "tailwindCSS.experimental.classRegex")
3.  Strange formatting of user classes - puts all classes at the beginning. But as I realized, this problem is solved https://github.com/tailwindlabs/prettier-plugin-tailwindcss/issues/228

## Installation

- [Webpack/next.js](#webpacknextjs)
- [PostCSS](#postCSS)
- [Vite](#viterollup)

### Webpack/next.js

```
npm install --save-dev tailwindcss-multiple-classes
```

Creating a function and exporting it:

```javascript
// transformMultipleClasses.js
import createTransform from 'tailwindcss-multiple-classes';

const transformMultipleClasses = createTransform({ separator: ',', opBracket: '(', clBracket: ')' });

export default transformMultipleClasses;
```

```javascript
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.jsx/,
      use: path.resolve('./transformMultipleClasses.js'),
    });

    return config;
  },
```

`IMPORTANT`: use javascript to support webpack
`IMPORTANT`: Often, everything ends with the conversion of files, but if you have any problems, try to use this:

Adding to the tailwindcss configuration:

```javascript
//tailwindcss.config.js
import transformMultipleClasses from './src/transformMultipleClasses.js';

const config = {
  content: {
    files: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    transform: {
      jsx: (content = '') => transformMultipleClasses(content),
      // You can designate for any file extension
    },
  }

  ...
}
```

`IMPORTANT`: This setting is necessary for tailwindcss to understand what classes it needs to generate in a CSS file, but it does not work as a compiler for files. Details: https://github.com/tailwindlabs/tailwindcss/issues/13705#event-12857014225
`IMPORTANT`: You may need it for `Vite/Rollup`, but if it works without it, then you don't need it

### PostCSS

https://www.npmjs.com/package/postcss-tailwindcss-multiple-classes

### Vite/Rollup

https://www.npmjs.com/package/rollup-plugin-tailwindcss-multiple-classes

Support Vite / Rollup

```
npm install --save-dev rollup-plugin-tailwindcss-multiple-classes
```

`IMPORTANT`: I advise you to install the plugin itself and the plugin for PostCSS for vite. If there is any error, install content.transform (in the installation section in webpack/next.js )

```javascript
// vite.config.js
import tailwindMultipleClasses from "rollup-plugin-tailwindcss-multiple-classes";

export default defineConfig({
	plugins: [tailwindMultipleClasses({ separator: ",", opBracket: "(", clBracket: ")" }), react()],
});
```
`IMPORTANT`: This plugin ignores all files in `node_modules`, as well as all CSS files and its derivatives. PostCSS is used for this
`IMPORTANT`: If you have any problems, try to rearrange this plugin and the 'react` plugin

