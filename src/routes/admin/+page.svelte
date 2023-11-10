<script lang="ts">
</script>

<form method="post" class="form">
  <div class="buttons">
    <button formaction="?/createCategories"> CREATE TABLE categories </button>
    <button formaction="?/createArticles"> CREATE TABLE articles </button>
    <button formaction="?/createArticlesCategories">
      CREATE TABLE articlesCategories
    </button>
    <button formaction="?/createUsers">CREATE TABLE users</button>
    <button formaction="?/createUserSessions"
      >CREATE TABLE createUsersSessions</button
    >
    <button formaction="?/createUserArticles"
      >CREATE TABLE createUserarticles</button
    >
    <button formaction="?/createComments">CREATE TABLE comments</button>
  </div>
  <div class="buttons">
    <button formaction="?/deleteCategories"> DELETE TABLE categories </button>
    <button formaction="?/deleteArticles"> DELETE TABLE articles </button>
    <button formaction="?/deleteArticlesCategories">
      DELETE TABLE articlesCategories
    </button>
    <button formaction="?/deleteUsers">DELETE TABLE users</button>
    <button formaction="?/deleteUserSessions">DELETE TABLE UsersSessions</button
    >
    <button formaction="?/deleteUserArticles">DELETE TABLE UserArticles</button>
    <button formaction="?/deleteComments">DELETE TABLE Comments</button>
  </div>
</form>
