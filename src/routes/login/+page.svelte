<script>
    import { goto } from '$app/navigation';

    let password = ""
    async function submit() {
        const request = await fetch("/login", {
            method:"POST",
            body: JSON.stringify({password})
        })
        if ((await request.json()).success) goto("/admin")
    }
  </script>


<div class="bg-slate-950 min-h-screen text-slate-100">
    <div class="lg:w-1/4 w-11/12 mx-auto flex flex-col gap-2">
            <h1 class="font-semibold text-xl mt-8">Link Control Panel</h1>
            <!--<label for="Passord">Password:</label>-->
            <input class="rounded-lg p-2 bg-slate-800" bind:value={password} placeholder="Password" type="password" id="Password" name="Password" />
            <!--<label for="OTP">OTP:</label><br />
            <input
                type="text"
                inputmode="numeric"
                pattern="[0-9]*"
                autocomplete="one-time-code"
                maxlength="6"
                placeholder="2FA-Token"
                size="6"
                oninput="this.value = this.value.replace(/[^0-9]/g, '');"
            /> -->
            <button on:click={() => {submit()}} class="bg-green-600 rounded-lg p-2 font-bold mt-4" type="button" value="Submit" id="button">Submit</button>
    </div>
</div>