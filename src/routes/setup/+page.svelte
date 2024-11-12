<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import Button from "$lib/components/Button.svelte";

    export let data;
    if (data.exists) goto("/");

    let step: number = 0;

    let name: string = "jbugel.link";
    let domain: string = $page.url.hostname;
    let proxy_header: string = "CF-IPCountry";

    let username: string = "admin";
    let password: string = "admin";

    async function setupComplete() {
        console.log("Running setup");

        const res = await fetch("/setup", {
            method: "POST",
            body: JSON.stringify({
                name,
                domain,
                proxy_header,
                username,
                password,
            }),
        });

        const status = res.status;
        if (status == 200) {
            goto("/admin");
        }
    }
</script>

<svelte:head>
    <title>Setup | {name}</title>
</svelte:head>
<div class="container h-screen mx-auto">
    <div class="flex gap-3 p-8">
        <img class="w-8" src="/icons/logo.svg" alt="" />
        <h1 class="text-2xl font-bold">{name}</h1>
    </div>
    <ul class="steps">
        <li class="step {step >= 0 ? 'step-primary' : ''}">App Settings</li>
        <li class="step {step >= 1 ? 'step-primary' : ''}">Create Account</li>
    </ul>
    <div class="mx-auto mt-16 w-2/3">
        {#if step == 0}
            <div class="flex flex-col gap-5 w-1/2 mx-auto">
                <h2 class="text-4xl font-bold mb-4">App Settings</h2>
                <label class="input input-bordered flex items-center gap-2">
                    Name
                    <input bind:value={name} type="text" class="grow" placeholder="Link Shortener" />
                </label>
                <label class="input input-bordered flex items-center gap-2">
                    Domain
                    <input bind:value={domain} type="text" class="grow" placeholder="example.com" />
                </label>
                <label class="form-control w-full">
                    <div class="label">
                        <span class="label-text">Country Proxy Header</span>
                        <span class="badge badge-info">Optional</span>
                    </div>
                    <input bind:value={proxy_header} type="text" placeholder="Type here" class="input input-bordered w-full" />
                    <div class="label">
                        <span class="label-text-alt">The Header name for Country Detection. Default are the Cloudflare Headers</span>
                    </div>
                </label>
            </div>
        {:else if step == 1}
            <div class="flex flex-col gap-5 w-1/2 mx-auto">
                <h2 class="text-4xl font-bold mb-4">Account</h2>

                <label class="input input-bordered flex items-center gap-2">
                    Username
                    <input bind:value={username} type="text" class="grow" placeholder="admin" />
                </label>
                <label class="input input-bordered flex items-center gap-2">
                    Password
                    <input bind:value={password} type="text" class="grow" placeholder="password" />
                </label>
            </div>
        {/if}
        <div class="flex gap-3 mx-auto w-max mt-8">
            <Button
                onclick={() => {
                    if (step > 0) step--;
                }}
                className="btn-neutral px-6">Back</Button
            >
            <Button
                onclick={() => {
                    if (step < 1) {
                        step++;
                        return;
                    }
                    setupComplete();
                }}
                className="btn-primary px-12">Continue</Button
            >
        </div>
    </div>
</div>
