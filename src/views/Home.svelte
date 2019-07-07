<script>
  import config from "../config";
  import blogEntries from "../config/blogEntries";
  import AuthorCallout from "../components/AuthorCallout.svelte";
  import Tags from "../components/Tags.svelte";
  import { slide } from "svelte/transition";

  let availableTags = [];
  blogEntries.forEach((b) => (availableTags = availableTags.concat(b.tags)));
  availableTags = Array.from(new Set(availableTags));

  let filterByTags = [];
  let showFilters = false;
  const toggleFilter = (tag) => {
    const newFilter = filterByTags.slice();
    const idx = newFilter.indexOf(tag);
    console.log(newFilter, tag, idx);
    if (idx > -1) {
      newFilter.splice(idx, 1);
    } else {
      newFilter.push(tag);
    }

    filterByTags = newFilter;
  };

  /**
  * shouldShow() is being used in an #if block within an #each block
  * below, but that part of the component isn't re-rendering when
  * filterByTags changed. We could achieve the re-rendering in two ways:
  *
  * 1) {#if filterByTags && shouldShow(blog)}
  *   Now that we've added filterByTags to the expression, if filterByTags
  *   is reassigned, the expression is re-evaluated and the block is re-rendered.
  *   This is how I was doing it before.
  *
  * 2) We don't mess with the logic and instead make a reactive function. If
  *    any of the outer scoped variables used within shouldShow change, shouldShow
  *    will update and any block referencing shouldShow will be re-evaluated.
  */
  $: shouldShow = (blog) => {
    if (filterByTags.length > 0) {
      // this post doesn't have tags
      if (!blog.tags) return false;
      // if the post has at least one tag in filterByTags, show it
      let found;
      for (let i = 0; i < filterByTags.length; i++) {
        if (blog.tags.includes(filterByTags[i])) {
          found = true;
        }
      }
      return found;
    }
    return true;
  }
</script>

<!-- Component -->
<div class="home">
  <header class="flex-row flex-jcc flex-aic">
    <div class="title-font blog-name flex-1">{config.blogTitle}</div>
    <a href="/light-theme">
      <img src="/assets/images/theme-toggle.png" alt="theme toggle" />
    </a>
  </header>

  <AuthorCallout />

  <div class="filter-group">
    <div
      class="filter-header flex-row flex-aic"
      on:click={() => showFilters = !showFilters}
    >
      <div class="triangle {showFilters ? 'down' : 'right'}"></div>
      Filter Posts by Tags
      {#if filterByTags.length}
        <span
          class="clear-filter"
          on:click|stopPropagation={() => filterByTags = []}
        >
          &nbsp;(Clear All)
        </span>
      {/if}
    </div>
    {#if showFilters}
      <Tags tags={availableTags} {toggleFilter} {filterByTags} />
    {/if}
  </div>

  {#each blogEntries as b}
    {#if shouldShow(b)}
        <div class="post" transition:slide={{ duration: 200 }}>
          <div class="title-font post-title">
            <a href="{'/' + b.slug}">{b.title}</a>
          </div>
          <div class="post-stats flex-row flex-aic">
            <div class="date">{b.date}</div>
          </div>
          <div class="preview">{b.preview}</div>
          <Tags tags={b.tags} {toggleFilter} {filterByTags} />
        </div>
    {/if}
  {/each}

</div>

<style>
  header {
    color: white;
    font-size: 2rem;
    line-height: 2.6rem;
    margin-bottom: 2.25rem;
  }
  img {
    height: 38px;
    margin-top: 10px;
  }
  .filter-group {
    margin-bottom: 1rem;
  }
  .filter-header {
    font-size: 0.85rem;
    cursor: pointer;
  }
  .post {
    margin-bottom: 3.5rem;
  }
  .post-title {
    color: var(--main-highlight-color);
    font-size: 1.65rem;
    margin-bottom: 0.6rem;
  }
  .post-stats {
    font-size: 0.8rem;
    margin-bottom: 0.6rem;
  }
  .triangle {
    width: 0;
    height: 0;
    margin-right: .3rem;
  }
  .triangle.right {
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    border-left: 6px solid var(--main-highlight-color);
  }
  .triangle.down {
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid var(--main-highlight-color);
  }
</style>
