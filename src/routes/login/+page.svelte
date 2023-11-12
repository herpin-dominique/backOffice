<script lang="ts">
  import type { PageData } from "./$types";
  import { onMount } from "svelte";
  import { userSession } from "$lib/store/user";
  import { goto } from "$app/navigation";

  export let form;
  onMount(() => {
    if (form?.success) {
      if (form.isAdmin) {
        userSession.set({
          isLogged: true,
          role: "admin",
        });
        goto("/admin/init");
      } else {
        userSession.set({
          isLogged: true,
        });
        goto("/");
      }
    }
  });
</script>

{#if form === null}
  <form class="login-form" method="post" action="">
    <label for="email"><b>Email</b></label>
    <input type="text" name="email" id="email" required />

    <label for="password"><b>Password</b></label>
    <input type="password" name="password" id="password" required />

    <input type="submit" value="login" formaction="?/login" />
  </form>
{:else if form.success}
  <!-- this message is ephemeral; it exists because the page was rendered in
		   response to a form submission. it will vanish if the user reloads -->
  <p>Success</p>
{:else}
  <p>failure</p>
{/if}

<style>
  .login-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 400px;
    margin: auto;
    padding: 20px;
    background-color: rgba(241, 241, 241, 0.6);
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  .login-form label {
    margin-top: 10px;
  }
  .login-form input[type="text"],
  .login-form input[type="password"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
    font-size: 16px;
  }
  .login-form input[type="submit"] {
    width: 100%;
    padding: 10px;
    margin-top: 20px;
    background-color: #00ccff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
  }
  @media screen and (max-width: 768px) {
    .login-form {
      max-width: 300px;
    }
  }
</style>
