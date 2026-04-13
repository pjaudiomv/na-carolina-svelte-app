import { s as spread_props, h as head, e as ensure_array_like, a as attr, b as attr_class, c as clsx, d as escape_html } from "../../chunks/renderer.js";
import { C as Calendar } from "../../chunks/calendar.js";
import { I as Icon } from "../../chunks/Icon.js";
import { U as Users } from "../../chunks/users.js";
import { M as Map_pin } from "../../chunks/map-pin.js";
import { T as Timer } from "../../chunks/timer.js";
import { B as Book_open } from "../../chunks/book-open.js";
import { S as Star } from "../../chunks/star.js";
function Chevron_right($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconNode = [["path", { "d": "m9 18 6-6-6-6" }]];
  Icon($$renderer, spread_props([
    { name: "chevron-right" },
    /**
     * @component @name ChevronRight
     * @description Lucide SVG icon component, renders SVG Element with children.
     *
     * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJtOSAxOCA2LTYtNi02IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/chevron-right
     * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
     *
     * @param {Object} props - Lucide icons props and any valid SVG attribute
     * @returns {FunctionalComponent} Svelte component
     *
     */
    props,
    { iconNode }
  ]));
}
function _page($$renderer) {
  const cards = [
    {
      href: "/meetings",
      icon: Map_pin,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      title: "Find Meetings",
      description: "Search by location or browse all CRNA meetings"
    },
    {
      href: "/calculator",
      icon: Timer,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      title: "Clean Time",
      description: "Calculate your milestones and keytags"
    },
    {
      href: "/jft",
      icon: Book_open,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      title: "Just For Today",
      description: "Today's daily meditation"
    },
    {
      href: "/spad",
      icon: Star,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      title: "Spiritual Principle",
      description: "Today's spiritual principle a day"
    }
  ];
  head("1uha8ag", $$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>Home — CRNA</title>`);
    });
  });
  $$renderer.push(`<div class="from-brand-dark via-brand to-brand-light bg-gradient-to-br px-6 pt-12 pb-10 text-white"><div class="flex flex-col items-center text-center"><div class="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm"><span class="text-4xl font-black tracking-tight text-white">NA</span></div> <h1 class="text-2xl font-bold tracking-tight">Carolina Region</h1> <p class="mt-1 text-sm text-blue-200">Narcotics Anonymous</p></div></div> <div class="px-4 py-5"><div class="grid grid-cols-2 gap-3"><!--[-->`);
  const each_array = ensure_array_like(cards);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let card = each_array[$$index];
    const Icon2 = card.icon;
    $$renderer.push(`<a${attr("href", card.href)} class="flex flex-col rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100 transition-transform active:scale-95"><div${attr_class(clsx([
      "mb-3 flex h-10 w-10 items-center justify-center rounded-xl",
      card.iconBg
    ]))}>`);
    Icon2($$renderer, { size: 20, class: card.iconColor, strokeWidth: 2 });
    $$renderer.push(`<!----></div> <span class="text-sm font-semibold text-slate-900">${escape_html(card.title)}</span> <span class="mt-0.5 text-xs leading-snug text-slate-500">${escape_html(card.description)}</span></a>`);
  }
  $$renderer.push(`<!--]--></div> <a href="/events" class="mt-3 flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100 transition-transform active:scale-95"><div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-rose-100">`);
  Calendar($$renderer, { size: 20, class: "text-rose-600", strokeWidth: 2 });
  $$renderer.push(`<!----></div> <div class="min-w-0 flex-1"><span class="text-sm font-semibold text-slate-900">Events</span> <p class="text-xs text-slate-500">CRNA events and announcements</p></div> `);
  Chevron_right($$renderer, { size: 16, class: "flex-shrink-0 text-slate-300" });
  $$renderer.push(`<!----></a> <a href="/contact" class="mt-3 flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100 transition-transform active:scale-95"><div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-teal-100">`);
  Users($$renderer, { size: 20, class: "text-teal-600", strokeWidth: 2 });
  $$renderer.push(`<!----></div> <div class="min-w-0 flex-1"><span class="text-sm font-semibold text-slate-900">Service &amp; Contact</span> <p class="text-xs text-slate-500">Service bodies and helpful links</p></div> `);
  Chevron_right($$renderer, { size: 16, class: "flex-shrink-0 text-slate-300" });
  $$renderer.push(`<!----></a></div>`);
}
export {
  _page as default
};
