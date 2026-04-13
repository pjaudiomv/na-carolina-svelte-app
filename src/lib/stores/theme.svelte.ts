import { browser } from '$app/environment';

export type ThemePreference = 'light' | 'dark' | 'auto';

const STORAGE_KEY = 'crna_theme';

function loadPreference(): ThemePreference {
  if (!browser) return 'auto';
  return (localStorage.getItem(STORAGE_KEY) as ThemePreference) || 'auto';
}

function resolveTheme(pref: ThemePreference): 'light' | 'dark' {
  if (pref !== 'auto') return pref;
  if (!browser) return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(t: 'light' | 'dark') {
  if (!browser) return;
  document.documentElement.classList.toggle('dark', t === 'dark');
  document.documentElement.style.colorScheme = t === 'dark' ? 'dark' : 'light';
  document.documentElement.style.backgroundColor = t === 'dark' ? '#0f172a' : '#f8fafc';
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', t === 'dark' ? '#0f172a' : '#1d4ed8');
}

const initial = loadPreference();

let preference = $state<ThemePreference>(initial);
let resolved = $state<'light' | 'dark'>(resolveTheme(initial));

// Apply on load and listen for OS theme changes
if (browser) {
  applyTheme(resolveTheme(initial));
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (preference === 'auto') {
      const next = resolveTheme('auto');
      resolved = next;
      applyTheme(next);
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
    const next = resolveTheme(pref);
    resolved = next;
    if (browser) {
      localStorage.setItem(STORAGE_KEY, pref);
      applyTheme(next);
    }
  }
};
