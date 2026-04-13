<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';

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
      darkMode: 'auto',
      language: 'en'
    });
  });
</script>

<svelte:head>
  <title>Find Meetings — CRNA</title>
</svelte:head>

<div class="h-full" bind:this={container}></div>

<style>
  div {
    min-height: calc(100dvh - var(--nav-height) - var(--safe-bottom));
  }
</style>
