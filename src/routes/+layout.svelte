<script lang="ts">
  import '../app.css';
  import { page } from '$app/state';
  import { browser } from '$app/environment';
  import { beforeNavigate } from '$app/navigation';
  import { fly } from 'svelte/transition';
  import { Home, MapPin, Timer, BookOpen, Menu, X, Calendar, Users, Settings, WifiOff } from '@lucide/svelte';
  import type { LucideIcon } from '@lucide/svelte';
  import { theme } from '$lib/stores/theme.svelte';
  import InstallPrompt from '$lib/components/InstallPrompt.svelte';
  import { config } from '$lib/config';

  void theme.resolved;

  // Register PWA service worker
  if (browser) {
    navigator.serviceWorker?.register('/sw.js', { scope: '/' });
  }

  let { children } = $props();

  let online = $state(browser ? navigator.onLine : true);

  if (browser) {
    window.addEventListener('online', () => (online = true));
    window.addEventListener('offline', () => (online = false));
  }

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

  beforeNavigate(() => {
    drawerOpen = false;
  });
</script>

<svelte:head>
  <title>{config.appName}</title>
  <meta name="apple-mobile-web-app-title" content={config.shortName} />
  <meta name="theme-color" content={config.themeColor} />
  <meta name="description" content={config.appDescription} />
</svelte:head>

{@render children()}

<!-- Offline banner -->
{#if !online}
  <div class="offline-banner" role="status" aria-live="polite" transition:fly={{ y: 20, duration: 200 }}>
    <WifiOff size={14} strokeWidth={2.5} />
    You're offline — showing cached data
  </div>
{/if}

<InstallPrompt />

<!-- Bottom navigation bar -->
<nav class="bottom-nav" aria-label="Main navigation">
  <div class="nav-row">
    {#each navItems as item (item.href)}
      {@const Icon = item.icon}
      {@const active = isActive(item)}
      <a href={item.href} aria-current={active ? 'page' : undefined} class={['nav-item', active ? 'text-brand dark:text-blue-400' : 'text-slate-500 dark:text-slate-400']}>
        <Icon size={22} strokeWidth={active ? 2.5 : 1.8} />
        <span>{item.label}</span>
      </a>
    {/each}

    <button
      onclick={() => (drawerOpen = true)}
      aria-label="More options"
      class={['nav-item', drawerItems.some((i) => isDrawerItemActive(i.href)) ? 'text-brand dark:text-blue-400' : 'text-slate-500 dark:text-slate-400']}
    >
      <Menu size={22} strokeWidth={1.8} />
      <span>More</span>
    </button>
  </div>
  <div class="safe-bottom"></div>
</nav>

<!-- More drawer -->
{#if drawerOpen}
  <button class="fixed inset-0 z-50 bg-black/40" onclick={() => (drawerOpen = false)} aria-label="Close menu"></button>

  <div class="fixed right-0 bottom-0 left-0 z-50 rounded-t-2xl bg-white shadow-xl dark:bg-slate-800" transition:fly={{ y: 300, duration: 280 }}>
    <div class="flex justify-center pt-3 pb-1">
      <div class="h-1 w-10 rounded-full bg-slate-300 dark:bg-slate-600"></div>
    </div>

    <div class="drawer-content">
      <div class="mb-3 flex items-center justify-between">
        <span class="text-sm font-semibold tracking-wide text-slate-500 uppercase dark:text-slate-400">More</span>
        <button onclick={() => (drawerOpen = false)} class="rounded-full p-1 text-slate-400 hover:bg-slate-100 dark:text-slate-500 dark:hover:bg-slate-700">
          <X size={20} />
        </button>
      </div>

      {#each drawerItems as item (item.href)}
        {@const Icon = item.icon}
        {@const active = isDrawerItemActive(item.href)}
        <a
          href={item.href}
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

<style>
  .bottom-nav {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 40;
    background: white;
    border-top: 1px solid #e2e8f0;
  }

  :global(html.dark) .bottom-nav {
    background: #1e293b;
    border-color: #334155;
  }

  .nav-row {
    display: flex;
    height: 4rem;
    align-items: stretch;
  }

  .nav-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2px;
    padding-top: 4px;
    font-size: 0.75rem;
    font-weight: 500;
  }

  .safe-bottom {
    height: env(safe-area-inset-bottom, 0px);
  }

  .drawer-content {
    padding: 0 1rem 1rem;
    padding-bottom: calc(1rem + env(safe-area-inset-bottom, 0px));
  }

  .offline-banner {
    position: fixed;
    left: 0;
    right: 0;
    bottom: calc(4rem + env(safe-area-inset-bottom, 0px));
    z-index: 50;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.375rem 1rem;
    background: #f59e0b;
    color: white;
    font-size: 0.75rem;
    font-weight: 600;
  }
</style>
