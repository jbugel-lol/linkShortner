<script lang="ts">
  import CreateLink from "$lib/components/admin/CreateLink.svelte";
  import CopyLink from "$lib/components/admin/CopyLink.svelte";
  import { Icon } from "$lib/icons";
  import { getFavicon } from "$lib/utils.js";
  import type { url } from "@prisma/client";

  export let data;
  let links = data.data;

  async function deleteURL(id: string | null) {
    const res = await fetch("/admin/api/v1/link", {
      method: "DELETE",
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

  function handlenewLink(data: CustomEvent<url>) {
    console.log(data.detail);
    const eventData = {
      ...data.detail,
      _count: {
        visit: 0,
      },
    };
    links = [eventData, ...links];
  }
</script>

<svelte:head>
  <title>Admin | {import.meta.env.VITE_WEBSITE_DOMAIN}</title>
</svelte:head>
<div class="bg-cat-crust min-h-screen text-cat-text">
  <nav class="grid grid-rows-3 grid-cols-8 p-8">
    <h1 class="font-bold text-2xl col-span-1 place-content-center">{import.meta.env.VITE_WEBSITE_DOMAIN}</h1>

    <div class="col-span-6 place-content-center flex">
      <CreateLink on:newLink={handlenewLink} />
    </div>

    <div class="flex items-center flex-row-reverse gap-6 col-span-1">
      <a href="/admin/settings" data-sveltekit-preload-data class="btn btn-primary">
        <div class="w-6 fill-ctp-base"><Icon.Settings /></div>
        <p>Settings</p>
      </a>
    </div>
  </nav>

  <!-- {#if !data.country_code_detected}
    <div role="alert" class="alert alert-warning max-w-xl mx-auto my-8">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <span>Country Headers are not detected!</span>
    </div>
  {/if} -->

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
        <div class="flex gap-2 bg-ctp-crust items-center bg-cat-surface0 text-ctp-text p-1 px-3 rounded-full group/countries relative hover:cursor-pointer">
          <img class="w-8 rounded-full" src="icons/clickCount.svg" alt="Clickcount" />
          {clicks == null ? 0 : clicks}
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
        <CopyLink url={"https://" + import.meta.env.VITE_WEBSITE_DOMAIN + "/" + id} />
      </div>
      
    {:else}
      <div class="mx-auto w-max mt-12 text-xl font-bold">Such Empty :3</div>
    {/each}
  </div>
</div>
