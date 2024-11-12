<script>
  import { getAppSettingValue, setupAppConfig } from "$lib/appConfig";
  import { AppSettingKey } from "$lib/types";
  import "../app.css";

  export let data;
  setupAppConfig(data.appSettings);
</script>

<svelte:head>
  <title>{getAppSettingValue(AppSettingKey.NAME)}</title>
</svelte:head>
<slot />
