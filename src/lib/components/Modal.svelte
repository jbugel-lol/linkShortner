<script lang="ts">
    export let showModal: boolean;
    export let onclose: Function = () => {};
    let dialog: HTMLDialogElement;
    $: if (dialog && showModal) dialog.showModal();
    $: if (dialog && !showModal) dialog.close();

    async function runOnClose() {
        showModal = false;
        await onclose();
        dialog.close();
    }
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog
    class="dark:backdrop:bg-slate-800/90 z-40 backdrop:bg-slate-300/75 dark:text-slate-100 bg-transparent lg:mt-12 mb-0 lg:origin-center origin-bottom lg:w-max max-w-2xl min-w-full lg:min-w-0"
    bind:this={dialog}
    on:close={runOnClose}
    on:keydown|self={() => dialog.close()}
    on:click|self={() => dialog.close()}
>
    <div class="p-8 lg:rounded-xl rounded-t-3xl bg-ctp-mantle lg:mb-12 shadow-sm">
        <div class="flex justify-between items-center">
            <slot name="header" />
            <button class="ml-auto outline-none btn btn-ghost rounded-2xl p-1" on:click={() => dialog.close()}>
                <svg class="w-8 dark:fill-slate-400 fill-slate-600 hidden lg:block" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"
                    ><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg
                >
                <svg class="lg:hidden w-8 dark:fill-slate-400 fill-slate-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z" /></svg>
            </button>
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
