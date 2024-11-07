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

<input bind:value={submitURL} placeholder="Paste Url..." class="input input-primary bg-ctp-mantle w-full max-w-2xl rounded-r-none" type="search" />
<button on:click={send} class="btn btn-primary rounded-l-none"> <div class="w-6"><Icon.Send /></div></button>
