# Today I learned - Blog

[https://til.evermoredev.com](https://til.evermoredev.com)

This is a personal blog project with a simple look and feel
in the style of Dan Abramov's [Overreacted](https://overreacted.io)
but written with Svelte.

Want to steal for yourself?

Fork the repo and edit the files in the `src/config` folder. They're
pretty self explanatory. Make sure the `slug` property in `src/config/blogEntries.js`
matches a folder in `public/assets/blogs`. The blog entries later in the array
are displayed first; they're not sorted by date.

I plan on adding more configurable options, including some themes, shortly.

To run locally, simply:

```bash
yarn

yarn start
```

Build for production:

```bash
yarn build
```

## Custom Markdown

Any `.png` and `.jpeg` images will produce a `<picture>` tag in the html
output and include a `srcset` attribute for that image's `.webp` counterpart.
So, make sure you have the `.webp` counterpart in the same location.

`[youtube=someVideoID]` will produce an embedded YouTube player for that video

## TODOs

 - [ ] Embedded twitter markdown
 - [ ] Static site generator, or nah?
 - [ ] Meta site info and for individual blog posts
 - [ ] Automatic deployments
 - [ ] Comments with discord or something?
