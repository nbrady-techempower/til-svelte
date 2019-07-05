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
    background: #573a5f;
    border-radius: 5px;
    color: white;
    font-size: 0.8rem;
    padding: 5px 8px;
    margin-right: 5px;
    cursor: pointer;
  }
  .tag.selected {
    background: #785482;
    border: 1px solid #573a5f;
  }
</style>
