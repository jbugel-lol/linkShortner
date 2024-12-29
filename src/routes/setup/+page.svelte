<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import Button from "$lib/components/Button.svelte";
    import Icon from "$lib/components/Icon.svelte";
    import { Icons } from "$lib/icons";

    let step: number = 0;

    export let data;

    console.log({ ...data });

    let name: string = "jbugel.link";
    let domain: string = $page.url.hostname;
    let proxy_header: string = "CF-IPCountry";
    let database_url: string = "./database.db";

    let username: string = "admin";
    let password: string = "";
    let showPassword: boolean = false;

    async function setupComplete() {
        const res = await fetch("/setup", {
            method: "POST",
            body: JSON.stringify({
                name,
                domain,
                proxy_header,
                username,
                password,
                database_url: "file:" + database_url,
            }),
        });
        const status = res.status;
        if (status == 200) {
            goto("/admin");
        } else {
            alert("Failed to setup");
        }
    }
</script>

<svelte:head>
    <title>Setup your App</title>
</svelte:head>
<div class="min-h-screen mx-auto">
    <div class="flex gap-3 p-8">
        <img class="w-8" src="/icons/logo.svg" alt="" />
        <h1 class="text-2xl font-bold">{name}</h1>
    </div>
    <ul class="steps">
        <li class="step {step >= 0 ? 'step-primary' : ''}">App Settings</li>
        <li class="step {step >= 1 ? 'step-primary' : ''}">Database</li>
        <li class="step {step >= 2 ? 'step-primary' : ''}">Create Account</li>
    </ul>
    <div class="mx-auto mt-16 lg:w-2/3">
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
                        <span class="label-text-alt">The Header name for Country Detection. Default is the Cloudflare Header</span>
                    </div>
                </label>
            </div>
        {:else if step == 1}
            <div class="flex flex-col gap-5 w-1/2 mx-auto">
                <h2 class="text-4xl font-bold mb-4">App Settings</h2>
                <label class="form-control w-full">
                    <div class="label">
                        <span class="label-text">SQLite Location</span>
                    </div>
                    <input bind:value={database_url} type="text" placeholder="Type here" class="input input-bordered w-full" />
                    <div class="label">
                        <span class="label-text-alt">Enter the path to the database file. Relative to the schema.prisma file</span>
                    </div>
                </label>
            </div>
        {:else if step == 2}
            <div class="flex flex-col gap-5 w-1/2 mx-auto">
                <h2 class="text-4xl font-bold mb-4">Account</h2>

                <div role="alert" class="alert alert-info">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>
                        Once the account is created, the server will automatically restart and redirect you to the admin panel. During the restart, you may encounter a 500 Internal Server Error; this is expected and will resolve automatically.                    </span>
                </div>

                <label class="input input-bordered flex items-center gap-2">
                    <img src="/icons/user.svg" alt="User Icon" class="w-6" />
                    Username
                    <input bind:value={username} type="text" class="grow" placeholder="admin" />
                </label>
                <label class="input input-bordered flex items-center gap-2">
                    <img src="/icons/password.svg" alt="Password Icon" class="w-6" />
                    <span>Password</span>
                    {#if showPassword}
                        <input bind:value={password} type="text" class="grow" placeholder="Enter a secure password"/>
                    {:else}
                        <input bind:value={password} type="password" class="grow" placeholder="Enter a secure password"/>
                    {/if}
                    <button type="button" class="btn btn-sm" on:click={() => showPassword = !showPassword} aria-label={showPassword ? "Hide password" : "Show password"}>
                        {#if showPassword}
                            <Icon icon={Icons.EyeSlash} />
                        {:else}
                            <Icon icon={Icons.Eye} />
                        {/if}
                    </button>
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
                    if (step < 2) {
                        step++;
                        return;
                    }
                    setupComplete();
                }}
                className="btn-primary px-12">
                {step < 2 ? "Continue" : "Finish Setup"}</Button
            >
        </div>
    </div>
</div>
