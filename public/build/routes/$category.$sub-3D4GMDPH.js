import {
  BookSlider
} from "/build/_shared/chunk-VY5B2CZK.js";
import {
  categories_default
} from "/build/_shared/chunk-665M7QN7.js";
import {
  useParams
} from "/build/_shared/chunk-ACJCLCRR.js";
import "/build/_shared/chunk-U4FRFQSK.js";
import "/build/_shared/chunk-ZHSF7LRE.js";
import {
  CardRanking_default,
  Section_default
} from "/build/_shared/chunk-QSFHY6L7.js";
import {
  Button
} from "/build/_shared/chunk-SU4K6EH6.js";
import {
  faBook
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

// app/routes/$category.$sub.tsx
var import_react2 = __toESM(require_react());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\$category.$sub.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\$category.$sub.tsx"
  );
  import.meta.hot.lastModified = "1759482759580.434";
}
function SubCategoryPage() {
  _s();
  const {
    category,
    sub
  } = useParams();
  const currentCategory = categories_default.find((cat) => cat.slug === category);
  if (!currentCategory) {
    return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "p-5 text-white", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "text-2xl font-bold", children: "Kh\xF4ng t\xECm th\u1EA5y danh m\u1EE5c!" }, void 0, false, {
      fileName: "app/routes/$category.$sub.tsx",
      lineNumber: 41,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/$category.$sub.tsx",
      lineNumber: 40,
      columnNumber: 12
    }, this);
  }
  const [projects, setProjects] = (0, import_react2.useState)([]);
  const [currentIndex, setCurrentIndex] = (0, import_react2.useState)(0);
  const currentBook = projects[currentIndex];
  const dataRandom = () => {
    fetch("/data/listBook.json").then((res) => res.json()).then((data) => {
      const shuffled = [...data].sort(() => 0.5 - Math.random());
      setProjects(shuffled.slice(0, 5));
    }).catch((err) => console.error(err));
  };
  (0, import_react2.useEffect)(() => {
    dataRandom();
  }, []);
  const [categores, setCaregory] = (0, import_react2.useState)([]);
  const fetchProjects = () => {
    fetch("/data/listBook.json").then((res) => res.json()).then((data) => {
      setCaregory(data);
    }).catch((err) => console.error(err));
  };
  (0, import_react2.useEffect)(() => {
    fetchProjects();
  }, []);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-sec1 h-full !mx-auto py-[7rem] text-white", style: {
      backgroundImage: currentBook ? `url(${currentBook?.cover})` : void 0,
      backgroundColor: "rgba(0,0,0,0.6)",
      backgroundBlendMode: "darken"
    }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "container !mx-auto flex  items-center justify-center w-full", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "basis-3/5 flex flex-col gap-3", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: " flex items-center gap-5 pr-5", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "subCategory", className: "block text-2xl text-gray-500 mb-2 font-semibold", children: currentCategory.name }, void 0, false, {
            fileName: "app/routes/$category.$sub.tsx",
            lineNumber: 78,
            columnNumber: 15
          }, this),
          currentCategory.subCategories ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: " text-white", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { id: "subCategory", className: "px-5 py-3 bg-white/20 backdrop-blur-md border border-white/30 \r\n                  rounded-md text-white focus:outline-none focus:ring-1 focus:ring-emerald-700", defaultValue: "", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "", children: "T\u1EA5t c\u1EA3 danh m\u1EE5c" }, void 0, false, {
              fileName: "app/routes/$category.$sub.tsx",
              lineNumber: 84,
              columnNumber: 21
            }, this),
            currentCategory.subCategories.map((sub2) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: sub2.slug, className: "bg-black/80 p-5 text-white", children: sub2.name }, sub2.slug, false, {
              fileName: "app/routes/$category.$sub.tsx",
              lineNumber: 85,
              columnNumber: 63
            }, this))
          ] }, void 0, true, {
            fileName: "app/routes/$category.$sub.tsx",
            lineNumber: 82,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "app/routes/$category.$sub.tsx",
            lineNumber: 81,
            columnNumber: 48
          }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "italic text-gray-400" }, void 0, false, {
            fileName: "app/routes/$category.$sub.tsx",
            lineNumber: 90,
            columnNumber: 26
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/$category.$sub.tsx",
          lineNumber: 77,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "!font-bold", children: "Kh\xE1m ph\xE1 th\u1EBF gi\u1EDBi s\xE1ch Waka v\u1EDBi h\u01A1n 3500+ S\xE1ch \u0111i\u1EC7n t\u1EED, S\xE1ch n\xF3i v\xE0 Truy\u1EC7n tranh" }, void 0, false, {
          fileName: "app/routes/$category.$sub.tsx",
          lineNumber: 92,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-col gap-5", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "  bg-white/20 p-2 !font-bold w-max rounded-lg rounded-bl-none", children: "SMARTBOOK \u0110\u1EC0 XU\u1EA4T" }, void 0, false, {
            fileName: "app/routes/$category.$sub.tsx",
            lineNumber: 95,
            columnNumber: 15
          }, this),
          currentBook && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-3", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "text-3xl font-bold", children: currentBook?.title }, void 0, false, {
              fileName: "app/routes/$category.$sub.tsx",
              lineNumber: 99,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-gray-300 line-clamp-5 w-[80%]", children: currentBook?.description }, void 0, false, {
              fileName: "app/routes/$category.$sub.tsx",
              lineNumber: 100,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { text: "\u0110\u1ECDc s\xE1ch", icon: faBook, href: currentBook?.link, iconPosition: "left" }, void 0, false, {
              fileName: "app/routes/$category.$sub.tsx",
              lineNumber: 102,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/$category.$sub.tsx",
            lineNumber: 98,
            columnNumber: 31
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/$category.$sub.tsx",
          lineNumber: 94,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/$category.$sub.tsx",
        lineNumber: 76,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "basis-2/5 ", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BookSlider, { projects, onSlideChange: setCurrentIndex }, void 0, false, {
        fileName: "app/routes/$category.$sub.tsx",
        lineNumber: 107,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/$category.$sub.tsx",
        lineNumber: 106,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/$category.$sub.tsx",
      lineNumber: 75,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/$category.$sub.tsx",
      lineNumber: 70,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", { className: "container !mx-auto", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Section_default, { title: "M\u1EDBi nh\u1EA5t", books: categores }, void 0, false, {
        fileName: "app/routes/$category.$sub.tsx",
        lineNumber: 114,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "text-xl !font-bold", children: "T\u1EA5t c\u1EA3 c\xE1c s\xE1ch" }, void 0, false, {
          fileName: "app/routes/$category.$sub.tsx",
          lineNumber: 117,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-wrap w-full gap-5 p-5", children: categores.map((book, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardRanking_default, { cover: book.cover, title: book.title, author: book.author, status: book.status, description: book.description, link: book.link }, i, false, {
          fileName: "app/routes/$category.$sub.tsx",
          lineNumber: 120,
          columnNumber: 41
        }, this)) }, void 0, false, {
          fileName: "app/routes/$category.$sub.tsx",
          lineNumber: 119,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/$category.$sub.tsx",
        lineNumber: 116,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/$category.$sub.tsx",
      lineNumber: 113,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/$category.$sub.tsx",
    lineNumber: 69,
    columnNumber: 10
  }, this);
}
_s(SubCategoryPage, "EP+HuvXuUoXXuNRr+t7ZsPfriIU=", false, function() {
  return [useParams];
});
_c = SubCategoryPage;
var _c;
$RefreshReg$(_c, "SubCategoryPage");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  SubCategoryPage as default
};
//# sourceMappingURL=/build/routes/$category.$sub-3D4GMDPH.js.map
