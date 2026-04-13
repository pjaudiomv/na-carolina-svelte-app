import { h as head } from "../../../chunks/renderer.js";
import { B as Book_open } from "../../../chunks/book-open.js";
function _page($$renderer) {
  head("g7i3hr", $$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>Just For Today — CRNA</title>`);
    });
  });
  $$renderer.push(`<div class="flex flex-col items-center justify-center px-6 py-20 text-center"><div class="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-100">`);
  Book_open($$renderer, { size: 28, class: "text-purple-600", strokeWidth: 1.8 });
  $$renderer.push(`<!----></div> <h1 class="text-xl font-bold text-slate-900">Just For Today</h1> <p class="mt-2 text-sm text-slate-500">Daily meditation coming in Phase 2</p></div>`);
}
export {
  _page as default
};
