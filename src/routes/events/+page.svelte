<script lang="ts">
  import { Calendar, MapPin, DollarSign, ExternalLink, LoaderCircle, Tag, User } from '@lucide/svelte';

  interface CrnaEvent {
    summary: string;
    location: string;
    date: string;
    contact: string;
    cost: string;
    category: string;
    description: string;
    url: string;
    start_ts: string;
  }

  let events = $state<CrnaEvent[]>([]);
  let error = $state<string | null>(null);
  let loading = $state(true);

  async function fetchEvents() {
    loading = true;
    error = null;
    try {
      const res = await fetch('https://crna.org/crna_docs/crna-events-tribe.php');
      if (!res.ok) throw new Error(`Failed to load events (${res.status})`);
      events = await res.json();
    } catch (e) {
      error = e instanceof Error ? e.message : 'Failed to load events';
    } finally {
      loading = false;
    }
  }

  function decodeHtml(html: string): string {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.documentElement.textContent ?? html;
  }

  function stripHtml(html: string): string {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent?.trim() ?? '';
  }

  $effect(() => {
    fetchEvents();
  });
</script>

<svelte:head>
  <title>Events — CRNA</title>
</svelte:head>

<!-- Header -->
<div class="from-brand-dark via-brand to-brand-light bg-gradient-to-br px-6 pb-6 text-white" style="padding-top: calc(env(safe-area-inset-top, 0px) + 2rem)">
  <div class="flex items-center gap-3">
    <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
      <Calendar size={22} strokeWidth={2} />
    </div>
    <div>
      <h1 class="text-lg font-bold">Events</h1>
      <p class="text-xs text-blue-200">CRNA events and announcements</p>
    </div>
  </div>
</div>

<div class="px-4 pt-5 pb-10">
  {#if loading}
    <div class="flex flex-col items-center justify-center py-20">
      <LoaderCircle size={32} class="animate-spin text-rose-500" />
      <p class="mt-3 text-sm text-slate-500 dark:text-slate-400">Loading events...</p>
    </div>
  {:else if error}
    <div class="flex flex-col items-center justify-center py-20 text-center">
      <p class="text-sm text-red-600 dark:text-red-400">{error}</p>
      <button onclick={fetchEvents} class="mt-3 rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 dark:bg-slate-700 dark:text-slate-200"> Retry </button>
    </div>
  {:else if events.length === 0}
    <div class="flex flex-col items-center justify-center py-20 text-center">
      <Calendar size={40} class="text-slate-300 dark:text-slate-600" strokeWidth={1.5} />
      <p class="mt-3 text-sm text-slate-500 dark:text-slate-400">No upcoming events</p>
    </div>
  {:else}
    <div class="space-y-4">
      {#each events as event (event.start_ts + event.summary)}
        <div class="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100 dark:bg-slate-800 dark:ring-slate-700">
          <!-- Category badge + cost -->
          <div class="mb-2 flex items-center gap-2">
            {#if event.category}
              <span class="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-0.5 text-[11px] font-semibold text-rose-600 dark:bg-rose-900/40 dark:text-rose-400">
                <Tag size={10} strokeWidth={2.5} />
                {event.category}
              </span>
            {/if}
            {#if event.cost}
              <span class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-0.5 text-[11px] font-semibold text-green-700 dark:bg-green-900/40 dark:text-green-400">
                <DollarSign size={10} strokeWidth={2.5} />
                {event.cost}
              </span>
            {/if}
          </div>

          <!-- Title -->
          <h2 class="text-sm font-bold text-slate-900 dark:text-slate-100">{decodeHtml(event.summary)}</h2>

          <!-- Date -->
          <div class="mt-2 flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
            <Calendar size={13} class="mt-0.5 flex-shrink-0 text-slate-400 dark:text-slate-500" strokeWidth={2} />
            <span>{event.date}</span>
          </div>

          <!-- Location -->
          {#if event.location}
            <div class="mt-1.5 flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
              <MapPin size={13} class="mt-0.5 flex-shrink-0 text-slate-400 dark:text-slate-500" strokeWidth={2} />
              <span>{event.location}</span>
            </div>
          {/if}

          <!-- Contact -->
          {#if event.contact}
            <div class="mt-1.5 flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
              <User size={13} class="mt-0.5 flex-shrink-0 text-slate-400 dark:text-slate-500" strokeWidth={2} />
              <span>{event.contact}</span>
            </div>
          {/if}

          <!-- Description snippet -->
          {#if event.description}
            {@const text = stripHtml(event.description)}
            {#if text}
              <p class="mt-3 line-clamp-3 text-xs leading-relaxed text-slate-500 dark:text-slate-400">{text}</p>
            {/if}
          {/if}

          <!-- Link -->
          {#if event.url}
            <a href={event.url} target="_blank" rel="noopener noreferrer" class="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400">
              View Details
              <ExternalLink size={12} strokeWidth={2.5} />
            </a>
          {/if}
        </div>
      {/each}
    </div>
  {/if}
</div>
