<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { theme } from '$lib/stores/theme.svelte';

  let container: HTMLDivElement;

  onMount(async () => {
    if (!browser) return;
    const { mountCrumbWidget } = await import('crumb-widget');
    mountCrumbWidget(container, {
      serverUrl: 'https://aggregator.bmltenabled.org/main_server/',
      serviceBodyIds: [1215],
      view: 'both',
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

<div id="crumb-widget" class="h-full" bind:this={container} style="padding-top: env(safe-area-inset-top, 0px)"></div>

<style>
  div {
    min-height: calc(100dvh - var(--nav-height) - var(--safe-bottom));
  }
</style>
