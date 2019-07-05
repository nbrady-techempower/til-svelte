Someone at work started talking about [Svelte](https://svelte.dev/)
recently while taking some jabs at [React](https://reactjs.org/).
Taking jabs at React is a fairly common thing, specifically
because that dang bundle size and shipping the entire web with one
SPA. I get it, but I mostly ignore it, because React is so much fun to
work with; especially now with [React Hooks](https://reactjs.org/docs/hooks-intro.html).
Not to mention their documentation is the best I've ever seen and the
community, even the core contributors, are supportive and incredibly
accessible.

So, whenever there's a new "contender" on the market, I'm ready to blow
it off without giving it a second look. I did that with Svelte and wen't
about my day. It was around the time I started this blog. I looked over
the documentation; I saw some examples. It reminded me a bit of Vue, which
I've tried, and then I went ahead and wrote this site with React Hooks.

But the noise, it grew louder.

So, I took a closer look. I'll quote a friend who is also a React lifer.

> Oh no, this might be good.

## The Psychology of Changing Technologies

I'd be remiss if I didn't first take some time to talk about the psychology
behind making this move. _(Spoiler: it is a move.)_ I've been tinkering with
React since _0.14_ and have felt like an **expert** through the
original functional model, to class components, and now to hooks.
I don't answer a ton of Stack Overflow questions, but some of my
most [upvoted answers](https://stackoverflow.com/a/42844911/1311545)
are within the scope of React. So when someone challenges React, it feels
personal. Developers and people with analytical jobs aren't sheltered from
the same kind of cognitive dissonance that you might see in politics; I'll
defend _Technology A_ because that's **my** team, even if I don't have all
the facts, or even if presented with facts that debunk my claims.

It's hard to admit that you're wrong, but here it is. I was wrong. I spent the
first few tutorials saying, "This is crap. Ugh, this is crap," over and over
in my head until, suddenly, it wasn't crap...

## Rich Harris

I probably wouldn't have given Svelte a hard second look if it wasn't for
[Rich Harris](https://twitter.com/Rich_Harris). I've actually read some of
his stuff, like [Top-level await is a footgun](https://gist.github.com/Rich-Harris/0b6f317657f5167663b493c722647221),
before realizing he was the Svelte guy.

This was the talk that did it, and I highly recommend giving it a watch.

[youtube=AdNJ3fydeao]

This slightly older one is also great, mostly for the storytelling
in the beginning.

[youtube=qqt6YxAZoOc]

## Transitioning From React

If you're familiar with React, and you know _(and love)_ `styled-components`,
Svelte will be relatively easy. Like most of my single-file React components,
you have a place for your JavaScript, your styles, and your templating:

```
<script>
  // write some javascript
</script>

<div>
  Just regular old html with some mustache-like templating
</div>

<!-- I prefer my styles at the end -->
<style>
  div {
    font-weight: 800;
  }
</style>
```

Overall, it feels pretty intuitive. There are some things I'm not a fan of, like
in order to use a prop in a child component, you need to declare it with the
`export` keyword, like `export let myPropFromParent;` On the one hand, this is
great because you're being explicit about what the props for this component are.
On the other hand, the use of the `export` keyword is confusing. I understand
that some JavaScript keywords were co-opted, such that IDE's wouldn't complain,
but I suspect that as support for Svelte grows, and the fact that it's compiled,
they'll introduce some of their own keywords. They use valid JavaScript syntax
_(labels)_ to denote a reactive variable, like `$: myVar`. Since they use the
terms "props" and "children" in their nomenclature, maybe a label would have
been better: `props: myPropFromParent, anotherProp;`

I rewrote this blog application, pixel for pixel, in about 2 hours and without
a real deep knowledge of Svelte. React components were just easy to reason
about in Svelte. I think that's a credit to both technologies.

## What to Use in the Future

This doesn't mean I'm ditching React forever, but I think I'll be writing a
lot of things in Svelte and hope to have a better understanding of the entire
ecosystem. At the rate the current React core team issues updates and
improvements, there's always something to be excited about. Maybe there's
room in my heart for both of you.

Maybe I'll come back here and add more to this, but this wasn't meant to be
a tutorial and I've only scratched the surface.

[Here's the rewrite of the blog app](https://github.com/nbrady-techempower/til-svelte)
