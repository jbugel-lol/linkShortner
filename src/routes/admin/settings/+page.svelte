<script lang="ts">
    import MfaModal from "$lib/components/admin/MFAModal.svelte";
    import SettingsItem from "$lib/components/admin/SettingsItem.svelte";
    import { Icon } from "$lib/icons";

    let show2FAModal = false;
</script>

<svelte:head>
    <title>Admin | Settings</title>
</svelte:head>

<div class="mx-auto max-w-7xl">
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
    </div>
</div>
