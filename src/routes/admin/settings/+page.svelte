<script lang="ts">
    import { goto } from "$app/navigation";
    import MfaModal from "$lib/components/admin/MFAModal.svelte";
    import SettingsItem from "$lib/components/admin/SettingsItem.svelte";
    import { Icon } from "$lib/icons";

    let show2FAModal = false;
</script>

<svelte:head>
    <title>Admin | Settings</title>
</svelte:head>

<MfaModal bind:show2FAModal />
<div class="container border-2 rounded-xl border-ctp-surface2 flex flex-col mt-2 divide-y divide-ctp-surface2 overflow-hidden">
    <SettingsItem
        name="2 Factor Authentication"
        icon={Icon.Badge}
        buttonName="Enabled 2FA"
        buttonAction={() => {
            show2FAModal = !show2FAModal;
        }}
    />
    <SettingsItem
        name="Deleted Links"
        icon={Icon.Trash}
        description="View deleted links"
        buttonName="View Links"
        buttonAction={() => {
            goto("/admin/settings/trash");
        }}
    />
</div>
