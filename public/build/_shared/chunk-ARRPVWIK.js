import {
  Splide
} from "/build/_shared/chunk-ZHSF7LRE.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XGOTYLZ5.js";
import {
  require_react
} from "/build/_shared/chunk-7M6SC7J5.js";
import {
  createHotContext
} from "/build/_shared/chunk-HXQWXVBT.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/components/users/Slider/BookSlider.tsx
var import_react = __toESM(require_react(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\users\\\\Slider\\\\BookSlider.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\users\\Slider\\BookSlider.tsx"
  );
  import.meta.hot.lastModified = "1759483988493.0193";
}
function BookSlider({
  projects,
  onSlideChange
}) {
  _s();
  const splideRef = (0, import_react.useRef)(null);
  (0, import_react.useEffect)(() => {
    if (projects.length > 0) {
      if (splideRef.current) {
        splideRef.current.destroy();
      }
      const splide = new Splide(".splide-desktop", {
        type: "loop",
        perPage: 1,
        focus: "center",
        padding: {
          left: "20%",
          right: "20%"
        },
        gap: "1rem",
        arrows: true,
        pagination: false,
        autoplay: true,
        interval: 5e3
      });
      splide.on("moved", (newIndex) => {
        onSlideChange?.(newIndex);
      });
      splide.mount();
      splideRef.current = splide;
      return () => {
        splide.destroy();
      };
    }
  }, [projects, onSlideChange]);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "splide splide-desktop relative z-10", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "splide__track", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", { className: "splide__list", children: projects.map((ebook, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { className: "splide__slide h-100", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: ebook.cover, alt: ebook.title ?? `Slide ${index}`, className: "rounded-xl shadow-lg h-100 w-full object-cover" }, void 0, false, {
      fileName: "app/components/users/Slider/BookSlider.tsx",
      lineNumber: 63,
      columnNumber: 15
    }, this),
    (ebook.title || ebook.author) && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute bottom-4 left-4 text-white drop-shadow", children: [
      ebook.title && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "font-bold", children: ebook.title }, void 0, false, {
        fileName: "app/components/users/Slider/BookSlider.tsx",
        lineNumber: 65,
        columnNumber: 35
      }, this),
      ebook.author && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm", children: ebook.author }, void 0, false, {
        fileName: "app/components/users/Slider/BookSlider.tsx",
        lineNumber: 66,
        columnNumber: 36
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/users/Slider/BookSlider.tsx",
      lineNumber: 64,
      columnNumber: 49
    }, this)
  ] }, index, true, {
    fileName: "app/components/users/Slider/BookSlider.tsx",
    lineNumber: 62,
    columnNumber: 43
  }, this)) }, void 0, false, {
    fileName: "app/components/users/Slider/BookSlider.tsx",
    lineNumber: 61,
    columnNumber: 9
  }, this) }, void 0, false, {
    fileName: "app/components/users/Slider/BookSlider.tsx",
    lineNumber: 60,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/components/users/Slider/BookSlider.tsx",
    lineNumber: 59,
    columnNumber: 10
  }, this);
}
_s(BookSlider, "l0Oj7lpH6ldzU0HGvnIBQ2ipcCg=");
_c = BookSlider;
var _c;
$RefreshReg$(_c, "BookSlider");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

export {
  BookSlider
};
//# sourceMappingURL=/build/_shared/chunk-ARRPVWIK.js.map
