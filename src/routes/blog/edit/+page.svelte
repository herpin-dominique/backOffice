<script lang="ts">
  import { superForm } from "sveltekit-superforms/client";
  import SuperDebug from "sveltekit-superforms/client/SuperDebug.svelte";

  export let data;

  // Client API:
  const { form, enhance } = superForm(data.form, {
    dataType: "json",
  });
</script>

<SuperDebug data={$form} />

<p>Editeur de Blog</p>

<form method="POST" use:enhance>
  <label>
    Titre :
    <input name="title" type="text" bind:value={$form.title} />
  </label>
  <label>
    Auteur :
    <input name="author" type="text" bind:value={$form.author} />
  </label>
  <label>
    Date :
    <input name="date" type="date" bind:value={$form.date} />
  </label>
  <label>
    Article :
    <textarea name="article" bind:value={$form.content} />
  </label>
  <label>
    URL du média :
    <input name="media.url" type="text" bind:value={$form.media.url} />
  </label>
  <label>
    Type du média :
    <select name="media.type" bind:value={$form.media.type}>
      <option value="image">image</option>
      <option value="video">video</option>
    </select>
  </label>

  <button formaction="?/sauvegarder">sauvegarder</button>
  <button formaction="?/publier">publier</button>
</form>

<form method="POST">
  <input type="hidden" name="id" value="69" />
  <button formaction="?/abandonner">abandonner</button>
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    max-width: 400px;
    margin: 0 auto;
  }

  label {
    margin-bottom: 10px;
    font-weight: bold;
  }

  input,
  textarea {
    width: 100%;
    padding: 8px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }

  button {
    background-color: #4caf50;
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }

  button:hover {
    background-color: #45a049;
  }

  p {
    color: #4caf50;
    font-weight: bold;
  }
</style>
