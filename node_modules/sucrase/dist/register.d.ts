import { Options } from "./index";
export interface HookOptions {
    matcher?: (code: string) => boolean;
    ignoreNodeModules?: boolean;
}
export declare function addHook(extension: string, options: Options, hookOptions?: HookOptions): void;
export declare function registerJS(hookOptions?: HookOptions): void;
export declare function registerJSX(hookOptions?: HookOptions): void;
export declare function registerTS(hookOptions?: HookOptions): void;
export declare function registerTSX(hookOptions?: HookOptions): void;
export declare function registerTSLegacyModuleInterop(hookOptions?: HookOptions): void;
export declare function registerTSXLegacyModuleInterop(hookOptions?: HookOptions): void;
export declare function registerAll(hookOptions?: HookOptions): void;
