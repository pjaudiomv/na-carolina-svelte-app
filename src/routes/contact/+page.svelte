<script lang="ts">
  import { Users, Phone, Globe, LoaderCircle, Info } from '@lucide/svelte';

  interface ServiceBody {
    id: string;
    parent_id: string;
    name: string;
    description: string;
    type: string;
    url: string;
    helpline: string;
    world_id: string;
  }

  let region = $state<ServiceBody | null>(null);
  let bodies = $state<ServiceBody[]>([]);
  let error = $state<string | null>(null);
  let loading = $state(true);

  async function fetchServiceBodies() {
    loading = true;
    error = null;
    try {
      const res = await fetch('https://aggregator.bmltenabled.org/main_server/client_interface/json/?switcher=GetServiceBodies&services=1215&recursive=1');
      if (!res.ok) throw new Error(`Failed to load (${res.status})`);
      const data: ServiceBody[] = await res.json();
      region = data.find((b) => b.type === 'RS') ?? null;
      bodies = data.filter((b) => b.type === 'AS').sort((a, b) => a.name.localeCompare(b.name));
    } catch (e) {
      error = e instanceof Error ? e.message : 'Failed to load contacts';
    } finally {
      loading = false;
    }
  }

  $effect(() => {
    fetchServiceBodies();
  });
</script>

<svelte:head>
  <title>Contact — CRNA</title>
</svelte:head>

<!-- Header -->
<div class="from-brand-dark via-brand to-brand-light bg-gradient-to-br px-6 pt-8 pb-6 text-white">
  <div class="flex items-center gap-3">
    <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
      <Users size={22} strokeWidth={2} />
    </div>
    <div>
      <h1 class="text-lg font-bold">Service & Contact</h1>
      <p class="text-xs text-blue-200">CRNA area service bodies</p>
    </div>
  </div>
</div>

<div class="px-4 pt-5 pb-10">
  {#if loading}
    <div class="flex flex-col items-center justify-center py-20">
      <LoaderCircle size={32} class="animate-spin text-teal-500" />
      <p class="mt-3 text-sm text-slate-500 dark:text-slate-400">Loading contacts...</p>
    </div>
  {:else if error}
    <div class="flex flex-col items-center justify-center py-20 text-center">
      <p class="text-sm text-red-600 dark:text-red-400">{error}</p>
      <button onclick={fetchServiceBodies} class="mt-3 rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 dark:bg-slate-700 dark:text-slate-200"> Retry </button>
    </div>
  {:else}
    <!-- Region contact -->
    {#if region}
      <div class="mb-5 rounded-2xl bg-blue-50 p-5 ring-1 ring-blue-100 dark:bg-blue-950/50 dark:ring-blue-800">
        <h2 class="text-base font-bold text-slate-900 dark:text-slate-100">{region.name}</h2>
        {#if region.helpline}
          <div class="mt-2 flex items-center gap-2">
            <Phone size={15} class="flex-shrink-0 text-blue-500 dark:text-blue-400" strokeWidth={2} />
            <a href="tel:{region.helpline.replace(/\D/g, '')}" class="text-sm font-semibold text-blue-600 dark:text-blue-400">
              {region.helpline}
            </a>
          </div>
        {/if}
        {#if region.url}
          <div class="mt-1.5 flex items-center gap-2">
            <Globe size={15} class="flex-shrink-0 text-blue-500 dark:text-blue-400" strokeWidth={2} />
            <a href={region.url} target="_blank" rel="noopener noreferrer" class="text-sm font-medium text-blue-600 dark:text-blue-400">
              {region.url.replace(/^https?:\/\/(www\.)?/, '')}
            </a>
          </div>
        {/if}
      </div>
    {/if}

    <!-- Area service bodies -->
    <h2 class="mb-3 text-xs font-semibold tracking-wide text-slate-500 uppercase dark:text-slate-400">Area Service Bodies</h2>
    <div class="space-y-3">
      {#each bodies as body (body.id)}
        <div class="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100 dark:bg-slate-800 dark:ring-slate-700">
          <h2 class="text-sm font-bold text-slate-900 dark:text-slate-100">{body.name}</h2>

          {#if body.description}
            <div class="mt-1.5 flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
              <Info size={13} class="mt-0.5 flex-shrink-0 text-slate-400 dark:text-slate-500" strokeWidth={2} />
              <span>{body.description}</span>
            </div>
          {/if}

          {#if body.helpline}
            <div class="mt-1.5 flex items-center gap-2">
              <Phone size={13} class="flex-shrink-0 text-slate-400 dark:text-slate-500" strokeWidth={2} />
              <a href="tel:{body.helpline.replace(/\D/g, '')}" class="text-xs font-medium text-blue-600 dark:text-blue-400">
                {body.helpline}
              </a>
            </div>
          {/if}

          {#if body.url}
            <div class="mt-1.5 flex items-center gap-2">
              <Globe size={13} class="flex-shrink-0 text-slate-400 dark:text-slate-500" strokeWidth={2} />
              <a href={body.url} target="_blank" rel="noopener noreferrer" class="truncate text-xs font-medium text-blue-600 dark:text-blue-400">
                {body.url.replace(/^https?:\/\/(www\.)?/, '')}
              </a>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  {/if}
</div>
