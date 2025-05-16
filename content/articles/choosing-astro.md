---
title: Choosing Astro
createdDate: "2023-04-07"
lastUpdatedDate: "2023-04-07"
description: Why I chose Astro to build this site.
state: realised
tags: ["astro", "frameworks", "web-dev"]
---

This isn't another "I moved my blog from Last Month's Hottest Framework&trade; to This Month's Hottest Framework&trade;". That's not my bag. This is just a quick reflection on how I came to choose Astro for this particular site. I have no desire to rebuild every time something new and shiny comes out.

When it came to picking the tech for this site I had three goals in mind:

1. I wanted to be able to use [Three.js](https://threejs.org/) for a super fancy header.
2. I wanted to be able to write my articles in Markdown - whether natively or with an easy conversion step.
3. I wanted the tech to fit my use case, not make my use case fit the tech.
4. See points 1 and 3; I basically wanted to be able to do whatever the hell I liked and experiment with whatever the hell technologies I wanted to without necessarily having to use something like [CodePen](https://codepen.io) or [Stackblitz](https://stackblitz.io).

React is my bread and butter, in that it literally gets me the money I need to buy my bread and my butter. I'm productive with it, and I'm sure I could have had the site knocked up in an afternoon. But I would have felt like the proverbial man with the hammer. I _did_ start out with Gatsby, but the GraphQL layer felt pretty painful, and then I found out it was basically abandonware (possibly unfair, but that's the feeling I get).

Whilst pondering what to do, the latest instalment of my [favourite newsletter](https://bytes.dev/) dropped. It covered the release of Astro 2, which I'd not read much into up to that point. It turned out to be **exactly** what I was looking for.

So, why Astro? They put it better than I can:

> Astro is...
>
> 1. Content-focused: Astro was designed for content-rich websites.
> 2. Server-first: Websites run faster when they render HTML on the server.
> 3. Fast by default: It should be impossible to build a slow website in Astro.
> 4. Easy to use: You don’t need to be an expert to build something with Astro.
> 5. Fully-featured, but flexible: Over 100+ Astro integrations to choose from.

So far it's been great. I'm mostly just writing HTML and CSS like the olden days, and I love that later down the line if I want to add anything bonkers, Astro's island architecture has me covered.
