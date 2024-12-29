<script lang="ts">
  import { applyAction, enhance } from "$app/forms";
  import { goto } from "$app/navigation";
  import { PUBLIC_APP_NAME } from "$env/static/public";
  import { onMount } from "svelte";
  import { slide } from "svelte/transition";
  import {Icons} from "$lib/icons";
  import Icon from "$lib/components/Icon.svelte"
  export let data;
  let password = "";
  let showPassword: boolean = false;
  let loading: boolean = false;
  export let form;

  onMount(() => {
    setTimeout(() => {
      data.expired = false;
    }, 10 * 1000);
  });
</script>

<svelte:head>
  <title>Login | {PUBLIC_APP_NAME}</title>
</svelte:head>

<div class="bg-cat-mantle min-h-screen text-cat-subtext1 bg-no-repeat bg-bottom">
  <form
    use:enhance={({ formElement, formData, action, cancel }) => {
      return async ({ result, action, update }) => {
        loading = true;

        if (result.type === "redirect") {
          goto(result.location);
          return;
        }

        if (result.type === "failure") {
          formElement.reset();
        }

        applyAction(result);
        loading = false;
      };
    }}
    method="POST"
    class="lg:w-1/4 w-9/12 mx-auto gap-6 flex flex-col"
  >
    <img src="icons/logo.svg" alt="Logo" class="w-24 fill-cat-overlay2 mt-28 mx-auto" />
    <h1 class="font-bold text-3xl mt-8">Link Control Panel</h1>
    {#if data.expired}
      <div out:slide role="alert" class="alert alert-info">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span>Your Session Expired. Please Login again!</span>
      </div>
    {/if}

    {#if form?.success === false}
      <div role="alert" class="alert alert-error">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{form?.message}</span>
      </div>
    {/if}

    <input
            id="username"
            name="username"
            class="input input-primary input-bordered w-full"
            placeholder="Username"
            type="text"
            autocomplete="username"
    />

    <!-- Password Field -->
    <div class="relative flex items-center w-full">
      <input
              id="password"
              name="password"
              class="input input-primary input-bordered w-full pr-12"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              autocomplete="current-password"
      />
      <button
              type="button"
              class="absolute right-2 btn btn-sm"
              on:click={() => (showPassword = !showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {#if showPassword}
          <Icon icon={Icons.EyeSlash} />
        {:else}
          <Icon icon={Icons.Eye} />
        {/if}
      </button>
    </div>

    <!-- 2FA Code Field -->
    <input
            id="2fa-code"
            name="MFACODE"
            class="input input-primary input-bordered w-full"
            type="text"
            inputmode="numeric"
            pattern="[0-9]*"
            autocomplete="off"
            maxlength="6"
            placeholder="2FA Code"
            on:input={(e) => {
      e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, "");
    }}
    />

    <!-- Submit Button -->
    <button type="submit" class="btn btn-primary" id="submit-button">
      Login
    </button>
  </form>
</div>