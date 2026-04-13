import { h as head } from "../../../chunks/renderer.js";
import { U as Users } from "../../../chunks/users.js";
function _page($$renderer) {
  head("1bv7ezn", $$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>Contact — CRNA</title>`);
    });
  });
  $$renderer.push(`<div class="flex flex-col items-center justify-center px-6 py-20 text-center"><div class="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-100">`);
  Users($$renderer, { size: 28, class: "text-teal-600", strokeWidth: 1.8 });
  $$renderer.push(`<!----></div> <h1 class="text-xl font-bold text-slate-900">Service &amp; Contact</h1> <p class="mt-2 text-sm text-slate-500">Service body contacts coming in Phase 3</p></div>`);
}
export {
  _page as default
};
