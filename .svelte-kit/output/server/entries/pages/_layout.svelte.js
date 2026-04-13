import { s as spread_props, h as head, e as ensure_array_like, a as attr, b as attr_class, c as clsx, d as escape_html } from "../../chunks/renderer.js";
import { p as page } from "../../chunks/index.js";
import { C as Calendar } from "../../chunks/calendar.js";
import { U as Users } from "../../chunks/users.js";
import { S as Settings } from "../../chunks/settings.js";
import { I as Icon } from "../../chunks/Icon.js";
import { M as Map_pin } from "../../chunks/map-pin.js";
import { T as Timer } from "../../chunks/timer.js";
import { B as Book_open } from "../../chunks/book-open.js";
function House($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconNode = [
    [
      "path",
      { "d": "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" }
    ],
    [
      "path",
      {
        "d": "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
      }
    ]
  ];
  Icon($$renderer, spread_props([
    { name: "house" },
    /**
     * @component @name House
     * @description Lucide SVG icon component, renders SVG Element with children.
     *
     * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTUgMjF2LThhMSAxIDAgMCAwLTEtMWgtNGExIDEgMCAwIDAtMSAxdjgiIC8+CiAgPHBhdGggZD0iTTMgMTBhMiAyIDAgMCAxIC43MDktMS41MjhsNy02YTIgMiAwIDAgMSAyLjU4MiAwbDcgNkEyIDIgMCAwIDEgMjEgMTB2OWEyIDIgMCAwIDEtMiAySDVhMiAyIDAgMCAxLTItMnoiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/house
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
function Menu($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconNode = [
    ["path", { "d": "M4 5h16" }],
    ["path", { "d": "M4 12h16" }],
    ["path", { "d": "M4 19h16" }]
  ];
  Icon($$renderer, spread_props([
    { name: "menu" },
    /**
     * @component @name Menu
     * @description Lucide SVG icon component, renders SVG Element with children.
     *
     * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNNCA1aDE2IiAvPgogIDxwYXRoIGQ9Ik00IDEyaDE2IiAvPgogIDxwYXRoIGQ9Ik00IDE5aDE2IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/menu
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
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { children } = $$props;
    const navItems = [
      { href: "/", icon: House, label: "Home", exact: true },
      { href: "/meetings", icon: Map_pin, label: "Meetings" },
      { href: "/calculator", icon: Timer, label: "Calculator" },
      { href: "/jft", icon: Book_open, label: "Daily" }
    ];
    const drawerItems = [
      { href: "/events", icon: Calendar, label: "Events" },
      { href: "/contact", icon: Users, label: "Contact" },
      { href: "/settings", icon: Settings, label: "Settings" }
    ];
    function isActive(item) {
      if (item.exact) return page.url.pathname === item.href;
      return page.url.pathname.startsWith(item.href);
    }
    function isDrawerItemActive(href) {
      return page.url.pathname.startsWith(href);
    }
    head("12qhfyh", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>CRNA — Carolina Region NA</title>`);
      });
    });
    $$renderer2.push(`<div class="flex h-full flex-col bg-slate-50"><main class="min-h-0 flex-1 overflow-y-auto" style="padding-bottom: calc(var(--nav-height) + var(--safe-bottom))">`);
    children($$renderer2);
    $$renderer2.push(`<!----></main> <nav class="fixed right-0 bottom-0 left-0 z-40 flex h-16 items-stretch border-t border-slate-200 bg-white" style="padding-bottom: var(--safe-bottom); height: calc(var(--nav-height) + var(--safe-bottom))"><!--[-->`);
    const each_array = ensure_array_like(navItems);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let item = each_array[$$index];
      const Icon2 = item.icon;
      const active = isActive(item);
      $$renderer2.push(`<a${attr("href", item.href)}${attr_class(clsx([
        "flex flex-1 flex-col items-center justify-center gap-0.5 pt-1 text-xs font-medium transition-colors",
        active ? "text-brand" : "text-slate-400"
      ]))}>`);
      if (Icon2) {
        $$renderer2.push("<!--[-->");
        Icon2($$renderer2, { size: 22, strokeWidth: active ? 2.5 : 1.8 });
        $$renderer2.push("<!--]-->");
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push("<!--]-->");
      }
      $$renderer2.push(` <span>${escape_html(item.label)}</span></a>`);
    }
    $$renderer2.push(`<!--]--> <button${attr_class(clsx([
      "flex flex-1 flex-col items-center justify-center gap-0.5 pt-1 text-xs font-medium transition-colors",
      drawerItems.some((i) => isDrawerItemActive(i.href)) ? "text-brand" : "text-slate-400"
    ]))}>`);
    Menu($$renderer2, { size: 22, strokeWidth: 1.8 });
    $$renderer2.push(`<!----> <span>More</span></button></nav></div> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
export {
  _layout as default
};
