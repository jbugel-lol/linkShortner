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

<form on:submit|preventDefault={onSubmit} class="max-w-5xl w-full flex place-content-center relative group">
    <input id="url" name="url" placeholder="Enter URL" autocomplete="off" class="input input-primary border-2 bg-ctp-mantle rounded-r-none w-full" type="search" />
    <button type="submit" class="btn btn-primary rounded-l-none"> <div class="w-6"><Icon.Send /></div></button>
    <div class="z-50 absolute top-full translate-y-4 left-0 w-full duration-300 bg-ctp-mantle rounded-xl p-4 hidden group-focus-within:inline-block border border-primary">
        <!-- <h2 class="font-bold text-start text-lg">Link Settings</h2>
        <p class="text-sm text-start font-medium">Customize how your Link will behave</p> -->
        <div class="flex flex-col gap-3 p-4">
            <p class="text-start text-lg font-medium">Link Settings</p>
            <label class="input input-bordered flex items-center gap-2">
                Link ID
                <input name="id" type="text" class="grow" placeholder="......" />
                <span class="badge badge-info">Optional</span>
            </label>
        </div>
    </div>
</form>
