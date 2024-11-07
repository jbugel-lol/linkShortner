<script lang="ts">
  import CountryView from "$lib/components/CountryView.svelte";
  import CreateLink from "$lib/components/CreateLink.svelte";

  export let data;
  let links = data.data;
  let newLinkModal = false;

  function getFavicon(url: string | null) {
    const domain = new URL(url ?? "").hostname;
    return "https://favicone.com/" + domain + "?s=24";
  }

  async function deleteURL(id: string | null) {
    const res = await fetch("/admin/delete", {
      method: "POST",
      body: JSON.stringify({
        id: id,
      }),
    });

    const status = res.status;
    if (status == 200) {
      links = links.filter((v: any) => v.id !== id);
      return;
    }

    const data = await res.json();
    if (!data.success) {
      alert(data.message);
      return;
    }
  }
</script>

<svelte:head>
  <title>Admin | {import.meta.env.VITE_WEBSITE_DOMAIN}</title>
</svelte:head>
<div class="bg-cat-crust min-h-screen text-cat-text">
  <nav class="flex justify-between p-8">
    <div class="font-bold text-2xl">{import.meta.env.VITE_WEBSITE_DOMAIN}</div>
    <div class="flex items-center flex-row-reverse gap-6">
      <button
        on:click={() => {
          newLinkModal = true;
        }}
        class="btn btn-secondary"
      >
        <img class="w-6" src="icons/plusicon.svg" alt="" />
        Create Link</button
      >
      <a href="/admin/settings" data-sveltekit-preload-data class="btn btn-accent">
        <img class="w-6" src="icons/settings.svg" alt="Settings" />
        <p>Settings</p>
      </a>
    </div>
  </nav>
  <CreateLink bind:newlink={newLinkModal} bind:links />

  {#if !data.country_code_detected}
    <div role="alert" class="alert alert-warning max-w-xl mx-auto my-8">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <span>Country Headers are not detected!</span>
    </div>
  {/if}

  <div class="flex flex-col gap-4 xl:w-1/2 w-11/12 mx-auto">
    {#each links as { location, id, clicks }}
      <div class="bg-ctp-mantle flex lg:flex-row flex-col gap-6 justify-between items-center p-4 lg:p-6 lg:px-8 lg:rounded-xl rounded-2xl group">
        <div class="grow font-semibold flex items-center gap-3 w-1/2">
          <img class="w-8" src={getFavicon(location)} alt="Favicon" />
          <div class="flex flex-col gap-1 text-start">
            <p>{id}</p>
            <p class="text-accent text-xs font-medium">{location?.replace("https://", "")}</p>
          </div>
        </div>
        <div class="flex gap-2 items-center bg-cat-surface0 p-1 px-3 rounded-full group/countries relative hover:cursor-pointer">
          <img class="w-4" src="icons/clickCount.svg" alt="Clickcount" />
          {clicks == null ? 0 : clicks}
          <!-- <CountryView countries={country_clicks} /> -->
        </div>
        <div class="flex gap-4 items-center">
          <button
            class="hover:fill-cat-red fill-ctp-red"
            on:click={() => {
              deleteURL(id);
            }}
          >
            <img class="w-5" src="icons/trash.svg" alt="Delete Link" />
          </button>
        </div>
      </div>
    {:else}
      <div class="mx-auto w-max mt-12 text-xl font-bold">Such Empty :3</div>
    {/each}
  </div>
</div>
<div class="fixed bottom-4 right-4"></div>
