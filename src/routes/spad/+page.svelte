<script lang="ts">
  import DailyReading from '$lib/components/DailyReading.svelte';
  import { config } from '$lib/config';
</script>

<svelte:head>
  <title>Spiritual Principle A Day — {config.shortName}</title>
</svelte:head>

<DailyReading url="https://spiritualprinciplea.day/?format=json" accentColor="text-amber-600" accentBg="bg-amber-50" accentBgDark="dark:bg-amber-900/50" />
