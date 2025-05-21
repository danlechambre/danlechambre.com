---
title: Testing
description: Learnings on testing, and why I should be better at it
createdDate: "2025-05-21"
lastUpdatedDate: "2025-05-21"
state: notion
tags: ["web-dev"]
---

<p class="md-wip">

Introductory context to come

</p>

It turns out, that testing is in fact a weakness in my technical repertoire. This is unsurprising given that most projects I've worked on have placed expedience of delivery over all else. But having reflected a bit on my experience I believe that the absence of (the right sort of) testing is a form of silent technical debt that you don't even realise you're paying back most of the time.

I think the reason it becomes an easy way to accumulate technical debt is that its passively taken on as opposed to considered upfront and discussed. For example, when you implement something that you know isn't going to scale very well, but the sub-optimal approach you've taken allows you to get the feature out on time, this will normally be discussed during a pull request or prior to building, the tradeoffs will be considered, and the debt accepted. If you're being really fastidious you might even create a ticket for it

Testing is a little different. If we choose not to implement automated tests for something, we still do so because we're claiming some upfront time saving with the same goal of shipping the feature quicker, but the debt is rarely considered or quantified.

Inevitably, a few days, weeks, or months pass, and all of a sudden you're working on a bug related to that feature. A bug that could have been avoided had the correct testing infrastructure been in place. But will the hours this bug soaks up be considered payment of technical debt? Not likely. More likely it will be treated as, well, just a bug.

But, the sort of testing I've done so far in my career is a bit of a mixed bag. Some of it I've seen value in, but mostly the testing always feels misguided, and sometimes doesn't even test against production code.

So what's the crack? What is the right approach _most_ of the time?
