<script>
  import { env } from "$env/dynamic/public";
  import "../app.css";
</script>

<svelte:head>
  <title>{env.PUBLIC_APP_NAME}</title>
</svelte:head>
<slot />
