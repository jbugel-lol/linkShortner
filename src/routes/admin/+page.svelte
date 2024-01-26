<script lang="ts">
  import Modal from "$lib/components/Modal.svelte";
  /*
  const testLinks = [
    {
      url: "https://google.com/test",
      id: "google",
      clicks: 232,
    },
    {
      url: "https://youtube.com",
      id: "youtube",
      clicks: 212,
    },
  ];
*/

  let hasError = false;

  export let data;

  let testLinks = data.data;
  let newlink = false;
  let editlink = false;

  let url: string = "";
  let id: string = "";
  let updateURL: string = "";
  let updateID: string = "";

  async function submitURL() {
    if (url.length <= 6 || (!url.startsWith("https://") && !url.startsWith("http://"))) {
      alert("Korrekte URL angeben");
      return;
    }

    const result = await fetch("/create", {
      method: "POST",
      body: JSON.stringify({
        url,
        linkID: id,
      }),
    });
    const data = await result.json();
    testLinks.push({
      url,
      id: data.id,
      clicks: 0,
    });
    testLinks = testLinks;
    url = "";
    id = "";
    newlink = false;
  }

  async function deleteURL(id: string) {
    const result = await fetch("/delete", {
      method: "POST",
      body: JSON.stringify({
        id: id,
      }),
    });
    console.log(await result.json());
    testLinks = testLinks.filter((v) => v.id !== id);
  }

  async function submitUpdate() {
    const result = await fetch("/update", {
      method: "PATCH",
      body: JSON.stringify({
        newURL: updateURL,
        id: updateID,
      }),
    });
    console.log(await result.json());

    testLinks.forEach((element) => {
      if (element.id == updateID) {
        element.url = updateURL;
      }
    });
    testLinks = testLinks;
    updateID = "";
    updateURL = "";
    editlink = false;
  }
</script>

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
  <Modal bind:showModal={hasError}>Cannot submit link like this!</Modal>
  <div class="flex flex-col gap-4 xl:w-1/2 w-11/12 mx-auto">
    <Modal bind:showModal={newlink}>
      <p slot="header" class="text-2xl font-bold">Create a new Link</p>
      <div class="flex flex-col gap-3 mb-8">
        <input bind:value={url} class="rounded-lg p-2 bg-cat-base" type="text" placeholder="Paste your url" name="url" id="" />
        <input bind:value={id} class="rounded-lg p-2 bg-cat-base" type="text" placeholder="name your link" name="id" id="" />
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
          class="bg-green-600 rounded-lg p-2 font-bold">Save</button
        >
      </div>
    </Modal>
    {#if testLinks.length < 1}
      <div>Such Empty :(</div>
    {/if}
    {#each testLinks as { url, id, clicks }}
      <div class="bg-cat-base justify-between p-3.5 rounded-xl px-7 items-center gridcontainer">
        <div>
          {url}
        </div>
        <div>
          {id}
        </div>
        <div>
          {clicks}
        </div>
        <div class="flex place-content-end gap-2">
          <button
            on:click={() => {
              updateURL = url;
              updateID = id;
              editlink = true;
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
            </svg>
          </button>
          <button
            on:click={() => {
              deleteURL(id);
            }}
            class="flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .gridcontainer {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr auto;
  }
</style>
