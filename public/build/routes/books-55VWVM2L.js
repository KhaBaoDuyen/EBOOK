import {
  useLoaderData
} from "/build/_shared/chunk-ACJCLCRR.js";
import "/build/_shared/chunk-U4FRFQSK.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XGOTYLZ5.js";
import "/build/_shared/chunk-7M6SC7J5.js";
import {
  createHotContext
} from "/build/_shared/chunk-HXQWXVBT.js";
import "/build/_shared/chunk-UWV35TSL.js";
import {
  __commonJS,
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// empty-module:~/utils/db.server
var require_db = __commonJS({
  "empty-module:~/utils/db.server"(exports, module) {
    module.exports = {};
  }
});

// empty-module:~/models/book.server
var require_book = __commonJS({
  "empty-module:~/models/book.server"(exports, module) {
    module.exports = {};
  }
});

// app/routes/books.tsx
var import_db = __toESM(require_db());
var import_book = __toESM(require_book());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\books.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\books.tsx"
  );
  import.meta.hot.lastModified = "1759476370758.084";
}
function BooksPage() {
  _s();
  const books = useLoaderData();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "p-5", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "text-2xl font-bold", children: "Danh s\xE1ch s\xE1ch" }, void 0, false, {
      fileName: "app/routes/books.tsx",
      lineNumber: 40,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", { className: "mt-4", children: books.map((book) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: [
      book.title,
      " - ",
      book.author
    ] }, book._id, true, {
      fileName: "app/routes/books.tsx",
      lineNumber: 42,
      columnNumber: 28
    }, this)) }, void 0, false, {
      fileName: "app/routes/books.tsx",
      lineNumber: 41,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/books.tsx",
    lineNumber: 39,
    columnNumber: 10
  }, this);
}
_s(BooksPage, "3CwlB0zIDPeezP+hJbuIf8psgu4=", false, function() {
  return [useLoaderData];
});
_c = BooksPage;
var _c;
$RefreshReg$(_c, "BooksPage");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  BooksPage as default
};
//# sourceMappingURL=/build/routes/books-55VWVM2L.js.map
