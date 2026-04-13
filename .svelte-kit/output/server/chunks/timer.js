import { s as spread_props } from "./renderer.js";
import { I as Icon } from "./Icon.js";
function Timer($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconNode = [
    ["line", { "x1": "10", "x2": "14", "y1": "2", "y2": "2" }],
    ["line", { "x1": "12", "x2": "15", "y1": "14", "y2": "11" }],
    ["circle", { "cx": "12", "cy": "14", "r": "8" }]
  ];
  Icon($$renderer, spread_props([
    { name: "timer" },
    /**
     * @component @name Timer
     * @description Lucide SVG icon component, renders SVG Element with children.
     *
     * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8bGluZSB4MT0iMTAiIHgyPSIxNCIgeTE9IjIiIHkyPSIyIiAvPgogIDxsaW5lIHgxPSIxMiIgeDI9IjE1IiB5MT0iMTQiIHkyPSIxMSIgLz4KICA8Y2lyY2xlIGN4PSIxMiIgY3k9IjE0IiByPSI4IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/timer
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
export {
  Timer as T
};
