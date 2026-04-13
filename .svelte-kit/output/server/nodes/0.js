import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.pLrxFTgU.js","_app/immutable/chunks/BzSc3bOZ.js","_app/immutable/chunks/CY2VmDG9.js","_app/immutable/chunks/DfRphAw5.js","_app/immutable/chunks/CYtSnLz2.js","_app/immutable/chunks/Dzq0UvIv.js","_app/immutable/chunks/Bmn2fyDD.js","_app/immutable/chunks/DaOvUQmt.js","_app/immutable/chunks/ibqKDQr_.js","_app/immutable/chunks/B6TddT7g.js","_app/immutable/chunks/DbfzcqhF.js","_app/immutable/chunks/BJQwg2Lz.js","_app/immutable/chunks/DtGOtLy4.js","_app/immutable/chunks/CaslliNg.js","_app/immutable/chunks/CQynXhqv.js"];
export const stylesheets = ["_app/immutable/assets/0.DBf8jWS_.css"];
export const fonts = [];
