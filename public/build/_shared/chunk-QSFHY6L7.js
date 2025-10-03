import {
  Button
} from "/build/_shared/chunk-SU4K6EH6.js";
import {
  faBook
} from "/build/_shared/chunk-X34T5PVR.js";
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

// app/components/users/Cards/CardBook.tsx
var import_react = __toESM(require_react());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\users\\\\Cards\\\\CardBook.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\users\\Cards\\CardBook.tsx"
  );
  import.meta.hot.lastModified = "1759406155376.8755";
}
var CardBook = ({
  cover = "",
  title = "",
  author = "",
  status = "",
  description = "",
  link = "#"
}) => {
  _s();
  const [alignLeft, setAlignLeft] = (0, import_react.useState)(false);
  const cardRef = (0, import_react.useRef)(null);
  const handleMouseEnter = () => {
    const rect = cardRef.current.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const expandedWidth = 600;
    const imageWidth = 208;
    if (rect.right + (expandedWidth - imageWidth) > windowWidth) {
      setAlignLeft(true);
    } else {
      setAlignLeft(false);
    }
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "relative w-52 h-80", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { ref: cardRef, onMouseEnter: handleMouseEnter, className: "absolute top-0 left-0 w-52 hover:border-1 h-80 bg-black/30 backdrop-blur-md rounded-xl overflow-hidden cursor-pointer\r\n          transition-all duration-400 ease-in-out hover:w-[600px] hover:h-[330px] hover:p-4\r\n          hover:bg-black/70 hover:backdrop-blur-md hover:z-50\r\n          hover:border-white/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]", style: {
    right: alignLeft ? 0 : "auto",
    left: alignLeft ? "auto" : 0
  }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: `flex gap-6 h-full ${alignLeft ? "flex-row-reverse text-left" : "flex-row"}`, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex-shrink-0 w-52 rounded-lg overflow-hidden transition-all duration-400", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: cover, alt: title, className: "w-full h-full object-cover" }, void 0, false, {
      fileName: "app/components/users/Cards/CardBook.tsx",
      lineNumber: 57,
      columnNumber: 13
    }, this) }, void 0, false, {
      fileName: "app/components/users/Cards/CardBook.tsx",
      lineNumber: 56,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex-1 flex flex-col justify-between opacity-0 invisible translate-x-5\r\n            transition-all duration-400 delay-100 text-white group-hover:opacity-100\r\n            group-hover:visible group-hover:translate-x-0", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "text-xl font-bold leading-snug mb-2", children: title }, void 0, false, {
          fileName: "app/components/users/Cards/CardBook.tsx",
          lineNumber: 64,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-gray-400 mb-4", children: author }, void 0, false, {
          fileName: "app/components/users/Cards/CardBook.tsx",
          lineNumber: 65,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "!flex items-center justify-between", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "inline-block bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full text-sm font-medium", children: status }, void 0, false, {
            fileName: "app/components/users/Cards/CardBook.tsx",
            lineNumber: 67,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "flex lg:flex-row flex-col gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { text: "\u0110\u1ECDc s\xE1ch", icon: faBook, href: link, iconPosition: "left" }, void 0, false, {
              fileName: "app/components/users/Cards/CardBook.tsx",
              lineNumber: 71,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-red-500/20 hover:text-red-500 transition", children: "\u2665" }, void 0, false, {
              fileName: "app/components/users/Cards/CardBook.tsx",
              lineNumber: 72,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/users/Cards/CardBook.tsx",
            lineNumber: 70,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/users/Cards/CardBook.tsx",
          lineNumber: 66,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm text-gray-300 leading-relaxed mt-4 line-clamp-4 group-hover:line-clamp-none", children: description }, void 0, false, {
          fileName: "app/components/users/Cards/CardBook.tsx",
          lineNumber: 77,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/users/Cards/CardBook.tsx",
        lineNumber: 63,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: link, className: "text-emerald-500 text-sm font-medium mt-4 block hover:underline hover:text-emerald-600 transition", children: "Chi ti\u1EBFt" }, void 0, false, {
        fileName: "app/components/users/Cards/CardBook.tsx",
        lineNumber: 81,
        columnNumber: 12
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/users/Cards/CardBook.tsx",
      lineNumber: 60,
      columnNumber: 11
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/users/Cards/CardBook.tsx",
    lineNumber: 55,
    columnNumber: 9
  }, this) }, void 0, false, {
    fileName: "app/components/users/Cards/CardBook.tsx",
    lineNumber: 48,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/components/users/Cards/CardBook.tsx",
    lineNumber: 47,
    columnNumber: 10
  }, this);
};
_s(CardBook, "BP6ttQEF5XEZ/Rd68Rv/JB7/CEo=");
_c = CardBook;
var CardBook_default = CardBook;
var _c;
$RefreshReg$(_c, "CardBook");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/components/users/Cards/CardRanking.tsx
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\users\\\\Cards\\\\CardRanking.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\users\\Cards\\CardRanking.tsx"
  );
  import.meta.hot.lastModified = "1759483722931.403";
}
var CardRankings = ({
  number = null,
  cover = "",
  title = "",
  author = "",
  status = 1,
  description = "",
  slug = "#"
}) => {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "flex flex-col gap-3 w-[18%] hover:z-99", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "relative group max-w-min", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(CardBook_default, { cover, title, author, status, description, link: `/ebook/${slug}` }, void 0, false, {
        fileName: "app/components/users/Cards/CardRanking.tsx",
        lineNumber: 37,
        columnNumber: 9
      }, this),
      number !== null && /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "absolute rounded-xl bottom-0 left-0 transition duration-300\r\n            group-hover:opacity-0", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("h1", { className: "text-9xl label-rank", children: number }, void 0, false, {
        fileName: "app/components/users/Cards/CardRanking.tsx",
        lineNumber: 40,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/components/users/Cards/CardRanking.tsx",
        lineNumber: 38,
        columnNumber: 29
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/users/Cards/CardRanking.tsx",
      lineNumber: 36,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("p", { className: "line-clamp-2 font-bold", children: title }, void 0, false, {
      fileName: "app/components/users/Cards/CardRanking.tsx",
      lineNumber: 43,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/users/Cards/CardRanking.tsx",
    lineNumber: 35,
    columnNumber: 10
  }, this);
};
_c2 = CardRankings;
var CardRanking_default = CardRankings;
var _c2;
$RefreshReg$(_c2, "CardRankings");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/components/users/Section.tsx
var import_jsx_dev_runtime3 = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\users\\\\Section.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\users\\Section.tsx"
  );
  import.meta.hot.lastModified = "1759406579392.48";
}
var Section = ({
  title,
  books
}) => /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "!mx-auto py-2", children: [
  /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("span", { className: "flex items-center group", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("h1", { className: "font-bold text-2xl", children: title }, void 0, false, {
      fileName: "app/components/users/Section.tsx",
      lineNumber: 27,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("a", { href: "/thien-dinh-tim-binh-an", className: "font-bold flex items-center ml-3 font-pri opacity-0 translate-x-[-10px] transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0", children: [
      "Kh\xE1m ph\xE1",
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", className: "w-5 h-5 ml-1", children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 5l7 7-7 7" }, void 0, false, {
        fileName: "app/components/users/Section.tsx",
        lineNumber: 31,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/components/users/Section.tsx",
        lineNumber: 30,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/users/Section.tsx",
      lineNumber: 28,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/users/Section.tsx",
    lineNumber: 26,
    columnNumber: 5
  }, this),
  /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "flex flex-row overflow-x-auto scrollbar-hide w-full gap-10 p-5", children: books.map((book, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(CardRanking_default, { cover: book.cover, title: book.title, author: book.author, status: book.status, description: book.description, link: book.link }, i, false, {
    fileName: "app/components/users/Section.tsx",
    lineNumber: 36,
    columnNumber: 31
  }, this)) }, void 0, false, {
    fileName: "app/components/users/Section.tsx",
    lineNumber: 35,
    columnNumber: 5
  }, this)
] }, void 0, true, {
  fileName: "app/components/users/Section.tsx",
  lineNumber: 25,
  columnNumber: 7
}, this);
_c3 = Section;
var Section_default = Section;
var _c3;
$RefreshReg$(_c3, "Section");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

export {
  CardRanking_default,
  Section_default
};
//# sourceMappingURL=/build/_shared/chunk-QSFHY6L7.js.map
