<script lang="ts">
  import Modal from "$lib/components/Modal.svelte";

  export let data;

  let links = data.data;
  let newlink = false;
  let editlink = false;

  let newURL: string = "";
  let newID: string = "";
  let updateURL: string = "";
  let updateID: string = "";

  async function submitURL() {
    if (newURL.length <= 6 || (!newURL.startsWith("https://") && !newURL.startsWith("http://"))) {
      alert("Korrekte URL angeben");
      return;
    }

    const result = await fetch("/create", {
      method: "POST",
      body: JSON.stringify({
        url: newURL,
        linkID: newID.length <= 0 ? null : newID,
      }),
    });

    const data = await result.json();

    if (data.success) {
      alert(data.error);
      return;
    }

    links.push({
      url: newURL,
      id: data.id,
      clicks: 0,
    });
    links = links;
    newURL = "";
    newID = "";
    newlink = false;
  }

  // TODO: Third Pary API
  function getFavicon(url: string) {
    var domain;
    domain = url.split("/")[2];
    domain = domain.split(":")[0];
    domain = domain.split("?")[0];
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

  async function submitUpdate() {
    const result = await fetch("/update", {
      method: "PATCH",
      body: JSON.stringify({
        newURL: updateURL,
        id: updateID,
      }),
    });

    const data = await result.json();
    if (!data.success) {
      alert(data.error);
      return;
    }

    links.forEach((element: any) => {
      if (element.id == updateID) {
        element.url = updateURL;
      }
    });
    links = links;
    updateID = "";
    updateURL = "";
    editlink = false;
  }
</script>

<svelte:head>
  <title>Admin | jbugel.link</title>
</svelte:head>
<div class="bg-cat-crust min-h-screen text-cat-text">
  <nav class="flex justify-between p-8">
    <div class="font-bold text-2xl">jbugel.link</div>
    <div>
      <button
        on:click={() => {
          newlink = true;
        }}
        class="bg-cat-surface0 font-bold p-2 px-4 rounded-xl flex gap-2 items-center"
        ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="2.25" stroke="#a6adc8" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        Create Link</button
      >
    </div>
  </nav>
  <Modal bind:showModal={newlink}>
    <p slot="header" class="text-2xl font-bold text-cat-text">Create a new Link</p>
    <div class="flex flex-col gap-3 mb-8">
      <input bind:value={newURL} class="rounded-lg p-2 bg-cat-base" type="text" placeholder="Paste your url" name="url" />
      <input bind:value={newID} class="rounded-lg p-2 bg-cat-base" type="text" placeholder="name your link" name="id" />
      <button
        on:click={() => {
          submitURL();
        }}
        class="bg-cat-green text-cat-base rounded-lg p-2 font-bold">Save</button
      >
    </div>
  </Modal>
  <Modal bind:showModal={editlink}>
    <p slot="header" class="text-2xl font-bold">Update Link</p>
    <div class="flex flex-col gap-3 mb-8">
      <input bind:value={updateURL} class="rounded-lg p-2 bg-cat-base" type="text" placeholder="Paste your url" name="url" id="" />
      <button
        on:click={() => {
          submitUpdate();
        }}
        class="bg-cat-green rounded-lg p-2 font-bold text-cat-crust">Save</button
      >
    </div>
  </Modal>
  <div class="flex flex-col gap-4 xl:w-1/2 w-11/12 mx-auto">
    {#if links.length < 1}
      <div>Such Empty :(</div>
    {:else}
      {#each links as { url, id, clicks }}
        <div class="bg-cat-base flex lg:flex-row flex-col gap-6 justify-between items-center p-4 lg:p-6 lg:px-12 lg:rounded-full rounded-2xl group">
          <div class="grow font-semibold flex items-center gap-3 w-1/2">
            <img class="w-6" src={getFavicon(url)} alt="Favicon" />
            <p class="rounded-xl">{url}</p>
          </div>
          <div class="grow flex gap-2">
            <p class="opacity-50">ID:</p>
            <p>{id}</p>
          </div>
          <div class="flex gap-4">
            <div class="flex gap-2 items-center bg-cat-surface0 p-1 px-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6">
                <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                <path
                  fill-rule="evenodd"
                  d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                  clip-rule="evenodd"
                />
              </svg>
              {clicks}
            </div>
            <div class="place-content-end gap-4 flex group-hover:ml-4 lg:w-0 group-hover:w-16 duration-500 overflow-hidden">
              <button
                class="hover:fill-cat-sapphire fill-slate-300"
                on:click={() => {
                  updateURL = url;
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
        </div>
      {/each}
    {/if}
  </div>
</div>
