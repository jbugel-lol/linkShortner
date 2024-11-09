<script lang="ts">
    import type { url } from "@prisma/client";
    import { Icon } from "$lib/icons";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    async function onSubmit(event: { currentTarget: EventTarget & HTMLFormElement }) {
        const form: HTMLFormElement = event.currentTarget;
        const data = new FormData(form);

        const url = data.get("url") as string | null;
        const linkID = data.get("id") as string | null;

        if (!url || !checkifValidURL(url)) {
            // const urlTarget = event.currentTarget.elements.namedItem("url") as HTMLInputElement;
            alert("URL is not valid");
            return;
        }

        const result = await fetch("admin/api/v1/link", {
            method: "POST",
            body: JSON.stringify({
                url,
                linkID,
            }),
        });

        if (result.status == 200) {
            form.reset();
            const data: url = await result.json();
            dispatch("newLink", { ...data });
        } else {
            const data = await result.json();
            alert(data.error);
        }
    }

    function checkifValidURL(url: string): boolean {
        try {
            new URL(url);
            return true;
        } catch (error) {
            return false;
        }
    }
</script>

<form on:submit|preventDefault={onSubmit} class="max-w-2xl w-full flex place-content-center relative group">
    <input id="url" name="url" placeholder="Paste Url..." autocomplete="off" class="input input-primary focus-within:outline-none bg-ctp-mantle rounded-r-none w-full group-focus-within:rounded-b-none" type="search" />
    <button type="submit" class="btn btn-primary rounded-l-none group-focus-within:rounded-b-none"> <div class="w-6"><Icon.Send /></div></button>
    <div class="z-50 absolute top-full left-0 w-full duration-300 bg-ctp-mantle border border-t-0 border-primary rounded-b-xl p-4 hidden group-focus-within:inline-block">
        <h2 class="font-bold text-start text-lg">Link Settings</h2>
        <p class="text-sm text-start font-medium">Customize how your Link will behave</p>
        <div class="flex items-center gap-3 mt-6">
            <p class="text-nowrap">Link ID</p>
            <input name="id" placeholder="Enter Link ID" type="text" class="input input-ghost w-full bg-ctp-mantle" />
        </div>
    </div>
</form>
