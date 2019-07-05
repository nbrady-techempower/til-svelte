/**
 * This file adds some additional options on top of the marked
 * package at https://marked.js.org
 */

import marked from "marked";
import hljs from "highlight.js";

// Customize some markdown stuff
const renderer = new marked.Renderer();

renderer.image = function(href, title, text) {
  let webpSrc, pngFound, jpegFound;
  if (href.includes(".png")) {
    pngFound = true;
    webpSrc = href.replace(".png", "") + ".webp";
  }
  if (href.includes(".jpeg")) {
    jpegFound = true;
    webpSrc = href.replace(".jpeg", "") + ".webp";
  }
  if (!title) title = text;
  return `
    <picture>
      ${(webpSrc && `<source srcset="${webpSrc}" type="image/webp">`) || ""}
      ${(pngFound && `<source srcset="${href}" type="image/png">`) || ""}
      ${(jpegFound && `<source srcset="${href}" type="image/jpeg">`) || ""}
      <img src="${href}" title="${title}" alt="${text}">
    </picture>
  `;
};

marked.setOptions({
  renderer,
  highlight: function(code) {
    return hljs.highlightAuto(code).value;
  },
  image: function() {
    return "";
  }
});

export default marked;
