<script>
  export let blog;

  const disqus_config = function() {
    this.page.url = `/${blog.slug}`;
    this.page.identifier = blog.slug; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
  };

  (function() {
    // DON'T EDIT BELOW THIS LINE
    var d = document,
      s = d.createElement("script");
    s.src = "https://til-evermoredev.disqus.com/embed.js";
    s.setAttribute("data-timestamp", +new Date());
    (d.head || d.body).appendChild(s);
  })();
</script>

<div id="disqus_thread" />

<style>
  #disqus_thread {
    margin: 4rem 0;
  }
</style>
