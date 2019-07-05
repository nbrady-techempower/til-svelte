I recently went through the process of optimizing a website that wasn't mine.
The work was mostly tedious, in that I was simply searching for common tags like
`<img>` and applying techniques that should have been done first, especially for
a site with so much traffic.

First, these are two sites you simply can't overlook when it comes to identifying
areas of opportunity.

 * [Google's PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/)
 * [webpagetest.org](https://www.webpagetest.org/)

Anything I talk about here would be identified in those sites, but I'd like to talk
about the things that I believe should be habit, the same way you wouldn't type an `<img>`
tag without thinking about it's `src` attribute.

## Get the Picture?

So, let's start with the `<img>` tag. From now on, when you think about `<img>` you should
be thinking `<picture>` ([MDN Picture Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture)).
What `<picture>` allows us to do is use the newest optimized web formats for our image assets
while setting fallbacks for browsers that don't yet support them. You make have hacked something
like this together at some point:

```html
<img src="/images/dogs.png" alt="My Dogs">
<img class="hide-if-ie" src="/images/dogs.webp" alt="My Dogs">
```

Using some browser detection library you could determine if the user is on IE or Edge, and
`display: none;` the content that wouldn't work there. The problem with this is, though you'll
get the desired result, you're still requesting both assets from the server. Let's see it
with `<picture>`:

```html
<picture>
  <source srcset="/images/dogs.webp" type="image/webp">
  <source srcset="/images/dogs.png" type="image/png">
  <img src="/images/dogs.png" alt="My Dogs">
</picture>
```

What the browser is doing _(simplified)_ is checking for the first `source` that it supports
and setting the `<img> src` attribute to it. The browser will only request that single asset,
saving you and your user some valuable bandwidth.

Now, I used Internet Explorer in my first example, but the truth is `<picture>` doesn't actually
work there. What's happening on IE _(who knows what's actually happening on IE)_ is it's
ignoring the `<picture>` and `<source>` tags and simply rendering the `<img>` asset which
still accomplishes exactly what we want. For the browsers that do support `<picture>` but don't
support `.webp`, you'll get the `.png` asset without requesting both from the server.

#### Wait, what even is .webp?

Oh, right. WebP is an image format developed by Google with much better compression than
most supported web image formats. [Here](https://developers.google.com/web/tools/lighthouse/audits/webp)
are docs on some of the "next-gen" image formats you may want to support. 
[cwebp](https://developers.google.com/speed/webp/docs/cwebp) is a really cool WebP encoder
that I used recently. Here's a quick and dirty `bash` line that will take all your `.png`s
and encode some `.webp`s alongside them at 75% quality. _(This is the quality setting where
I can't notice a difference but get the greatest gains in compression)_

```bash
for file in *.png ; do cwebp -q 75 "$file" -o "${file%.png}.webp"; done
```

#### While We're Here

Don't forget your `alt` attributes. Optimizations are all for not if your site isn't
accessible to all. Most of us are using IDE's and linters that will scream at us if
the `alt` attribute is missing, but don't let it come to this!

## Size Matters

You've set a max width in your css of 700px for some image, but the image that's sitting
on the server is 1200px. When you request that image, the server is sending you the full
size image and the browser is resizing. If you know that your image is never going to be
more than 700px wide, do yourself a favor and resize the origin image to be 700px.

If you have Photoshop, or some other program that let's you export images to `.png`,
take a look at the extra settings while you're exporting. Sometimes you'll have an image that
is completely opaque, but there's a `transparency` option selected that makes the image
larger than it needs to be. Check that off if your image isn't transparent.

## Caching Policies

If you have control over the server your assets are originating from, ensure that you
have an effective caching policy for each image type. This includes fonts, images,
videos, etc. If people are coming back to your page, this will make subsequent
page loads much faster. 
[Here's more information](https://developers.google.com/web/tools/lighthouse/audits/cache-policy)

## Deferring Images

I'm not going to go into this too deep and pretend it's "simple optimizations" though it would
be great if you had some toolkit prepared for this type of thing. The page I was working
on shaved more than 30 seconds off the time to being interactive by deferring offscreen
images until all the visible assets were loaded. You don't have to get too complicated,
[using the intersection observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API),
but you could opt to add some simple JavaScript that loads non-vital images after all
initial assets have finished loading.

Another trick I've used recently is loading images "below the fold" once a user starts
scrolling:

```
// Our html may have img tags that look like this:
<img alt="My Dog" src="_blank.png" data-src="dog.png">
<img alt="My Other Dog" src="_blank.png" data-src="other_dog.png">

// Our js
const imgs = document.querySelectorAll(img);

function onScroll() {
  // the user started scrolling, remove this listener and
  // replace some of our img src attributes with their final form.
  window.removeEventListener("scroll", onScroll, false);
  
  // Go through all the images on our page & find the ones that have
  // a data-src attribute then replace the src attribute w/that value
  for (let i = 0; i < imgs.length; i++) {
    if (imgs[i].dataset.src) {
      imgs[i].src = imgs[i].dataset.src;
    }
  }
}

window.addEventListener("scroll", onScroll, false);
```

## Don't Flame Me

![You're a hypocrite](/assets/blogs/simple-img-optimizations/hypocrite.png)

You're viewing the page source and checking the network tab and you're thinking,
"Well this guy's a hypocrite." You're right, at the time of writing this, there
are some things I haven't gotten around to, mostly because the content you see here
is written in markdown and that's passed through a markdown-to-html generator and
I just haven't gotten around to adding some custom parsers, but I will... I promise.

