import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XGOTYLZ5.js";
import {
  createHotContext
} from "/build/_shared/chunk-HXQWXVBT.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/components/users/Cards/CardCategory.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\users\\\\Cards\\\\CardCategory.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\users\\Cards\\CardCategory.tsx"
  );
  import.meta.hot.lastModified = "1759483596298.266";
}
var CardCategory = ({
  cover = "",
  title = "",
  author = "",
  link = "#",
  description = ""
}) => {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: link, className: "grid grid-cols-[40%_60%] gap-6 hover:border-white/60", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "rounded-xl overflow-hidden", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: cover, alt: title, className: "w-full h-full object-cover" }, void 0, false, {
      fileName: "app/components/users/Cards/CardCategory.tsx",
      lineNumber: 31,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/components/users/Cards/CardCategory.tsx",
      lineNumber: 30,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "flex flex-col justify-center", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "line-clamp-3 font-semibold", children: title }, void 0, false, {
        fileName: "app/components/users/Cards/CardCategory.tsx",
        lineNumber: 34,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "font-pri line-clamp-2", children: author }, void 0, false, {
        fileName: "app/components/users/Cards/CardCategory.tsx",
        lineNumber: 35,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-gray-500", children: description }, void 0, false, {
        fileName: "app/components/users/Cards/CardCategory.tsx",
        lineNumber: 36,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/users/Cards/CardCategory.tsx",
      lineNumber: 33,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/users/Cards/CardCategory.tsx",
    lineNumber: 29,
    columnNumber: 10
  }, this);
};
_c = CardCategory;
var CardCategory_default = CardCategory;
var _c;
$RefreshReg$(_c, "CardCategory");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

export {
  CardCategory_default
};
//# sourceMappingURL=/build/_shared/chunk-LZUP5QEW.js.map
