# Deno std

Use [Deno std library](https://jsr.io/@std) from NPM or HTTP modules, in a
single package, with no dependencies. Compatible with browsers, Node, Bun, and
Deno.

Note: This package only includes stable APIs that are compatible with browsers.

## Use in browsers

The package can be imported from
[jsDelivr](https://cdn.jsdelivr.net/npm/deno-std/) as standard HTTPS JavaScript
modules:

```html
<script type="module">
import { basename } from "https://cdn.jsdelivr.net/npm/deno-std/path/mod.js";

console.log(basename("/hello/world.html"));
</script>
```

## Use in Node/Bun

This package is also published in
[NPM as `deno-std`](https://www.npmjs.com/package/deno-std).

```
npm install deno-std
```

```js
import { basename } from "deno-std/path/mod.js";

console.log(basename("/hello/world.html"));
```
