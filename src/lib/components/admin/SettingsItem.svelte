<script lang="ts">
    import type { ComponentType } from "svelte";

    export let name: string,
        description: string = "Default Description",
        buttonName: string,
        buttonAction: () => void,
        icon: ComponentType | undefined = undefined;
</script>

<div class="flex items-center justify-between hover:bg-ctp-mantle transition-colors duration-300 cursor-pointer p-6 px-4">
    <div class="flex items-center gap-4">
        {#if icon != undefined}
            <div class="w-6 fill-ctp-rosewater">
                <svelte:component this={icon} />
            </div>
        {/if}
        <div class="text-start">
            <h1 class="text-lg font-semibold">{name}</h1>
            <p class="text-xs font-medium opacity-70">{description}</p>
        </div>
    </div>
    <button on:click={buttonAction} class="btn btn-accent">{buttonName}</button>
</div>
