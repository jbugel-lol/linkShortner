<script lang="ts">
    import type { MouseEventHandler } from "svelte/elements";

    let loading: boolean = false;

    export let className: string = "",
        type: "submit" | "button" | "reset" = "button",
        toggleLoading: boolean = true,
        isLoading: boolean = false,
        onclick: MouseEventHandler<HTMLElement> = async (e: MouseEvent) => {};

    async function handleClick(e: MouseEvent & { currentTarget: EventTarget & HTMLElement }) {
        loading = toggleLoading;
        try {
            await onclick(e);
        } catch (error) {
            console.log(error);
        } finally {
            loading = false;
        }
    }
</script>

<button {type} on:click={handleClick} disabled={loading || isLoading} class={`btn ${className}`}>
    {#if loading || isLoading}
        <span class="loading loading-spinner loading-xs"><p class="sr-only">Loading</p></span>
    {:else}
        <slot name="icon" />
    {/if}
    <slot />
</button>
