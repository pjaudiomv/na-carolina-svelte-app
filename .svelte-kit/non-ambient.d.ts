
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	type MatcherParam<M> = M extends (param : string) => param is (infer U extends string) ? U : string;

	export interface AppTypes {
		RouteId(): "/" | "/calculator" | "/contact" | "/events" | "/jft" | "/meetings" | "/settings" | "/spad";
		RouteParams(): {
			
		};
		LayoutParams(): {
			"/": Record<string, never>;
			"/calculator": Record<string, never>;
			"/contact": Record<string, never>;
			"/events": Record<string, never>;
			"/jft": Record<string, never>;
			"/meetings": Record<string, never>;
			"/settings": Record<string, never>;
			"/spad": Record<string, never>
		};
		Pathname(): "/" | "/calculator" | "/contact" | "/events" | "/jft" | "/meetings" | "/settings" | "/spad";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/apple-touch-icon.png" | "/favicon.png" | "/icon-1024x1024.png" | "/icon-192x192.png" | "/icon-512x512.png" | "/svelte_cap.png" | string & {};
	}
}