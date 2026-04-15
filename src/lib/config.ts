const requireEnv = (key: string, value: string | undefined): string => {
  if (!value) throw new Error(`Missing required env var: ${key}`);
  return value;
};

export const config = {
  serviceBodyId: Number(requireEnv('VITE_SERVICE_BODY_ID', import.meta.env.VITE_SERVICE_BODY_ID)),
  eventsUrl: requireEnv('VITE_EVENTS_URL', import.meta.env.VITE_EVENTS_URL),
  appName: requireEnv('VITE_APP_NAME', import.meta.env.VITE_APP_NAME),
  shortName: requireEnv('VITE_APP_SHORT_NAME', import.meta.env.VITE_APP_SHORT_NAME),
  regionName: requireEnv('VITE_REGION_NAME', import.meta.env.VITE_REGION_NAME),
  appDescription: requireEnv('VITE_APP_DESCRIPTION', import.meta.env.VITE_APP_DESCRIPTION),
  aboutText: requireEnv('VITE_ABOUT_TEXT', import.meta.env.VITE_ABOUT_TEXT),
  themeColor: import.meta.env.VITE_THEME_COLOR ?? '#1d4ed8',
  darkBg: '#0f172a',
  lightBg: '#f8fafc'
};

export const storageKeys = {
  theme: 'app_theme',
  installDismissed: 'app_install_dismissed',
  cleanDate: 'nacc_clean_date'
};
