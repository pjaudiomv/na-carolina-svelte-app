import { h as head } from "../../../chunks/renderer.js";
import { S as Settings } from "../../../chunks/settings.js";
function _page($$renderer) {
  head("1i19ct2", $$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>Settings — CRNA</title>`);
    });
  });
  $$renderer.push(`<div class="flex flex-col items-center justify-center px-6 py-20 text-center"><div class="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">`);
  Settings($$renderer, { size: 28, class: "text-slate-600", strokeWidth: 1.8 });
  $$renderer.push(`<!----></div> <h1 class="text-xl font-bold text-slate-900">Settings</h1> <p class="mt-2 text-sm text-slate-500">App settings coming in Phase 3</p></div>`);
}
export {
  _page as default
};
