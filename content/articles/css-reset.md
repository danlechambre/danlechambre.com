---
title: CSS Reset
description: These things definitely still exist, but do I *really* need one?
createdDate: "2025-05-10"
lastUpdatedDate: "2025-05-10"
state: forming
tags: ["web-dev", "css"]
---

The concept of a CSS reset (or what can probably be more accurately described as sensible defaults), is not something I've had to think about for a _very_ long time. At work for example, I work on a mature project that already has its styling rules in place. In fact most of the time, I'm just dropping in UI primitives that already exist within a design system, occasionally overriding a style or two. In other projects I usually opt for [Tailwind](https://tailwindcss.com) because it resolves almost all of the pain associated with starting from scratch and rolling your own "system", especially when working as part of a team (of any size).

But as I start to build this site, I'm in the unique position of working on a project with no client, and no team mates. What that means is that I can very happily roll my own just for the sheer joy of it, and the very first thing that crossed my mind? Do I need a CSS reset in 2025?

## [What is a CSS reset?](#what-is-a-css-reset)

Anyone who built websites in the early noughties will be very familiar with this tale. But for anyone who's career has only ever consisted of blissfully slinging Tailwind classes at React components it helps to know how we got here.

Once upon a time, you could lay down some HTML and could almost guarantee it would look _completely_ different from one browser to the next. This was because each browser vendor applied the set of base styles that it thought best. These didn't really align to each other because, well, everyone was just forging their own path I guess. It's easy to sneer in retrospect, but let's bear in mind we hadn't even had CSS for that long at this point, Chrome didn't exist yet, and I guess in the battle for internet browsing supremacy, one way to differentiate yourself was to _try_ and make things look... good? As a result, styling websites predictably was a bit of a nightmare. As we headed into the mid-noughties, some clever folks started to figure work on how we might fix that. And so the concept of the "reset" emerged.

Whilst certainly not _the_ first, it felt like [Eric Meyer's](https://meyerweb.com/eric/thoughts/2007/04/18/reset-reasoning/) 2007 version was the first to _really_ gain traction (my own perspective, historical accounts may vary). I think the reason for this was the philosophy behind it. In summary; be aggressive but intentional about what we strip away, and be very deliberate in our decision making around the semantics of our HTML and what we add to our CSS, mostly approaching the two separately. As an example, use an `<em>` because it signifies emphasized content, not because you want something in _italic_ (ironically enclosed in an `<em>` tag). Basically, start with a blank canvas, take nothing for granted, consciously implement every aspect of the design.

In the succeeding years any self-respecting web developer would start any new project with Meyer's reset... until... Nicolas Gallagher released [Normalize.css](https://necolas.github.io/normalize.css/) (some [notes](https://nicolasgallagher.com/about-normalize-css/)). An equally compelling philosophy:

<figure>

> Resets impose a homogenous visual style by flattening the default styles for almost all elements. In contrast, normalize.css retains many useful default browser styles. This means that you don’t have to redeclare styles for all the common typographic elements.

</figure>
<figcaption>

<cite>[About normalize.css](https://nicolasgallagher.com/about-normalize-css/)</cite>, Nicolas Gallagher

</figcaption>

What annoyed people about the full reset was that you had to rebuild **everything**. More often than not that would look the same from project to project. What if, went the idea, we could bring browsers to a consistent starting point by smoothing over only that which was inconsistent, thus "normalising" the starting point. Now my `<h1>` looks the same in all browsers, so I can take that default for granted again. Win!

This approach quickly became favoured, as starting with a sensible set of defaults just felt, well, sensible. Even as "The Component Age" began, many of the big UI kits like [MUI](https://mui.com/material-ui/react-css-baseline/#global-reset) carried these ideas forward into their libraries, and still do today.

## So what's the state of play?

Well, I think most of us working in web development today still benefit from all of this evolution. Take a moment to check your favourite CSS library or UI kit and you'll likely find some kind of normalization, resetting or base styling happening under the hood.

The reset I'm most familiar with in practice these days is [Preflight](https://tailwindcss.com/docs/preflight), the one applied by Tailwind. This starts with [modern-normalize](https://github.com/sindresorhus/modern-normalize) as a base, and then goes on to apply opinionated, aggressive resets that take us to the near blank canvas we get with a full reset, but in a more modern, thoughtful way.

## Where does that leave me?

After I'd taken off my rose-tinted spectacles I determined that I probably didn't need to care in 2025. I'm using Astro with scoped styles. I can probably just do things as and when I need to. But it wasn't long before I started to (re)realise; I probably don't want indents and list decoration by default, I probs don't want margin and padding on all `<p>` tags, and so on.

I immediately went on the hunt for current opinions. It turns out it's still on folks minds now and again. [Chris Coyier](https://frontendmasters.com/blog/still-no-css-reset/) and [Jonathan Snook](https://snook.ca/archives/html_and_css/still-no-css-reset) get by fine without them, and the reasoning is pretty much where I thought I was on the topic, until I wasn't.

## Building The Reset

As Andy Bell was mentioned in the first couple of articles I stumbled on, I thought I'd take a look at what he was [doing](https://piccalil.li/blog/a-more-modern-css-reset/).

Andy's is very well-reasoned, but I think it's worth remembering this is what works for him and his team at [Set Studio](https://set.studio). After going through rule by rule I decided I only really needed a small subset. This is what I kept:

### Box-sizing

I'm not a psychopath, of course we need this one:

```css
/* Box sizing rules */
*,
*::before,
*::after {
  box-sizing: border-box;
}
```

### Font-size Inflation

Whilst you could argue that what Apple are doing with this one helps with accessibility, it's too much of an inconsistency to keep around.

```css
/* Prevent font size inflation */
html {
  -moz-text-size-adjust: none;
  -webkit-text-size-adjust: none;
  text-size-adjust: none;
}
```

### Balance Text Wrapping on Headings

This is real nice. Especially if you have a penchant for wordiness like me. I've added back in `h5` and `h6` cause I don't have Andy's discipline.

```css
/* Balance text wrapping on headings */
h1,
h2,
h3,
h4,
h5,
h6 {
  text-wrap: balance;
}
```

### Default Anchor Tag Styles

I love this rule. Although I'll probably modify the actual styles to suit this site and I might look at using CSS variables to make it reusable.

```css
/* A elements that don't have a class get default styles */
a:not([class]) {
  text-decoration-skip-ink: auto;
  color: currentColor;
}
```

### Block Level Images

Don't leave home without this one. I'll probably extend this with other media types at some point.

```css
/* Make images easier to work with */
img,
picture {
  max-width: 100%;
  display: block;
}
```

### Inherit Styles For Buttons and Inputs

Good shout. I almost always forget that this isn't the norm.

```css
/* Inherit fonts for inputs and buttons */
input,
button,
textarea,
select {
  font-family: inherit;
  font-size: inherit;
}
```

### Nicer Jump Link Spacing

Love the idea behind this one. I also think the use of `ex` units so that we get better scaling when mixing fonts feels super boujee.

```css
/* Anything that has been anchored to should have extra scroll margin */
:target {
  scroll-margin-block: 5ex;
}
```

After taking everything I wanted from Andy's, I thought I'd jump over to [Josh Comeau's](https://www.joshwcomeau.com/css/custom-css-reset/) site I as I recalled reading that one quite some time ago (possibly during a started and abandoned attempt at getting this site up and running).

Here are the additional rules I took from Josh:

### Enable Keyword Animations

Yummy! Yes please!

```css
@media (prefers-reduced-motion: no-preference) {
  html {
    interpolate-size: allow-keywords;
  }
}
```

### Antialiasing

I think this is a great catch by Josh. To my eyes it makes text in Safari look the same as it does in Chrome. It's almost imperceptible, but without tis rule, the text definitely looks "thicker" in Safari. It's actually something I notice a lot when testing between browsers at work - there's always just this uncanny feeling between Safari and other browsers when it comes to text. I'm adding this, but I'll be keeping a close eye on it.

```css
body {
  -webkit-font-smoothing: antialiased;
}
```

### Wrapping

I took these two rules from Josh, but (iirc) it's worth bearing in mind that `text-wrap: pretty` only works in Chrome. I agree with Josh though that impact on performance is imperceptible in testing.

```css
p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  hyphens: auto;
}

p {
  text-wrap: pretty;
}
```

I think that's it. I mostly used Josh's to tidy up the stuff I took from Andy's as there there's a lot of crossover between the two.

One thing I went back and forth on was what to do about margin. In the end I decided to leave as is, override when I need to, and reset if things cause me problems. But I was reminded of some old complaints with Meyer style resets. It really does get annoying having to add a ton of CSS just to get back to where you kind of started. We'll see how it shakes out.

## Further Reading

- [Your CSS reset needs text-size-adjust (probably)](https://kilianvalkhof.com/2022/css-html/your-css-reset-needs-text-size-adjust-probably/)
