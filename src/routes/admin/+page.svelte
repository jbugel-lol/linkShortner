<script lang="ts">
  import CreateLink from "$lib/components/admin/CreateLink.svelte";
  import CopyLink from "$lib/components/admin/CopyLink.svelte";
  import { Icon } from "$lib/icons";
  import { getFavicon } from "$lib/utils.js";
  import type { url } from "@prisma/client";
  import { preloadData, pushState, goto } from "$app/navigation";
  import { page } from "$app/stores";
  import Modal from "$lib/components/Modal.svelte";
  import Button from "$lib/components/Button.svelte";

  export let data;
  let links: url[] = data.data;
  let currentPage: number = 1;

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
    data.countedUrls--;
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

  async function addPage() {
    const res = await fetch("/admin/api/v1/link" + `?page=${currentPage + 1}&size=${data.pageSize}`);

    const status = res.status;

    if (status == 200) {
      currentPage++;
      const responseData = await res.json();
      links = [...links, ...responseData.urls];
    }
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

  <div class="flex flex-col gap-4 xl:w-1/2 w-11/12 mx-auto mb-12">
    {#each links as { location, id, clicks }}
      <div class="bg-ctp-mantle flex lg:flex-row flex-col gap-6 justify-between items-center p-4 lg:p-6 lg:px-8 lg:rounded-xl rounded-2xl group">
        <div class="grow font-semibold flex items-center gap-3 w-1/2">
          <img class="w-9" src={getFavicon(location)} alt="Favicon" />
          <div class="flex flex-col text-start">
            <p>{id}</p>
            <p class="text-accent text-xs font-medium">{location?.replace("https://", "")}</p>
          </div>
        </div>
        <div class="flex gap-2 bg-ctp-crust items-center bg-cat-surface0 text-ctp-text p-1 px-3 rounded-full group/countries relative hover:cursor-pointer">
          <div class="w-5"><Icon.Eye /></div>
          {clicks == null ? 0 : clicks}
        </div>
        <div class="flex gap-4 items-center">
          <button
            on:click={() => {
              deleteURL(id);
            }}
          >
            <div class="w-6 hover:fill-cat-red fill-ctp-red"><Icon.Trash /></div>
          </button>
        </div>
        <CopyLink url={import.meta.env.VITE_DOMAIN + "/" + id} />
        <a
          href="/admin/link/{id}"
          on:click={async (e) => {
            if (innerWidth < 640 || e.shiftKey || e.metaKey || e.ctrlKey) return;

            e.preventDefault();
            const { href } = e.currentTarget;
            const result = await preloadData(href);

            if (result.type === "loaded" && result.status === 200) {
              //@ts-expect-error
              pushState(href, { link: result.data });
            } else {
              goto(href);
            }
          }}
          data-sveltekit-preload-data
          class="w-6 fill-slate-300"
          ><Icon.Send />
        </a>
      </div>
    {:else}
      <div class="mx-auto w-max mt-12 text-xl font-bold">Such Empty :3</div>
    {/each}
    {#if links.length < data.countedUrls}
      <Button onclick={addPage} className="btn-primary w-max mx-auto">Load more</Button>
    {/if}
  </div>
</div>

{#if $page.state.link}
  <Modal showModal={true} className="" onclose={() => history.back()}>
    <div slot="header" class="flex justify-between items-center grow pr-8">
      <!-- <p><b>{import.meta.env.VITE_WEBSITE_DOMAIN + "/" + $page.state.link.id}</b></p> -->
      <a class="btn btn-ghost" href={`/admin/link/${$page.state.link.id}`} target="_blank">
        <div class="w-5 fill-ctp-text"><Icon.NewTab /></div>
        <p>Open Page</p></a
      >
    </div>

    <div class="flex flex-col gap-12 mt-8">
      <div class="stats stats-vertical bg-ctp-mantle lg:stats-horizontal shadow">
        <div class="stat">
          <div class="stat-title">Total Clicks</div>
          <!-- <div class="stat-value">{$page.state.link.clicks}</div> -->
          <div class="stat-value">{Math.round(Math.random() * 100000).toLocaleString()}</div>
        </div>

        <div class="stat">
          <div class="stat-title">Last 7 Days</div>
          <div class="stat-value">{Math.round(Math.random() * 10000).toLocaleString()}</div>
        </div>

        <div class="stat">
          <div class="stat-title">Top Country</div>
          <div class="stat-value">{Math.round(Math.random() * 10000).toLocaleString()}</div>
        </div>
      </div>

      <div class="flex flex-col gap-4">
        {#each $page.state.link.visits as visit}
          <div class="flex items-center justify-between bg-ctp-surface0 p-4 rounded-xl">
            <p>{visit.country ?? "N/A"}</p>
            <p>{new Date(visit.created).toLocaleString(undefined, { dateStyle: "long", timeStyle: "short" })}</p>
          </div>
        {:else}
          <div class="mx-auto w-max my-8 text-xl font-bold">No Visits yet :3</div>
        {/each}
      </div>
    </div>
  </Modal>
{/if}
