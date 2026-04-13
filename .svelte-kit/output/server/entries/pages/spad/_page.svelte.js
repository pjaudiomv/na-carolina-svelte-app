import { h as head } from "../../../chunks/renderer.js";
import { S as Star } from "../../../chunks/star.js";
function _page($$renderer) {
  head("gtsy9b", $$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>Spiritual Principle A Day — CRNA</title>`);
    });
  });
  $$renderer.push(`<div class="flex flex-col items-center justify-center px-6 py-20 text-center"><div class="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100">`);
  Star($$renderer, { size: 28, class: "text-amber-600", strokeWidth: 1.8 });
  $$renderer.push(`<!----></div> <h1 class="text-xl font-bold text-slate-900">Spiritual Principle A Day</h1> <p class="mt-2 text-sm text-slate-500">Daily reading coming in Phase 2</p></div>`);
}
export {
  _page as default
};
