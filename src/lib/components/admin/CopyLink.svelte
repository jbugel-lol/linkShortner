<script lang="ts">
  export let url: string;
  function copyLink() {
    navigator.clipboard.writeText(url).then(() => {
      alert("Copied to clipboard!");
    }).catch(err => {
      console.error("Could not copy text: ", err);
    });
  }
</script>
<button
  class="hover:fill-cat-red fill-ctp-red"
  on:click={() => {
    copyLink();
  }}
>
  <img class="w-5" src="icons/copy.svg" alt="Copy Link" />
</button>