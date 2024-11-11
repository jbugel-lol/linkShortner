<script lang="ts">
    import { invalidateAll } from "$app/navigation";
    import Button from "$lib/components/Button.svelte";
    import Icon from "$lib/components/Icon.svelte";
    import { Icons } from "$lib/icons";

    export let data;
    let deletingIDs: string[] = [];
    let currentPage = 1;

    async function deleteURL(id: string | null) {
        deletingIDs = id ? [id] : deletingIDs;

        const res = await fetch("/admin/settings/trash", {
            method: "POST",
            body: JSON.stringify({
                urls: deletingIDs,
            }),
        });

        const status = res.status;

        if (status == 200) {
            invalidateAll();
            deletingIDs = [];
        } else {
            alert("Failed to delete");
        }
    }

    async function addPage() {
        const res = await fetch("/admin/settings/trash" + `?page=${currentPage + 1}&size=${data.pageSize}`);

        const status = res.status;

        if (status == 200) {
            currentPage++;
            const responseData = await res.json();
            data.urls = [...data.urls, ...responseData.urls];
        }
    }
</script>

<svelte:head>
    <title>Admin | Trash</title>
</svelte:head>

<div class="flex items-center justify-between mt-8">
    <label class="label cursor-pointer gap-2">
        <input
            type="checkbox"
            on:change={() => {
                if (deletingIDs.length >= data.urls.length) {
                    deletingIDs = [];
                } else {
                    deletingIDs = data.urls.map((url) => url.id);
                }
            }}
            checked={deletingIDs.length >= data.urls.length}
            class="checkbox"
        />
        <span class="label-text">Select all ({data.urls.length})</span>
    </label>
    <Button className={deletingIDs.length == 0 ? "btn-disabled" : "btn-error"} onclick={() => deleteURL(null)}
        ><div slot="icon" class="w-6"><Icons.Trash /></div>
        Delete Selected</Button
    >
</div>

<div class="flex flex-col gap-4 my-8 mb-12">
    {#each data.urls as url}
        <div class="bg-ctp-mantle flex lg:flex-row flex-col gap-6 justify-between items-center p-4 lg:p-6 lg:px-8 lg:rounded-xl rounded-2xl group {deletingIDs.includes(url.id) ? 'outline outline-1 outline-ctp-red' : ''}">
            <input
                type="checkbox"
                on:change={() => {
                    if (deletingIDs.includes(url.id)) {
                        deletingIDs = deletingIDs.filter((id) => id != url.id);
                    } else {
                        deletingIDs = [...deletingIDs, url.id];
                    }
                }}
                checked={deletingIDs.includes(url.id)}
                class="checkbox checkbox-error"
            />
            <div class="grow font-semibold flex items-center gap-3 w-1/2">
                <div class="flex flex-col text-start">
                    <p>ID: <b>{url.id}</b></p>
                </div>
            </div>
            <span class="badge badge-error">
                Deleted {new Date(url.updated).toLocaleString(undefined, { dateStyle: "short", timeStyle: "short" })}
            </span>
            <div class="flex gap-2 items-center fill-ctp-text">
                <Icon icon={Icons.Eye} className="w-5" />
                {url.clicks == null ? 0 : url.clicks}
            </div>
            <div class="flex gap-4 items-center">
                <Button className="btn btn-ghost" onclick={() => deleteURL(url.id)}>
                    <div slot="icon" class="w-6 hover:fill-cat-red fill-ctp-red"><Icons.Trash /></div>
                </Button>
            </div>
        </div>
    {:else}
        <div class="text-center">No URLs found</div>
    {/each}

    {#if data.urls.length < data.countedUrls}
        <Button onclick={addPage} className="btn-primary w-max mx-auto">Load more</Button>
    {/if}
</div>
