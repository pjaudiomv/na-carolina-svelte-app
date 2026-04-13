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
		client: {start:"_app/immutable/entry/start.DFRDjAOx.js",app:"_app/immutable/entry/app.C3m3rCTn.js",imports:["_app/immutable/entry/start.DFRDjAOx.js","_app/immutable/chunks/DaOvUQmt.js","_app/immutable/chunks/CY2VmDG9.js","_app/immutable/chunks/ibqKDQr_.js","_app/immutable/entry/app.C3m3rCTn.js","_app/immutable/chunks/CY2VmDG9.js","_app/immutable/chunks/BzSc3bOZ.js","_app/immutable/chunks/ibqKDQr_.js","_app/immutable/chunks/Dzq0UvIv.js","_app/immutable/chunks/CYtSnLz2.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		remotes: {
			
		},
		routes: [
			
		],
		prerendered_routes: new Set(["/","/calculator","/contact","/events","/jft","/meetings","/settings","/spad"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
