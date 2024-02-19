<script lang="ts">
    export let showModal: boolean;
    let dialog: HTMLDialogElement;
    $: if (dialog && showModal) dialog.showModal();
    $: if (dialog && !showModal) dialog.close();
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog
    class="dark:backdrop:bg-cat-crust/75 backdrop:bg-cat-mantle/75 bg-transparent fill-slate-200 lg:mt-24 mt-12 w-11/12 xl:w-1/2"
    bind:this={dialog}
    on:close={() => (showModal = false)}
    on:keydown|self={() => dialog.close()}
    on:click|self={() => dialog.close()}
>
    <div class="p-8 rounded-xl bg-cat-base mb-12">
        <div class="flex justify-between items-center mb-6">
            <slot name="header" />
            <button class="outline-none" on:click={() => dialog.close()}>
                <svg class="w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg></button
            >
        </div>
        <slot />
    </div>
</dialog>

<style>
    dialog[open] {
        animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    @keyframes zoom {
        from {
            transform: scale(0.95);
        }
        to {
            transform: scale(1);
        }
    }
    dialog[open]::backdrop {
        animation: fade 0.2s ease-out;
    }
    @keyframes fade {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    button {
        display: block;
    }
</style>
