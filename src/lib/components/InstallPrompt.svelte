<script lang="ts">
  import { browser } from '$app/environment';
  import { X, Download, Share } from '@lucide/svelte';
  import { fly } from 'svelte/transition';
  import { config, storageKeys } from '$lib/config';

  let deferredPrompt = $state<BeforeInstallPromptEvent | null>(null);
  let showIosPrompt = $state(false);
  let dismissed = $state(false);

  interface BeforeInstallPromptEvent extends Event {
    prompt(): Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
  }

  const DISMISS_KEY = storageKeys.installDismissed;

  // Don't show if already installed as standalone or previously dismissed
  const isStandalone = browser && (window.matchMedia('(display-mode: standalone)').matches || ('standalone' in navigator && (navigator as Record<string, unknown>).standalone === true));
  const wasDismissed = browser && localStorage.getItem(DISMISS_KEY);

  if (browser && !isStandalone && !wasDismissed) {
    // Android/Chrome — capture the beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e as BeforeInstallPromptEvent;
    });

    // iOS Safari — detect and show manual instructions
    const ua = navigator.userAgent;
    const isIos = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const isSafari = /Safari/.test(ua) && !/CriOS|FxiOS|OPiOS|EdgiOS/.test(ua);
    if (isIos && isSafari) {
      // Delay slightly so it doesn't flash on first load
      setTimeout(() => {
        showIosPrompt = true;
      }, 3000);
    }
  }

  function install() {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((result) => {
      if (result.outcome === 'accepted') {
        dismiss();
      }
      deferredPrompt = null;
    });
  }

  function dismiss() {
    dismissed = true;
    deferredPrompt = null;
    showIosPrompt = false;
    if (browser) localStorage.setItem(DISMISS_KEY, '1');
  }

  let visible = $derived(!dismissed && !isStandalone && !wasDismissed && (deferredPrompt !== null || showIosPrompt));
</script>

{#if visible}
  <div
    class="fixed right-3 bottom-20 left-3 z-50 flex items-start gap-3 rounded-2xl bg-white p-4 shadow-lg ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700"
    style="bottom: calc(5rem + env(safe-area-inset-bottom, 0px))"
    transition:fly={{ y: 80, duration: 300 }}
  >
    <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/50">
      <Download size={20} class="text-blue-600 dark:text-blue-400" strokeWidth={2} />
    </div>

    <div class="min-w-0 flex-1">
      <p class="text-sm font-semibold text-slate-900 dark:text-slate-100">Install {config.shortName}</p>

      {#if deferredPrompt}
        <p class="mt-0.5 text-xs text-slate-500 dark:text-slate-400">Add to your home screen for quick access</p>
        <button onclick={install} class="bg-brand mt-2 rounded-lg px-4 py-1.5 text-xs font-semibold text-white"> Install </button>
      {:else}
        <p class="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
          Tap <Share size={12} class="inline text-blue-500" strokeWidth={2.5} /> then <strong>"Add to Home Screen"</strong>
        </p>
      {/if}
    </div>

    <button onclick={dismiss} class="flex-shrink-0 rounded-full p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700" aria-label="Dismiss">
      <X size={16} />
    </button>
  </div>
{/if}
