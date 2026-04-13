import { browser } from '$app/environment';

export type ThemePreference = 'light' | 'dark' | 'auto';

const STORAGE_KEY = 'crna_theme';

let preference = $state<ThemePreference>(loadPreference());
let resolved = $state<'light' | 'dark'>(resolveTheme(preference));

function loadPreference(): ThemePreference {
  if (!browser) return 'auto';
  return (localStorage.getItem(STORAGE_KEY) as ThemePreference) || 'auto';
}

function resolveTheme(pref: ThemePreference): 'light' | 'dark' {
  if (pref !== 'auto') return pref;
  if (!browser) return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme: 'light' | 'dark') {
  if (!browser) return;
  document.documentElement.classList.toggle('dark', theme === 'dark');
  // Update theme-color meta for browser chrome
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', theme === 'dark' ? '#0f172a' : '#1d4ed8');
}

// Listen for OS theme changes when in auto mode
if (browser) {
  applyTheme(resolved);
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (preference === 'auto') {
      resolved = resolveTheme('auto');
      applyTheme(resolved);
    }
  });
}

export const theme = {
  get preference() {
    return preference;
  },
  get resolved() {
    return resolved;
  },
  set(pref: ThemePreference) {
    preference = pref;
    resolved = resolveTheme(pref);
    if (browser) {
      localStorage.setItem(STORAGE_KEY, pref);
      applyTheme(resolved);
    }
  }
};
