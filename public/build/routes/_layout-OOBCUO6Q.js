import {
  categories_default
} from "/build/_shared/chunk-665M7QN7.js";
import {
  Outlet,
  useNavigate
} from "/build/_shared/chunk-ACJCLCRR.js";
import "/build/_shared/chunk-U4FRFQSK.js";
import {
  Button
} from "/build/_shared/chunk-SU4K6EH6.js";
import {
  FontAwesomeIcon,
  faEye,
  faEyeSlash
} from "/build/_shared/chunk-X34T5PVR.js";
import "/build/_shared/chunk-B43JI2TA.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XGOTYLZ5.js";
import {
  require_react
} from "/build/_shared/chunk-7M6SC7J5.js";
import {
  createHotContext
} from "/build/_shared/chunk-HXQWXVBT.js";
import "/build/_shared/chunk-UWV35TSL.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/components/users/Layouts/Header.tsx
var import_react4 = __toESM(require_react());

// node_modules/react-icons/lib/iconBase.mjs
var import_react2 = __toESM(require_react(), 1);

// node_modules/react-icons/lib/iconContext.mjs
var import_react = __toESM(require_react(), 1);
var DefaultContext = {
  color: void 0,
  size: void 0,
  className: void 0,
  style: void 0,
  attr: void 0
};
var IconContext = import_react.default.createContext && /* @__PURE__ */ import_react.default.createContext(DefaultContext);

// node_modules/react-icons/lib/iconBase.mjs
var _excluded = ["attr", "size", "title"];
function _objectWithoutProperties(source, excluded) {
  if (source == null)
    return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0)
        continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key))
        continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  for (var key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (excluded.indexOf(key) >= 0)
        continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t)
    return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != typeof i)
      return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function Tree2Element(tree) {
  return tree && tree.map((node, i) => /* @__PURE__ */ import_react2.default.createElement(node.tag, _objectSpread({
    key: i
  }, node.attr), Tree2Element(node.child)));
}
function GenIcon(data) {
  return (props) => /* @__PURE__ */ import_react2.default.createElement(IconBase, _extends({
    attr: _objectSpread({}, data.attr)
  }, props), Tree2Element(data.child));
}
function IconBase(props) {
  var elem = (conf) => {
    var {
      attr,
      size,
      title
    } = props, svgProps = _objectWithoutProperties(props, _excluded);
    var computedSize = size || conf.size || "1em";
    var className;
    if (conf.className)
      className = conf.className;
    if (props.className)
      className = (className ? className + " " : "") + props.className;
    return /* @__PURE__ */ import_react2.default.createElement("svg", _extends({
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0"
    }, conf.attr, attr, svgProps, {
      className,
      style: _objectSpread(_objectSpread({
        color: props.color || conf.color
      }, conf.style), props.style),
      height: computedSize,
      width: computedSize,
      xmlns: "http://www.w3.org/2000/svg"
    }), title && /* @__PURE__ */ import_react2.default.createElement("title", null, title), props.children);
  };
  return IconContext !== void 0 ? /* @__PURE__ */ import_react2.default.createElement(IconContext.Consumer, null, (conf) => elem(conf)) : elem(DefaultContext);
}

// node_modules/react-icons/fa/index.mjs
function FaPhoneAlt(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 512 512" }, "child": [{ "tag": "path", "attr": { "d": "M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z" }, "child": [] }] })(props);
}
function FaSearch(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 512 512" }, "child": [{ "tag": "path", "attr": { "d": "M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" }, "child": [] }] })(props);
}

// app/components/users/Buttons/Button-Border.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\users\\\\Buttons\\\\Button-Border.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\users\\Buttons\\Button-Border.tsx"
  );
  import.meta.hot.lastModified = "1759406155374.5295";
}
function ButtonBorder({
  text = "Click me",
  href,
  icon = null,
  iconPosition = "none",
  onClick
}) {
  const classes = "font-bold flex items-center gap-2 px-4 py-2 rounded-3xl bg-white/30 backdrop-blur-md border border-white/40 shadow-inner shadow-white/40 text-white hover:shadow-white/70 transition";
  if (href) {
    return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href, onClick, className: classes, children: [
      icon && iconPosition === "left" && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FontAwesomeIcon, { icon, className: "w-4 h-4" }, void 0, false, {
        fileName: "app/components/users/Buttons/Button-Border.tsx",
        lineNumber: 32,
        columnNumber: 45
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "min-w-max", children: text }, void 0, false, {
        fileName: "app/components/users/Buttons/Button-Border.tsx",
        lineNumber: 33,
        columnNumber: 9
      }, this),
      icon && iconPosition === "right" && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FontAwesomeIcon, { icon, className: "w-4 h-4" }, void 0, false, {
        fileName: "app/components/users/Buttons/Button-Border.tsx",
        lineNumber: 34,
        columnNumber: 46
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/users/Buttons/Button-Border.tsx",
      lineNumber: 31,
      columnNumber: 12
    }, this);
  }
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { onClick, className: classes, children: [
    icon && iconPosition === "left" && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FontAwesomeIcon, { icon, className: "w-4 h-4" }, void 0, false, {
      fileName: "app/components/users/Buttons/Button-Border.tsx",
      lineNumber: 38,
      columnNumber: 43
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "min-w-max", children: text }, void 0, false, {
      fileName: "app/components/users/Buttons/Button-Border.tsx",
      lineNumber: 39,
      columnNumber: 7
    }, this),
    icon && iconPosition === "right" && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FontAwesomeIcon, { icon, className: "w-4 h-4" }, void 0, false, {
      fileName: "app/components/users/Buttons/Button-Border.tsx",
      lineNumber: 40,
      columnNumber: 44
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/users/Buttons/Button-Border.tsx",
    lineNumber: 37,
    columnNumber: 10
  }, this);
}
_c = ButtonBorder;
var _c;
$RefreshReg$(_c, "ButtonBorder");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/components/Authentication.tsx
var import_react3 = __toESM(require_react());

// node_modules/react-icons/fc/index.mjs
function FcGoogle(props) {
  return GenIcon({ "tag": "svg", "attr": { "version": "1.1", "x": "0px", "y": "0px", "viewBox": "0 0 48 48", "enableBackground": "new 0 0 48 48" }, "child": [{ "tag": "path", "attr": { "fill": "#FFC107", "d": "M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12\r\n	c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24\r\n	c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" }, "child": [] }, { "tag": "path", "attr": { "fill": "#FF3D00", "d": "M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657\r\n	C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" }, "child": [] }, { "tag": "path", "attr": { "fill": "#4CAF50", "d": "M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36\r\n	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" }, "child": [] }, { "tag": "path", "attr": { "fill": "#1976D2", "d": "M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571\r\n	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" }, "child": [] }] })(props);
}

// app/components/Authentication.tsx
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\Authentication.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\Authentication.tsx"
  );
  import.meta.hot.lastModified = "1759406373509.3828";
}
var Authentication = ({
  isOpen,
  onClose,
  mode = "login"
}) => {
  _s();
  if (!isOpen)
    return null;
  const [showPassword, setShowPassword] = (0, import_react3.useState)(false);
  const [showConfirmPassword, setShowConfirmPassword] = (0, import_react3.useState)(false);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { onClick: onClose, className: "fixed inset-0 bg-black/70 flex items-center justify-center z-999", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: " rounded-lg backdrop-blur-lg bg-black/50 border-1 border-white/40\r\n              p-6  shadow-lg", onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "p-5 flex flex-col items-center justify-center gap-5", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("span", { className: "text-center", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("h2", { className: "text-2xl font-bold mb-4", children: mode === "login" ? "\u0110\u0103ng nh\u1EADp t\xE0i kho\u1EA3n" : "\u0110\u0103ng k\xFD t\xE0i kho\u1EA3n" }, void 0, false, {
        fileName: "app/components/Authentication.tsx",
        lineNumber: 42,
        columnNumber: 25
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("p", { children: [
        "  ",
        mode === "login" ? "Ch\u1ECDn ph\u01B0\u01A1ng th\u1EE9c \u0111\u0103ng nh\u1EADp" : "\u0110\u0103ng k\xFD \u0111\u1EC3 mua v\xE0 theo d\xF5i qu\xE1 tr\xECnh \u0111\u1ECDc s\xE1ch"
      ] }, void 0, true, {
        fileName: "app/components/Authentication.tsx",
        lineNumber: 45,
        columnNumber: 25
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/Authentication.tsx",
      lineNumber: 41,
      columnNumber: 21
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "flex gap-5", children: [
      mode === "login" && /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "basis-1/2 border-r-1 border-white/40", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("img", { src: "/Images/Main/authencation.jpg", alt: "", className: "w-full h-full object-cover" }, void 0, false, {
        fileName: "app/components/Authentication.tsx",
        lineNumber: 50,
        columnNumber: 33
      }, this) }, void 0, false, {
        fileName: "app/components/Authentication.tsx",
        lineNumber: 49,
        columnNumber: 46
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("form", { className: `flex flex-col gap-3 items-center justify-center !w-[25rem]
    ${mode === "login" ? "basis-1/2" : "basis-full"}`, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("h1", { className: "text-center font-light text-md", children: mode === "register" ? "\u0110\u0103ng k\xFD v\u1EDBi th\xF4ng tin" : "\u0110\u0103ng nh\u1EADp v\u1EDBi m\u1EADt kh\u1EA9u" }, void 0, false, {
          fileName: "app/components/Authentication.tsx",
          lineNumber: 54,
          columnNumber: 29
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "flex flex-col gap-5 w-full", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("input", { type: "phone", placeholder: "S\u1ED1 \u0111i\u1EC7n tho\u1EA1i", className: "border-1 w-full p-3 rounded-xl" }, void 0, false, {
            fileName: "app/components/Authentication.tsx",
            lineNumber: 60,
            columnNumber: 33
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "relative w-full", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("input", { type: showPassword ? "text" : "password", placeholder: "M\u1EADt kh\u1EA9u", className: "w-full border p-3 rounded-xl pr-10" }, void 0, false, {
              fileName: "app/components/Authentication.tsx",
              lineNumber: 63,
              columnNumber: 37
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("span", { onClick: () => setShowPassword(!showPassword), className: "absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(FontAwesomeIcon, { icon: showPassword ? faEyeSlash : faEye }, void 0, false, {
              fileName: "app/components/Authentication.tsx",
              lineNumber: 65,
              columnNumber: 41
            }, this) }, void 0, false, {
              fileName: "app/components/Authentication.tsx",
              lineNumber: 64,
              columnNumber: 37
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/Authentication.tsx",
            lineNumber: 62,
            columnNumber: 33
          }, this),
          mode === "register" && /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "relative w-full", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("input", { type: showConfirmPassword ? "text" : "password", placeholder: "Nh\u1EADp l\u1EA1i m\u1EADt kh\u1EA9u", className: "w-full border p-3 rounded-xl pr-10" }, void 0, false, {
              fileName: "app/components/Authentication.tsx",
              lineNumber: 70,
              columnNumber: 41
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("span", { onClick: () => setShowConfirmPassword(!showConfirmPassword), className: "absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(FontAwesomeIcon, { icon: showConfirmPassword ? faEyeSlash : faEye }, void 0, false, {
              fileName: "app/components/Authentication.tsx",
              lineNumber: 72,
              columnNumber: 45
            }, this) }, void 0, false, {
              fileName: "app/components/Authentication.tsx",
              lineNumber: 71,
              columnNumber: 41
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/Authentication.tsx",
            lineNumber: 69,
            columnNumber: 57
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/Authentication.tsx",
          lineNumber: 58,
          columnNumber: 29
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Button, { text: mode === "login" ? "\u0110\u0103ng nh\u1EADp" : "\u0110\u0103ng k\xFD", className: "!w-full !text-center" }, void 0, false, {
          fileName: "app/components/Authentication.tsx",
          lineNumber: 76,
          columnNumber: 29
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("p", { className: "!text-gray-600", children: mode === "login" ? "ho\u1EB7c \u0111\u0103ng nh\u1EADp v\u1EDBi " : "ho\u1EB7c \u0111\u0103ng k\xFD v\u1EDBi " }, void 0, false, {
          fileName: "app/components/Authentication.tsx",
          lineNumber: 77,
          columnNumber: 29
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("button", { className: "flex gap-5 !w-full bg-gray-700/40 hover:border-white \r\n          hover:border-1 items-center justify-center py-3 px-5 rounded-full", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(FcGoogle, { className: "text-2xl" }, void 0, false, {
            fileName: "app/components/Authentication.tsx",
            lineNumber: 81,
            columnNumber: 33
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("span", { children: [
            " ",
            mode === "login" ? "\u0110\u0103ng nh\u1EADp v\u1EDBi Google " : "\u0110\u0103ng k\xFD v\u1EDBi Google"
          ] }, void 0, true, {
            fileName: "app/components/Authentication.tsx",
            lineNumber: 82,
            columnNumber: 33
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/Authentication.tsx",
          lineNumber: 79,
          columnNumber: 29
        }, this),
        mode === "register" && /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("p", { className: "!text-gray-500 w-[90%] text-center", children: "B\u1EB1ng vi\u1EC7c nh\u1EA5n \u201C\u0110\u0103ng nh\u1EADp\u201D, b\u1EA1n \u0111\xE3 \u0111\u1ECDc v\xE0 \u0111\u1ED3ng \xFD v\u1EDBi \u0111i\u1EC1u ki\u1EC7n v\xE0 \u0111i\u1EC1u kho\u1EA3n c\u1EE7a Waka" }, void 0, false, {
          fileName: "app/components/Authentication.tsx",
          lineNumber: 84,
          columnNumber: 53
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/Authentication.tsx",
        lineNumber: 52,
        columnNumber: 25
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/Authentication.tsx",
      lineNumber: 48,
      columnNumber: 21
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/Authentication.tsx",
    lineNumber: 40,
    columnNumber: 17
  }, this) }, void 0, false, {
    fileName: "app/components/Authentication.tsx",
    lineNumber: 37,
    columnNumber: 13
  }, this) }, void 0, false, {
    fileName: "app/components/Authentication.tsx",
    lineNumber: 36,
    columnNumber: 10
  }, this);
};
_s(Authentication, "yHs/6/NKNWoLIPhFT8NHZXkIhhU=");
_c2 = Authentication;
var Authentication_default = Authentication;
var _c2;
$RefreshReg$(_c2, "Authentication");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/components/users/Layouts/Header.tsx
var import_jsx_dev_runtime3 = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\users\\\\Layouts\\\\Header.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s2 = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\users\\Layouts\\Header.tsx"
  );
  import.meta.hot.lastModified = "1759476344599.872";
}
function Header() {
  _s2();
  const [scrolled, setScrolled] = (0, import_react4.useState)(false);
  const [openMenuSlug, setOpenMenuSlug] = (0, import_react4.useState)(null);
  const [currentPath, setCurrentPath] = (0, import_react4.useState)("");
  const [mobileMenuOpen, setMobileMenuOpen] = (0, import_react4.useState)(false);
  const [showMoreOpen, setShowMoreOpen] = (0, import_react4.useState)(false);
  const [isOpen, setIsOpen] = (0, import_react4.useState)(false);
  const [mode, setMode] = (0, import_react4.useState)("login");
  const navigate = useNavigate();
  const categories = categories_default;
  const mainCategories = categories.slice(0, 5);
  const moreCategories = categories.slice(5);
  (0, import_react4.useEffect)(() => {
    setCurrentPath(window.location.pathname);
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  function toggleSubMenu(cat) {
    if (!cat.subCategories) {
      navigate("/" + cat.slug);
      return;
    }
    setOpenMenuSlug(openMenuSlug === cat.slug ? null : cat.slug);
  }
  function isActive(cat) {
    if (currentPath === "/" + cat.slug)
      return true;
    if (cat.subCategories && cat.subCategories.some((sub) => currentPath === "/" + sub.slug))
      return true;
    return false;
  }
  return /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_jsx_dev_runtime3.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("header", { className: "fixed top-0 w-full z-100 transition-colors duration-300", style: {
      background: scrolled ? "linear-gradient(to top, rgba(0,0,0,0.8) 100%)" : "linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)"
    }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "mx-auto lg:container px-4 py-3", children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "flex items-start justify-between", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("button", { onClick: () => setMobileMenuOpen(!mobileMenuOpen), className: "lg:hidden p-2 rounded-lg hover:bg-pri transition-colors order-1", children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M4 6h16M4 12h16M4 18h16" }, void 0, false, {
        fileName: "app/components/users/Layouts/Header.tsx",
        lineNumber: 70,
        columnNumber: 17
      }, this) }, void 0, false, {
        fileName: "app/components/users/Layouts/Header.tsx",
        lineNumber: 69,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "app/components/users/Layouts/Header.tsx",
        lineNumber: 68,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "hidden lg:flex items-center space-x-3 max-w-[13rem] order-2 lg:order-1", children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("img", { src: "/Images/Main/logo-light.png", alt: "Logo", className: "w-full rounded-xl drop-shadow-2xl" }, void 0, false, {
        fileName: "app/components/users/Layouts/Header.tsx",
        lineNumber: 75,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "app/components/users/Layouts/Header.tsx",
        lineNumber: 74,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("nav", { className: "hidden lg:flex flex-wrap gap-x-6 gap-y-2 order-2", children: [
        mainCategories.map((cat) => /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "relative flex flex-col gap-3 group", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("a", { href: "/" + cat.slug, className: `py-2 px-3 font-bold transition-colors hover-font ${isActive(cat) ? "text-emerald-400" : ""}`, children: cat.name }, void 0, false, {
            fileName: "app/components/users/Layouts/Header.tsx",
            lineNumber: 80,
            columnNumber: 19
          }, this),
          cat.subCategories && /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "absolute lg:p-5 z-[90] w-max left-0 top-full mt-1 \r\n                     bg-black/80 backdrop-blur-md rounded-lg shadow-lg border border-white/30 \r\n                     transition-all duration-200 opacity-0 invisible \r\n                     group-hover:opacity-100 group-hover:visible", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("h1", { className: "font-bold py-2 text-xl mb-2", children: cat.name }, void 0, false, {
              fileName: "app/components/users/Layouts/Header.tsx",
              lineNumber: 88,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "grid auto-rows-auto gap-4 max-h-[8rem] overflow-y-auto p-5", style: {
              gridTemplateColumns: "repeat(4, minmax(0, max-content))",
              gap: "1rem"
            }, children: cat.subCategories.map((sub) => /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("a", { href: `/${cat.slug}/${sub.slug}`, className: `block px-4 py-2 text-white hover:bg-white/30 rounded-xl font-bold ${currentPath === "/" + sub.slug ? "text-emerald-400" : ""}`, children: sub.name }, sub.slug, false, {
              fileName: "app/components/users/Layouts/Header.tsx",
              lineNumber: 93,
              columnNumber: 55
            }, this)) }, void 0, false, {
              fileName: "app/components/users/Layouts/Header.tsx",
              lineNumber: 89,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "border-t-2 flex flex-col gap-4 py-5 mt-4 border-white/30", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("h1", { className: "font-bold text-xl mb-2", children: "Kh\xE1m ph\xE1 ngay" }, void 0, false, {
                fileName: "app/components/users/Layouts/Header.tsx",
                lineNumber: 99,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "flex flex-wrap gap-3", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("a", { href: "/sach-moi-nhat", className: "py-2 px-3 hover:bg-white/50 bg-white/20 backdrop-blur rounded-md", children: "S\xE1ch m\u1EDBi nh\u1EA5t" }, void 0, false, {
                  fileName: "app/components/users/Layouts/Header.tsx",
                  lineNumber: 101,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("a", { href: "/sach-da-doc", className: "py-2 px-3 hover:bg-white/50 bg-white/20 backdrop-blur rounded-md", children: "S\xE1ch \u0111\xE3 \u0111\u1ECDc" }, void 0, false, {
                  fileName: "app/components/users/Layouts/Header.tsx",
                  lineNumber: 104,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("a", { href: "/sach-nghe", className: "py-2 px-3 hover:bg-white/50 bg-white/20 backdrop-blur rounded-md", children: "S\xE1ch nghe" }, void 0, false, {
                  fileName: "app/components/users/Layouts/Header.tsx",
                  lineNumber: 107,
                  columnNumber: 27
                }, this)
              ] }, void 0, true, {
                fileName: "app/components/users/Layouts/Header.tsx",
                lineNumber: 100,
                columnNumber: 25
              }, this)
            ] }, void 0, true, {
              fileName: "app/components/users/Layouts/Header.tsx",
              lineNumber: 98,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/users/Layouts/Header.tsx",
            lineNumber: 84,
            columnNumber: 41
          }, this)
        ] }, cat.slug, true, {
          fileName: "app/components/users/Layouts/Header.tsx",
          lineNumber: 79,
          columnNumber: 42
        }, this)),
        moreCategories.length > 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "relative flex flex-col gap-3 group", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("a", { href: "#", className: "py-2 px-3 text-white/90 font-bold transition-colors hover-font", onClick: (e) => e.preventDefault(), children: "Xem th\xEAm" }, void 0, false, {
            fileName: "app/components/users/Layouts/Header.tsx",
            lineNumber: 116,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "absolute left-0 top-full w-max mt-1 \r\n                   bg-black/80 backdrop-blur-md rounded-lg shadow-lg border border-white/30 \r\n                   transition-all duration-200 z-50 opacity-0 invisible \r\n                   group-hover:opacity-100 group-hover:visible", children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "grid auto-rows-auto gap-4 max-h-[12rem] overflow-y-auto p-5", style: {
            gridTemplateColumns: "repeat(1, minmax(0, max-content))"
          }, children: moreCategories.map((cat) => /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("a", { href: "/" + cat.slug, className: "block px-4 py-2 text-white hover:bg-white/30 rounded-xl font-bold", children: cat.name }, cat.slug, false, {
            fileName: "app/components/users/Layouts/Header.tsx",
            lineNumber: 127,
            columnNumber: 50
          }, this)) }, void 0, false, {
            fileName: "app/components/users/Layouts/Header.tsx",
            lineNumber: 124,
            columnNumber: 21
          }, this) }, void 0, false, {
            fileName: "app/components/users/Layouts/Header.tsx",
            lineNumber: 120,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/users/Layouts/Header.tsx",
          lineNumber: 115,
          columnNumber: 45
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/users/Layouts/Header.tsx",
        lineNumber: 78,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "flex items-center space-x-3 order-3", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "relative items-center group", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("input", { type: "text", placeholder: "T\xECm ki\u1EBFm s\xE1ch, t\xE1c gi\u1EA3...", className: "absolute right-12 w-0 opacity-0 px-0 py-2 rounded-xl bg-pri text-white\r\n                   placeholder-gray-400 border border-gray-600 focus:outline-none \r\n                   focus:w-64 focus:px-4 focus:opacity-100 transition-all duration-300 \r\n                   group-hover:w-64 group-hover:opacity-100 group-hover:px-4 focus:ring-emerald-600" }, void 0, false, {
            fileName: "app/components/users/Layouts/Header.tsx",
            lineNumber: 138,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("button", { className: "flex items-center justify-center w-10 h-10 rounded-full hover:bg-emerald-500 transition-colors duration-300", children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(FaSearch, { className: "w-5 h-5 text-white" }, void 0, false, {
            fileName: "app/components/users/Layouts/Header.tsx",
            lineNumber: 143,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "app/components/users/Layouts/Header.tsx",
            lineNumber: 142,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/users/Layouts/Header.tsx",
          lineNumber: 137,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "hidden lg:block", children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("span", { className: "flex items-center space-x-3", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(ButtonBorder, { text: "\u0110\u0103ng k\xFD", onClick: () => {
            setMode("register");
            setIsOpen(true);
          } }, void 0, false, {
            fileName: "app/components/users/Layouts/Header.tsx",
            lineNumber: 149,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Button, { text: "\u0110\u0103ng nh\u1EADp", onClick: () => {
            setMode("login");
            setIsOpen(true);
          } }, void 0, false, {
            fileName: "app/components/users/Layouts/Header.tsx",
            lineNumber: 153,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/users/Layouts/Header.tsx",
          lineNumber: 148,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/components/users/Layouts/Header.tsx",
          lineNumber: 147,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/users/Layouts/Header.tsx",
        lineNumber: 136,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/users/Layouts/Header.tsx",
      lineNumber: 67,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/components/users/Layouts/Header.tsx",
      lineNumber: 66,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/components/users/Layouts/Header.tsx",
      lineNumber: 63,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: `lg:hidden z-[100] bg-[#121214] fixed top-0 left-0 w-[70%] min-h-screen 
          border-r overflow-y-auto transition-all duration-300 ${mobileMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}`, children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "px-4 py-4 mt-16", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "border-b flex flex-col gap-4 border-white/30 pb-4 mb-4", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "flex flex-col gap-3 items-center", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("span", { className: "w-24 h-24 overflow-hidden rounded-full", children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("img", { src: "/Images/Main/user.webp", alt: "User", className: "w-full h-full object-cover" }, void 0, false, {
            fileName: "app/components/users/Layouts/Header.tsx",
            lineNumber: 173,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "app/components/users/Layouts/Header.tsx",
            lineNumber: 172,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Button, { text: "\u0110\u0103ng nh\u1EADp", href: "/dang-nhap" }, void 0, false, {
            fileName: "app/components/users/Layouts/Header.tsx",
            lineNumber: 175,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/users/Layouts/Header.tsx",
          lineNumber: 171,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("span", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("a", { href: "/", className: "block px-4 py-3 text-gray-300 hover:text-white rounded-lg", children: "Trang ch\u1EE7" }, void 0, false, {
            fileName: "app/components/users/Layouts/Header.tsx",
            lineNumber: 178,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("a", { href: "/ve-chung-toi", className: "block px-4 py-3 text-gray-300 hover:text-white rounded-lg", children: "V\u1EC1 ch\xFAng t\xF4i" }, void 0, false, {
            fileName: "app/components/users/Layouts/Header.tsx",
            lineNumber: 181,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/users/Layouts/Header.tsx",
          lineNumber: 177,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/users/Layouts/Header.tsx",
        lineNumber: 170,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("nav", { className: "space-y-2", children: categories.map((cat) => /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("a", { href: "/" + cat.slug, className: `block px-4 py-3 text-gray-300 hover:text-white rounded-lg transition-colors ${isActive(cat) ? "text-emerald-400 bg-gray-800" : ""}`, children: cat.name }, cat.slug, false, {
        fileName: "app/components/users/Layouts/Header.tsx",
        lineNumber: 188,
        columnNumber: 36
      }, this)) }, void 0, false, {
        fileName: "app/components/users/Layouts/Header.tsx",
        lineNumber: 187,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "border-t border-gray-700 mt-4 pt-4", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("h3", { className: "text-white font-semibold mb-3", children: "Kh\xE1m ph\xE1 ngay" }, void 0, false, {
          fileName: "app/components/users/Layouts/Header.tsx",
          lineNumber: 194,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "flex flex-wrap gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("a", { href: "/sach-moi-nhat", className: "py-2 px-3 text-sm hover:bg-white/50 bg-white/20 backdrop-blur rounded-md text-white", children: "S\xE1ch m\u1EDBi nh\u1EA5t" }, void 0, false, {
            fileName: "app/components/users/Layouts/Header.tsx",
            lineNumber: 196,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("a", { href: "/sach-da-doc", className: "py-2 px-3 text-sm hover:bg-white/50 bg-white/20 backdrop-blur rounded-md text-white", children: "S\xE1ch \u0111\xE3 \u0111\u1ECDc" }, void 0, false, {
            fileName: "app/components/users/Layouts/Header.tsx",
            lineNumber: 199,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("a", { href: "/sach-nghe", className: "py-2 px-3 text-sm hover:bg-white/50 bg-white/20 backdrop-blur rounded-md text-white", children: "S\xE1ch nghe" }, void 0, false, {
            fileName: "app/components/users/Layouts/Header.tsx",
            lineNumber: 202,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/users/Layouts/Header.tsx",
          lineNumber: 195,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/users/Layouts/Header.tsx",
        lineNumber: 193,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/users/Layouts/Header.tsx",
      lineNumber: 169,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/components/users/Layouts/Header.tsx",
      lineNumber: 167,
      columnNumber: 7
    }, this),
    mobileMenuOpen && /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "lg:hidden fixed inset-0 bg-black/50 z-30", onClick: () => setMobileMenuOpen(false) }, void 0, false, {
      fileName: "app/components/users/Layouts/Header.tsx",
      lineNumber: 210,
      columnNumber: 26
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Authentication_default, { isOpen, onClose: () => setIsOpen(false), mode }, void 0, false, {
      fileName: "app/components/users/Layouts/Header.tsx",
      lineNumber: 212,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/users/Layouts/Header.tsx",
    lineNumber: 62,
    columnNumber: 10
  }, this);
}
_s2(Header, "1w3qIiGYazHdPUwqt5rtsGUsAbc=", false, function() {
  return [useNavigate];
});
_c3 = Header;
var _c3;
$RefreshReg$(_c3, "Header");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// node_modules/react-icons/md/index.mjs
function MdEmail(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24" }, "child": [{ "tag": "path", "attr": { "fill": "none", "d": "M0 0h24v24H0z" }, "child": [] }, { "tag": "path", "attr": { "d": "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" }, "child": [] }] })(props);
}

// app/components/users/Layouts/Footer.tsx
var import_jsx_dev_runtime4 = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\users\\\\Layouts\\\\Footer.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\users\\Layouts\\Footer.tsx"
  );
  import.meta.hot.lastModified = "1759406155379.0598";
}
function Footer() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("footer", { className: "bg-[#121212] text-gray-300 py-10", children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("img", { src: "public/Images/Main/logo-light.png", alt: "" }, void 0, false, {
        fileName: "app/components/users/Layouts/Footer.tsx",
        lineNumber: 27,
        columnNumber: 21
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("p", { className: "mt-2", children: "C\xF4ng ty c\u1ED5 ph\u1EA7n s\xE1ch \u0111i\u1EC7n t\u1EED Waka" }, void 0, false, {
        fileName: "app/components/users/Layouts/Footer.tsx",
        lineNumber: 28,
        columnNumber: 21
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "mt-4 flex flex-col gap-2 text-sm", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(FaPhoneAlt, { className: "text-emerald-500" }, void 0, false, {
            fileName: "app/components/users/Layouts/Footer.tsx",
            lineNumber: 31,
            columnNumber: 29
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("span", { children: "0877736289" }, void 0, false, {
            fileName: "app/components/users/Layouts/Footer.tsx",
            lineNumber: 32,
            columnNumber: 29
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/users/Layouts/Footer.tsx",
          lineNumber: 30,
          columnNumber: 25
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(MdEmail, { className: "text-emerald-500" }, void 0, false, {
            fileName: "app/components/users/Layouts/Footer.tsx",
            lineNumber: 35,
            columnNumber: 29
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("span", { children: "Support@waka.vn" }, void 0, false, {
            fileName: "app/components/users/Layouts/Footer.tsx",
            lineNumber: 36,
            columnNumber: 29
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/users/Layouts/Footer.tsx",
          lineNumber: 34,
          columnNumber: 25
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/users/Layouts/Footer.tsx",
        lineNumber: 29,
        columnNumber: 21
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/users/Layouts/Footer.tsx",
      lineNumber: 26,
      columnNumber: 17
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("h2", { className: "font-bold mb-3", children: "V\u1EC1 ch\xFAng t\xF4i" }, void 0, false, {
        fileName: "app/components/users/Layouts/Footer.tsx",
        lineNumber: 42,
        columnNumber: 21
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("ul", { className: "space-y-2 text-sm", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("a", { href: "#", className: "text-gray-300 hover:text-gray-800 transition", children: "Gi\u1EDBi thi\u1EC7u" }, void 0, false, {
          fileName: "app/components/users/Layouts/Footer.tsx",
          lineNumber: 44,
          columnNumber: 29
        }, this) }, void 0, false, {
          fileName: "app/components/users/Layouts/Footer.tsx",
          lineNumber: 44,
          columnNumber: 25
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("a", { href: "#", className: "text-gray-300 hover:text-gray-800 transition", children: "C\u01A1 c\u1EA5u t\u1ED5 ch\u1EE9c" }, void 0, false, {
          fileName: "app/components/users/Layouts/Footer.tsx",
          lineNumber: 45,
          columnNumber: 29
        }, this) }, void 0, false, {
          fileName: "app/components/users/Layouts/Footer.tsx",
          lineNumber: 45,
          columnNumber: 25
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("a", { href: "#", className: "text-gray-300 hover:text-gray-800 transition", children: "L\u0129nh v\u1EF1c ho\u1EA1t \u0111\u1ED9ng" }, void 0, false, {
          fileName: "app/components/users/Layouts/Footer.tsx",
          lineNumber: 46,
          columnNumber: 29
        }, this) }, void 0, false, {
          fileName: "app/components/users/Layouts/Footer.tsx",
          lineNumber: 46,
          columnNumber: 25
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("a", { href: "#", className: "text-gray-300 hover:text-gray-800 transition", children: "C\u01A1 h\u1ED9i \u0111\u1EA7u t\u01B0" }, void 0, false, {
          fileName: "app/components/users/Layouts/Footer.tsx",
          lineNumber: 47,
          columnNumber: 29
        }, this) }, void 0, false, {
          fileName: "app/components/users/Layouts/Footer.tsx",
          lineNumber: 47,
          columnNumber: 25
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("a", { href: "#", className: "text-gray-300 hover:text-gray-800 transition", children: "Tuy\u1EC3n d\u1EE5ng" }, void 0, false, {
          fileName: "app/components/users/Layouts/Footer.tsx",
          lineNumber: 48,
          columnNumber: 29
        }, this) }, void 0, false, {
          fileName: "app/components/users/Layouts/Footer.tsx",
          lineNumber: 48,
          columnNumber: 25
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("a", { href: "#", className: "text-gray-300 hover:text-gray-800 transition", children: "Li\xEAn h\u1EC7" }, void 0, false, {
          fileName: "app/components/users/Layouts/Footer.tsx",
          lineNumber: 49,
          columnNumber: 29
        }, this) }, void 0, false, {
          fileName: "app/components/users/Layouts/Footer.tsx",
          lineNumber: 49,
          columnNumber: 25
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("a", { href: "#", className: "text-gray-300 hover:text-gray-800 transition", children: "D\u1ECBch v\u1EE5 xu\u1EA5t b\u1EA3n s\xE1ch" }, void 0, false, {
          fileName: "app/components/users/Layouts/Footer.tsx",
          lineNumber: 50,
          columnNumber: 29
        }, this) }, void 0, false, {
          fileName: "app/components/users/Layouts/Footer.tsx",
          lineNumber: 50,
          columnNumber: 25
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/users/Layouts/Footer.tsx",
        lineNumber: 43,
        columnNumber: 21
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/users/Layouts/Footer.tsx",
      lineNumber: 41,
      columnNumber: 17
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("h2", { className: "font-bold mb-3", children: "Th\xF4ng tin h\u1EEFu \xEDch" }, void 0, false, {
        fileName: "app/components/users/Layouts/Footer.tsx",
        lineNumber: 55,
        columnNumber: 21
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("ul", { className: "space-y-2 text-sm", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("a", { href: "#", className: "text-gray-300 hover:text-gray-800 transition", children: "Th\u1ECFa thu\u1EADn s\u1EED d\u1EE5ng d\u1ECBch v\u1EE5" }, void 0, false, {
          fileName: "app/components/users/Layouts/Footer.tsx",
          lineNumber: 57,
          columnNumber: 29
        }, this) }, void 0, false, {
          fileName: "app/components/users/Layouts/Footer.tsx",
          lineNumber: 57,
          columnNumber: 25
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("a", { href: "#", className: "text-gray-300 hover:text-gray-800 transition", children: "Quy\u1EC1n l\u1EE3i" }, void 0, false, {
          fileName: "app/components/users/Layouts/Footer.tsx",
          lineNumber: 58,
          columnNumber: 29
        }, this) }, void 0, false, {
          fileName: "app/components/users/Layouts/Footer.tsx",
          lineNumber: 58,
          columnNumber: 25
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("a", { href: "#", className: "text-gray-300 hover:text-gray-800 transition", children: "Quy \u0111\u1ECBnh ri\xEAng t\u01B0" }, void 0, false, {
          fileName: "app/components/users/Layouts/Footer.tsx",
          lineNumber: 59,
          columnNumber: 29
        }, this) }, void 0, false, {
          fileName: "app/components/users/Layouts/Footer.tsx",
          lineNumber: 59,
          columnNumber: 25
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("a", { href: "#", className: "text-gray-300 hover:text-gray-800 transition", children: "Quy ch\u1EBF ho\u1EA1t \u0111\u1ED9ng s\xE0n TM\u0110T" }, void 0, false, {
          fileName: "app/components/users/Layouts/Footer.tsx",
          lineNumber: 60,
          columnNumber: 29
        }, this) }, void 0, false, {
          fileName: "app/components/users/Layouts/Footer.tsx",
          lineNumber: 60,
          columnNumber: 25
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("a", { href: "#", className: "text-gray-300 hover:text-gray-800 transition", children: "C\xE2u h\u1ECFi th\u01B0\u1EDDng g\u1EB7p" }, void 0, false, {
          fileName: "app/components/users/Layouts/Footer.tsx",
          lineNumber: 61,
          columnNumber: 29
        }, this) }, void 0, false, {
          fileName: "app/components/users/Layouts/Footer.tsx",
          lineNumber: 61,
          columnNumber: 25
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/users/Layouts/Footer.tsx",
        lineNumber: 56,
        columnNumber: 21
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/users/Layouts/Footer.tsx",
      lineNumber: 54,
      columnNumber: 17
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("h2", { className: "font-bold mb-3", children: "Tin t\u1EE9c" }, void 0, false, {
        fileName: "app/components/users/Layouts/Footer.tsx",
        lineNumber: 66,
        columnNumber: 21
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("ul", { className: "space-y-2 text-sm", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("a", { href: "#", className: "text-gray-300 hover:text-gray-800 transition", children: "Tin d\u1ECBch v\u1EE5" }, void 0, false, {
          fileName: "app/components/users/Layouts/Footer.tsx",
          lineNumber: 68,
          columnNumber: 29
        }, this) }, void 0, false, {
          fileName: "app/components/users/Layouts/Footer.tsx",
          lineNumber: 68,
          columnNumber: 25
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("a", { href: "#", className: "text-gray-300 hover:text-gray-800 transition", children: "Review s\xE1ch" }, void 0, false, {
          fileName: "app/components/users/Layouts/Footer.tsx",
          lineNumber: 69,
          columnNumber: 29
        }, this) }, void 0, false, {
          fileName: "app/components/users/Layouts/Footer.tsx",
          lineNumber: 69,
          columnNumber: 25
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("a", { href: "#", className: "text-gray-300 hover:text-gray-800 transition", children: "L\u1ECBch ph\xE1t h\xE0nh" }, void 0, false, {
          fileName: "app/components/users/Layouts/Footer.tsx",
          lineNumber: 70,
          columnNumber: 29
        }, this) }, void 0, false, {
          fileName: "app/components/users/Layouts/Footer.tsx",
          lineNumber: 70,
          columnNumber: 25
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/users/Layouts/Footer.tsx",
        lineNumber: 67,
        columnNumber: 21
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/users/Layouts/Footer.tsx",
      lineNumber: 65,
      columnNumber: 17
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/users/Layouts/Footer.tsx",
    lineNumber: 25,
    columnNumber: 13
  }, this) }, void 0, false, {
    fileName: "app/components/users/Layouts/Footer.tsx",
    lineNumber: 24,
    columnNumber: 10
  }, this);
}
_c4 = Footer;
var _c4;
$RefreshReg$(_c4, "Footer");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/routes/_layout.tsx
var import_jsx_dev_runtime5 = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\_layout.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\_layout.tsx"
  );
  import.meta.hot.lastModified = "1759498650542.7793";
}
function UserLayout() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_jsx_dev_runtime5.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Header, {}, void 0, false, {
      fileName: "app/routes/_layout.tsx",
      lineNumber: 26,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("main", { className: "!w-full userBody py-5 !mx-auto md:p-0 p-3", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Outlet, {}, void 0, false, {
      fileName: "app/routes/_layout.tsx",
      lineNumber: 28,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/_layout.tsx",
      lineNumber: 27,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Footer, {}, void 0, false, {
      fileName: "app/routes/_layout.tsx",
      lineNumber: 30,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/_layout.tsx",
    lineNumber: 25,
    columnNumber: 10
  }, this);
}
_c5 = UserLayout;
var _c5;
$RefreshReg$(_c5, "UserLayout");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  UserLayout as default
};
//# sourceMappingURL=/build/routes/_layout-OOBCUO6Q.js.map
