import * as pirates from "pirates";

import { transform} from "./index";






export function addHook(extension, options, hookOptions) {
  pirates.addHook(
    (code, filePath) => {
      const {code: transformedCode, sourceMap} = transform(code, {
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
}

export function registerJS(hookOptions) {
  addHook(".js", {transforms: ["imports", "flow", "jsx"]}, hookOptions);
}

export function registerJSX(hookOptions) {
  addHook(".jsx", {transforms: ["imports", "flow", "jsx"]}, hookOptions);
}

export function registerTS(hookOptions) {
  addHook(".ts", {transforms: ["imports", "typescript"]}, hookOptions);
}

export function registerTSX(hookOptions) {
  addHook(".tsx", {transforms: ["imports", "typescript", "jsx"]}, hookOptions);
}

export function registerTSLegacyModuleInterop(hookOptions) {
  addHook(
    ".ts",
    {
      transforms: ["imports", "typescript"],
      enableLegacyTypeScriptModuleInterop: true,
    },
    hookOptions,
  );
}

export function registerTSXLegacyModuleInterop(hookOptions) {
  addHook(
    ".tsx",
    {
      transforms: ["imports", "typescript", "jsx"],
      enableLegacyTypeScriptModuleInterop: true,
    },
    hookOptions,
  );
}

export function registerAll(hookOptions) {
  registerJS(hookOptions);
  registerJSX(hookOptions);
  registerTS(hookOptions);
  registerTSX(hookOptions);
}
