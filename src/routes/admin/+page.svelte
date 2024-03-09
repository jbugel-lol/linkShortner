<script lang="ts">
  import CountryView from "$lib/components/CountryView.svelte";
  import CreateLink from "$lib/components/CreateLink.svelte";
  import UpdateLink from "$lib/components/UpdateLink.svelte";
  import type { Link } from "$lib/types.js";

  export let data;

  let links: Link[] = data.data;
  let newLinkModal = false;
  let editlink = false;
  let updateID = "";

  function getFavicon(url: string) {
    const domain = new URL(url).hostname;
    return "https://favicone.com/" + domain + "?s=24";
  }

  async function deleteURL(id: string) {
    const res = await fetch("/delete", {
      method: "POST",
      body: JSON.stringify({
        id: id,
      }),
    });
    const data = await res.json();
    if (!data.success) {
      alert(data.error);
      return;
    }
    links = links.filter((v: any) => v.id !== id);
  }
</script>

<svelte:head>
  <title>Admin | {import.meta.env.VITE_WEBSITE_DOMAIN}</title>
</svelte:head>
<div class="bg-cat-crust min-h-screen text-cat-text">
  <nav class="flex justify-between p-8">
    <div class="font-bold text-2xl">{import.meta.env.VITE_WEBSITE_DOMAIN}</div>
    <div>
      <button
        on:click={() => {
          newLinkModal = true;
        }}
        class="bg-cat-surface0 font-bold p-2 px-4 rounded-xl flex gap-2 items-center"
        ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="2.25" stroke="#a6adc8" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        Create Link</button
      >
    </div>
  </nav>
  <CreateLink bind:newlink={newLinkModal} bind:links />
  <UpdateLink bind:editlink bind:updateID bind:links />
  <div class="flex flex-col gap-4 xl:w-1/2 w-11/12 mx-auto">
    {#each links as { url, id, clicks, country_clicks }}
      <div class="bg-cat-base flex lg:flex-row flex-col gap-6 justify-between items-center p-4 lg:p-6 lg:px-12 lg:rounded-full rounded-2xl group">
        <div class="grow font-semibold flex items-center gap-3 w-1/2">
          <img class="w-6" src={getFavicon(url)} alt="Favicon" />
          <p class="rounded-xl">{url}</p>
        </div>
        <div class="grow flex gap-2">
          <p class="opacity-50">ID:</p>
          <p>{id}</p>
        </div>
        <div class="flex gap-2 items-center bg-cat-surface0 p-1 px-3 rounded-full group/countries relative hover:cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6">
            <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
            <path
              fill-rule="evenodd"
              d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
              clip-rule="evenodd"
            />
          </svg>
          {clicks == null ? 0 : clicks}
          <CountryView countries={country_clicks} />
        </div>
        <div class="place-content-end gap-4 flex group-hover:ml-4 lg:w-0 group-hover:w-16 duration-500 overflow-hidden">
          <button
            class="hover:fill-cat-sapphire fill-slate-300"
            on:click={() => {
              updateID = id;
              editlink = true;
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6">
              <path
                d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z"
              />
            </svg>
          </button>
          <button
            class="hover:fill-cat-red fill-slate-300"
            on:click={() => {
              deleteURL(id);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6">
              <path
                fill-rule="evenodd"
                d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    {:else}
      <div class="mx-auto w-max mt-12 text-xl font-bold">Such Empty :3</div>
    {/each}
  </div>
</div>
