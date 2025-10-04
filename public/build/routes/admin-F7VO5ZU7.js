import {
  Link,
  Outlet,
  useLocation
} from "/build/_shared/chunk-EIFHSANT.js";
import "/build/_shared/chunk-U4FRFQSK.js";
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

// app/context/SidebarContext.tsx
var import_react = __toESM(require_react(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\context\\\\SidebarContext.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
var _s2 = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\context\\SidebarContext.tsx"
  );
  import.meta.hot.lastModified = "1748779032000";
}
var SidebarContext = (0, import_react.createContext)(void 0);
var useSidebar = () => {
  _s();
  const context = (0, import_react.useContext)(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
_s(useSidebar, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var SidebarProvider = ({
  children
}) => {
  _s2();
  const [isExpanded, setIsExpanded] = (0, import_react.useState)(true);
  const [isMobileOpen, setIsMobileOpen] = (0, import_react.useState)(false);
  const [isMobile, setIsMobile] = (0, import_react.useState)(false);
  const [isHovered, setIsHovered] = (0, import_react.useState)(false);
  const [activeItem, setActiveItem] = (0, import_react.useState)(null);
  const [openSubmenu, setOpenSubmenu] = (0, import_react.useState)(null);
  (0, import_react.useEffect)(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsMobileOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const toggleSidebar = () => {
    setIsExpanded((prev) => !prev);
  };
  const toggleMobileSidebar = () => {
    setIsMobileOpen((prev) => !prev);
  };
  const toggleSubmenu = (item) => {
    setOpenSubmenu((prev) => prev === item ? null : item);
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SidebarContext.Provider, { value: {
    isExpanded: isMobile ? false : isExpanded,
    isMobileOpen,
    isHovered,
    activeItem,
    openSubmenu,
    toggleSidebar,
    toggleMobileSidebar,
    setIsHovered,
    setActiveItem,
    toggleSubmenu
  }, children }, void 0, false, {
    fileName: "app/context/SidebarContext.tsx",
    lineNumber: 67,
    columnNumber: 10
  }, this);
};
_s2(SidebarProvider, "RR1lOk9wEm3rd1RzKbRTG3DUE0k=");
_c = SidebarProvider;
var _c;
$RefreshReg$(_c, "SidebarProvider");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/context/ThemeContext.tsx
var import_react2 = __toESM(require_react(), 1);
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\context\\\\ThemeContext.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s3 = $RefreshSig$();
var _s22 = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\context\\ThemeContext.tsx"
  );
  import.meta.hot.lastModified = "1759413645308.086";
}
var ThemeContext = (0, import_react2.createContext)(void 0);
var ThemeProvider = ({
  children
}) => {
  _s3();
  const [theme, setTheme] = (0, import_react2.useState)("light");
  const [isInitialized, setIsInitialized] = (0, import_react2.useState)(false);
  (0, import_react2.useEffect)(() => {
    const savedTheme = localStorage.getItem("theme");
    const initialTheme = savedTheme || "light";
    setTheme(initialTheme);
    setIsInitialized(true);
  }, []);
  (0, import_react2.useEffect)(() => {
    if (isInitialized) {
      localStorage.setItem("theme", theme);
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [theme, isInitialized]);
  const toggleTheme = () => {
    setTheme((prevTheme) => prevTheme === "light" ? "dark" : "light");
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(ThemeContext.Provider, { value: {
    theme,
    toggleTheme
  }, children }, void 0, false, {
    fileName: "app/context/ThemeContext.tsx",
    lineNumber: 53,
    columnNumber: 10
  }, this);
};
_s3(ThemeProvider, "JxUJDKCVgUDLzSXLt3JsbQMFaWE=");
_c2 = ThemeProvider;
var useTheme = () => {
  _s22();
  const context = (0, import_react2.useContext)(ThemeContext);
  if (context === void 0) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
_s22(useTheme, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c2;
$RefreshReg$(_c2, "ThemeProvider");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/components/admin/layout/AppSidebar.tsx
var import_react5 = __toESM(require_react(), 1);

// node_modules/lucide-react/dist/esm/createLucideIcon.js
var import_react4 = __toESM(require_react());

// node_modules/lucide-react/dist/esm/shared/src/utils.js
var toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
var toCamelCase = (string) => string.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase()
);
var toPascalCase = (string) => {
  const camelCase = toCamelCase(string);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
var mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
var hasA11yProp = (props) => {
  for (const prop in props) {
    if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
      return true;
    }
  }
};

// node_modules/lucide-react/dist/esm/Icon.js
var import_react3 = __toESM(require_react());

// node_modules/lucide-react/dist/esm/defaultAttributes.js
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};

// node_modules/lucide-react/dist/esm/Icon.js
var Icon = (0, import_react3.forwardRef)(
  ({
    color = "currentColor",
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    className = "",
    children,
    iconNode,
    ...rest
  }, ref) => (0, import_react3.createElement)(
    "svg",
    {
      ref,
      ...defaultAttributes,
      width: size,
      height: size,
      stroke: color,
      strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
      className: mergeClasses("lucide", className),
      ...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
      ...rest
    },
    [
      ...iconNode.map(([tag, attrs]) => (0, import_react3.createElement)(tag, attrs)),
      ...Array.isArray(children) ? children : [children]
    ]
  )
);

// node_modules/lucide-react/dist/esm/createLucideIcon.js
var createLucideIcon = (iconName, iconNode) => {
  const Component = (0, import_react4.forwardRef)(
    ({ className, ...props }, ref) => (0, import_react4.createElement)(Icon, {
      ref,
      iconNode,
      className: mergeClasses(
        `lucide-${toKebabCase(toPascalCase(iconName))}`,
        `lucide-${iconName}`,
        className
      ),
      ...props
    })
  );
  Component.displayName = toPascalCase(iconName);
  return Component;
};

// node_modules/lucide-react/dist/esm/icons/book-open.js
var __iconNode = [
  ["path", { d: "M12 7v14", key: "1akyts" }],
  [
    "path",
    {
      d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
      key: "ruj8y"
    }
  ]
];
var BookOpen = createLucideIcon("book-open", __iconNode);

// node_modules/lucide-react/dist/esm/icons/chevron-down.js
var __iconNode2 = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]];
var ChevronDown = createLucideIcon("chevron-down", __iconNode2);

// node_modules/lucide-react/dist/esm/icons/ellipsis.js
var __iconNode3 = [
  ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
  ["circle", { cx: "19", cy: "12", r: "1", key: "1wjl8i" }],
  ["circle", { cx: "5", cy: "12", r: "1", key: "1pcz8c" }]
];
var Ellipsis = createLucideIcon("ellipsis", __iconNode3);

// node_modules/lucide-react/dist/esm/icons/folder-tree.js
var __iconNode4 = [
  [
    "path",
    {
      d: "M20 10a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2.5a1 1 0 0 1-.8-.4l-.9-1.2A1 1 0 0 0 15 3h-2a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z",
      key: "hod4my"
    }
  ],
  [
    "path",
    {
      d: "M20 21a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-2.9a1 1 0 0 1-.88-.55l-.42-.85a1 1 0 0 0-.92-.6H13a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z",
      key: "w4yl2u"
    }
  ],
  ["path", { d: "M3 5a2 2 0 0 0 2 2h3", key: "f2jnh7" }],
  ["path", { d: "M3 3v13a2 2 0 0 0 2 2h3", key: "k8epm1" }]
];
var FolderTree = createLucideIcon("folder-tree", __iconNode4);

// node_modules/lucide-react/dist/esm/icons/layout-dashboard.js
var __iconNode5 = [
  ["rect", { width: "7", height: "9", x: "3", y: "3", rx: "1", key: "10lvy0" }],
  ["rect", { width: "7", height: "5", x: "14", y: "3", rx: "1", key: "16une8" }],
  ["rect", { width: "7", height: "9", x: "14", y: "12", rx: "1", key: "1hutg5" }],
  ["rect", { width: "7", height: "5", x: "3", y: "16", rx: "1", key: "ldoo1y" }]
];
var LayoutDashboard = createLucideIcon("layout-dashboard", __iconNode5);

// node_modules/lucide-react/dist/esm/icons/tags.js
var __iconNode6 = [
  [
    "path",
    {
      d: "M13.172 2a2 2 0 0 1 1.414.586l6.71 6.71a2.4 2.4 0 0 1 0 3.408l-4.592 4.592a2.4 2.4 0 0 1-3.408 0l-6.71-6.71A2 2 0 0 1 6 9.172V3a1 1 0 0 1 1-1z",
      key: "16rjxf"
    }
  ],
  [
    "path",
    { d: "M2 7v6.172a2 2 0 0 0 .586 1.414l6.71 6.71a2.4 2.4 0 0 0 3.191.193", key: "178nd4" }
  ],
  ["circle", { cx: "10.5", cy: "6.5", r: ".5", fill: "currentColor", key: "12ikhr" }]
];
var Tags = createLucideIcon("tags", __iconNode6);

// node_modules/lucide-react/dist/esm/icons/users.js
var __iconNode7 = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
var Users = createLucideIcon("users", __iconNode7);

// app/components/admin/layout/SidebarWidget.tsx
var import_jsx_dev_runtime3 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\admin\\\\layout\\\\SidebarWidget.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\admin\\layout\\SidebarWidget.tsx"
  );
  import.meta.hot.lastModified = "1748779032000";
}
function SidebarWidget() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: `
        mx-auto mb-10 w-full max-w-60 rounded-2xl bg-gray-50 px-4 py-5 text-center dark:bg-white/[0.03]`, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("h3", { className: "mb-2 font-semibold text-gray-900 dark:text-white", children: "#1 Tailwind CSS Dashboard" }, void 0, false, {
      fileName: "app/components/admin/layout/SidebarWidget.tsx",
      lineNumber: 24,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("p", { className: "mb-4 text-gray-500 text-theme-sm dark:text-gray-400", children: "Leading Tailwind CSS Admin Template with 400+ UI Component and Pages." }, void 0, false, {
      fileName: "app/components/admin/layout/SidebarWidget.tsx",
      lineNumber: 27,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("a", { href: "https://tailadmin.com/pricing", target: "_blank", rel: "nofollow", className: "flex items-center justify-center p-3 font-medium text-white rounded-lg bg-brand-500 text-theme-sm hover:bg-brand-600", children: "Purchase Plan" }, void 0, false, {
      fileName: "app/components/admin/layout/SidebarWidget.tsx",
      lineNumber: 30,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/admin/layout/SidebarWidget.tsx",
    lineNumber: 22,
    columnNumber: 10
  }, this);
}
_c3 = SidebarWidget;
var _c3;
$RefreshReg$(_c3, "SidebarWidget");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/components/admin/layout/AppSidebar.tsx
var import_jsx_dev_runtime4 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\admin\\\\layout\\\\AppSidebar.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s4 = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\admin\\layout\\AppSidebar.tsx"
  );
  import.meta.hot.lastModified = "1759561092270.1936";
}
var navItems = [{
  icon: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(LayoutDashboard, { size: 20 }, void 0, false, {
    fileName: "app/components/admin/layout/AppSidebar.tsx",
    lineNumber: 28,
    columnNumber: 9
  }, this),
  name: "B\u1EA3ng \u0111i\u1EC1u khi\u1EC3n",
  path: "/admin"
}, {
  icon: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(Users, { size: 20 }, void 0, false, {
    fileName: "app/components/admin/layout/AppSidebar.tsx",
    lineNumber: 32,
    columnNumber: 9
  }, this),
  name: "T\xE0i kho\u1EA3n",
  path: "/admin/users"
}, {
  icon: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(BookOpen, { size: 20 }, void 0, false, {
    fileName: "app/components/admin/layout/AppSidebar.tsx",
    lineNumber: 36,
    columnNumber: 9
  }, this),
  name: "S\xE1ch",
  path: "/admin/books"
}, {
  icon: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(Tags, { size: 20 }, void 0, false, {
    fileName: "app/components/admin/layout/AppSidebar.tsx",
    lineNumber: 40,
    columnNumber: 9
  }, this),
  name: "Lo\u1EA1i s\xE1ch",
  path: "/admin/categories"
}, {
  icon: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(FolderTree, { size: 20 }, void 0, false, {
    fileName: "app/components/admin/layout/AppSidebar.tsx",
    lineNumber: 44,
    columnNumber: 9
  }, this),
  name: "Th\u01B0 m\u1EE5c",
  path: "/admin/folders"
}];
var othersItems = [];
var AppSidebar = () => {
  _s4();
  const {
    isExpanded,
    isMobileOpen,
    isHovered,
    setIsHovered
  } = useSidebar();
  const location = useLocation();
  const [openSubmenu, setOpenSubmenu] = (0, import_react5.useState)(null);
  const [subMenuHeight, setSubMenuHeight] = (0, import_react5.useState)({});
  const subMenuRefs = (0, import_react5.useRef)({});
  const isActive = (0, import_react5.useCallback)((path) => location.pathname === path, [location.pathname]);
  (0, import_react5.useEffect)(() => {
    let submenuMatched = false;
    ["main", "others"].forEach((menuType) => {
      const items = menuType === "main" ? navItems : othersItems;
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({
                type: menuType,
                index
              });
              submenuMatched = true;
            }
          });
        }
      });
    });
    if (!submenuMatched)
      setOpenSubmenu(null);
  }, [location, isActive]);
  (0, import_react5.useEffect)(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prev) => ({
          ...prev,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0
        }));
      }
    }
  }, [openSubmenu]);
  const handleSubmenuToggle = (index, menuType) => {
    setOpenSubmenu((prev) => prev && prev.type === menuType && prev.index === index ? null : {
      type: menuType,
      index
    });
  };
  const renderMenuItems = (items, menuType) => /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("ul", { className: "flex flex-col gap-4", children: items.map((nav, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("li", { children: [
    nav.subItems ? /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("button", { onClick: () => handleSubmenuToggle(index, menuType), className: `menu-item group ${openSubmenu?.type === menuType && openSubmenu?.index === index ? "menu-item-active" : "menu-item-inactive"} cursor-pointer ${!isExpanded && !isHovered ? "lg:justify-center" : "lg:justify-start"}`, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("span", { className: `menu-item-icon-size ${openSubmenu?.type === menuType && openSubmenu?.index === index ? "menu-item-icon-active" : "menu-item-icon-inactive"}`, children: nav.icon }, void 0, false, {
        fileName: "app/components/admin/layout/AppSidebar.tsx",
        lineNumber: 103,
        columnNumber: 15
      }, this),
      (isExpanded || isHovered || isMobileOpen) && /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("span", { className: "menu-item-text", children: nav.name }, void 0, false, {
        fileName: "app/components/admin/layout/AppSidebar.tsx",
        lineNumber: 106,
        columnNumber: 61
      }, this),
      (isExpanded || isHovered || isMobileOpen) && /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(ChevronDown, { className: `ml-auto w-5 h-5 transition-transform duration-200 ${openSubmenu?.type === menuType && openSubmenu?.index === index ? "rotate-180 text-brand-500" : ""}` }, void 0, false, {
        fileName: "app/components/admin/layout/AppSidebar.tsx",
        lineNumber: 107,
        columnNumber: 61
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/admin/layout/AppSidebar.tsx",
      lineNumber: 102,
      columnNumber: 27
    }, this) : nav.path && /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(Link, { to: nav.path, className: `menu-item group ${isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"}`, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("span", { className: `menu-item-icon-size ${isActive(nav.path) ? "menu-item-icon-active" : "menu-item-icon-inactive"}`, children: nav.icon }, void 0, false, {
        fileName: "app/components/admin/layout/AppSidebar.tsx",
        lineNumber: 109,
        columnNumber: 17
      }, this),
      (isExpanded || isHovered || isMobileOpen) && /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("span", { className: "menu-item-text", children: nav.name }, void 0, false, {
        fileName: "app/components/admin/layout/AppSidebar.tsx",
        lineNumber: 112,
        columnNumber: 63
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/admin/layout/AppSidebar.tsx",
      lineNumber: 108,
      columnNumber: 37
    }, this),
    nav.subItems && (isExpanded || isHovered || isMobileOpen) && /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { ref: (el) => {
      subMenuRefs.current[`${menuType}-${index}`] = el;
    }, className: "overflow-hidden transition-all duration-300", style: {
      height: openSubmenu?.type === menuType && openSubmenu?.index === index ? `${subMenuHeight[`${menuType}-${index}`]}px` : "0px"
    }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("ul", { className: "mt-2 space-y-1 ml-9", children: nav.subItems.map((subItem) => /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(Link, { to: subItem.path, className: `menu-dropdown-item ${isActive(subItem.path) ? "menu-dropdown-item-active" : "menu-dropdown-item-inactive"}`, children: [
      subItem.name,
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("span", { className: "flex items-center gap-1 ml-auto", children: [
        subItem.new && /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("span", { className: `ml-auto ${isActive(subItem.path) ? "menu-dropdown-badge-active" : "menu-dropdown-badge-inactive"} menu-dropdown-badge`, children: "new" }, void 0, false, {
          fileName: "app/components/admin/layout/AppSidebar.tsx",
          lineNumber: 124,
          columnNumber: 41
        }, this),
        subItem.pro && /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("span", { className: `ml-auto ${isActive(subItem.path) ? "menu-dropdown-badge-active" : "menu-dropdown-badge-inactive"} menu-dropdown-badge`, children: "pro" }, void 0, false, {
          fileName: "app/components/admin/layout/AppSidebar.tsx",
          lineNumber: 127,
          columnNumber: 41
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/admin/layout/AppSidebar.tsx",
        lineNumber: 123,
        columnNumber: 23
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/admin/layout/AppSidebar.tsx",
      lineNumber: 121,
      columnNumber: 21
    }, this) }, subItem.name, false, {
      fileName: "app/components/admin/layout/AppSidebar.tsx",
      lineNumber: 120,
      columnNumber: 46
    }, this)) }, void 0, false, {
      fileName: "app/components/admin/layout/AppSidebar.tsx",
      lineNumber: 119,
      columnNumber: 15
    }, this) }, void 0, false, {
      fileName: "app/components/admin/layout/AppSidebar.tsx",
      lineNumber: 114,
      columnNumber: 73
    }, this)
  ] }, nav.name, true, {
    fileName: "app/components/admin/layout/AppSidebar.tsx",
    lineNumber: 101,
    columnNumber: 34
  }, this)) }, void 0, false, {
    fileName: "app/components/admin/layout/AppSidebar.tsx",
    lineNumber: 100,
    columnNumber: 48
  }, this);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("aside", { className: `fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${isExpanded || isMobileOpen ? "w-[290px]" : isHovered ? "w-[290px]" : "w-[90px]"}
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`, onMouseEnter: () => !isExpanded && setIsHovered(true), onMouseLeave: () => setIsHovered(false), children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: `py-8 flex ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"}`, children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(Link, { to: "/", children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("img", { src: "/Images/Main/logo-light.png", alt: "Logo", width: 200, height: 50, style: {
      filter: "drop-shadow(0 0 6px rgba(0,0,0,0.5))"
    } }, void 0, false, {
      fileName: "app/components/admin/layout/AppSidebar.tsx",
      lineNumber: 143,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/components/admin/layout/AppSidebar.tsx",
      lineNumber: 142,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/components/admin/layout/AppSidebar.tsx",
      lineNumber: 141,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("nav", { className: "mb-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "flex flex-col gap-4", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("h2", { className: `mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"}`, children: isExpanded || isHovered || isMobileOpen ? "Qu\u1EA3n l\xFD" : /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(Ellipsis, { className: "size-6" }, void 0, false, {
            fileName: "app/components/admin/layout/AppSidebar.tsx",
            lineNumber: 153,
            columnNumber: 72
          }, this) }, void 0, false, {
            fileName: "app/components/admin/layout/AppSidebar.tsx",
            lineNumber: 152,
            columnNumber: 15
          }, this),
          renderMenuItems(navItems, "main")
        ] }, void 0, true, {
          fileName: "app/components/admin/layout/AppSidebar.tsx",
          lineNumber: 151,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("h2", { className: `mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"}`, children: isExpanded || isHovered || isMobileOpen ? "Kh\xE1c" : /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(Ellipsis, { className: "size-6" }, void 0, false, {
            fileName: "app/components/admin/layout/AppSidebar.tsx",
            lineNumber: 159,
            columnNumber: 69
          }, this) }, void 0, false, {
            fileName: "app/components/admin/layout/AppSidebar.tsx",
            lineNumber: 158,
            columnNumber: 15
          }, this),
          renderMenuItems(othersItems, "others")
        ] }, void 0, true, {
          fileName: "app/components/admin/layout/AppSidebar.tsx",
          lineNumber: 157,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/admin/layout/AppSidebar.tsx",
        lineNumber: 150,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/components/admin/layout/AppSidebar.tsx",
        lineNumber: 149,
        columnNumber: 9
      }, this),
      isExpanded || isHovered || isMobileOpen ? /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(SidebarWidget, {}, void 0, false, {
        fileName: "app/components/admin/layout/AppSidebar.tsx",
        lineNumber: 165,
        columnNumber: 52
      }, this) : null
    ] }, void 0, true, {
      fileName: "app/components/admin/layout/AppSidebar.tsx",
      lineNumber: 148,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/admin/layout/AppSidebar.tsx",
    lineNumber: 137,
    columnNumber: 10
  }, this);
};
_s4(AppSidebar, "eCjGCjYT57S1Mj0MimjFxkCQoH4=", false, function() {
  return [useSidebar, useLocation];
});
_c4 = AppSidebar;
var AppSidebar_default = AppSidebar;
var _c4;
$RefreshReg$(_c4, "AppSidebar");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/components/admin/layout/AppHeader.tsx
var import_react13 = __toESM(require_react(), 1);

// app/components/admin/common/ThemeToggleButton.tsx
var import_jsx_dev_runtime5 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\admin\\\\common\\\\ThemeToggleButton.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s5 = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\admin\\common\\ThemeToggleButton.tsx"
  );
  import.meta.hot.lastModified = "1759410102236.9326";
}
var ThemeToggleButton = () => {
  _s5();
  const {
    toggleTheme
  } = useTheme();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("button", { onClick: toggleTheme, className: "relative flex items-center justify-center text-gray-500 transition-colors bg-white border border-gray-200 rounded-full hover:text-dark-900 h-11 w-11 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("svg", { className: "hidden dark:block", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M9.99998 1.5415C10.4142 1.5415 10.75 1.87729 10.75 2.2915V3.5415C10.75 3.95572 10.4142 4.2915 9.99998 4.2915C9.58577 4.2915 9.24998 3.95572 9.24998 3.5415V2.2915C9.24998 1.87729 9.58577 1.5415 9.99998 1.5415ZM10.0009 6.79327C8.22978 6.79327 6.79402 8.22904 6.79402 10.0001C6.79402 11.7712 8.22978 13.207 10.0009 13.207C11.772 13.207 13.2078 11.7712 13.2078 10.0001C13.2078 8.22904 11.772 6.79327 10.0009 6.79327ZM5.29402 10.0001C5.29402 7.40061 7.40135 5.29327 10.0009 5.29327C12.6004 5.29327 14.7078 7.40061 14.7078 10.0001C14.7078 12.5997 12.6004 14.707 10.0009 14.707C7.40135 14.707 5.29402 12.5997 5.29402 10.0001ZM15.9813 5.08035C16.2742 4.78746 16.2742 4.31258 15.9813 4.01969C15.6884 3.7268 15.2135 3.7268 14.9207 4.01969L14.0368 4.90357C13.7439 5.19647 13.7439 5.67134 14.0368 5.96423C14.3297 6.25713 14.8045 6.25713 15.0974 5.96423L15.9813 5.08035ZM18.4577 10.0001C18.4577 10.4143 18.1219 10.7501 17.7077 10.7501H16.4577C16.0435 10.7501 15.7077 10.4143 15.7077 10.0001C15.7077 9.58592 16.0435 9.25013 16.4577 9.25013H17.7077C18.1219 9.25013 18.4577 9.58592 18.4577 10.0001ZM14.9207 15.9806C15.2135 16.2735 15.6884 16.2735 15.9813 15.9806C16.2742 15.6877 16.2742 15.2128 15.9813 14.9199L15.0974 14.036C14.8045 13.7431 14.3297 13.7431 14.0368 14.036C13.7439 14.3289 13.7439 14.8038 14.0368 15.0967L14.9207 15.9806ZM9.99998 15.7088C10.4142 15.7088 10.75 16.0445 10.75 16.4588V17.7088C10.75 18.123 10.4142 18.4588 9.99998 18.4588C9.58577 18.4588 9.24998 18.123 9.24998 17.7088V16.4588C9.24998 16.0445 9.58577 15.7088 9.99998 15.7088ZM5.96356 15.0972C6.25646 14.8043 6.25646 14.3295 5.96356 14.0366C5.67067 13.7437 5.1958 13.7437 4.9029 14.0366L4.01902 14.9204C3.72613 15.2133 3.72613 15.6882 4.01902 15.9811C4.31191 16.274 4.78679 16.274 5.07968 15.9811L5.96356 15.0972ZM4.29224 10.0001C4.29224 10.4143 3.95645 10.7501 3.54224 10.7501H2.29224C1.87802 10.7501 1.54224 10.4143 1.54224 10.0001C1.54224 9.58592 1.87802 9.25013 2.29224 9.25013H3.54224C3.95645 9.25013 4.29224 9.58592 4.29224 10.0001ZM4.9029 5.9637C5.1958 6.25659 5.67067 6.25659 5.96356 5.9637C6.25646 5.6708 6.25646 5.19593 5.96356 4.90303L5.07968 4.01915C4.78679 3.72626 4.31191 3.72626 4.01902 4.01915C3.72613 4.31204 3.72613 4.78692 4.01902 5.07981L4.9029 5.9637Z", fill: "currentColor" }, void 0, false, {
      fileName: "app/components/admin/common/ThemeToggleButton.tsx",
      lineNumber: 30,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/components/admin/common/ThemeToggleButton.tsx",
      lineNumber: 29,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("svg", { className: "dark:hidden", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("path", { d: "M17.4547 11.97L18.1799 12.1611C18.265 11.8383 18.1265 11.4982 17.8401 11.3266C17.5538 11.1551 17.1885 11.1934 16.944 11.4207L17.4547 11.97ZM8.0306 2.5459L8.57989 3.05657C8.80718 2.81209 8.84554 2.44682 8.67398 2.16046C8.50243 1.8741 8.16227 1.73559 7.83948 1.82066L8.0306 2.5459ZM12.9154 13.0035C9.64678 13.0035 6.99707 10.3538 6.99707 7.08524H5.49707C5.49707 11.1823 8.81835 14.5035 12.9154 14.5035V13.0035ZM16.944 11.4207C15.8869 12.4035 14.4721 13.0035 12.9154 13.0035V14.5035C14.8657 14.5035 16.6418 13.7499 17.9654 12.5193L16.944 11.4207ZM16.7295 11.7789C15.9437 14.7607 13.2277 16.9586 10.0003 16.9586V18.4586C13.9257 18.4586 17.2249 15.7853 18.1799 12.1611L16.7295 11.7789ZM10.0003 16.9586C6.15734 16.9586 3.04199 13.8433 3.04199 10.0003H1.54199C1.54199 14.6717 5.32892 18.4586 10.0003 18.4586V16.9586ZM3.04199 10.0003C3.04199 6.77289 5.23988 4.05695 8.22173 3.27114L7.83948 1.82066C4.21532 2.77574 1.54199 6.07486 1.54199 10.0003H3.04199ZM6.99707 7.08524C6.99707 5.52854 7.5971 4.11366 8.57989 3.05657L7.48132 2.03522C6.25073 3.35885 5.49707 5.13487 5.49707 7.08524H6.99707Z", fill: "currentColor" }, void 0, false, {
      fileName: "app/components/admin/common/ThemeToggleButton.tsx",
      lineNumber: 33,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/components/admin/common/ThemeToggleButton.tsx",
      lineNumber: 32,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/admin/common/ThemeToggleButton.tsx",
    lineNumber: 28,
    columnNumber: 10
  }, this);
};
_s5(ThemeToggleButton, "nFmp9U9OdAF29Jqg5v+pDj8HwEs=", false, function() {
  return [useTheme];
});
_c5 = ThemeToggleButton;
var _c5;
$RefreshReg$(_c5, "ThemeToggleButton");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/components/admin/header/NotificationDropdown.tsx
var import_react9 = __toESM(require_react(), 1);

// app/components/admin/ui/dropdown/Dropdown.tsx
var import_react7 = __toESM(require_react(), 1);
var import_jsx_dev_runtime6 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\admin\\\\ui\\\\dropdown\\\\Dropdown.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s6 = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\admin\\ui\\dropdown\\Dropdown.tsx"
  );
  import.meta.hot.lastModified = "1748779032000";
}
var Dropdown = ({
  isOpen,
  onClose,
  children,
  className = ""
}) => {
  _s6();
  const dropdownRef = (0, import_react7.useRef)(null);
  (0, import_react7.useEffect)(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && !event.target.closest(".dropdown-toggle")) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);
  if (!isOpen)
    return null;
  return /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { ref: dropdownRef, className: `absolute z-40  right-0 mt-2  rounded-xl border border-gray-200 bg-white  shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark ${className}`, children }, void 0, false, {
    fileName: "app/components/admin/ui/dropdown/Dropdown.tsx",
    lineNumber: 43,
    columnNumber: 10
  }, this);
};
_s6(Dropdown, "lBksDI189chlgqHe47LAOFZSkUw=");
_c6 = Dropdown;
var _c6;
$RefreshReg$(_c6, "Dropdown");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/components/admin/ui/dropdown/DropdownItem.tsx
var import_jsx_dev_runtime7 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\admin\\\\ui\\\\dropdown\\\\DropdownItem.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\admin\\ui\\dropdown\\DropdownItem.tsx"
  );
  import.meta.hot.lastModified = "1759561201654.4817";
}
var DropdownItem = ({
  tag = "button",
  to,
  onClick,
  onItemClick,
  baseClassName = "block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900",
  className = "",
  children
}) => {
  const combinedClasses = `${baseClassName} ${className}`.trim();
  const handleClick = (event) => {
    if (tag === "button") {
      event.preventDefault();
    }
    if (onClick)
      onClick();
    if (onItemClick)
      onItemClick();
  };
  if (tag === "a" && to) {
    return /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(Link, { to, className: combinedClasses, onClick: handleClick, children }, void 0, false, {
      fileName: "app/components/admin/ui/dropdown/DropdownItem.tsx",
      lineNumber: 40,
      columnNumber: 12
    }, this);
  }
  return /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("button", { onClick: handleClick, className: combinedClasses, children }, void 0, false, {
    fileName: "app/components/admin/ui/dropdown/DropdownItem.tsx",
    lineNumber: 44,
    columnNumber: 10
  }, this);
};
_c7 = DropdownItem;
var _c7;
$RefreshReg$(_c7, "DropdownItem");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/components/admin/header/NotificationDropdown.tsx
var import_jsx_dev_runtime8 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\admin\\\\header\\\\NotificationDropdown.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s7 = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\admin\\header\\NotificationDropdown.tsx"
  );
  import.meta.hot.lastModified = "1759561196930.2454";
}
function NotificationDropdown() {
  _s7();
  const [isOpen, setIsOpen] = (0, import_react9.useState)(false);
  const [notifying, setNotifying] = (0, import_react9.useState)(true);
  function toggleDropdown() {
    setIsOpen(!isOpen);
  }
  function closeDropdown() {
    setIsOpen(false);
  }
  const handleClick = () => {
    toggleDropdown();
    setNotifying(false);
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("div", { className: "relative", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("button", { className: "relative flex items-center justify-center text-gray-500 transition-colors bg-white border border-gray-200 rounded-full dropdown-toggle hover:text-gray-700 h-11 w-11 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white", onClick: handleClick, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { className: `absolute right-0 top-0.5 z-10 h-2 w-2 rounded-full bg-orange-400 ${!notifying ? "hidden" : "flex"}`, children: /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { className: "absolute inline-flex w-full h-full bg-orange-400 rounded-full opacity-75 animate-ping" }, void 0, false, {
        fileName: "app/components/admin/header/NotificationDropdown.tsx",
        lineNumber: 43,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/components/admin/header/NotificationDropdown.tsx",
        lineNumber: 42,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("svg", { className: "fill-current", width: "20", height: "20", viewBox: "0 0 20 20", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M10.75 2.29248C10.75 1.87827 10.4143 1.54248 10 1.54248C9.58583 1.54248 9.25004 1.87827 9.25004 2.29248V2.83613C6.08266 3.20733 3.62504 5.9004 3.62504 9.16748V14.4591H3.33337C2.91916 14.4591 2.58337 14.7949 2.58337 15.2091C2.58337 15.6234 2.91916 15.9591 3.33337 15.9591H4.37504H15.625H16.6667C17.0809 15.9591 17.4167 15.6234 17.4167 15.2091C17.4167 14.7949 17.0809 14.4591 16.6667 14.4591H16.375V9.16748C16.375 5.9004 13.9174 3.20733 10.75 2.83613V2.29248ZM14.875 14.4591V9.16748C14.875 6.47509 12.6924 4.29248 10 4.29248C7.30765 4.29248 5.12504 6.47509 5.12504 9.16748V14.4591H14.875ZM8.00004 17.7085C8.00004 18.1228 8.33583 18.4585 8.75004 18.4585H11.25C11.6643 18.4585 12 18.1228 12 17.7085C12 17.2943 11.6643 16.9585 11.25 16.9585H8.75004C8.33583 16.9585 8.00004 17.2943 8.00004 17.7085Z", fill: "currentColor" }, void 0, false, {
        fileName: "app/components/admin/header/NotificationDropdown.tsx",
        lineNumber: 46,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/components/admin/header/NotificationDropdown.tsx",
        lineNumber: 45,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/admin/header/NotificationDropdown.tsx",
      lineNumber: 41,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(Dropdown, { isOpen, onClose: closeDropdown, className: "absolute -right-[240px] mt-[17px] flex h-[480px] w-[350px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark sm:w-[361px] lg:right-0", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("div", { className: "flex items-center justify-between pb-3 mb-3 border-b border-gray-100 dark:border-gray-700", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("h5", { className: "text-lg font-semibold text-gray-800 dark:text-gray-200", children: "Notification" }, void 0, false, {
          fileName: "app/components/admin/header/NotificationDropdown.tsx",
          lineNumber: 51,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("button", { onClick: toggleDropdown, className: "text-gray-500 transition dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200", children: /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("svg", { className: "fill-current", width: "24", height: "24", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M6.21967 7.28131C5.92678 6.98841 5.92678 6.51354 6.21967 6.22065C6.51256 5.92775 6.98744 5.92775 7.28033 6.22065L11.999 10.9393L16.7176 6.22078C17.0105 5.92789 17.4854 5.92788 17.7782 6.22078C18.0711 6.51367 18.0711 6.98855 17.7782 7.28144L13.0597 12L17.7782 16.7186C18.0711 17.0115 18.0711 17.4863 17.7782 17.7792C17.4854 18.0721 17.0105 18.0721 16.7176 17.7792L11.999 13.0607L7.28033 17.7794C6.98744 18.0722 6.51256 18.0722 6.21967 17.7794C5.92678 17.4865 5.92678 17.0116 6.21967 16.7187L10.9384 12L6.21967 7.28131Z", fill: "currentColor" }, void 0, false, {
          fileName: "app/components/admin/header/NotificationDropdown.tsx",
          lineNumber: 56,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "app/components/admin/header/NotificationDropdown.tsx",
          lineNumber: 55,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "app/components/admin/header/NotificationDropdown.tsx",
          lineNumber: 54,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/admin/header/NotificationDropdown.tsx",
        lineNumber: 50,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("ul", { className: "flex flex-col h-auto overflow-y-auto custom-scrollbar", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(DropdownItem, { onItemClick: closeDropdown, className: "flex gap-3 rounded-lg border-b border-gray-100 p-3 px-4.5 py-3 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-white/5", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { className: "relative block w-full h-10 rounded-full z-1 max-w-10", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("img", { width: 40, height: 40, src: "/images/user/user-02.jpg", alt: "User", className: "w-full overflow-hidden rounded-full" }, void 0, false, {
              fileName: "app/components/admin/header/NotificationDropdown.tsx",
              lineNumber: 65,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { className: "absolute bottom-0 right-0 z-10 h-2.5 w-full max-w-2.5 rounded-full border-[1.5px] border-white bg-success-500 dark:border-gray-900" }, void 0, false, {
              fileName: "app/components/admin/header/NotificationDropdown.tsx",
              lineNumber: 66,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/admin/header/NotificationDropdown.tsx",
            lineNumber: 64,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { className: "block", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { className: "mb-1.5 block  text-theme-sm text-gray-500 dark:text-gray-400 space-x-1", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { className: "font-medium text-gray-800 dark:text-white/90", children: "Terry Franci" }, void 0, false, {
                fileName: "app/components/admin/header/NotificationDropdown.tsx",
                lineNumber: 71,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { children: " requests permission to change" }, void 0, false, {
                fileName: "app/components/admin/header/NotificationDropdown.tsx",
                lineNumber: 74,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { className: "font-medium text-gray-800 dark:text-white/90", children: "Project - Nganter App" }, void 0, false, {
                fileName: "app/components/admin/header/NotificationDropdown.tsx",
                lineNumber: 75,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/components/admin/header/NotificationDropdown.tsx",
              lineNumber: 70,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { className: "flex items-center gap-2 text-gray-500 text-theme-xs dark:text-gray-400", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { children: "Project" }, void 0, false, {
                fileName: "app/components/admin/header/NotificationDropdown.tsx",
                lineNumber: 81,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { className: "w-1 h-1 bg-gray-400 rounded-full" }, void 0, false, {
                fileName: "app/components/admin/header/NotificationDropdown.tsx",
                lineNumber: 82,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { children: "5 min ago" }, void 0, false, {
                fileName: "app/components/admin/header/NotificationDropdown.tsx",
                lineNumber: 83,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/components/admin/header/NotificationDropdown.tsx",
              lineNumber: 80,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/admin/header/NotificationDropdown.tsx",
            lineNumber: 69,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/admin/header/NotificationDropdown.tsx",
          lineNumber: 63,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "app/components/admin/header/NotificationDropdown.tsx",
          lineNumber: 62,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(DropdownItem, { onItemClick: closeDropdown, className: "flex gap-3 rounded-lg border-b border-gray-100 p-3 px-4.5 py-3 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-white/5", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { className: "relative block w-full h-10 rounded-full z-1 max-w-10", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("img", { width: 40, height: 40, src: "/images/user/user-03.jpg", alt: "User", className: "w-full overflow-hidden rounded-full" }, void 0, false, {
              fileName: "app/components/admin/header/NotificationDropdown.tsx",
              lineNumber: 92,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { className: "absolute bottom-0 right-0 z-10 h-2.5 w-full max-w-2.5 rounded-full border-[1.5px] border-white bg-success-500 dark:border-gray-900" }, void 0, false, {
              fileName: "app/components/admin/header/NotificationDropdown.tsx",
              lineNumber: 93,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/admin/header/NotificationDropdown.tsx",
            lineNumber: 91,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { className: "block", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { className: "mb-1.5 block space-x-1 text-theme-sm text-gray-500 dark:text-gray-400", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { className: "font-medium text-gray-800 dark:text-white/90", children: "Alena Franci" }, void 0, false, {
                fileName: "app/components/admin/header/NotificationDropdown.tsx",
                lineNumber: 98,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { children: "requests permission to change" }, void 0, false, {
                fileName: "app/components/admin/header/NotificationDropdown.tsx",
                lineNumber: 101,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { className: "font-medium text-gray-800 dark:text-white/90", children: "Project - Nganter App" }, void 0, false, {
                fileName: "app/components/admin/header/NotificationDropdown.tsx",
                lineNumber: 102,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/components/admin/header/NotificationDropdown.tsx",
              lineNumber: 97,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { className: "flex items-center gap-2 text-gray-500 text-theme-xs dark:text-gray-400", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { children: "Project" }, void 0, false, {
                fileName: "app/components/admin/header/NotificationDropdown.tsx",
                lineNumber: 108,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { className: "w-1 h-1 bg-gray-400 rounded-full" }, void 0, false, {
                fileName: "app/components/admin/header/NotificationDropdown.tsx",
                lineNumber: 109,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { children: "8 min ago" }, void 0, false, {
                fileName: "app/components/admin/header/NotificationDropdown.tsx",
                lineNumber: 110,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/components/admin/header/NotificationDropdown.tsx",
              lineNumber: 107,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/admin/header/NotificationDropdown.tsx",
            lineNumber: 96,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/admin/header/NotificationDropdown.tsx",
          lineNumber: 90,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "app/components/admin/header/NotificationDropdown.tsx",
          lineNumber: 89,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(DropdownItem, { onItemClick: closeDropdown, className: "flex gap-3 rounded-lg border-b border-gray-100 p-3 px-4.5 py-3 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-white/5", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { className: "relative block w-full h-10 rounded-full z-1 max-w-10", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("img", { width: 40, height: 40, src: "/images/user/user-04.jpg", alt: "User", className: "w-full overflow-hidden rounded-full" }, void 0, false, {
              fileName: "app/components/admin/header/NotificationDropdown.tsx",
              lineNumber: 119,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { className: "absolute bottom-0 right-0 z-10 h-2.5 w-full max-w-2.5 rounded-full border-[1.5px] border-white bg-success-500 dark:border-gray-900" }, void 0, false, {
              fileName: "app/components/admin/header/NotificationDropdown.tsx",
              lineNumber: 120,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/admin/header/NotificationDropdown.tsx",
            lineNumber: 118,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { className: "block", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { className: "mb-1.5 block space-x-1 text-theme-sm text-gray-500 dark:text-gray-400", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { className: "font-medium text-gray-800 dark:text-white/90", children: "Jocelyn Kenter" }, void 0, false, {
                fileName: "app/components/admin/header/NotificationDropdown.tsx",
                lineNumber: 125,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { children: " requests permission to change" }, void 0, false, {
                fileName: "app/components/admin/header/NotificationDropdown.tsx",
                lineNumber: 128,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { className: "font-medium text-gray-800 dark:text-white/90", children: "Project - Nganter App" }, void 0, false, {
                fileName: "app/components/admin/header/NotificationDropdown.tsx",
                lineNumber: 129,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/components/admin/header/NotificationDropdown.tsx",
              lineNumber: 124,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { className: "flex items-center gap-2 text-gray-500 text-theme-xs dark:text-gray-400", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { children: "Project" }, void 0, false, {
                fileName: "app/components/admin/header/NotificationDropdown.tsx",
                lineNumber: 135,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { className: "w-1 h-1 bg-gray-400 rounded-full" }, void 0, false, {
                fileName: "app/components/admin/header/NotificationDropdown.tsx",
                lineNumber: 136,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { children: "15 min ago" }, void 0, false, {
                fileName: "app/components/admin/header/NotificationDropdown.tsx",
                lineNumber: 137,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/components/admin/header/NotificationDropdown.tsx",
              lineNumber: 134,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/admin/header/NotificationDropdown.tsx",
            lineNumber: 123,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/admin/header/NotificationDropdown.tsx",
          lineNumber: 117,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "app/components/admin/header/NotificationDropdown.tsx",
          lineNumber: 116,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(DropdownItem, { onItemClick: closeDropdown, className: "flex gap-3 rounded-lg border-b border-gray-100 p-3 px-4.5 py-3 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-white/5", to: "/", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { className: "relative block w-full h-10 rounded-full z-1 max-w-10", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("img", { width: 40, height: 40, src: "/images/user/user-05.jpg", alt: "User", className: "w-full overflow-hidden rounded-full" }, void 0, false, {
              fileName: "app/components/admin/header/NotificationDropdown.tsx",
              lineNumber: 146,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { className: "absolute bottom-0 right-0 z-10 h-2.5 w-full max-w-2.5 rounded-full border-[1.5px] border-white bg-error-500 dark:border-gray-900" }, void 0, false, {
              fileName: "app/components/admin/header/NotificationDropdown.tsx",
              lineNumber: 147,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/admin/header/NotificationDropdown.tsx",
            lineNumber: 145,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { className: "block", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { className: "mb-1.5 space-x-1 block text-theme-sm text-gray-500 dark:text-gray-400", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { className: "font-medium text-gray-800 dark:text-white/90", children: "Brandon Philips" }, void 0, false, {
                fileName: "app/components/admin/header/NotificationDropdown.tsx",
                lineNumber: 152,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { children: "requests permission to change" }, void 0, false, {
                fileName: "app/components/admin/header/NotificationDropdown.tsx",
                lineNumber: 155,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { className: "font-medium text-gray-800 dark:text-white/90", children: "Project - Nganter App" }, void 0, false, {
                fileName: "app/components/admin/header/NotificationDropdown.tsx",
                lineNumber: 156,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/components/admin/header/NotificationDropdown.tsx",
              lineNumber: 151,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { className: "flex items-center gap-2 text-gray-500 text-theme-xs dark:text-gray-400", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { children: "Project" }, void 0, false, {
                fileName: "app/components/admin/header/NotificationDropdown.tsx",
                lineNumber: 162,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { className: "w-1 h-1 bg-gray-400 rounded-full" }, void 0, false, {
                fileName: "app/components/admin/header/NotificationDropdown.tsx",
                lineNumber: 163,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { children: "1 hr ago" }, void 0, false, {
                fileName: "app/components/admin/header/NotificationDropdown.tsx",
                lineNumber: 164,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/components/admin/header/NotificationDropdown.tsx",
              lineNumber: 161,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/admin/header/NotificationDropdown.tsx",
            lineNumber: 150,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/admin/header/NotificationDropdown.tsx",
          lineNumber: 144,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "app/components/admin/header/NotificationDropdown.tsx",
          lineNumber: 143,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(DropdownItem, { className: "flex gap-3 rounded-lg border-b border-gray-100 p-3 px-4.5 py-3 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-white/5", onItemClick: closeDropdown, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { className: "relative block w-full h-10 rounded-full z-1 max-w-10", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("img", { width: 40, height: 40, src: "/images/user/user-02.jpg", alt: "User", className: "w-full overflow-hidden rounded-full" }, void 0, false, {
              fileName: "app/components/admin/header/NotificationDropdown.tsx",
              lineNumber: 173,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { className: "absolute bottom-0 right-0 z-10 h-2.5 w-full max-w-2.5 rounded-full border-[1.5px] border-white bg-success-500 dark:border-gray-900" }, void 0, false, {
              fileName: "app/components/admin/header/NotificationDropdown.tsx",
              lineNumber: 174,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/admin/header/NotificationDropdown.tsx",
            lineNumber: 172,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { className: "block", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { className: "mb-1.5 block space-x-1 text-theme-sm text-gray-500 dark:text-gray-400", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { className: "font-medium text-gray-800 dark:text-white/90", children: "Terry Franci" }, void 0, false, {
                fileName: "app/components/admin/header/NotificationDropdown.tsx",
                lineNumber: 179,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { children: " requests permission to change" }, void 0, false, {
                fileName: "app/components/admin/header/NotificationDropdown.tsx",
                lineNumber: 182,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { className: "font-medium text-gray-800 dark:text-white/90", children: "Project - Nganter App" }, void 0, false, {
                fileName: "app/components/admin/header/NotificationDropdown.tsx",
                lineNumber: 183,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/components/admin/header/NotificationDropdown.tsx",
              lineNumber: 178,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { className: "flex items-center gap-2 text-gray-500 text-theme-xs dark:text-gray-400", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { children: "Project" }, void 0, false, {
                fileName: "app/components/admin/header/NotificationDropdown.tsx",
                lineNumber: 189,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { className: "w-1 h-1 bg-gray-400 rounded-full" }, void 0, false, {
                fileName: "app/components/admin/header/NotificationDropdown.tsx",
                lineNumber: 190,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { children: "5 min ago" }, void 0, false, {
                fileName: "app/components/admin/header/NotificationDropdown.tsx",
                lineNumber: 191,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/components/admin/header/NotificationDropdown.tsx",
              lineNumber: 188,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/admin/header/NotificationDropdown.tsx",
            lineNumber: 177,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/admin/header/NotificationDropdown.tsx",
          lineNumber: 171,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "app/components/admin/header/NotificationDropdown.tsx",
          lineNumber: 170,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(DropdownItem, { onItemClick: closeDropdown, className: "flex gap-3 rounded-lg border-b border-gray-100 p-3 px-4.5 py-3 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-white/5", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { className: "relative block w-full h-10 rounded-full z-1 max-w-10", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("img", { width: 40, height: 40, src: "/images/user/user-03.jpg", alt: "User", className: "w-full overflow-hidden rounded-full" }, void 0, false, {
              fileName: "app/components/admin/header/NotificationDropdown.tsx",
              lineNumber: 200,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { className: "absolute bottom-0 right-0 z-10 h-2.5 w-full max-w-2.5 rounded-full border-[1.5px] border-white bg-success-500 dark:border-gray-900" }, void 0, false, {
              fileName: "app/components/admin/header/NotificationDropdown.tsx",
              lineNumber: 201,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/admin/header/NotificationDropdown.tsx",
            lineNumber: 199,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { className: "block", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { className: "mb-1.5 block space-x-1 text-theme-sm text-gray-500 dark:text-gray-400", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { className: "font-medium text-gray-800 dark:text-white/90", children: "Alena Franci" }, void 0, false, {
                fileName: "app/components/admin/header/NotificationDropdown.tsx",
                lineNumber: 206,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { children: " requests permission to change" }, void 0, false, {
                fileName: "app/components/admin/header/NotificationDropdown.tsx",
                lineNumber: 209,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { className: "font-medium text-gray-800 dark:text-white/90", children: "Project - Nganter App" }, void 0, false, {
                fileName: "app/components/admin/header/NotificationDropdown.tsx",
                lineNumber: 210,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/components/admin/header/NotificationDropdown.tsx",
              lineNumber: 205,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { className: "flex items-center gap-2 text-gray-500 text-theme-xs dark:text-gray-400", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { children: "Project" }, void 0, false, {
                fileName: "app/components/admin/header/NotificationDropdown.tsx",
                lineNumber: 216,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { className: "w-1 h-1 bg-gray-400 rounded-full" }, void 0, false, {
                fileName: "app/components/admin/header/NotificationDropdown.tsx",
                lineNumber: 217,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { children: "8 min ago" }, void 0, false, {
                fileName: "app/components/admin/header/NotificationDropdown.tsx",
                lineNumber: 218,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/components/admin/header/NotificationDropdown.tsx",
              lineNumber: 215,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/admin/header/NotificationDropdown.tsx",
            lineNumber: 204,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/admin/header/NotificationDropdown.tsx",
          lineNumber: 198,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "app/components/admin/header/NotificationDropdown.tsx",
          lineNumber: 197,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(DropdownItem, { onItemClick: closeDropdown, className: "flex gap-3 rounded-lg border-b border-gray-100 p-3 px-4.5 py-3 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-white/5", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { className: "relative block w-full h-10 rounded-full z-1 max-w-10", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("img", { width: 40, height: 40, src: "/images/user/user-04.jpg", alt: "User", className: "w-full overflow-hidden rounded-full" }, void 0, false, {
              fileName: "app/components/admin/header/NotificationDropdown.tsx",
              lineNumber: 227,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { className: "absolute bottom-0 right-0 z-10 h-2.5 w-full max-w-2.5 rounded-full border-[1.5px] border-white bg-success-500 dark:border-gray-900" }, void 0, false, {
              fileName: "app/components/admin/header/NotificationDropdown.tsx",
              lineNumber: 228,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/admin/header/NotificationDropdown.tsx",
            lineNumber: 226,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { className: "block", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { className: "mb-1.5 block  space-x-1 text-theme-sm text-gray-500 dark:text-gray-400", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { className: "font-medium text-gray-800 dark:text-white/90", children: "Jocelyn Kenter" }, void 0, false, {
                fileName: "app/components/admin/header/NotificationDropdown.tsx",
                lineNumber: 233,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { children: " requests permission to change" }, void 0, false, {
                fileName: "app/components/admin/header/NotificationDropdown.tsx",
                lineNumber: 236,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { className: "font-medium text-gray-800 dark:text-white/90", children: "Project - Nganter App" }, void 0, false, {
                fileName: "app/components/admin/header/NotificationDropdown.tsx",
                lineNumber: 237,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/components/admin/header/NotificationDropdown.tsx",
              lineNumber: 232,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { className: "flex items-center gap-2 text-gray-500 text-theme-xs dark:text-gray-400", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { children: "Project" }, void 0, false, {
                fileName: "app/components/admin/header/NotificationDropdown.tsx",
                lineNumber: 243,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { className: "w-1 h-1 bg-gray-400 rounded-full" }, void 0, false, {
                fileName: "app/components/admin/header/NotificationDropdown.tsx",
                lineNumber: 244,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { children: "15 min ago" }, void 0, false, {
                fileName: "app/components/admin/header/NotificationDropdown.tsx",
                lineNumber: 245,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/components/admin/header/NotificationDropdown.tsx",
              lineNumber: 242,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/admin/header/NotificationDropdown.tsx",
            lineNumber: 231,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/admin/header/NotificationDropdown.tsx",
          lineNumber: 225,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "app/components/admin/header/NotificationDropdown.tsx",
          lineNumber: 224,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(DropdownItem, { onItemClick: closeDropdown, className: "flex gap-3 rounded-lg border-b border-gray-100 p-3 px-4.5 py-3 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-white/5", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { className: "relative block w-full h-10 rounded-full z-1 max-w-10", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("img", { width: 40, height: 40, src: "/images/user/user-05.jpg", alt: "User", className: "overflow-hidden rounded-full" }, void 0, false, {
              fileName: "app/components/admin/header/NotificationDropdown.tsx",
              lineNumber: 254,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { className: "absolute bottom-0 right-0 z-10 h-2.5 w-full max-w-2.5 rounded-full border-[1.5px] border-white bg-error-500 dark:border-gray-900" }, void 0, false, {
              fileName: "app/components/admin/header/NotificationDropdown.tsx",
              lineNumber: 255,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/admin/header/NotificationDropdown.tsx",
            lineNumber: 253,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { className: "block", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { className: "mb-1.5 block space-x-1 text-theme-sm text-gray-500 dark:text-gray-400", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { className: "font-medium text-gray-800 dark:text-white/90", children: "Brandon Philips" }, void 0, false, {
                fileName: "app/components/admin/header/NotificationDropdown.tsx",
                lineNumber: 260,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { children: "requests permission to change" }, void 0, false, {
                fileName: "app/components/admin/header/NotificationDropdown.tsx",
                lineNumber: 263,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { className: "font-medium text-gray-800 dark:text-white/90", children: "Project - Nganter App" }, void 0, false, {
                fileName: "app/components/admin/header/NotificationDropdown.tsx",
                lineNumber: 264,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/components/admin/header/NotificationDropdown.tsx",
              lineNumber: 259,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { className: "flex items-center gap-2 text-gray-500 text-theme-xs dark:text-gray-400", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { children: "Project" }, void 0, false, {
                fileName: "app/components/admin/header/NotificationDropdown.tsx",
                lineNumber: 270,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { className: "w-1 h-1 bg-gray-400 rounded-full" }, void 0, false, {
                fileName: "app/components/admin/header/NotificationDropdown.tsx",
                lineNumber: 271,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { children: "1 hr ago" }, void 0, false, {
                fileName: "app/components/admin/header/NotificationDropdown.tsx",
                lineNumber: 272,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/components/admin/header/NotificationDropdown.tsx",
              lineNumber: 269,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/admin/header/NotificationDropdown.tsx",
            lineNumber: 258,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/admin/header/NotificationDropdown.tsx",
          lineNumber: 252,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "app/components/admin/header/NotificationDropdown.tsx",
          lineNumber: 251,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/admin/header/NotificationDropdown.tsx",
        lineNumber: 60,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(Link, { to: "/", className: "block px-4 py-2 mt-3 text-sm font-medium text-center text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700", children: "View All Notifications" }, void 0, false, {
        fileName: "app/components/admin/header/NotificationDropdown.tsx",
        lineNumber: 279,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/admin/header/NotificationDropdown.tsx",
      lineNumber: 49,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/admin/header/NotificationDropdown.tsx",
    lineNumber: 40,
    columnNumber: 10
  }, this);
}
_s7(NotificationDropdown, "cJnPgx8r2VD10xzyaN57k2uA+gg=");
_c8 = NotificationDropdown;
var _c8;
$RefreshReg$(_c8, "NotificationDropdown");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/components/admin/header/UserDropdown.tsx
var import_react11 = __toESM(require_react(), 1);
var import_jsx_dev_runtime9 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\admin\\\\header\\\\UserDropdown.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s8 = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\admin\\header\\UserDropdown.tsx"
  );
  import.meta.hot.lastModified = "1759561198236.0625";
}
function UserDropdown() {
  _s8();
  const [isOpen, setIsOpen] = (0, import_react11.useState)(false);
  function toggleDropdown() {
    setIsOpen(!isOpen);
  }
  function closeDropdown() {
    setIsOpen(false);
  }
  return /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "relative", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("button", { onClick: toggleDropdown, className: "flex items-center text-gray-700 dropdown-toggle dark:text-gray-400", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("span", { className: "mr-3 overflow-hidden rounded-full h-11 w-11", children: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("img", { src: "/images/user/owner.jpg", alt: "User" }, void 0, false, {
        fileName: "app/components/admin/header/UserDropdown.tsx",
        lineNumber: 38,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/components/admin/header/UserDropdown.tsx",
        lineNumber: 37,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("span", { className: "block mr-1 font-medium text-theme-sm", children: "Musharof" }, void 0, false, {
        fileName: "app/components/admin/header/UserDropdown.tsx",
        lineNumber: 41,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("svg", { className: `stroke-gray-500 dark:stroke-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`, width: "18", height: "20", viewBox: "0 0 18 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("path", { d: "M4.3125 8.65625L9 13.3437L13.6875 8.65625", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }, void 0, false, {
        fileName: "app/components/admin/header/UserDropdown.tsx",
        lineNumber: 43,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/components/admin/header/UserDropdown.tsx",
        lineNumber: 42,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/admin/header/UserDropdown.tsx",
      lineNumber: 36,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(Dropdown, { isOpen, onClose: closeDropdown, className: "absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("span", { className: "block font-medium text-gray-700 text-theme-sm dark:text-gray-400", children: "Musharof Chowdhury" }, void 0, false, {
          fileName: "app/components/admin/header/UserDropdown.tsx",
          lineNumber: 49,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("span", { className: "mt-0.5 block text-theme-xs text-gray-500 dark:text-gray-400", children: "randomuser@pimjo.com" }, void 0, false, {
          fileName: "app/components/admin/header/UserDropdown.tsx",
          lineNumber: 52,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/admin/header/UserDropdown.tsx",
        lineNumber: 48,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("ul", { className: "flex flex-col gap-1 pt-4 pb-3 border-b border-gray-200 dark:border-gray-800", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(DropdownItem, { onItemClick: closeDropdown, tag: "a", to: "/profile", className: "flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("svg", { className: "fill-gray-500 group-hover:fill-gray-700 dark:fill-gray-400 dark:group-hover:fill-gray-300", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M12 3.5C7.30558 3.5 3.5 7.30558 3.5 12C3.5 14.1526 4.3002 16.1184 5.61936 17.616C6.17279 15.3096 8.24852 13.5955 10.7246 13.5955H13.2746C15.7509 13.5955 17.8268 15.31 18.38 17.6167C19.6996 16.119 20.5 14.153 20.5 12C20.5 7.30558 16.6944 3.5 12 3.5ZM17.0246 18.8566V18.8455C17.0246 16.7744 15.3457 15.0955 13.2746 15.0955H10.7246C8.65354 15.0955 6.97461 16.7744 6.97461 18.8455V18.856C8.38223 19.8895 10.1198 20.5 12 20.5C13.8798 20.5 15.6171 19.8898 17.0246 18.8566ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM11.9991 7.25C10.8847 7.25 9.98126 8.15342 9.98126 9.26784C9.98126 10.3823 10.8847 11.2857 11.9991 11.2857C13.1135 11.2857 14.0169 10.3823 14.0169 9.26784C14.0169 8.15342 13.1135 7.25 11.9991 7.25ZM8.48126 9.26784C8.48126 7.32499 10.0563 5.75 11.9991 5.75C13.9419 5.75 15.5169 7.32499 15.5169 9.26784C15.5169 11.2107 13.9419 12.7857 11.9991 12.7857C10.0563 12.7857 8.48126 11.2107 8.48126 9.26784Z", fill: "" }, void 0, false, {
            fileName: "app/components/admin/header/UserDropdown.tsx",
            lineNumber: 61,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "app/components/admin/header/UserDropdown.tsx",
            lineNumber: 60,
            columnNumber: 15
          }, this),
          "Edit profile"
        ] }, void 0, true, {
          fileName: "app/components/admin/header/UserDropdown.tsx",
          lineNumber: 59,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "app/components/admin/header/UserDropdown.tsx",
          lineNumber: 58,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(DropdownItem, { onItemClick: closeDropdown, tag: "a", to: "/profile", className: "flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("svg", { className: "fill-gray-500 group-hover:fill-gray-700 dark:fill-gray-400 dark:group-hover:fill-gray-300", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M10.4858 3.5L13.5182 3.5C13.9233 3.5 14.2518 3.82851 14.2518 4.23377C14.2518 5.9529 16.1129 7.02795 17.602 6.1682C17.9528 5.96567 18.4014 6.08586 18.6039 6.43667L20.1203 9.0631C20.3229 9.41407 20.2027 9.86286 19.8517 10.0655C18.3625 10.9253 18.3625 13.0747 19.8517 13.9345C20.2026 14.1372 20.3229 14.5859 20.1203 14.9369L18.6039 17.5634C18.4013 17.9142 17.9528 18.0344 17.602 17.8318C16.1129 16.9721 14.2518 18.0471 14.2518 19.7663C14.2518 20.1715 13.9233 20.5 13.5182 20.5H10.4858C10.0804 20.5 9.75182 20.1714 9.75182 19.766C9.75182 18.0461 7.88983 16.9717 6.40067 17.8314C6.04945 18.0342 5.60037 17.9139 5.39767 17.5628L3.88167 14.937C3.67903 14.586 3.79928 14.1372 4.15026 13.9346C5.63949 13.0748 5.63946 10.9253 4.15025 10.0655C3.79926 9.86282 3.67901 9.41401 3.88165 9.06303L5.39764 6.43725C5.60034 6.08617 6.04943 5.96581 6.40065 6.16858C7.88982 7.02836 9.75182 5.9539 9.75182 4.23399C9.75182 3.82862 10.0804 3.5 10.4858 3.5ZM13.5182 2L10.4858 2C9.25201 2 8.25182 3.00019 8.25182 4.23399C8.25182 4.79884 7.64013 5.15215 7.15065 4.86955C6.08213 4.25263 4.71559 4.61859 4.0986 5.68725L2.58261 8.31303C1.96575 9.38146 2.33183 10.7477 3.40025 11.3645C3.88948 11.647 3.88947 12.3531 3.40026 12.6355C2.33184 13.2524 1.96578 14.6186 2.58263 15.687L4.09863 18.3128C4.71562 19.3814 6.08215 19.7474 7.15067 19.1305C7.64015 18.8479 8.25182 19.2012 8.25182 19.766C8.25182 20.9998 9.25201 22 10.4858 22H13.5182C14.7519 22 15.7518 20.9998 15.7518 19.7663C15.7518 19.2015 16.3632 18.8487 16.852 19.1309C17.9202 19.7476 19.2862 19.3816 19.9029 18.3134L21.4193 15.6869C22.0361 14.6185 21.6701 13.2523 20.6017 12.6355C20.1125 12.3531 20.1125 11.647 20.6017 11.3645C21.6701 10.7477 22.0362 9.38152 21.4193 8.3131L19.903 5.68667C19.2862 4.61842 17.9202 4.25241 16.852 4.86917C16.3632 5.15138 15.7518 4.79856 15.7518 4.23377C15.7518 3.00024 14.7519 2 13.5182 2ZM9.6659 11.9999C9.6659 10.7103 10.7113 9.66493 12.0009 9.66493C13.2905 9.66493 14.3359 10.7103 14.3359 11.9999C14.3359 13.2895 13.2905 14.3349 12.0009 14.3349C10.7113 14.3349 9.6659 13.2895 9.6659 11.9999ZM12.0009 8.16493C9.88289 8.16493 8.1659 9.88191 8.1659 11.9999C8.1659 14.1179 9.88289 15.8349 12.0009 15.8349C14.1189 15.8349 15.8359 14.1179 15.8359 11.9999C15.8359 9.88191 14.1189 8.16493 12.0009 8.16493Z", fill: "" }, void 0, false, {
            fileName: "app/components/admin/header/UserDropdown.tsx",
            lineNumber: 69,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "app/components/admin/header/UserDropdown.tsx",
            lineNumber: 68,
            columnNumber: 15
          }, this),
          "Account settings"
        ] }, void 0, true, {
          fileName: "app/components/admin/header/UserDropdown.tsx",
          lineNumber: 67,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "app/components/admin/header/UserDropdown.tsx",
          lineNumber: 66,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(DropdownItem, { onItemClick: closeDropdown, tag: "a", to: "/profile", className: "flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("svg", { className: "fill-gray-500 group-hover:fill-gray-700 dark:fill-gray-400 dark:group-hover:fill-gray-300", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M3.5 12C3.5 7.30558 7.30558 3.5 12 3.5C16.6944 3.5 20.5 7.30558 20.5 12C20.5 16.6944 16.6944 20.5 12 20.5C7.30558 20.5 3.5 16.6944 3.5 12ZM12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM11.0991 7.52507C11.0991 8.02213 11.5021 8.42507 11.9991 8.42507H12.0001C12.4972 8.42507 12.9001 8.02213 12.9001 7.52507C12.9001 7.02802 12.4972 6.62507 12.0001 6.62507H11.9991C11.5021 6.62507 11.0991 7.02802 11.0991 7.52507ZM12.0001 17.3714C11.5859 17.3714 11.2501 17.0356 11.2501 16.6214V10.9449C11.2501 10.5307 11.5859 10.1949 12.0001 10.1949C12.4143 10.1949 12.7501 10.5307 12.7501 10.9449V16.6214C12.7501 17.0356 12.4143 17.3714 12.0001 17.3714Z", fill: "" }, void 0, false, {
            fileName: "app/components/admin/header/UserDropdown.tsx",
            lineNumber: 77,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "app/components/admin/header/UserDropdown.tsx",
            lineNumber: 76,
            columnNumber: 15
          }, this),
          "Support"
        ] }, void 0, true, {
          fileName: "app/components/admin/header/UserDropdown.tsx",
          lineNumber: 75,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "app/components/admin/header/UserDropdown.tsx",
          lineNumber: 74,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/admin/header/UserDropdown.tsx",
        lineNumber: 57,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(Link, { to: "/signin", className: "flex items-center gap-3 px-3 py-2 mt-3 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("svg", { className: "fill-gray-500 group-hover:fill-gray-700 dark:group-hover:fill-gray-300", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M15.1007 19.247C14.6865 19.247 14.3507 18.9112 14.3507 18.497L14.3507 14.245H12.8507V18.497C12.8507 19.7396 13.8581 20.747 15.1007 20.747H18.5007C19.7434 20.747 20.7507 19.7396 20.7507 18.497L20.7507 5.49609C20.7507 4.25345 19.7433 3.24609 18.5007 3.24609H15.1007C13.8581 3.24609 12.8507 4.25345 12.8507 5.49609V9.74501L14.3507 9.74501V5.49609C14.3507 5.08188 14.6865 4.74609 15.1007 4.74609L18.5007 4.74609C18.9149 4.74609 19.2507 5.08188 19.2507 5.49609L19.2507 18.497C19.2507 18.9112 18.9149 19.247 18.5007 19.247H15.1007ZM3.25073 11.9984C3.25073 12.2144 3.34204 12.4091 3.48817 12.546L8.09483 17.1556C8.38763 17.4485 8.86251 17.4487 9.15549 17.1559C9.44848 16.8631 9.44863 16.3882 9.15583 16.0952L5.81116 12.7484L16.0007 12.7484C16.4149 12.7484 16.7507 12.4127 16.7507 11.9984C16.7507 11.5842 16.4149 11.2484 16.0007 11.2484L5.81528 11.2484L9.15585 7.90554C9.44864 7.61255 9.44847 7.13767 9.15547 6.84488C8.86248 6.55209 8.3876 6.55226 8.09481 6.84525L3.52309 11.4202C3.35673 11.5577 3.25073 11.7657 3.25073 11.9984Z", fill: "" }, void 0, false, {
          fileName: "app/components/admin/header/UserDropdown.tsx",
          lineNumber: 85,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "app/components/admin/header/UserDropdown.tsx",
          lineNumber: 84,
          columnNumber: 11
        }, this),
        "Sign out"
      ] }, void 0, true, {
        fileName: "app/components/admin/header/UserDropdown.tsx",
        lineNumber: 83,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/admin/header/UserDropdown.tsx",
      lineNumber: 47,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/admin/header/UserDropdown.tsx",
    lineNumber: 35,
    columnNumber: 10
  }, this);
}
_s8(UserDropdown, "+sus0Lb0ewKHdwiUhiTAJFoFyQ0=");
_c9 = UserDropdown;
var _c9;
$RefreshReg$(_c9, "UserDropdown");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/components/admin/layout/AppHeader.tsx
var import_jsx_dev_runtime10 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\admin\\\\layout\\\\AppHeader.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s9 = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\admin\\layout\\AppHeader.tsx"
  );
  import.meta.hot.lastModified = "1759561118991.2744";
}
var AppHeader = () => {
  _s9();
  const [isApplicationMenuOpen, setApplicationMenuOpen] = (0, import_react13.useState)(false);
  const {
    isMobileOpen,
    toggleSidebar,
    toggleMobileSidebar
  } = useSidebar();
  const handleToggle = () => {
    if (window.innerWidth >= 1024) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };
  const toggleApplicationMenu = () => {
    setApplicationMenuOpen(!isApplicationMenuOpen);
  };
  const inputRef = (0, import_react13.useRef)(null);
  (0, import_react13.useEffect)(() => {
    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("header", { className: "sticky top-0 flex w-full bg-white border-gray-200 z-99999 dark:border-gray-800 dark:bg-gray-900 lg:border-b", children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: "flex flex-col items-center justify-between grow lg:flex-row lg:px-6", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: "flex items-center justify-between w-full gap-2 px-3 py-3 border-b border-gray-200 dark:border-gray-800 sm:gap-4 lg:justify-normal lg:border-b-0 lg:px-0 lg:py-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("button", { className: "items-center justify-center w-10 h-10 text-gray-500 border-gray-200 rounded-lg z-99999 dark:border-gray-800 lg:flex dark:text-gray-400 lg:h-11 lg:w-11 lg:border", onClick: handleToggle, "aria-label": "Toggle Sidebar", children: isMobileOpen ? /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M6.21967 7.28131C5.92678 6.98841 5.92678 6.51354 6.21967 6.22065C6.51256 5.92775 6.98744 5.92775 7.28033 6.22065L11.999 10.9393L16.7176 6.22078C17.0105 5.92789 17.4854 5.92788 17.7782 6.22078C18.0711 6.51367 18.0711 6.98855 17.7782 7.28144L13.0597 12L17.7782 16.7186C18.0711 17.0115 18.0711 17.4863 17.7782 17.7792C17.4854 18.0721 17.0105 18.0721 16.7176 17.7792L11.999 13.0607L7.28033 17.7794C6.98744 18.0722 6.51256 18.0722 6.21967 17.7794C5.92678 17.4865 5.92678 17.0116 6.21967 16.7187L10.9384 12L6.21967 7.28131Z", fill: "currentColor" }, void 0, false, {
        fileName: "app/components/admin/layout/AppHeader.tsx",
        lineNumber: 64,
        columnNumber: 17
      }, this) }, void 0, false, {
        fileName: "app/components/admin/layout/AppHeader.tsx",
        lineNumber: 63,
        columnNumber: 29
      }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("svg", { width: "16", height: "12", viewBox: "0 0 16 12", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M0.583252 1C0.583252 0.585788 0.919038 0.25 1.33325 0.25H14.6666C15.0808 0.25 15.4166 0.585786 15.4166 1C15.4166 1.41421 15.0808 1.75 14.6666 1.75L1.33325 1.75C0.919038 1.75 0.583252 1.41422 0.583252 1ZM0.583252 11C0.583252 10.5858 0.919038 10.25 1.33325 10.25L14.6666 10.25C15.0808 10.25 15.4166 10.5858 15.4166 11C15.4166 11.4142 15.0808 11.75 14.6666 11.75L1.33325 11.75C0.919038 11.75 0.583252 11.4142 0.583252 11ZM1.33325 5.25C0.919038 5.25 0.583252 5.58579 0.583252 6C0.583252 6.41421 0.919038 6.75 1.33325 6.75L7.99992 6.75C8.41413 6.75 8.74992 6.41421 8.74992 6C8.74992 5.58579 8.41413 5.25 7.99992 5.25L1.33325 5.25Z", fill: "currentColor" }, void 0, false, {
        fileName: "app/components/admin/layout/AppHeader.tsx",
        lineNumber: 66,
        columnNumber: 17
      }, this) }, void 0, false, {
        fileName: "app/components/admin/layout/AppHeader.tsx",
        lineNumber: 65,
        columnNumber: 24
      }, this) }, void 0, false, {
        fileName: "app/components/admin/layout/AppHeader.tsx",
        lineNumber: 62,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(Link, { to: "/", className: "lg:hidden", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("img", { className: "dark:hidden", src: "./images/logo/logo.svg", alt: "Logo" }, void 0, false, {
          fileName: "app/components/admin/layout/AppHeader.tsx",
          lineNumber: 72,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("img", { className: "hidden dark:block", src: "./images/logo/logo-dark.svg", alt: "Logo" }, void 0, false, {
          fileName: "app/components/admin/layout/AppHeader.tsx",
          lineNumber: 73,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/admin/layout/AppHeader.tsx",
        lineNumber: 71,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("button", { onClick: toggleApplicationMenu, className: "flex items-center justify-center w-10 h-10 text-gray-700 rounded-lg z-99999 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 lg:hidden", children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M5.99902 10.4951C6.82745 10.4951 7.49902 11.1667 7.49902 11.9951V12.0051C7.49902 12.8335 6.82745 13.5051 5.99902 13.5051C5.1706 13.5051 4.49902 12.8335 4.49902 12.0051V11.9951C4.49902 11.1667 5.1706 10.4951 5.99902 10.4951ZM17.999 10.4951C18.8275 10.4951 19.499 11.1667 19.499 11.9951V12.0051C19.499 12.8335 18.8275 13.5051 17.999 13.5051C17.1706 13.5051 16.499 12.8335 16.499 12.0051V11.9951C16.499 11.1667 17.1706 10.4951 17.999 10.4951ZM13.499 11.9951C13.499 11.1667 12.8275 10.4951 11.999 10.4951C11.1706 10.4951 10.499 11.1667 10.499 11.9951V12.0051C10.499 12.8335 11.1706 13.5051 11.999 13.5051C12.8275 13.5051 13.499 12.8335 13.499 12.0051V11.9951Z", fill: "currentColor" }, void 0, false, {
        fileName: "app/components/admin/layout/AppHeader.tsx",
        lineNumber: 78,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "app/components/admin/layout/AppHeader.tsx",
        lineNumber: 77,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/components/admin/layout/AppHeader.tsx",
        lineNumber: 76,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: "hidden lg:block", children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("form", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: "relative", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("span", { className: "absolute -translate-y-1/2 pointer-events-none left-4 top-1/2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("svg", { className: "fill-gray-500 dark:fill-gray-400", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z", fill: "" }, void 0, false, {
          fileName: "app/components/admin/layout/AppHeader.tsx",
          lineNumber: 87,
          columnNumber: 21
        }, this) }, void 0, false, {
          fileName: "app/components/admin/layout/AppHeader.tsx",
          lineNumber: 86,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "app/components/admin/layout/AppHeader.tsx",
          lineNumber: 85,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("input", { ref: inputRef, type: "text", placeholder: "Search or type command...", className: "dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[430px]" }, void 0, false, {
          fileName: "app/components/admin/layout/AppHeader.tsx",
          lineNumber: 90,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("button", { className: "absolute right-2.5 top-1/2 inline-flex -translate-y-1/2 items-center gap-0.5 rounded-lg border border-gray-200 bg-gray-50 px-[7px] py-[4.5px] text-xs -tracking-[0.2px] text-gray-500 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-400", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("span", { children: " \u2318 " }, void 0, false, {
            fileName: "app/components/admin/layout/AppHeader.tsx",
            lineNumber: 93,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("span", { children: " K " }, void 0, false, {
            fileName: "app/components/admin/layout/AppHeader.tsx",
            lineNumber: 94,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/admin/layout/AppHeader.tsx",
          lineNumber: 92,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/admin/layout/AppHeader.tsx",
        lineNumber: 84,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "app/components/admin/layout/AppHeader.tsx",
        lineNumber: 83,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/components/admin/layout/AppHeader.tsx",
        lineNumber: 82,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/admin/layout/AppHeader.tsx",
      lineNumber: 61,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: `${isApplicationMenuOpen ? "flex" : "hidden"} items-center justify-between w-full gap-4 px-5 py-4 lg:flex shadow-theme-md lg:justify-end lg:px-0 lg:shadow-none`, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: "flex items-center gap-2 2xsm:gap-3", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(ThemeToggleButton, {}, void 0, false, {
          fileName: "app/components/admin/layout/AppHeader.tsx",
          lineNumber: 103,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(NotificationDropdown, {}, void 0, false, {
          fileName: "app/components/admin/layout/AppHeader.tsx",
          lineNumber: 105,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/admin/layout/AppHeader.tsx",
        lineNumber: 101,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(UserDropdown, {}, void 0, false, {
        fileName: "app/components/admin/layout/AppHeader.tsx",
        lineNumber: 109,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/admin/layout/AppHeader.tsx",
      lineNumber: 100,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/admin/layout/AppHeader.tsx",
    lineNumber: 60,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/components/admin/layout/AppHeader.tsx",
    lineNumber: 59,
    columnNumber: 10
  }, this);
};
_s9(AppHeader, "6BvYJ5ubQxE4MZHRY7rJLLKIiGI=", false, function() {
  return [useSidebar];
});
_c10 = AppHeader;
var AppHeader_default = AppHeader;
var _c10;
$RefreshReg$(_c10, "AppHeader");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/components/admin/layout/Backdrop.tsx
var import_jsx_dev_runtime11 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\admin\\\\layout\\\\Backdrop.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s10 = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\admin\\layout\\Backdrop.tsx"
  );
  import.meta.hot.lastModified = "1759410193328.7688";
}
var Backdrop = () => {
  _s10();
  const {
    isMobileOpen,
    toggleMobileSidebar
  } = useSidebar();
  if (!isMobileOpen)
    return null;
  return /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", { className: "fixed inset-0 z-40 bg-gray-900/50 lg:hidden", onClick: toggleMobileSidebar }, void 0, false, {
    fileName: "app/components/admin/layout/Backdrop.tsx",
    lineNumber: 30,
    columnNumber: 10
  }, this);
};
_s10(Backdrop, "WsgFK5yVzNwtmsM8arBtfOlYq7I=", false, function() {
  return [useSidebar];
});
_c11 = Backdrop;
var Backdrop_default = Backdrop;
var _c11;
$RefreshReg$(_c11, "Backdrop");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/routes/admin.tsx
var import_jsx_dev_runtime12 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\admin.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s11 = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\admin.tsx"
  );
  import.meta.hot.lastModified = "1759504512304.888";
}
function LayoutContent() {
  _s11();
  const {
    isExpanded,
    isHovered,
    isMobileOpen
  } = useSidebar();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { className: "min-h-screen xl:flex", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(AppSidebar_default, {}, void 0, false, {
        fileName: "app/routes/admin.tsx",
        lineNumber: 37,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(Backdrop_default, {}, void 0, false, {
        fileName: "app/routes/admin.tsx",
        lineNumber: 38,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/admin.tsx",
      lineNumber: 36,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { className: `flex-1 transition-all duration-300 ease-in-out ${isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"} ${isMobileOpen ? "ml-0" : ""}`, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(AppHeader_default, {}, void 0, false, {
        fileName: "app/routes/admin.tsx",
        lineNumber: 41,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { className: "p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(Outlet, {}, void 0, false, {
        fileName: "app/routes/admin.tsx",
        lineNumber: 43,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/routes/admin.tsx",
        lineNumber: 42,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/admin.tsx",
      lineNumber: 40,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/admin.tsx",
    lineNumber: 35,
    columnNumber: 10
  }, this);
}
_s11(LayoutContent, "+X069UormvutOgxWwthgAD277Ws=", false, function() {
  return [useSidebar];
});
_c12 = LayoutContent;
function AdminLayout() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(ThemeProvider, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(SidebarProvider, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(LayoutContent, {}, void 0, false, {
    fileName: "app/routes/admin.tsx",
    lineNumber: 55,
    columnNumber: 9
  }, this) }, void 0, false, {
    fileName: "app/routes/admin.tsx",
    lineNumber: 54,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/routes/admin.tsx",
    lineNumber: 53,
    columnNumber: 10
  }, this);
}
_c22 = AdminLayout;
var _c12;
var _c22;
$RefreshReg$(_c12, "LayoutContent");
$RefreshReg$(_c22, "AdminLayout");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  AdminLayout as default
};
/*! Bundled license information:

lucide-react/dist/esm/shared/src/utils.js:
  (**
   * @license lucide-react v0.544.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/defaultAttributes.js:
  (**
   * @license lucide-react v0.544.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/Icon.js:
  (**
   * @license lucide-react v0.544.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/createLucideIcon.js:
  (**
   * @license lucide-react v0.544.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/book-open.js:
  (**
   * @license lucide-react v0.544.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/chevron-down.js:
  (**
   * @license lucide-react v0.544.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/ellipsis.js:
  (**
   * @license lucide-react v0.544.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/folder-tree.js:
  (**
   * @license lucide-react v0.544.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/layout-dashboard.js:
  (**
   * @license lucide-react v0.544.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/tags.js:
  (**
   * @license lucide-react v0.544.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/users.js:
  (**
   * @license lucide-react v0.544.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/lucide-react.js:
  (**
   * @license lucide-react v0.544.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/
//# sourceMappingURL=/build/routes/admin-F7VO5ZU7.js.map
