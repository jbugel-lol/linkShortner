<script lang="ts">
  import { Icons } from "$lib/icons";
  import Icon from "../Icon.svelte";
  export let url: string;

  // 0 - Normal | 1 = Active
  let status: 0 | 1 = 0;

  function copyLink() {
    try {
      status = 1;
      navigator.clipboard.writeText(url);
      setTimeout(() => {
        status = 0;
      }, 3000);
    } catch (error) {
      console.error("Could not copy text: ", error);
    }
  }
</script>

<button
  on:click={() => {
    copyLink();
  }}
  class="w-6"
>
  <Icon icon={Icons.Copyclipboard} className="w-5 hover:scale-105 duration-300 {status == 0 ? 'fill-ctp-text hover:fill-ctp-sapphire' : 'fill-ctp-green'}" />
</button>
