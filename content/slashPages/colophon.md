---
title: "Colophon"
subtitle: "How this site is built"
slug: "colophon"
---

When building this site I had a very clear vision of what and how I wanted to publish. Shortly after I started I found that the aims and ambitions I had for my site aligned very well with the principles defined by [IndieWeb](https://indieweb.org). So before I go ahead and add something, I'll check to see whether there is a _principle_ or a common approach that will enhance how this site will integrate with the **IndieWeb**.

## Tools

### Astro

This site is very proudly built with [Astro](https://astro.build). I was an early adopter of Astro and I definitely feel vindicated betting on it. It's a true joy to work with. Its general philosophy and advocacy of web standards is something that's inspired my path as a web developer.

### HTML, CSS and JS (well TS)

I do my best to ensure that if I stop development on this site tomorrow it will still be around for the heat death of the universe. In that vein I try to build "The Core"&trade; of this site using nothing but "The Platform"&trade;. One of the best things about Astro is that you can build Astro components [using the Web Component standard](https://docs.astro.build/en/guides/client-side-scripts/#web-components-with-custom-elements). It feels like the best of all worlds to me and something I definitely recommend exploring if you find yourself reaching for a component framework each time you need to add client interactivity to your Astro project.

### Fonts

I currently use system font stacks, guided by [Modern Font Stacks](https://modernfontstacks.com) for font classifications. This allows me to define a stack for each type of font I want. Been loving this approach since I discovered it.

### Component Frameworks

That said, from time to time I may use a component framework such as React as part of an article, a demo, or exploration. Again, Astro is a great tool to stop this from affecting the performance of my site overall by leveraging its [islands architecture](https://docs.astro.build/en/concepts/islands/). Something like React, will only ever be loaded on the pages that it's needed.

### Cloudflare Pages

It's not perfect by any stretch but the transparent pricing structure, the ability to manage my domain, and my familiarity with it coming off other projects made it a no-brainer for me.

### GitHub

All source code is open on GitHub and can be found at [danlechambre/danlechambre.com](https://github.com/danlechambre/danlechambre.com). You are free to take inspiration, adapt, remix this source code to build your own project but please respect my rights over my creative content. This is discussed in more detail in the [LICENSE](https://github.com/danlechambre/danlechambre.com/blob/main/LICENSE.md)
