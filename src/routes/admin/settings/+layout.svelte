<script lang="ts">
    import { page } from "$app/stores";
</script>

<div class="mx-auto max-w-7xl flex flex-col">
    <h1 class="text-3xl font-bold pt-16">{import.meta.env.VITE_WEBSITE_DOMAIN} | App Settings</h1>
    <div class="breadcrumbs mt-12">
        <ul>
            <li><a href="/admin">Dashboard</a></li>
            <li class="capitalize"><a href="/admin/settings">Settings</a></li>
            {#each $page.url.pathname.split("/").slice(3) as path, index}
                {#if index === $page.url.pathname.split("/").slice(3).length - 1}
                    <li class="capitalize">{path}</li>
                {:else}
                    <li class="capitalize"><a href="/admin/settings/{path}">{path}</a></li>
                {/if}
            {/each}
        </ul>
    </div>
    <slot />
</div>
