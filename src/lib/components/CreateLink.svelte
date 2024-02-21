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
