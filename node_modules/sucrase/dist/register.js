"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } }var _pirates = require('pirates'); var pirates = _interopRequireWildcard(_pirates);

var _index = require('./index');






 function addHook(extension, options, hookOptions) {
  pirates.addHook(
    (code, filePath) => {
      const {code: transformedCode, sourceMap} = _index.transform.call(void 0, code, {
        ...options,
        sourceMapOptions: {compiledFilename: filePath},
        filePath,
      });
      const mapBase64 = Buffer.from(JSON.stringify(sourceMap)).toString("base64");
      const suffix = `//# sourceMappingURL=data:application/json;charset=utf-8;base64,${mapBase64}`;
      return `${transformedCode}\n${suffix}`;
    },
    {...hookOptions, exts: [extension]},
  );
} exports.addHook = addHook;

 function registerJS(hookOptions) {
  addHook(".js", {transforms: ["imports", "flow", "jsx"]}, hookOptions);
} exports.registerJS = registerJS;

 function registerJSX(hookOptions) {
  addHook(".jsx", {transforms: ["imports", "flow", "jsx"]}, hookOptions);
} exports.registerJSX = registerJSX;

 function registerTS(hookOptions) {
  addHook(".ts", {transforms: ["imports", "typescript"]}, hookOptions);
} exports.registerTS = registerTS;

 function registerTSX(hookOptions) {
  addHook(".tsx", {transforms: ["imports", "typescript", "jsx"]}, hookOptions);
} exports.registerTSX = registerTSX;

 function registerTSLegacyModuleInterop(hookOptions) {
  addHook(
    ".ts",
    {
      transforms: ["imports", "typescript"],
      enableLegacyTypeScriptModuleInterop: true,
    },
    hookOptions,
  );
} exports.registerTSLegacyModuleInterop = registerTSLegacyModuleInterop;

 function registerTSXLegacyModuleInterop(hookOptions) {
  addHook(
    ".tsx",
    {
      transforms: ["imports", "typescript", "jsx"],
      enableLegacyTypeScriptModuleInterop: true,
    },
    hookOptions,
  );
} exports.registerTSXLegacyModuleInterop = registerTSXLegacyModuleInterop;

 function registerAll(hookOptions) {
  registerJS(hookOptions);
  registerJSX(hookOptions);
  registerTS(hookOptions);
  registerTSX(hookOptions);
} exports.registerAll = registerAll;
