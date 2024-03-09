<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import type { Link } from "$lib/types";
    import Modal from "./Modal.svelte";

    export let editlink: boolean, links: Link[];

    let updateID: string | null = $page.url.searchParams.get("updateLink");
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

<Modal
    bind:showModal={editlink}
    onClose={() => {
        const query = $page.url.searchParams;
        query.delete("updateLink");
        goto(`?${query}`);
    }}
>
    <p slot="header" class="text-2xl font-bold text-cat-text">Update Link</p>
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
