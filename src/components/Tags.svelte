<script>
  export let tags, toggleFilter, filterByTags;
</script>

<div>
  {#if tags && tags.length}
    <div class="tags flex-row-wrap">
      {#each tags as tag, idx}
        <div
          class="tag {filterByTags.includes(tag) ? 'selected' : ''}"
          on:click={() => toggleFilter(tag)}
        >
          {tag}
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .tags {
    margin-top: .6rem;
  }
  .tag {
    background: var(--tag-bg);
    border-radius: 5px;
    color: var(--tag-font-color);
    font-size: 0.8rem;
    padding: 5px 8px;
    margin-right: 5px;
    cursor: pointer;
  }
  .tag.selected {
    background: var(--tag-selected);
    border: 1px solid var(--tag-bg);
  }
</style>
