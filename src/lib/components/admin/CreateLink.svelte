<script lang="ts">
    import type { url } from "@prisma/client";
    import { createEventDispatcher } from "svelte";
    import Icon from "../Icon.svelte";
    import { Icons } from "$lib/icons";

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

<form on:submit|preventDefault={onSubmit} class="max-w-5xl w-full flex relative group input input-primary">
    <input id="url" name="url" placeholder="Enter URL" autocomplete="off" class="bg-ctp-mantle rounded-r-none w-full" type="search" />
    <button type="submit" class="btn btn-primary rounded-l-none absolute right-0">
        <Icon icon={Icons.Send} className="w-6" />
    </button>
    <div class="z-50 absolute top-full left-0 translate-y-3 duration-300 w-full bg-ctp-mantle hidden group-focus-within:inline-block rounded-xl p-6 outline outline-1 outline-primary">
        <div class="flex flex-col gap-3">
            <label class="input input-primary flex items-center gap-2">
                Link ID
                <input name="id" type="text" class="grow" placeholder="Enter a Custom Link ID" />
                <span class="badge badge-info">Optional</span>
            </label>
        </div>
    </div>
</form>
