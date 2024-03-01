<script lang="ts">
    export let countries: string;
    const countryArray = Object.entries(JSON.parse(countries)).map(([country, clicks]) => ({ country, clicks }));
</script>

<div class="hidden group-hover:flex hover:flex flex-col gap-4 absolute top-10 right-0 w-max bg-cat-surface0 p-4 rounded-xl">
    {#each countryArray as country}
        <div class="flex gap-1">
            <img class="rounded-xl" src="https://flagsapi.com/{country.country == 'XX' ? 'US' : country.country}/flat/24.png" alt="" />
            <p>{country.country == "XX" ? "XX" : country.country}: {country.clicks}</p>
        </div>
    {/each}
</div>
