<script lang="ts">
  import DailyReading from '$lib/components/DailyReading.svelte';
</script>

<svelte:head>
  <title>Just For Today — CRNA</title>
</svelte:head>

<DailyReading url="https://justforto.day/?format=json" accentColor="text-purple-600" accentBg="bg-purple-50" accentBgDark="dark:bg-purple-900/50" />
