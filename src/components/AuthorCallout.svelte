<script>
  import config from "../config";
</script>

<div class="author-callout flex-row colored-links">
  <img src={config.authorImg} alt={config.author} />
  <div class="flex-col flex-jcc">
    <div class="authored-by">
      A blog by
      <a href={config.twitterLink}>{config.author}</a>
    </div>
    <div>{config.authorQuote}</div>
  </div>
</div>

<style>
  .author-callout {
    margin-bottom: 5rem;
  }
  .authored-by {
    margin-bottom: 0.3rem;
  }
  img {
    margin-right: 0.875rem;
    margin-bottom: 0;
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
  }
</style>
