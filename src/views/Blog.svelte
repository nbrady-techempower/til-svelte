<script>
  import { Link } from "svelte-routing";
  import config from "../config";
  import marked from "../utils/marked";
  import AuthorCallout from "../components/AuthorCallout.svelte";
  export let blog, prevBlog, nextBlog;

  let width = 0;
  const html = document.querySelector("html");
  const getReaderPerc = () => {
    const totalHeight = html.scrollHeight;
    const currHeight = window.pageYOffset + html.clientHeight;
    return Math.round((currHeight / totalHeight) * 100);
  };
  const onScroll = () => width = getReaderPerc();
  window.addEventListener("scroll", onScroll, false);

  let text;
  async function getData() {
    let data = await fetch(`/assets/blogs/${blog.slug}/index.md`);
    text = marked(await data.text());
  }
  getData();
</script>

<div>
  <div class="progress-bar" style="width: {width}%;"></div>
  <div class="blog-title title-font">
    <Link to="/">{config.blogTitle}</Link>
  </div>

  <div class="post-header">
    <div class="post-title title-font">{blog.title}</div>
    <div class="date">{blog.date}</div>
  </div>

  {#if text}
    <div class="post-text colored-links">
      {@html text}
    </div>
  {:else}
    <div>Loading ...</div>
  {/if}

  <div class="blog-title title-font blog-title-bottom">
    <Link to={"/"}>{config.blogTitle}</Link>
  </div>
  <AuthorCallout />
  <div class="more-posts flex-row-wrap colored-links">
    {#if prevBlog}
      <div class="flex-1">
        <Link to={"/" + prevBlog.slug}>← {prevBlog.title}</Link>
      </div>
    {/if}
    {#if nextBlog}
      <div class="flex-1">
        <Link to={"/" + nextBlog.slug}>{nextBlog.title} →</Link>
      </div>
    {/if}
  </div>
</div>

<style>
  .progress-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: #d47ee9;
  }
  .blog-title {
    color: #d47ee9;
    font-size: 1.3rem;
    margin-bottom: 4.5rem;
  }
  .blog-title-bottom {
    margin-bottom: 2rem;
  }
  .post-header {
    margin-bottom: 3rem;
  }
  .post-title {
    font-size: 2.3rem;
    margin-bottom: 0.5rem;
    color: white;
  }
  .post-header .date {
    font-size: 0.8rem;
  }

  .post-text {
    line-height: 1.8rem;
    margin-bottom: 4.5rem;
  }

  .post-text :global(img) {
    display: flex;
    margin-left: auto;
    margin-right: auto;
    margin-top: 2rem;
    margin-bottom: 2rem;
    max-width: 90%;
  }

  .post-text :global(code) {
    color: #fff;
    font-family: Consolas, Menlo, Monaco, source-code-pro, Courier New,
      monospace;
    font-feature-settings: normal;
    background-color: #373c49;
    border-radius: 3px;
    padding: 0.2rem 0.4rem;
  }

  .post-text :global(pre) {
    background-color: #011627 !important;
    padding: 1rem;
    border-radius: 10px;
    background: none;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;
    margin-bottom: 0;
    tab-size: 4;
    hyphens: none;
    overflow: auto;
  }

  .post-text :global(pre code) {
    background-color: #011627;
  }

  .post-text :global(blockquote p:before) {
    content: '“';
    color: #d47ee9;
    font-size: 2.2rem;
    font-weight: bold;
    margin-right: .3rem;
  }
  .post-text :global(blockquote) {
    /*color: #b1b1b1;*/
    font-size: 1.5rem;
    padding-top: .8rem;
    padding-bottom: .8rem;
  }
  .post-text :global(blockquote p) {
    margin: 0;
    display: inline-block;
  }

  .post-text :global(.youtube) {
    display: flex;
    width: 80%;
    height: 41.1vw;
    margin: 3rem auto;
    max-height: 283.5px;
  }
</style>
