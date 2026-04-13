<script lang="ts">
  import '../app.css';
  import { page } from '$app/state';
  import { fade, fly } from 'svelte/transition';
  import { Home, MapPin, Timer, BookOpen, Menu, X, Calendar, Users, Settings } from '@lucide/svelte';
  import type { LucideIcon } from '@lucide/svelte';

  let { children } = $props();

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

<div class="flex h-full flex-col bg-slate-50">
  <!-- Main content — padded above bottom nav -->
  <main class="min-h-0 flex-1 overflow-y-auto" style="padding-bottom: calc(var(--nav-height) + var(--safe-bottom))">
    {@render children()}
  </main>

  <!-- Bottom navigation bar -->
  <nav
    class="fixed right-0 bottom-0 left-0 z-40 flex h-16 items-stretch border-t border-slate-200 bg-white"
    style="padding-bottom: var(--safe-bottom); height: calc(var(--nav-height) + var(--safe-bottom))"
  >
    {#each navItems as item (item.href)}
      {@const Icon = item.icon}
      {@const active = isActive(item)}
      <a href={item.href} class={['flex flex-1 flex-col items-center justify-center gap-0.5 pt-1 text-xs font-medium transition-colors', active ? 'text-brand' : 'text-slate-400']}>
        <Icon size={22} strokeWidth={active ? 2.5 : 1.8} />
        <span>{item.label}</span>
      </a>
    {/each}

    <!-- More button -->
    <button
      onclick={() => (drawerOpen = true)}
      class={[
        'flex flex-1 flex-col items-center justify-center gap-0.5 pt-1 text-xs font-medium transition-colors',
        drawerItems.some((i) => isDrawerItemActive(i.href)) ? 'text-brand' : 'text-slate-400'
      ]}
    >
      <Menu size={22} strokeWidth={1.8} />
      <span>More</span>
    </button>
  </nav>
</div>

<!-- More drawer -->
{#if drawerOpen}
  <!-- Backdrop -->
  <div class="fixed inset-0 z-50 bg-black/40" transition:fade={{ duration: 200 }} onclick={closeDrawer} aria-hidden="true"></div>

  <!-- Sheet -->
  <div class="fixed right-0 bottom-0 left-0 z-50 rounded-t-2xl bg-white shadow-xl" transition:fly={{ y: 300, duration: 280 }}>
    <!-- Handle -->
    <div class="flex justify-center pt-3 pb-1">
      <div class="h-1 w-10 rounded-full bg-slate-300"></div>
    </div>

    <div class="px-4 pb-4" style="padding-bottom: calc(1rem + var(--safe-bottom))">
      <div class="mb-3 flex items-center justify-between">
        <span class="text-sm font-semibold tracking-wide text-slate-500 uppercase">More</span>
        <button onclick={closeDrawer} class="rounded-full p-1 text-slate-400 hover:bg-slate-100">
          <X size={20} />
        </button>
      </div>

      {#each drawerItems as item (item.href)}
        {@const Icon = item.icon}
        {@const active = isDrawerItemActive(item.href)}
        <a
          href={item.href}
          onclick={closeDrawer}
          class={['flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors', active ? 'text-brand bg-blue-50' : 'text-slate-700 hover:bg-slate-50']}
        >
          <Icon size={20} strokeWidth={active ? 2.5 : 1.8} />
          {item.label}
        </a>
      {/each}
    </div>
  </div>
{/if}
