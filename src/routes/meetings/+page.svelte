<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { theme } from '$lib/stores/theme.svelte';

  let widgetEl: HTMLDivElement;

  onMount(async () => {
    if (!browser) return;
    const { mountCrumbWidget } = await import('crumb-widget');
    mountCrumbWidget(widgetEl, {
      serverUrl: 'https://aggregator.bmltenabled.org/main_server/',
      serviceBodyIds: [1215],
      view: 'list',
      geolocation: true,
      geolocationRadius: 50,
      darkMode: theme.preference === 'auto' ? 'auto' : theme.resolved === 'dark',
      language: 'en',
      columns: ['time', 'name', 'location', 'address', 'service_body']
    });
  });
</script>

<svelte:head>
  <title>Find Meetings — CRNA</title>
</svelte:head>

<!-- Outer wrapper keeps safe-area padding even though crumb-widget uses all:initial -->
<div class="meetings-wrapper">
  <div id="crumb-widget" bind:this={widgetEl}></div>
</div>

<style>
  .meetings-wrapper {
    padding-top: env(safe-area-inset-top, 0px);
    min-height: calc(100dvh - 4rem - env(safe-area-inset-bottom, 0px));
  }
</style>
