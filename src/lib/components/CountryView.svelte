<script lang="ts">
    import type { CountryClicks } from "$lib/types";

    export let countries: CountryClicks[] | string;

    let countryArray: CountryClicks[] | any;
    try {
        countryArray = Object.entries(JSON.parse(countries)).map(([country, clicks]) => ({ country, clicks }));
    } catch {
        countryArray = [];
    }
</script>

<div class="hidden group-hover:flex hover:flex flex-col gap-4 absolute top-10 right-0 w-max bg-cat-surface0 p-4 rounded-xl z-10">
    {#each countryArray as country}
        <div class="flex gap-1">
            <img class="rounded-xl" src="https://flagsapi.com/{country.country == 'XX' ? 'US' : country.country}/flat/24.png" alt="" />
            <p>{country.country == "XX" ? "XX" : country.country}: {country.clicks}</p>
        </div>
    {:else}
        <p>No Clicks yet</p>
    {/each}
</div>
