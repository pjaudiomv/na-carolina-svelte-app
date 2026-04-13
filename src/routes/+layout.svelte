<script lang="ts">
  import '../app.css';
  import { page } from '$app/state';
  import { browser } from '$app/environment';
  import { afterNavigate } from '$app/navigation';
  import { fade, fly } from 'svelte/transition';
  import { Home, MapPin, Timer, BookOpen, Menu, X, Calendar, Users, Settings, WifiOff } from '@lucide/svelte';
  import type { LucideIcon } from '@lucide/svelte';
  import { theme } from '$lib/stores/theme.svelte';

  // Touch theme to ensure it initializes
  void theme.resolved;

  let { children } = $props();

  let online = $state(browser ? navigator.onLine : true);

  if (browser) {
    window.addEventListener('online', () => (online = true));
    window.addEventListener('offline', () => (online = false));
  }

  // Close drawer on navigation
  afterNavigate(() => {
    drawerOpen = false;
  });

  interface NavItem {
    href: string;
    icon: LucideIcon;
    label: string;
    exact?: boolean;
  }

  const navItems: NavItem[] = [
    { href: '/', icon: Home, label: 'Home', exact: true },
    { href: '/meetings', icon: MapPin, label: 'Meetings' },
    { href: '/calculator', icon: Timer, label: 'Calculator' },
    { href: '/jft', icon: BookOpen, label: 'Daily' }
  ];

  const drawerItems: NavItem[] = [
    { href: '/events', icon: Calendar, label: 'Events' },
    { href: '/contact', icon: Users, label: 'Contact' },
    { href: '/settings', icon: Settings, label: 'Settings' }
  ];

  let drawerOpen = $state(false);

  function isActive(item: NavItem) {
    if (item.exact) return page.url.pathname === item.href;
    return page.url.pathname.startsWith(item.href);
  }

  function isDrawerItemActive(href: string) {
    return page.url.pathname.startsWith(href);
  }

  function closeDrawer() {
    drawerOpen = false;
  }
</script>

<svelte:head>
  <title>CRNA — Carolina Region NA</title>
</svelte:head>

<div class="flex h-dvh flex-col bg-slate-50 dark:bg-slate-900">
  <!-- Main content -->
  <main class="min-h-0 flex-1 overflow-y-auto pb-16">
    {@render children()}
  </main>

  <!-- Offline banner -->
  {#if !online}
    <div
      class="fixed right-0 left-0 z-50 flex items-center justify-center gap-2 bg-amber-500 px-4 py-1.5 text-xs font-semibold text-white"
      style="bottom: calc(4rem + env(safe-area-inset-bottom, 0px))"
      transition:fly={{ y: 20, duration: 200 }}
    >
      <WifiOff size={14} strokeWidth={2.5} />
      You're offline — showing cached data
    </div>
  {/if}

  <!-- Bottom navigation bar -->
  <nav class="fixed right-0 bottom-0 left-0 z-40 border-t border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
    <div class="flex h-16 items-stretch">
      {#each navItems as item (item.href)}
        {@const Icon = item.icon}
        {@const active = isActive(item)}
        <a
          href={item.href}
          class={[
            'flex flex-1 flex-col items-center justify-center gap-0.5 pt-1 text-xs font-medium transition-colors',
            active ? 'text-brand dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'
          ]}
        >
          <Icon size={22} strokeWidth={active ? 2.5 : 1.8} />
          <span>{item.label}</span>
        </a>
      {/each}

      <!-- More button -->
      <button
        onclick={() => (drawerOpen = true)}
        class={[
          'flex flex-1 flex-col items-center justify-center gap-0.5 pt-1 text-xs font-medium transition-colors',
          drawerItems.some((i) => isDrawerItemActive(i.href)) ? 'text-brand dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'
        ]}
      >
        <Menu size={22} strokeWidth={1.8} />
        <span>More</span>
      </button>
    </div>
    <!-- Safe area spacer — fills the home indicator area with nav background -->
    <div style="height: env(safe-area-inset-bottom, 0px)"></div>
  </nav>
</div>

<!-- More drawer -->
{#if drawerOpen}
  <!-- Backdrop -->
  <div class="fixed inset-0 z-50 bg-black/40" transition:fade={{ duration: 200 }} onclick={closeDrawer} aria-hidden="true"></div>

  <!-- Sheet -->
  <div class="fixed right-0 bottom-0 left-0 z-50 rounded-t-2xl bg-white shadow-xl dark:bg-slate-800" transition:fly={{ y: 300, duration: 280 }}>
    <!-- Handle -->
    <div class="flex justify-center pt-3 pb-1">
      <div class="h-1 w-10 rounded-full bg-slate-300 dark:bg-slate-600"></div>
    </div>

    <div class="px-4 pb-4" style="padding-bottom: calc(1rem + env(safe-area-inset-bottom, 0px))">
      <div class="mb-3 flex items-center justify-between">
        <span class="text-sm font-semibold tracking-wide text-slate-500 uppercase dark:text-slate-400">More</span>
        <button onclick={closeDrawer} class="rounded-full p-1 text-slate-400 hover:bg-slate-100 dark:text-slate-500 dark:hover:bg-slate-700">
          <X size={20} />
        </button>
      </div>

      {#each drawerItems as item (item.href)}
        {@const Icon = item.icon}
        {@const active = isDrawerItemActive(item.href)}
        <a
          href={item.href}
          onclick={closeDrawer}
          class={[
            'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors',
            active ? 'text-brand bg-blue-50 dark:bg-blue-950 dark:text-blue-400' : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700'
          ]}
        >
          <Icon size={20} strokeWidth={active ? 2.5 : 1.8} />
          {item.label}
        </a>
      {/each}
    </div>
  </div>
{/if}
