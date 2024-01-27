<script>
  import { goto } from "$app/navigation";
  import Modal from "$lib/components/Modal.svelte";

  let wrongPassword = false;
  let password = "";

  async function submit() {
    const response = await fetch("/login", {
      method: "POST",
      body: JSON.stringify({ password }),
    });

    const { success } = await response.json();

    if (success) {
      goto("/admin");
    } else {
      password = "";
      wrongPassword = true;
    }
  }
</script>

<div class="bg-cat-mantle min-h-screen text-cat-subtext1">
  <div class="lg:w-1/4 w-11/12 mx-auto flex flex-col gap-2">
    <h1 class="font-semibold text-xl mt-8">Link Control Panel</h1>
    <input
      class="rounded-lg p-2 bg-cat-crust placeholder:text-cat-text"
      bind:value={password}
      placeholder="Password"
      type="password"
      id="Password"
      name="Password"
    />
    <button
      on:click={submit}
      class="bg-cat-green text-cat-crust rounded-lg p-2 font-bold mt-4"
      type="button"
      id="button">Login</button
    >

    <Modal bind:showModal={wrongPassword}>
      <p slot="header" class="text-3xl font-bold">Incorrect Password</p>
      <div class="flex flex-col gap-3 mb-8">
        Please enter the correct password and try again.
      </div>
    </Modal>
  </div>
</div>
