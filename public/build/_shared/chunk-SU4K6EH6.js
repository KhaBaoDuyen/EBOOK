import {
  FontAwesomeIcon
} from "/build/_shared/chunk-X34T5PVR.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XGOTYLZ5.js";
import {
  createHotContext
} from "/build/_shared/chunk-HXQWXVBT.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/components/users/Buttons/Button.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\users\\\\Buttons\\\\Button.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\users\\Buttons\\Button.tsx"
  );
  import.meta.hot.lastModified = "1759406155375.778";
}
function Button({
  text = "Click me",
  href,
  icon,
  iconPosition = "none",
  onClick,
  className = ""
}) {
  const baseClasses = "button-primary flex items-center justify-center gap-2 px-4 py-2 rounded-3xl bg-emerald-600 text-white hover:bg-emerald-700";
  const classes = `${baseClasses} ${className}`;
  if (href) {
    return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href, onClick, className: classes, children: [
      icon && iconPosition === "left" && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FontAwesomeIcon, { icon, className: "w-4 h-4" }, void 0, false, {
        fileName: "app/components/users/Buttons/Button.tsx",
        lineNumber: 35,
        columnNumber: 45
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "min-w-max", children: text }, void 0, false, {
        fileName: "app/components/users/Buttons/Button.tsx",
        lineNumber: 36,
        columnNumber: 9
      }, this),
      icon && iconPosition === "right" && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FontAwesomeIcon, { icon, className: "w-4 h-4" }, void 0, false, {
        fileName: "app/components/users/Buttons/Button.tsx",
        lineNumber: 37,
        columnNumber: 46
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/users/Buttons/Button.tsx",
      lineNumber: 34,
      columnNumber: 12
    }, this);
  }
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { onClick, className: classes, children: [
    icon && iconPosition === "left" && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FontAwesomeIcon, { icon, className: "w-4 h-4" }, void 0, false, {
      fileName: "app/components/users/Buttons/Button.tsx",
      lineNumber: 41,
      columnNumber: 43
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: " text-center", children: text }, void 0, false, {
      fileName: "app/components/users/Buttons/Button.tsx",
      lineNumber: 42,
      columnNumber: 7
    }, this),
    icon && iconPosition === "right" && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FontAwesomeIcon, { icon, className: "w-4 h-4" }, void 0, false, {
      fileName: "app/components/users/Buttons/Button.tsx",
      lineNumber: 43,
      columnNumber: 44
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/users/Buttons/Button.tsx",
    lineNumber: 40,
    columnNumber: 10
  }, this);
}
_c = Button;
var _c;
$RefreshReg$(_c, "Button");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

export {
  Button
};
//# sourceMappingURL=/build/_shared/chunk-SU4K6EH6.js.map
