import { h as head } from "../../../chunks/renderer.js";
import { M as Map_pin } from "../../../chunks/map-pin.js";
function _page($$renderer) {
  head("1vf7gdz", $$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>Find Meetings — CRNA</title>`);
    });
  });
  $$renderer.push(`<div class="flex flex-col items-center justify-center px-6 py-20 text-center"><div class="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100">`);
  Map_pin($$renderer, { size: 28, class: "text-blue-600", strokeWidth: 1.8 });
  $$renderer.push(`<!----></div> <h1 class="text-xl font-bold text-slate-900">Find Meetings</h1> <p class="mt-2 text-sm text-slate-500">Meeting finder coming in Phase 2</p></div>`);
}
export {
  _page as default
};
