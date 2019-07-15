<script>
  import config from "../config";
</script>

<footer class="colored-links">
  <div>
    <a href={config.twitterLink}>Twitter</a>
    &nbsp;•&nbsp;
    <a href={config.githubLink}>GitHub</a>
  </div>
  <div class="copyright">
    Copyright {new Date().getFullYear()} {config.author}
  </div>
</footer>

<style>
  footer {
    margin-top: 3rem;
    margin-bottom: 3rem;
  }
  .copyright {
    margin-top: 3rem;
    font-size: 0.7rem;
    color: darkgray;
  }
</style>
