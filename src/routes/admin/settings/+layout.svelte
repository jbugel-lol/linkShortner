<script lang="ts">
    import { page } from "$app/stores";
</script>

<div class="mx-auto max-w-7xl flex flex-col">
    <img src="/icons/logo.svg" alt="Logo" class="w-8 fill-cat-overlay2 mt-8 mx-auto" />
    <h1 class="lg:text-3xl font-bold mt-4">{import.meta.env.VITE_WEBSITE_DOMAIN} | App Settings</h1>
    <div class="breadcrumbs lg:mt-12 mt-4 self-center lg:self-start bg-ctp-surface0 p-2 px-4 rounded-xl lg:bg-transparent">
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
