<script lang="ts">
    import type { ComponentType } from "svelte";

    export let className = "",
        icon: ComponentType;
</script>

<span class="w-6 fill-ctp-text {className}">
    <svelte:component this={icon} />
</span>
