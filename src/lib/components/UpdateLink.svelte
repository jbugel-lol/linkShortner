<script lang="ts">
    import type { Link } from "$lib/types";
    import Modal from "./Modal.svelte";

    export let updateID: string | null, editlink: boolean, links: Link[];

    let updateURL: string;

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
