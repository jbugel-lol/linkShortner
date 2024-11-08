<script lang="ts">
    import type { url } from "@prisma/client";
    import { Icon } from "$lib/icons";
    import { createEventDispatcher } from "svelte";

    let submitURL: string = "";
    const dispatch = createEventDispatcher();

    async function send() {
        const result = await fetch("admin/api/v1/link", {
            method: "POST",
            body: JSON.stringify({
                url: submitURL,
            }),
        });

        if (result.status == 200) {
            submitURL = "";
            const data: url = await result.json();

            dispatch("newLink", { ...data });
            return;
        }

        const data = await result.json();
        alert(data.error);
    }
</script>

<div class="max-w-2xl w-full flex place-content-center relative group">
    <input bind:value={submitURL} placeholder="Paste Url..." class="input input-primary bg-ctp-mantle rounded-r-none w-full group-focus-within:rounded-b-none" type="search" />
    <button on:click={send} class="btn btn-primary rounded-l-none group-focus-within:rounded-b-none"> <div class="w-6"><Icon.Send /></div></button>
    <div class="absolute top-full left-0 w-full duration-300 bg-ctp-mantle border border-t-0 border-primary rounded-b-xl p-4 hidden group-focus-within:inline-block">
        <h2 class="font-bold text-start text-lg">Link Settings</h2>
        <p class="text-sm text-start font-medium">Customize how your Link will behave</p>
        <div class="flex items-center gap-3 mt-6">
            <p class="text-nowrap">Link ID</p>
            <input placeholder="Enter Link ID" type="text" class="input input-ghost w-full bg-ctp-mantle" />
        </div>
    </div>
</div>
