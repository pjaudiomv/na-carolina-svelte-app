export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","svelte_cap.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {start:"_app/immutable/entry/start.CqZgH6o_.js",app:"_app/immutable/entry/app.Dkp8RBYC.js",imports:["_app/immutable/entry/start.CqZgH6o_.js","_app/immutable/chunks/RX8yGBoR.js","_app/immutable/chunks/BGUNU53b.js","_app/immutable/chunks/DbJHtpi3.js","_app/immutable/entry/app.Dkp8RBYC.js","_app/immutable/chunks/BGUNU53b.js","_app/immutable/chunks/CQ_0uJY0.js","_app/immutable/chunks/BR6aigjF.js","_app/immutable/chunks/DbJHtpi3.js","_app/immutable/chunks/DTeeINZz.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
