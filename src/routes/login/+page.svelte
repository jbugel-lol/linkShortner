<script lang="ts">
  import { goto } from "$app/navigation";

  let wrongPassword = false;
  let password = "";
  let loading: boolean = false;

  async function login() {
    loading = true;
    if (password.length < 6) {
      password = "";
      loading = false;
      return;
    }

    const request = await fetch("/login", {
      method: "POST",
      body: JSON.stringify({ password }),
    });

    const { success } = await request.json();

    if (success) {
      goto("/admin");
    } else {
      password = "";
      wrongPassword = true;
    }
    loading = false;
  }
</script>

<svelte:head>
  <title>Login | {import.meta.env.VITE_WEBSITE_DOMAIN}</title>
</svelte:head>
<div class="bg-cat-mantle min-h-screen text-cat-subtext1 bg-[url('/wave.svg')] bg-no-repeat bg-bottom">
  <div class="lg:w-1/4 w-9/12 mx-auto gap-6 flex flex-col">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-24 fill-cat-overlay2 mt-28 mx-auto">
      <path
        fill-rule="evenodd"
        d="M19.902 4.098a3.75 3.75 0 0 0-5.304 0l-4.5 4.5a3.75 3.75 0 0 0 1.035 6.037.75.75 0 0 1-.646 1.353 5.25 5.25 0 0 1-1.449-8.45l4.5-4.5a5.25 5.25 0 1 1 7.424 7.424l-1.757 1.757a.75.75 0 1 1-1.06-1.06l1.757-1.757a3.75 3.75 0 0 0 0-5.304Zm-7.389 4.267a.75.75 0 0 1 1-.353 5.25 5.25 0 0 1 1.449 8.45l-4.5 4.5a5.25 5.25 0 1 1-7.424-7.424l1.757-1.757a.75.75 0 1 1 1.06 1.06l-1.757 1.757a3.75 3.75 0 1 0 5.304 5.304l4.5-4.5a3.75 3.75 0 0 0-1.035-6.037.75.75 0 0 1-.354-1Z"
        clip-rule="evenodd"
      />
    </svg>
    <h1 class="font-bold text-3xl mt-8">Link Control Panel</h1>
    <input class="rounded-xl p-4 bg-cat-crust placeholder:text-cat-text focus-within:outline-none focus-within:ring-2 ring-cat-flamingo" bind:value={password} placeholder="Password" type="password" />
    <input
      class="rounded-xl p-4 bg-cat-crust placeholder:text-cat-text focus-within:outline-none focus-within:ring-2 ring-cat-flamingo"
      type="text"
      inputmode="numeric"
      pattern="[0-9]*"
      autocomplete="one-time-code"
      maxlength="6"
      placeholder="2FA-Token"
      oninput="this.value = this.value.replace(/[^0-9]/g, '');"
    />
    <button
      on:click={() => {
        login();
      }}
      disabled={password.length < 6}
      class="bg-cat-blue text-cat-crust rounded-xl p-3 font-bold mt-2 disabled:opacity-75 disabled:cursor-not-allowed disabled:bg-cat-overlay1"
      id="button"
    >
      {#if loading}
        <p class="animate-pulse">Logging you in...</p>
      {:else}Login{/if}</button
    >
  </div>
</div>
