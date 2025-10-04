import {
  listBook_default
} from "/build/_shared/chunk-5ZEU5ODE.js";
import {
  CardCategory_default
} from "/build/_shared/chunk-LZUP5QEW.js";
import {
  Splide
} from "/build/_shared/chunk-ZHSF7LRE.js";
import {
  CardRanking_default,
  Section_default
} from "/build/_shared/chunk-PLZJO5GU.js";
import "/build/_shared/chunk-WZIYXJWE.js";
import "/build/_shared/chunk-X34T5PVR.js";
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

// app/components/users/Slider.tsx
var import_react = __toESM(require_react(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\users\\\\Slider.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\users\\Slider.tsx"
  );
  import.meta.hot.lastModified = "1759477940261.3716";
}
var Slider = () => {
  _s();
  const images = ["https://307a0e78.vws.vegacdn.vn/view/v2/image/img.banner_web_v2/0/0/0/4276.jpg?v=3&w=1920&h=600", "https://307a0e78.vws.vegacdn.vn/view/v2/image/img.banner_web_v2/0/0/0/4024.jpg?v=1&w=1920&h=600", "https://307a0e78.vws.vegacdn.vn/view/v2/image/img.banner_web_v2/0/0/0/4174.jpg?v=1&w=1920&h=600", "https://307a0e78.vws.vegacdn.vn/view/v2/image/img.banner_web_v2/0/0/0/4267.jpg?v=2&w=1920&h=600", "https://307a0e78.vws.vegacdn.vn/view/v2/image/img.banner_web_v2/0/0/0/4282.jpg?v=4&w=1920&h=600"];
  const imagesMobile = ["/Images/Slides/mobile/4321.png", "/Images/Slides/mobile/4024.png", "/Images/Slides/mobile/4174.png", "/Images/Slides/mobile/4276.png", "/Images/Slides/mobile/4282.png"];
  const [activeIndex, setActiveIndex] = (0, import_react.useState)(0);
  (0, import_react.useEffect)(() => {
    const splideDesktop = new Splide(".splide-desktop", {
      type: "loop",
      perPage: 1,
      autoplay: true,
      interval: 5e3,
      arrows: true,
      pagination: false
    }).mount();
    const splideMobile = new Splide(".splide-mobile", {
      type: "loop",
      perPage: 1,
      focus: "center",
      padding: {
        left: "20%",
        right: "20%"
      },
      gap: "1rem",
      arrows: false,
      pagination: false,
      autoplay: true,
      interval: 5e3
    });
    splideMobile.on("moved", (newIndex) => {
      setActiveIndex(newIndex);
    });
    splideMobile.mount();
    return () => {
      splideDesktop.destroy();
      splideMobile.destroy();
    };
  }, []);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "splide splide-desktop hidden lg:block relative rounded-lg overflow-hidden", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "splide__track", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", { className: "splide__list", children: images.map((img, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { className: "splide__slide", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: img, alt: "Slide", className: "w-full min-h-[30rem] object-cover rounded-lg" }, void 0, false, {
      fileName: "app/components/users/Slider.tsx",
      lineNumber: 67,
      columnNumber: 17
    }, this) }, index, false, {
      fileName: "app/components/users/Slider.tsx",
      lineNumber: 66,
      columnNumber: 41
    }, this)) }, void 0, false, {
      fileName: "app/components/users/Slider.tsx",
      lineNumber: 65,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/components/users/Slider.tsx",
      lineNumber: 64,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/components/users/Slider.tsx",
      lineNumber: 63,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "pt-[5rem] pb-[2rem] lg:!hidden block min-h-[20rem] relative overflow-hidden", style: {
      backgroundImage: `url(${images[activeIndex]})`,
      backgroundSize: "cover",
      backgroundPosition: "center"
    }, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute inset-0 bg-gradient-to-b from-black/60 to-transparent" }, void 0, false, {
        fileName: "app/components/users/Slider.tsx",
        lineNumber: 79,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "splide splide-mobile relative z-10", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "splide__track", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", { className: "splide__list", children: imagesMobile.map((mobile, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { className: "splide__slide", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: mobile, alt: `Slide ${index}`, className: "rounded-xl shadow-lg h-full w-full object-cover" }, void 0, false, {
        fileName: "app/components/users/Slider.tsx",
        lineNumber: 84,
        columnNumber: 19
      }, this) }, index, false, {
        fileName: "app/components/users/Slider.tsx",
        lineNumber: 83,
        columnNumber: 52
      }, this)) }, void 0, false, {
        fileName: "app/components/users/Slider.tsx",
        lineNumber: 82,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/components/users/Slider.tsx",
        lineNumber: 81,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/components/users/Slider.tsx",
        lineNumber: 80,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/users/Slider.tsx",
      lineNumber: 74,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/users/Slider.tsx",
    lineNumber: 61,
    columnNumber: 10
  }, this);
};
_s(Slider, "16En7kR7TbAJMjBrm+xutVNIc5Q=");
_c = Slider;
var Slider_default = Slider;
var _c;
$RefreshReg$(_c, "Slider");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/routes/_user._index.tsx
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\_user._index.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\_user._index.tsx"
  );
  import.meta.hot.lastModified = "1759500630762.276";
}
function meta({}) {
  return [{
    title: "New React Router App"
  }, {
    name: "description",
    content: "Welcome to React Router!"
  }];
}
var HomePage = () => {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("main", { className: "relative !w-full", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Slider_default, {}, void 0, false, {
      fileName: "app/routes/_user._index.tsx",
      lineNumber: 37,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "md:container !mx-auto py-5", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "!mx-auto py-5", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("h1", { className: "font-bold text-2xl", children: "B\u1EA3ng x\u1EBFp h\u1EA1ng" }, void 0, false, {
          fileName: "app/routes/_user._index.tsx",
          lineNumber: 41,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "flex flex-row overflow-x-auto scrollbar-hide w-full gap-10 p-5", children: listBook_default.map((book, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(CardRanking_default, { number: 1, cover: book.cover, title: book.title, author: book?.author || "", status: book?.status, description: book.description, slug: book.slug }, i, false, {
          fileName: "app/routes/_user._index.tsx",
          lineNumber: 43,
          columnNumber: 37
        }, this)) }, void 0, false, {
          fileName: "app/routes/_user._index.tsx",
          lineNumber: 42,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_user._index.tsx",
        lineNumber: 40,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Section_default, { title: "M\u1EDBi nh\u1EA5t", books: listBook_default }, void 0, false, {
        fileName: "app/routes/_user._index.tsx",
        lineNumber: 47,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Section_default, { title: "Thi\u1EC1n \u0110\u1ECBnh - T\xECm B\xECnh An trong T\xE2m H\u1ED3n", books: listBook_default }, void 0, false, {
        fileName: "app/routes/_user._index.tsx",
        lineNumber: 48,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Section_default, { title: "K\u1EF9 n\u0103ng v\u01B0\u1EE3t qua m\xF9a kh\xF3 kh\u0103n", books: listBook_default }, void 0, false, {
        fileName: "app/routes/_user._index.tsx",
        lineNumber: 49,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Section_default, { title: "T\u1EF1 truy\u1EC7n v\xE0 H\u1ED3i k\xFD", books: listBook_default }, void 0, false, {
        fileName: "app/routes/_user._index.tsx",
        lineNumber: 50,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Section_default, { title: "Trinh th\xE1m - Kinh d\u1ECB", books: listBook_default }, void 0, false, {
        fileName: "app/routes/_user._index.tsx",
        lineNumber: 51,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "!mx-auto grid md:grid-cols-4 grid-cols-2 gap-5 py-2", children: listBook_default.slice(0, 8).map((book, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(CardCategory_default, { cover: book.cover, title: book.title, author: book.author, link: book.slug, description: book.description || "" }, i, false, {
        fileName: "app/routes/_user._index.tsx",
        lineNumber: 54,
        columnNumber: 47
      }, this)) }, void 0, false, {
        fileName: "app/routes/_user._index.tsx",
        lineNumber: 53,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_user._index.tsx",
      lineNumber: 39,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/_user._index.tsx",
    lineNumber: 36,
    columnNumber: 10
  }, this);
};
_c2 = HomePage;
var user_index_default = HomePage;
var _c2;
$RefreshReg$(_c2, "HomePage");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  user_index_default as default,
  meta
};
//# sourceMappingURL=/build/routes/_user._index-TQWPQQIS.js.map
