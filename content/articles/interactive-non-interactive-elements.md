---
title: Interactive Non-interactive Elements
createdDate: "2023-04-07"
lastUpdatedDate: "2023-04-07"
description: How too much abstraction can take you far, far away from the basics.
tags: ["a11y", "mui"]
state: forming
---

In my day job, getting an app to production _fast_ is normally the goal. This tends to translate to selecting zero-config build tools and component libraries that take away as much of the grunt work as possible so we can concentrate on delivering value to clients. For example, the app I'm currently working on was bootstrapped with Create React App and uses Material UI throughout. This has brought us to MVP _really_ quickly, and there's simply no way you could achieve that pace if you were rolling your own everything. There are trade-offs obviously and I think one of the biggest is your own knowledge.

With a component library like Material UI, great care and effort has been put into developing robust and accessible components. You really don't have to think much about their implementation, you just get to grips with the API, tailor them to your use-case, and drop them in. But that lack of thinking has a price.

To start to address this fear of forgetting what actually happens inside a browser I'm making a conscious effort to spend time keeping my foundations solid. Yesterday, I wanted to learn a bit more about how to set up and configure ES Lint. So I span up a new React project and worked through the docs. One of the plugins I added was the `jsx-a11y` plugin. So far, so uninteresting. I was just Reacting around for a bit, and created an image gallery component:

```jsx
return (
  <div>
    <img src={images[active]} alt="the thing" />
    <div>
      {images.map((photo, i) => (
        <img
          onClick={handleClick}
          data-index={i}
          key={photo}
          src={photo}
          className={i === active ? "active" : ""}
          alt="thing thumbnail"
        />
      ))}
    </div>
  </div>
);
```

ESLint be like 💥

```sh
Visible, non-interactive elements with click handlers must have at least one keyboard listener.
eslintjsx-a11y/click-events-have-key-events

Non-interactive elements should not be assigned mouse or keyboard event listeners.
eslintjsx-a11y/no-noninteractive-element-interactions
```

Visiting the ESLint [jsx-a11y plugin docs](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-noninteractive-element-to-interactive-role.md) offered some succinct guidance on what I was doing wrong:

> Non-interactive HTML elements indicate content and containers in the user interface. Non-interactive elements include `<main>`, `<area>`, `<h1>` (,`<h2>`, etc), `<img>`, `<li>`, `<ul>` and `<ol>`.
>
> Interactive HTML elements indicate controls in the user interface. Interactive elements include `<a href>`, `<button>`, `<input>`, `<select>`, `<textarea>`.
>
> WAI-ARIA roles should not be used to convert a non-interactive element to an interactive element. Interactive ARIA roles include button, link, checkbox, menuitem, menuitemcheckbox, menuitemradio, option, radio, searchbox, switch and textbox.

Would you believe I worked on a WCAG 2.1 AA compliant front-end? You wouldn't think so given this basic fail, but that's kinda my point. I've been working with these super abstract component libraries for so long I've stopped thinking about properly formed, accessible HTML. I don't think that's a good thing at all.

So what started out as an exercise in setting up ESLint became an accessibility thought experiment. Amazingly, the most common tips I found were to add `// eslint-disable-next-line` or set `role="presentation"` on the tag...... nope!

I went and had a quick dig around on the very dry, but ever informative, [W3C-WAI pages](https://www.w3.org/WAI/design-develop/) to refresh myself on how I should have approached this.

Putting my best foot forward this is what I came up with:

```jsx
return (
  <section aria-labelledby="gallery-heading">
    <h3 id="gallery-heading" className="visually-hidden">
      Photos of the thing
    </h3>
    <img src={images[active].url} alt={images[active].alt} />
    <ul>
      {images.map((img, i) => (
        <li key={img.id}>
          <button onClick={handleInteraction} onKeyDown={handleInteraction}>
            <img
              data-index={i}
              src={img.url}
              className={i === active ? "active" : ""}
              alt={img.alt}
            />
            <span className="visually-hidden">Select image</span>
          </button>
        </li>
      ))}
    </ul>
  </section>
);
```

Semantically, to me at least, this makes a ton of sense. What are image gallery thumbnails after all, if not an unordered list of buttons, each having the implicit action of "Select image"?

I did scratch my head a bit on the alt text for the thumbnail. At first I changed to an empty alt attribute as you would for an icon button. My thinking was that the alt attribute was redundant with the `visually-hidden` button text, but thinking on, I realised that the image on a thumbnail is definitely not 'presentation-only'.

Without realising, we select certain thumbnails because we are visually drawn to them in some way. To enable a comparable experience for all users, I decided to use the primary alt text on the thumbnail too e.g. _"Large brown labrador jumping over a water sprinkler in a suburban garden"_.

It's easy to imagine a user with a visual-impairment that is not able to easily decipher small images (e.g. thumbnails), but _is_ able to view them well at full size. In that case, the alt text on the thumbnail becomes more important than that of the main image (we should never make assumptions as to why someone may be using a screen reader).

Whether this is the best approach is not really the point. The important takeaway is that when we're working with _so_ many layers of abstraction, in hugely complex applications, it's easy to forget what properly structured, semantic, _accessible_ HTML looks like.

Good reads on the topic:

- [Accessible Icon Buttons](https://www.sarasoueidan.com/blog/accessible-icon-buttons/), _by Sara Soueidan_
- [WebAIM - Screen Reader Survey](https://webaim.org/projects/screenreadersurvey9)
- [W3C WAI - Developing for Web Accessibility](https://www.w3.org/WAI/tips/developing/)
