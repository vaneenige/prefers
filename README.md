# prefers

[![NPM](http://img.shields.io/npm/v/prefers.svg)](https://www.npmjs.com/package/prefers)
[![travis-ci](https://travis-ci.org/vaneenige/prefers.svg)](https://travis-ci.org/vaneenige/prefers)
[![gzip size](http://img.badgesize.io/https://unpkg.com/prefers/dist/index.js?compression=gzip)](https://unpkg.com/prefers)
[![TypeScript](https://img.shields.io/static/v1.svg?label=&message=TypeScript&color=294E80)](https://www.typescriptlang.org/)

Detect system (or manually set) preferences for color scheme and reduced motion.

Works in all modern browsers and the difference to user experience is day and night! 😬



---


### Detect color scheme

```js
import { prefers, setPrefers } from 'prefers';

// When system preference is light
prefers('color-scheme'); // light
prefers('color-scheme', 'light'); // true

// Manually set preference (in localStorage)
setPrefers('color-scheme', 'dark');
prefers('color-scheme'); // dark
prefers('color-scheme', 'dark'); // true

// Remove manually set preference
setPrefers('color-scheme', false); // removed

// When system has no preference, fallback to default
prefers('color-scheme', 'light', true); // light
prefers('color-scheme', 'dark', true); // dark
```

> Note: Manually set preference will take priority over system preference.

### Detect reduced motion

```js
import { prefers, setPrefers } from 'prefers';

// Assume reduced motion is turned off
prefers('reduced-motion'); // false
setPrefers('reduced-motion', 'reduce'); // turn on

// Assume reduced motion is turned on
prefers('reduced-motion'); // true
setPrefers('reduced-motion', 'no-preference'); // turn off
```

---

### Tip

For the best experience it's highly recommended to check for the preference as soon as possible. For example: If you use (p)react, call it before rendering the application. This way, if you're switching CSS variables or a class, the first render will match the preference.

### Other preferences?

There's a draft which describes more preferences we can possibly detect in the future. Once these actually become available, this library will include them!

Have a look at the [W3C Working Draft for Media Queries Level 5](https://www.w3.org/TR/mediaqueries-5/#media-descriptor-table).

### License

MIT © Colin van Eenige
