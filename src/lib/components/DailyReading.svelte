<script lang="ts">
  import { LoaderCircle } from '@lucide/svelte';

  interface Reading {
    date: string;
    title: string;
    page: string;
    source: string;
    quote: string;
    content: string[];
    thought: string;
    copyright: string;
  }

  interface Props {
    url: string;
    accentColor: string;
    accentBg: string;
  }

  let { url, accentColor, accentBg }: Props = $props();

  let reading = $state<Reading | null>(null);
  let error = $state<string | null>(null);
  let loading = $state(true);

  async function fetchReading() {
    loading = true;
    error = null;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Failed to load (${res.status})`);
      reading = await res.json();
    } catch (e) {
      error = e instanceof Error ? e.message : 'Failed to load reading';
    } finally {
      loading = false;
    }
  }

  $effect(() => {
    fetchReading();
  });
</script>

{#if loading}
  <div class="flex flex-col items-center justify-center px-6 py-20">
    <LoaderCircle size={32} class="{accentColor} animate-spin" />
    <p class="mt-3 text-sm text-slate-500">Loading...</p>
  </div>
{:else if error}
  <div class="flex flex-col items-center justify-center px-6 py-20 text-center">
    <p class="text-sm text-red-600">{error}</p>
    <button onclick={fetchReading} class="mt-3 rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700"> Retry </button>
  </div>
{:else if reading}
  <div class="px-5 pt-8 pb-10">
    <!-- Header -->
    <div class="mb-6 text-center">
      <span class="{accentBg} {accentColor} mb-2 inline-block rounded-full px-3 py-1 text-xs font-semibold">{reading.date}</span>
      <h1 class="text-2xl font-bold text-slate-900">{reading.title}</h1>
      <p class="mt-1 text-xs text-slate-500">{reading.page} &middot; {reading.source}</p>
    </div>

    <!-- Quote -->
    <blockquote class="mb-6 border-l-4 border-current {accentColor} py-1 pl-4 text-sm text-slate-700 italic">
      {reading.quote}
    </blockquote>

    <!-- Content -->
    <div class="space-y-4">
      {#each reading.content as paragraph, i (i)}
        <p class="text-sm leading-relaxed text-slate-700">{paragraph}</p>
      {/each}
    </div>

    <!-- Thought for the day -->
    <div class="{accentBg} mt-6 rounded-xl p-4">
      <p class="text-sm font-semibold {accentColor}">Just for today</p>
      <p class="mt-1 text-sm leading-relaxed text-slate-700">{reading.thought}</p>
    </div>

    <!-- Copyright -->
    <p class="mt-6 text-center text-[10px] text-slate-400">{reading.copyright}</p>
  </div>
{/if}
