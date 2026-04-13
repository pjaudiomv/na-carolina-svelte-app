<script lang="ts">
  import { Settings, Sun, Moon, Monitor } from '@lucide/svelte';
  import { theme, type ThemePreference } from '$lib/stores/theme.svelte';

  const themeOptions: { value: ThemePreference; label: string; icon: typeof Sun }[] = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'auto', label: 'System', icon: Monitor }
  ];
</script>

<svelte:head>
  <title>Settings — CRNA</title>
</svelte:head>

<!-- Header -->
<div class="from-brand-dark via-brand to-brand-light bg-gradient-to-br px-6 pb-6 text-white" style="padding-top: calc(env(safe-area-inset-top, 0px) + 2rem)">
  <div class="flex items-center gap-3">
    <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
      <Settings size={22} strokeWidth={2} />
    </div>
    <div>
      <h1 class="text-lg font-bold">Settings</h1>
      <p class="text-xs text-blue-200">App preferences</p>
    </div>
  </div>
</div>

<div class="px-4 pt-5 pb-10">
  <!-- Appearance -->
  <div class="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 dark:bg-slate-800 dark:ring-slate-700">
    <h2 class="mb-1 text-sm font-bold text-slate-900 dark:text-slate-100">Appearance</h2>
    <p class="mb-4 text-xs text-slate-500 dark:text-slate-400">Choose your preferred theme</p>

    <div class="grid grid-cols-3 gap-2">
      {#each themeOptions as opt (opt.value)}
        {@const Icon = opt.icon}
        {@const active = theme.preference === opt.value}
        <button
          onclick={() => theme.set(opt.value)}
          class={[
            'flex flex-col items-center gap-2 rounded-xl px-3 py-3 text-xs font-medium transition-colors',
            active ? 'bg-brand text-white' : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
          ]}
        >
          <Icon size={20} strokeWidth={2} />
          {opt.label}
        </button>
      {/each}
    </div>
  </div>

  <!-- About -->
  <div class="mt-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 dark:bg-slate-800 dark:ring-slate-700">
    <h2 class="mb-1 text-sm font-bold text-slate-900 dark:text-slate-100">About</h2>
    <p class="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
      CRNA is the official app for the Carolina Region of Narcotics Anonymous. Find meetings, track your clean time, read daily meditations, and stay connected with your recovery community.
    </p>
    <div class="mt-3 flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
      <span>Version 1.0.0</span>
    </div>
  </div>
</div>
