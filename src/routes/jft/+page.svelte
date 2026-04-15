<script lang="ts">
  import DailyReading from '$lib/components/DailyReading.svelte';
  import { config } from '$lib/config';
</script>

<svelte:head>
  <title>Just For Today — {config.shortName}</title>
</svelte:head>

<DailyReading url="https://justforto.day/?format=json" accentColor="text-purple-600" accentBg="bg-purple-50" accentBgDark="dark:bg-purple-900/50" />
