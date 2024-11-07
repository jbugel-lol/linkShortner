<script lang="ts">
    import Modal from "$lib/components/Modal.svelte";
    import * as OTPAuth from "otpauth";
    import QRCode from "qrcode";
    import { onMount } from "svelte";

    let show2FAModal = true;
    let verificationCode = "";
    let isCodeValid = false;

    // Define the TOTP configuration
    let totp = new OTPAuth.TOTP({
        issuer: import.meta.env.VITE_APP_NAME,
        label: "Admin",
        algorithm: "SHA1",
        digits: 6,
        period: 30,
        secret: new OTPAuth.Secret(),
    });

    let uri = totp.toString();
    let qrCodeDataUrl = "";

    onMount(() => {
        QRCode.toDataURL(uri, (err: unknown, url: string | undefined) => {
            if (err) {
                console.error("Error generating QR code", err);
            } else {
                qrCodeDataUrl = url || "";
            }
        });
    });

    function enable2FA() {
        show2FAModal = true;
    }

    function verifyCode() {
        const delta = totp.validate({ token: verificationCode, window: 1 });
        isCodeValid = delta !== null;
        if (isCodeValid) {
            document.cookie = "2fa=enabled";
            show2FAModal = false;
            alert("2FA enabled successfully!");
        } else {
            alert("Invalid code, please try again.");
        }
    }
</script>

<svelte:head>
    <title>Admin Settings</title>
</svelte:head>

<!-- Button to enable 2FA -->
<div class="p-6">
    <button class="btn btn-primary" on:click={enable2FA}> Enable 2FA </button>
</div>

<Modal bind:showModal={show2FAModal}>
    <h2 slot="header" class="text-2xl font-semibold mb-4">Enable 2FA</h2>
    <div class="text-white rounded-lg shadow-lg p-8 max-w-md">
        <!-- Display Secret and QR Code -->
        <p class="mb-4 font-medium">Authenticator Secret <span>{totp.secret.base32}</span></p>
        {#if qrCodeDataUrl}
            <img class="mb-4 mx-auto" src={qrCodeDataUrl} alt="2FA QR Code" />
        {/if}

        <!-- Verification Input Field -->
        <input type="text" placeholder="Enter 2FA code" class="w-full input input-primary input-bordered mt-4" bind:value={verificationCode} />

        <!-- Action Buttons -->
        <div class="flex items-center gap-8 place-content-center mt-8">
            <button class="btn btn-error" on:click={() => (show2FAModal = false)}> Cancel </button>
            <button class="btn btn-secondary" on:click={verifyCode}> Verify Code </button>
        </div>
    </div>
</Modal>
