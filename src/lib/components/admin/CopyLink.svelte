<script lang="ts">
  import { Icon } from "$lib/icons";
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
>
  <div class="w-5 hover:scale-105 duration-300 {status == 0 ? 'fill-ctp-text hover:fill-ctp-sapphire' : 'fill-ctp-green'}"><Icon.Copyclipboard /></div>
</button>
