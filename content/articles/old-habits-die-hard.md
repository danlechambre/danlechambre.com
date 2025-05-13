---
title: Old Habits Die Hard
description: Questioning long held assumptions in HTML
createdDate: "2025-05-13"
lastUpdatedDate: "2025-05-13"
state: forming
tags: ["web-dev", "css"]
---

I was recently giving a good old think to [CSS Resets](/writing/css-reset), and came across a rule in [Andy Bell's reset](https://piccalil.li/blog/a-more-modern-css-reset/) that made me sit back and think about some of the things we do reflexively as web developers, that we could do to think about a little more.

The rule was this one:

```css
/* Remove list styles on ul, ol elements with a list role, which suggests default styling will be removed */
ul[role="list"],
ol[role="list"] {
  list-style: none;
}
```

I didn't understand this one at first. But that's because I wasn't aware that Safari did [this](https://bugs.webkit.org/show_bug.cgi?id=170179). So Andy's rule is a way of being kind to your future self, prompting you to add the accessibility role back to get your tasty reset.

But wait... think about this for a moment. Specifically consider Safari's justification for doing this:

> Basically, if you remove all default visible indication of the list, there is no indication to a sighted user or screen reader user that the content is a list.

Whether or not you think Apple are overstepping their role is by the by. The point I want to get at is how many times have you reached for `<ul>` reflexively without really considering it's semantic value? Consider this example:

```html
<ul>
  <li>
    <article>
      <h2>Why The Sky Is Blue</h2>
      <p>Or why I stopped using unordered lists in all my markup</p>
    </article>
  </li>
  <!-- Other articles -->
</ul>
```

What, semantically speaking, is the list bringing to the party? If you're answer is either "hooks for styling" or "that's what I've always done", then maybe now is a good time to question long held assumptions.

We can probably trace this habit back to only having `<div>` as a sectioning element:

```html
<ul>
  <li>
    <div>
      <h2>Why The Sky Is Blue</h2>
      <p>Or why I stopped using unordered lists in all my markup</p>
    </div>
  </li>
  <!-- Other articles -->
</ul>
```

In this above example, the `<ul>` helps to apply some semantic order, but we live in a time when we have more HTML elements to choose from than ever before. I'd go so far as saying, we can probably reserve our HTML lists for, you know, lists.
