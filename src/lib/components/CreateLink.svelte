<script lang="ts">
    import type { Link } from "$lib/types";
    import Modal from "./Modal.svelte";

    export let newlink: boolean, links: Link[];

    let newURL: string, newID: string;

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
</script>

<Modal bind:showModal={newlink}>
    <p slot="header" class="text-2xl font-bold text-cat-text">Add Link</p>

    <div class="flex flex-col gap-3 mt-4">
        <label class="w-max font-semibold text-lg" for="url">Long Url</label>
        <input bind:value={newURL} class="rounded-lg p-4 px-6 bg-cat-surface0 focus-within:outline-none focus-within:ring-2 ring-cat-surface2" type="text" placeholder="Paste your url" name="url" />
    </div>

    <div class="flex flex-col gap-3 mt-4">
        <label class="w-max font-semibold text-lg" for="id">Link ID</label>
        <input bind:value={newID} class="rounded-lg p-4 px-6 bg-cat-surface0 focus-within:outline-none focus-within:ring-2 ring-cat-surface2" type="text" placeholder="name your link" name="id" />
    </div>

    <button
        on:click={() => {
            submitURL();
        }}
        class="bg-cat-green text-cat-base rounded-lg p-3 font-bold mt-8 w-full">Save</button
    >
</Modal>
