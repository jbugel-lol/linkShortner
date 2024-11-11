<script lang="ts">
    import { goto } from "$app/navigation";
    import MfaModal from "$lib/components/admin/MFAModal.svelte";
    import SettingsItem from "$lib/components/admin/SettingsItem.svelte";
    import Icon from "$lib/components/Icon.svelte";
    import { Icons } from "$lib/icons/index.js";

    export let data;

    let show2FAModal = false;
</script>

<svelte:head>
    <title>Admin | Settings</title>
</svelte:head>

{#if !data.countryCodeDetected}
    <div role="alert" class="alert alert-info text-xs lg:text-base w-11/12 mx-auto my-8">
        <div class="w-6"><Icons.DatabaseOff /></div>
        <span>Country Code Headers are not present! You can use a Cloudflare Proxied Connection to detect Country Codes for Free.</span>
    </div>
{/if}

<MfaModal bind:show2FAModal />
<div class="container border-2 rounded-xl border-ctp-surface2 flex flex-col mt-2 divide-y divide-ctp-surface2">
    <SettingsItem
        name="2 Factor Authentication"
        icon={Icons.Badge}
        buttonName="Enabled 2FA"
        buttonAction={() => {
            show2FAModal = !show2FAModal;
        }}
    />
    <SettingsItem
        name="Deleted Links"
        icon={Icons.Trash}
        description="View deleted links"
        buttonName="View Links"
        buttonAction={() => {
            goto("/admin/settings/trash");
        }}
    />
</div>
