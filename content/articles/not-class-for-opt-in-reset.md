---
title: "Opt In CSS Resets At Selector Level"
description: Using the 'not' selector to add thoughtful opt-in CSS resets when you want them, but retaining sensible defaults in most other cases.
createdDate: "2025-05-16"
lastUpdatedDate: "2025-05-16"
state: notion
tags: ["web-dev", "css"]
---

In an Astro project, there are a few different approaches you can take with styling but the main ways are via [global styles](https://docs.astro.build/en/guides/styling/#global-styles) or [scoped styles](https://docs.astro.build/en/guides/styling/#scoped-styles).

In a world where you are happy with user agent styles as your defaults you could just use scoped styles, indeed, the first time I worked with Astro this is what I did. But there's only so many times you can write `margin: 0` before you get a little irritated. Now don't get me wrong, I have the mindset that you should be the browser's mentor rather than enslave it, but when you're building custom UI, a blank canvas and complete control often make sense.

So this time around I wanted to explore how I could combine a range of sensible defaults with some user-agent styles, but have an escape hatch as and when I need it.

I was recently examining the current state of CSS resets and came across the following selector that [Andy Bell](https://bell.bz) uses in the reset he uses at [Set Studio](https://set.studio).

```css
/* A elements that don't have a class get default styles */
a:not([class]) {
  text-decoration-skip-ink: auto;
  color: currentColor;
}
```

I thought this was a great way to apply default styles to 'regular' links, but I wondered whether this idea could be taken further. I wanted to know if there was a way we could use the `:not([class])` selector to opt in to a more aggressive reset on an element when needed.

With that in mind, let's see how we might apply this idea to the `<a>` tag.

```css
/* Reset */
a {
  color: inherit;
  -webkit-text-decoration: inherit;
  text-decoration: inherit;
}

/* Sensible defaults */
a:not([class]) {
  text-decoration: underline;
  text-decoration-skip-ink: auto;
  text-decoration-color: palevioletred;
  color: grey;
}
```

What we're doing here is setting a relatively aggressive reset on the element selector (these are the styles used in Tailwind's Preflight), then using the `:not([class])` selector to apply our **sensible defaults** i.e. the styles we want applied in most cases i.e. when we want a link to just be a link.

By doing this, we can now use scoped styles with classes in our Astro components without having to override all of our defaults

```astro
<a href="#" class="container">
  <h2>My Linked Component</h2>
  <p>I'm using the 'a' tag in a very different way to normal</p>
</a>

<style>
  .container {
    /* Yay! The act of adding a class resets the styling */
    display: block;
    background-color: salmon;
  }
</style>
```

In theory, this could be a really nice way to work in Astro, but it's just a theory at this stage, so I'll report back my findings once I've put it into practice 🫡
