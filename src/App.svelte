<script>
  import { Router, Link, Route } from "svelte-routing";
  import blogEntries from "./config/blogEntries";
  import config from "./config";

  import BlogView from "./views/Blog.svelte";
  import HomeView from "./views/Home.svelte";

  import Footer from "./components/Footer.svelte";

  export let url = "";
</script>

<Router {url}>
  <Route path="/">
    <HomeView />
  </Route>

  <Route>
    <BlogView
      path="/light-theme"
      blog={{ title: 'A Light Theme?', date: 'Never', slug: 'light-theme' }} />
  </Route>

  {#each blogEntries as blog, idx}
    <Route path={blog.slug}>
      <BlogView
        {blog}
        nextBlog={blogEntries[idx - 1]}
        prevBlog={blogEntries[idx + 1]} />
    </Route>
  {/each}
</Router>

<Footer />
