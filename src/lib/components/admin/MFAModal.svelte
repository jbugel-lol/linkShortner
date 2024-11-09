<script lang="ts">
    import * as OTPAuth from "otpauth";
    import { onMount } from "svelte";
    import QRCode from "qrcode";
    import Modal from "../Modal.svelte";

    export let show2FAModal: boolean = false;

    let verificationCode = "";
    let isCodeValid = false;

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

<Modal bind:showModal={show2FAModal}>
    <h2 slot="header" class="text-2xl font-semibold mb-4">Enable 2FA</h2>
    <div class="text-ctp-text rounded-lg shadow-lg p-8 max-w-md">
        <p class="mb-4 font-medium">Authenticator Secret <span>{totp.secret.base32}</span></p>
        {#if qrCodeDataUrl}
            <img class="mb-4 mx-auto" src={qrCodeDataUrl} alt="2FA QR Code" />
        {/if}

        <input type="text" placeholder="Enter 2FA code" class="w-full input input-primary input-bordered mt-4" bind:value={verificationCode} />
        <div class="flex items-center gap-8 place-content-center mt-8">
            <button class="btn btn-error" on:click={() => (show2FAModal = false)}> Cancel </button>
            <button class="btn btn-secondary" on:click={verifyCode}> Verify Code </button>
        </div>
    </div>
</Modal>
