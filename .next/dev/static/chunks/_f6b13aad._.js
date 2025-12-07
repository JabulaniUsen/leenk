(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", {
    variants: {
        variant: {
            default: 'bg-primary text-primary-foreground hover:bg-primary/90',
            destructive: 'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
            outline: 'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
            secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
            ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
            link: 'text-primary underline-offset-4 hover:underline'
        },
        size: {
            default: 'h-9 px-4 py-2 has-[>svg]:px-3',
            sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
            lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
            icon: 'size-9',
            'icon-sm': 'size-8',
            'icon-lg': 'size-10'
        }
    },
    defaultVariants: {
        variant: 'default',
        size: 'default'
    }
});
function Button({ className, variant, size, asChild = false, ...props }) {
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slot"] : 'button';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        "data-slot": "button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/button.tsx",
        lineNumber: 52,
        columnNumber: 5
    }, this);
}
_c = Button;
;
var _c;
__turbopack_context__.k.register(_c, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/image-viewer-modal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ImageViewerModal",
    ()=>ImageViewerModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function ImageViewerModal({ imageUrl, onClose, alt = "Chat image" }) {
    _s();
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ImageViewerModal.useEffect": ()=>{
            setMounted(true);
            return ({
                "ImageViewerModal.useEffect": ()=>setMounted(false)
            })["ImageViewerModal.useEffect"];
        }
    }["ImageViewerModal.useEffect"], []);
    if (!imageUrl || !mounted) return null;
    const handleDownload = ()=>{
        const link = document.createElement("a");
        link.href = imageUrl;
        link.download = `image-${Date.now()}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    const modalContent = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: {
                opacity: 0
            },
            animate: {
                opacity: 1
            },
            exit: {
                opacity: 0
            },
            className: "fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm",
            onClick: onClose,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: (e)=>{
                        e.stopPropagation();
                        onClose();
                    },
                    className: "absolute top-4 right-4 z-[10000] p-3 bg-black/70 hover:bg-black/90 rounded-full transition-colors shadow-lg",
                    "aria-label": "Close viewer",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                        className: "w-6 h-6 text-white"
                    }, void 0, false, {
                        fileName: "[project]/components/image-viewer-modal.tsx",
                        lineNumber: 54,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/image-viewer-modal.tsx",
                    lineNumber: 46,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: (e)=>{
                        e.stopPropagation();
                        handleDownload();
                    },
                    className: "absolute top-4 left-4 z-[10000] p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors",
                    "aria-label": "Download image",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                        className: "w-6 h-6 text-white"
                    }, void 0, false, {
                        fileName: "[project]/components/image-viewer-modal.tsx",
                        lineNumber: 66,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/image-viewer-modal.tsx",
                    lineNumber: 58,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        scale: 0.9,
                        opacity: 0
                    },
                    animate: {
                        scale: 1,
                        opacity: 1
                    },
                    exit: {
                        scale: 0.9,
                        opacity: 0
                    },
                    onClick: (e)=>e.stopPropagation(),
                    className: "relative max-w-[90vw] max-h-[90vh] w-full h-full flex items-center justify-center p-4",
                    children: [
                        isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 flex items-center justify-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"
                            }, void 0, false, {
                                fileName: "[project]/components/image-viewer-modal.tsx",
                                lineNumber: 79,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/image-viewer-modal.tsx",
                            lineNumber: 78,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            src: imageUrl,
                            alt: alt,
                            fill: true,
                            className: "object-contain",
                            priority: true,
                            onLoad: ()=>setIsLoading(false),
                            onError: ()=>setIsLoading(false)
                        }, void 0, false, {
                            fileName: "[project]/components/image-viewer-modal.tsx",
                            lineNumber: 82,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/image-viewer-modal.tsx",
                    lineNumber: 70,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/image-viewer-modal.tsx",
            lineNumber: 38,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/image-viewer-modal.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPortal"])(modalContent, document.body);
}
_s(ImageViewerModal, "zykIExFIH93FoOIrLqh+jlJWHi8=");
_c = ImageViewerModal;
var _c;
__turbopack_context__.k.register(_c, "ImageViewerModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/chat-bubble.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChatBubble",
    ()=>ChatBubble
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-motion-value.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-transform.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CircleCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$reply$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Reply$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/reply.js [app-client] (ecmascript) <export default as Reply>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$image$2d$viewer$2d$modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/image-viewer-modal.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function ChatBubble({ message, isOwn, index, onReply }) {
    _s();
    const [isImageViewerOpen, setIsImageViewerOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const x = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"])(0);
    // Make reply indicator appear with just a slight swipe (15px)
    const opacity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(x, [
        -15,
        0
    ], [
        1,
        0
    ]);
    const scale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(x, [
        -15,
        0
    ], [
        1,
        0.8
    ]);
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const handleDragEnd = (_event, info)=>{
        // Trigger reply with just a slight swipe (15px instead of 50px)
        if (info.offset.x < -15 && onReply) {
            onReply(message);
        }
        x.set(0);
    };
    const getStatusIndicator = ()=>{
        if (!isOwn) return null;
        switch(message.status){
            case "sent":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleCheck$3e$__["CircleCheck"], {
                    className: "w-3 h-3 opacity-70"
                }, void 0, false, {
                    fileName: "[project]/components/chat-bubble.tsx",
                    lineNumber: 38,
                    columnNumber: 16
                }, this);
            case "delivered":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                    className: "w-3.5 h-3.5 opacity-70"
                }, void 0, false, {
                    fileName: "[project]/components/chat-bubble.tsx",
                    lineNumber: 40,
                    columnNumber: 16
                }, this);
            case "read":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-xs opacity-70 text-primary",
                    children: "Seen"
                }, void 0, false, {
                    fileName: "[project]/components/chat-bubble.tsx",
                    lineNumber: 42,
                    columnNumber: 16
                }, this);
            default:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleCheck$3e$__["CircleCheck"], {
                    className: "w-3 h-3 opacity-70"
                }, void 0, false, {
                    fileName: "[project]/components/chat-bubble.tsx",
                    lineNumber: 44,
                    columnNumber: 16
                }, this);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        ref: containerRef,
        initial: {
            opacity: 0,
            y: 10
        },
        animate: {
            opacity: 1,
            y: 0
        },
        transition: {
            delay: index * 0.05
        },
        className: `flex ${isOwn ? "justify-end" : "justify-start"} mb-3 relative`,
        children: [
            !isOwn && onReply && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                style: {
                    opacity,
                    scale,
                    x
                },
                className: "absolute left-0 top-1/2 -translate-y-1/2 flex items-center gap-2 text-primary z-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$reply$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Reply$3e$__["Reply"], {
                        className: "w-5 h-5"
                    }, void 0, false, {
                        fileName: "[project]/components/chat-bubble.tsx",
                        lineNumber: 62,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm font-medium",
                        children: "Reply"
                    }, void 0, false, {
                        fileName: "[project]/components/chat-bubble.tsx",
                        lineNumber: 63,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/chat-bubble.tsx",
                lineNumber: 58,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                drag: !isOwn && onReply ? "x" : false,
                dragConstraints: {
                    left: -30,
                    right: 0
                },
                dragElastic: 0,
                dragMomentum: false,
                onDragEnd: handleDragEnd,
                style: {
                    x
                },
                className: `max-w-[80%] md:max-w-md lg:max-w-lg px-3 md:px-4 py-2 rounded-lg cursor-pointer ${isOwn ? "bg-[var(--chat-sent)] text-[var(--chat-sent-text)] rounded-br-none ml-auto dark:bg-[var(--chat-sent)] dark:text-[var(--chat-sent-text)]" : "bg-[var(--chat-received)] text-[var(--chat-received-text)] rounded-bl-none dark:bg-[var(--chat-received)] dark:text-[var(--chat-received-text)]"}`,
                onClick: ()=>!isOwn && onReply && onReply(message),
                children: [
                    message.replyTo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `mb-2 pl-3 border-l-2 ${isOwn ? "border-[var(--chat-sent-text)]/30" : "border-[var(--chat-received-text)]/30"}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs opacity-70 mb-1",
                                children: message.replyTo.senderType === "business" ? "Business" : "You"
                            }, void 0, false, {
                                fileName: "[project]/components/chat-bubble.tsx",
                                lineNumber: 88,
                                columnNumber: 13
                            }, this),
                            message.replyTo.text && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs truncate opacity-80",
                                children: message.replyTo.text
                            }, void 0, false, {
                                fileName: "[project]/components/chat-bubble.tsx",
                                lineNumber: 92,
                                columnNumber: 15
                            }, this),
                            message.replyTo.imageUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs opacity-80",
                                children: "📷 Image"
                            }, void 0, false, {
                                fileName: "[project]/components/chat-bubble.tsx",
                                lineNumber: 95,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/chat-bubble.tsx",
                        lineNumber: 83,
                        columnNumber: 11
                    }, this),
                    message.text && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm md:text-base break-words",
                        children: message.text
                    }, void 0, false, {
                        fileName: "[project]/components/chat-bubble.tsx",
                        lineNumber: 100,
                        columnNumber: 26
                    }, this),
                    message.imageUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative w-48 h-48 rounded-lg overflow-hidden mb-2 cursor-pointer hover:opacity-90 transition-opacity",
                        onClick: ()=>setIsImageViewerOpen(true),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            src: message.imageUrl || "/placeholder.svg",
                            alt: "Chat image",
                            fill: true,
                            className: "object-cover",
                            priority: index < 3
                        }, void 0, false, {
                            fileName: "[project]/components/chat-bubble.tsx",
                            lineNumber: 106,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/chat-bubble.tsx",
                        lineNumber: 102,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-1.5 mt-1 justify-end",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: `text-xs opacity-70`,
                                children: (()=>{
                                    const messageDate = new Date(message.createdAt);
                                    const today = new Date();
                                    const isToday = messageDate.getDate() === today.getDate() && messageDate.getMonth() === today.getMonth() && messageDate.getFullYear() === today.getFullYear();
                                    if (isToday) {
                                        // Show only time if message is from today
                                        return messageDate.toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit"
                                        });
                                    } else {
                                        // Show date and time if message is from a different day
                                        return messageDate.toLocaleString([], {
                                            month: "short",
                                            day: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit"
                                        });
                                    }
                                })()
                            }, void 0, false, {
                                fileName: "[project]/components/chat-bubble.tsx",
                                lineNumber: 116,
                                columnNumber: 11
                            }, this),
                            getStatusIndicator()
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/chat-bubble.tsx",
                        lineNumber: 115,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/chat-bubble.tsx",
                lineNumber: 67,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$image$2d$viewer$2d$modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImageViewerModal"], {
                imageUrl: isImageViewerOpen ? message.imageUrl || null : null,
                onClose: ()=>setIsImageViewerOpen(false),
                alt: `Image from ${isOwn ? "you" : "chat"}`
            }, void 0, false, {
                fileName: "[project]/components/chat-bubble.tsx",
                lineNumber: 147,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/chat-bubble.tsx",
        lineNumber: 49,
        columnNumber: 5
    }, this);
}
_s(ChatBubble, "powJA3RSbNh154qOD/nsaENGYaU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"]
    ];
});
_c = ChatBubble;
var _c;
__turbopack_context__.k.register(_c, "ChatBubble");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/image-annotation.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ImageAnnotation",
    ()=>ImageAnnotation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$undo$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Undo2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/undo-2.js [app-client] (ecmascript) <export default as Undo2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$redo$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Redo2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/redo-2.js [app-client] (ecmascript) <export default as Redo2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
// Limited to 4 colors
const PRESET_COLORS = [
    "#000000",
    "#FF0000",
    "#0000FF",
    "#FFFFFF"
];
function ImageAnnotation({ imageUrl, onImageUpdate, onClose }) {
    _s();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const imageRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [isDrawing, setIsDrawing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [lineWidth, setLineWidth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(3);
    const [color, setColor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("#000000");
    const [history, setHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [historyIndex, setHistoryIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(-1);
    // Save state to history
    const saveToHistory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ImageAnnotation.useCallback[saveToHistory]": ()=>{
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            // Use functional updates to ensure we have the latest state
            setHistoryIndex({
                "ImageAnnotation.useCallback[saveToHistory]": (prevIndex)=>{
                    setHistory({
                        "ImageAnnotation.useCallback[saveToHistory]": (prevHistory)=>{
                            // Remove any future history if we're not at the end
                            const newHistory = prevHistory.slice(0, prevIndex + 1);
                            newHistory.push(imageData);
                            // Limit history to 50 states
                            if (newHistory.length > 50) {
                                newHistory.shift();
                                // If we removed the first item, adjust index
                                return newHistory;
                            }
                            return newHistory;
                        }
                    }["ImageAnnotation.useCallback[saveToHistory]"]);
                    // Return the new index
                    return prevIndex + 1;
                }
            }["ImageAnnotation.useCallback[saveToHistory]"]);
        }
    }["ImageAnnotation.useCallback[saveToHistory]"], []);
    // Load image and setup canvas
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ImageAnnotation.useEffect": ()=>{
            const canvas = canvasRef.current;
            if (!canvas) return;
            // Get the preview image container to match its size
            const previewContainer = document.getElementById("preview-image-container");
            if (!previewContainer) return;
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.onload = ({
                "ImageAnnotation.useEffect": ()=>{
                    imageRef.current = img;
                    const ctx = canvas.getContext("2d");
                    if (!ctx) return;
                    // Get the actual displayed size of the preview image
                    const containerRect = previewContainer.getBoundingClientRect();
                    const containerWidth = containerRect.width;
                    const containerHeight = containerRect.height;
                    // Calculate the aspect ratio of the image
                    const imageAspect = img.width / img.height;
                    const containerAspect = containerWidth / containerHeight;
                    // Calculate display size to match the preview (object-contain behavior)
                    let displayWidth;
                    let displayHeight;
                    if (imageAspect > containerAspect) {
                        // Image is wider - fit to width
                        displayWidth = containerWidth;
                        displayHeight = containerWidth / imageAspect;
                    } else {
                        // Image is taller - fit to height
                        displayHeight = containerHeight;
                        displayWidth = containerHeight * imageAspect;
                    }
                    // Set canvas display size (CSS) to match preview
                    canvas.style.width = `${displayWidth}px`;
                    canvas.style.height = `${displayHeight}px`;
                    // Set canvas internal size to match display size (for drawing)
                    canvas.width = displayWidth;
                    canvas.height = displayHeight;
                    // Draw image scaled to display size
                    ctx.drawImage(img, 0, 0, displayWidth, displayHeight);
                    // Save initial state to history
                    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    setHistory([
                        imageData
                    ]);
                    setHistoryIndex(0);
                }
            })["ImageAnnotation.useEffect"];
            img.src = imageUrl;
        }
    }["ImageAnnotation.useEffect"], [
        imageUrl
    ]);
    const getCoordinates = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ImageAnnotation.useCallback[getCoordinates]": (e)=>{
            const canvas = canvasRef.current;
            if (!canvas) return {
                x: 0,
                y: 0
            };
            const rect = canvas.getBoundingClientRect();
            // Canvas internal size matches display size, so coordinates are direct
            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;
            if ("touches" in e) {
                return {
                    x: (e.touches[0].clientX - rect.left) * scaleX,
                    y: (e.touches[0].clientY - rect.top) * scaleY
                };
            } else {
                return {
                    x: (e.clientX - rect.left) * scaleX,
                    y: (e.clientY - rect.top) * scaleY
                };
            }
        }
    }["ImageAnnotation.useCallback[getCoordinates]"], []);
    const startDrawing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ImageAnnotation.useCallback[startDrawing]": (e)=>{
            e.preventDefault();
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;
            // Save state BEFORE starting to draw (so undo goes back to before this stroke)
            if (!isDrawing) {
                saveToHistory();
            }
            setIsDrawing(true);
            const { x, y } = getCoordinates(e);
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.strokeStyle = color;
            ctx.lineWidth = lineWidth;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
        }
    }["ImageAnnotation.useCallback[startDrawing]"], [
        color,
        lineWidth,
        getCoordinates,
        isDrawing,
        saveToHistory
    ]);
    const draw = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ImageAnnotation.useCallback[draw]": (e)=>{
            if (!isDrawing) return;
            e.preventDefault();
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;
            const { x, y } = getCoordinates(e);
            ctx.globalCompositeOperation = "source-over";
            ctx.strokeStyle = color;
            ctx.lineTo(x, y);
            ctx.stroke();
        }
    }["ImageAnnotation.useCallback[draw]"], [
        isDrawing,
        color,
        getCoordinates
    ]);
    const stopDrawing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ImageAnnotation.useCallback[stopDrawing]": ()=>{
            setIsDrawing(false);
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;
            ctx.globalCompositeOperation = "source-over";
        // Don't save here - we already saved at the start of drawing
        }
    }["ImageAnnotation.useCallback[stopDrawing]"], []);
    const undo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ImageAnnotation.useCallback[undo]": ()=>{
            const canvas = canvasRef.current;
            if (!canvas) return;
            setHistory({
                "ImageAnnotation.useCallback[undo]": (prevHistory)=>{
                    setHistoryIndex({
                        "ImageAnnotation.useCallback[undo]": (prevIndex)=>{
                            if (prevIndex <= 0) return prevIndex;
                            const ctx = canvas.getContext("2d");
                            if (!ctx) return prevIndex;
                            const prevIndexValue = prevIndex - 1;
                            ctx.putImageData(prevHistory[prevIndexValue], 0, 0);
                            return prevIndexValue;
                        }
                    }["ImageAnnotation.useCallback[undo]"]);
                    return prevHistory;
                }
            }["ImageAnnotation.useCallback[undo]"]);
        }
    }["ImageAnnotation.useCallback[undo]"], []);
    const redo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ImageAnnotation.useCallback[redo]": ()=>{
            const canvas = canvasRef.current;
            if (!canvas) return;
            setHistory({
                "ImageAnnotation.useCallback[redo]": (prevHistory)=>{
                    setHistoryIndex({
                        "ImageAnnotation.useCallback[redo]": (prevIndex)=>{
                            if (prevIndex >= prevHistory.length - 1) return prevIndex;
                            const ctx = canvas.getContext("2d");
                            if (!ctx) return prevIndex;
                            const nextIndex = prevIndex + 1;
                            ctx.putImageData(prevHistory[nextIndex], 0, 0);
                            return nextIndex;
                        }
                    }["ImageAnnotation.useCallback[redo]"]);
                    return prevHistory;
                }
            }["ImageAnnotation.useCallback[redo]"]);
        }
    }["ImageAnnotation.useCallback[redo]"], []);
    const saveImage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ImageAnnotation.useCallback[saveImage]": ()=>{
            const canvas = canvasRef.current;
            if (!canvas || !imageRef.current) return;
            // Create a new canvas with the original image size for export
            const exportCanvas = document.createElement("canvas");
            exportCanvas.width = imageRef.current.width;
            exportCanvas.height = imageRef.current.height;
            const exportCtx = exportCanvas.getContext("2d");
            if (!exportCtx) return;
            // Draw the original image
            exportCtx.drawImage(imageRef.current, 0, 0);
            // Calculate scale to map from display canvas to original image
            const displayWidth = canvas.width;
            const displayHeight = canvas.height;
            const scaleX = imageRef.current.width / displayWidth;
            const scaleY = imageRef.current.height / displayHeight;
            // Draw the annotations scaled to original size
            exportCtx.save();
            exportCtx.scale(scaleX, scaleY);
            exportCtx.drawImage(canvas, 0, 0);
            exportCtx.restore();
            const dataUrl = exportCanvas.toDataURL("image/png");
            onImageUpdate(dataUrl);
            onClose();
        }
    }["ImageAnnotation.useCallback[saveImage]"], [
        onImageUpdate,
        onClose
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute inset-0 bg-black/90 flex flex-col z-[10001]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between p-3 bg-black/90 border-b border-white/10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: undo,
                                disabled: historyIndex <= 0,
                                className: "p-2 rounded-full hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors",
                                "aria-label": "Undo",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$undo$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Undo2$3e$__["Undo2"], {
                                    className: "w-5 h-5 text-white"
                                }, void 0, false, {
                                    fileName: "[project]/components/image-annotation.tsx",
                                    lineNumber: 278,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/image-annotation.tsx",
                                lineNumber: 272,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: redo,
                                disabled: historyIndex >= history.length - 1,
                                className: "p-2 rounded-full hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors",
                                "aria-label": "Redo",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$redo$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Redo2$3e$__["Redo2"], {
                                    className: "w-5 h-5 text-white"
                                }, void 0, false, {
                                    fileName: "[project]/components/image-annotation.tsx",
                                    lineNumber: 286,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/image-annotation.tsx",
                                lineNumber: 280,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 ml-2",
                                children: PRESET_COLORS.map((presetColor)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setColor(presetColor),
                                        className: `w-8 h-8 rounded-full border-2 transition-all ${color === presetColor ? "border-white scale-110 shadow-lg" : "border-white/30 hover:border-white/60"}`,
                                        style: {
                                            backgroundColor: presetColor,
                                            boxShadow: presetColor === "#FFFFFF" ? "inset 0 0 0 1px rgba(0,0,0,0.2)" : "none"
                                        },
                                        "aria-label": `Select ${presetColor} color`
                                    }, presetColor, false, {
                                        fileName: "[project]/components/image-annotation.tsx",
                                        lineNumber: 292,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/image-annotation.tsx",
                                lineNumber: 290,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/image-annotation.tsx",
                        lineNumber: 270,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "p-2 rounded-full hover:bg-white/10 transition-colors",
                            "aria-label": "Close",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "w-5 h-5 text-white"
                            }, void 0, false, {
                                fileName: "[project]/components/image-annotation.tsx",
                                lineNumber: 316,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/image-annotation.tsx",
                            lineNumber: 311,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/image-annotation.tsx",
                        lineNumber: 310,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/image-annotation.tsx",
                lineNumber: 269,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-center gap-3 p-2 bg-black/80 border-b border-white/10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs text-white/70",
                        children: "Size"
                    }, void 0, false, {
                        fileName: "[project]/components/image-annotation.tsx",
                        lineNumber: 324,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "range",
                        min: "1",
                        max: "10",
                        value: lineWidth,
                        onChange: (e)=>setLineWidth(Number(e.target.value)),
                        className: "flex-1 max-w-xs"
                    }, void 0, false, {
                        fileName: "[project]/components/image-annotation.tsx",
                        lineNumber: 325,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs text-white/70 w-6",
                        children: lineWidth
                    }, void 0, false, {
                        fileName: "[project]/components/image-annotation.tsx",
                        lineNumber: 333,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/image-annotation.tsx",
                lineNumber: 323,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex items-center justify-center overflow-hidden relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                        ref: canvasRef,
                        onMouseDown: startDrawing,
                        onMouseMove: draw,
                        onMouseUp: stopDrawing,
                        onMouseLeave: stopDrawing,
                        onTouchStart: startDrawing,
                        onTouchMove: draw,
                        onTouchEnd: stopDrawing,
                        className: "max-w-full max-h-full cursor-crosshair",
                        style: {
                            touchAction: "none"
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/image-annotation.tsx",
                        lineNumber: 338,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-4 left-1/2 -translate-x-1/2 z-10",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            onClick: saveImage,
                            className: "bg-primary hover:opacity-90 text-white font-semibold px-6 py-2.5 rounded-full shadow-lg",
                            children: "Done"
                        }, void 0, false, {
                            fileName: "[project]/components/image-annotation.tsx",
                            lineNumber: 353,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/image-annotation.tsx",
                        lineNumber: 352,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/image-annotation.tsx",
                lineNumber: 337,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/image-annotation.tsx",
        lineNumber: 267,
        columnNumber: 5
    }, this);
}
_s(ImageAnnotation, "5948QBWD3NfIEErVGjuK+oEKWpo=");
_c = ImageAnnotation;
var _c;
__turbopack_context__.k.register(_c, "ImageAnnotation");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/image-preview-modal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ImagePreviewModal",
    ()=>ImagePreviewModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/send.js [app-client] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-client] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pen$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pen.js [app-client] (ecmascript) <export default as Pen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$image$2d$annotation$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/image-annotation.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
function ImagePreviewModal({ imageUrl, onClose, onSend, onRemove, isSending = false }) {
    _s();
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showAnnotation, setShowAnnotation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [annotatedImageUrl, setAnnotatedImageUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ImagePreviewModal.useEffect": ()=>{
            setMounted(true);
            return ({
                "ImagePreviewModal.useEffect": ()=>setMounted(false)
            })["ImagePreviewModal.useEffect"];
        }
    }["ImagePreviewModal.useEffect"], []);
    // Reset annotated image when imageUrl changes (new image selected)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ImagePreviewModal.useEffect": ()=>{
            setAnnotatedImageUrl(null);
            setShowAnnotation(false);
            setIsLoading(true);
        }
    }["ImagePreviewModal.useEffect"], [
        imageUrl
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ImagePreviewModal.useEffect": ()=>{
            if (annotatedImageUrl) {
                // Update the image URL when annotation is done
                setShowAnnotation(false);
            }
        }
    }["ImagePreviewModal.useEffect"], [
        annotatedImageUrl
    ]);
    if (!imageUrl || !mounted) return null;
    const currentImageUrl = annotatedImageUrl || imageUrl;
    const modalContent = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: {
                opacity: 0
            },
            animate: {
                opacity: 1
            },
            exit: {
                opacity: 0
            },
            className: "fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm",
            onClick: onClose,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    scale: 0.9,
                    opacity: 0
                },
                animate: {
                    scale: 1,
                    opacity: 1
                },
                exit: {
                    scale: 0.9,
                    opacity: 0
                },
                onClick: (e)=>e.stopPropagation(),
                className: "relative max-w-[90vw] max-h-[90vh] w-full h-full flex items-center justify-center p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onClose,
                        className: "absolute top-4 right-4 z-[10000] p-3 bg-black/70 hover:bg-black/90 rounded-full transition-colors shadow-lg",
                        "aria-label": "Close preview",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                            className: "w-6 h-6 text-white"
                        }, void 0, false, {
                            fileName: "[project]/components/image-preview-modal.tsx",
                            lineNumber: 76,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/image-preview-modal.tsx",
                        lineNumber: 71,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative w-full h-full flex items-center justify-center",
                        id: "preview-image-container",
                        children: [
                            isLoading && !showAnnotation && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 flex items-center justify-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"
                                }, void 0, false, {
                                    fileName: "[project]/components/image-preview-modal.tsx",
                                    lineNumber: 83,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/image-preview-modal.tsx",
                                lineNumber: 82,
                                columnNumber: 15
                            }, this),
                            !showAnnotation && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                src: currentImageUrl,
                                alt: "Preview",
                                fill: true,
                                className: "object-contain",
                                priority: true,
                                onLoad: ()=>setIsLoading(false),
                                onError: ()=>setIsLoading(false)
                            }, void 0, false, {
                                fileName: "[project]/components/image-preview-modal.tsx",
                                lineNumber: 87,
                                columnNumber: 15
                            }, this),
                            showAnnotation && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$image$2d$annotation$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImageAnnotation"], {
                                imageUrl: imageUrl,
                                onImageUpdate: (annotatedUrl)=>{
                                    setAnnotatedImageUrl(annotatedUrl);
                                },
                                onClose: ()=>setShowAnnotation(false)
                            }, void 0, false, {
                                fileName: "[project]/components/image-preview-modal.tsx",
                                lineNumber: 100,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/image-preview-modal.tsx",
                        lineNumber: 80,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-[10000]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "outline",
                                onClick: ()=>{
                                    onRemove();
                                    onClose();
                                },
                                disabled: isSending || showAnnotation,
                                className: "bg-black/70 hover:bg-black/90 text-white border-white/20",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                                        className: "w-4 h-4 mr-2"
                                    }, void 0, false, {
                                        fileName: "[project]/components/image-preview-modal.tsx",
                                        lineNumber: 121,
                                        columnNumber: 15
                                    }, this),
                                    "Remove"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/image-preview-modal.tsx",
                                lineNumber: 112,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "outline",
                                onClick: ()=>setShowAnnotation(true),
                                disabled: isSending || showAnnotation,
                                className: "bg-black/70 hover:bg-black/90 text-white border-white/20",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pen$3e$__["Pen"], {
                                        className: "w-4 h-4 mr-2"
                                    }, void 0, false, {
                                        fileName: "[project]/components/image-preview-modal.tsx",
                                        lineNumber: 130,
                                        columnNumber: 15
                                    }, this),
                                    "Draw"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/image-preview-modal.tsx",
                                lineNumber: 124,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                onClick: ()=>{
                                    // Send the annotated image if available, otherwise send the original
                                    onSend(currentImageUrl);
                                },
                                disabled: isSending || showAnnotation,
                                className: "bg-primary hover:opacity-90",
                                children: isSending ? "Sending..." : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                            className: "w-4 h-4 mr-2"
                                        }, void 0, false, {
                                            fileName: "[project]/components/image-preview-modal.tsx",
                                            lineNumber: 145,
                                            columnNumber: 19
                                        }, this),
                                        "Send"
                                    ]
                                }, void 0, true)
                            }, void 0, false, {
                                fileName: "[project]/components/image-preview-modal.tsx",
                                lineNumber: 133,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/image-preview-modal.tsx",
                        lineNumber: 111,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/image-preview-modal.tsx",
                lineNumber: 63,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/image-preview-modal.tsx",
            lineNumber: 56,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/image-preview-modal.tsx",
        lineNumber: 55,
        columnNumber: 5
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPortal"])(modalContent, document.body);
}
_s(ImagePreviewModal, "y6Z5IjnCm7MncY00upcS9YtJG0k=");
_c = ImagePreviewModal;
var _c;
__turbopack_context__.k.register(_c, "ImagePreviewModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/message-input.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MessageInput",
    ()=>MessageInput
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ImageIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/image.js [app-client] (ecmascript) <export default as ImageIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$image$2d$preview$2d$modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/image-preview-modal.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function MessageInput({ onSendMessage, onSendImage, onTyping, disabled, replyTo, onCancelReply }) {
    _s();
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [previewImage, setPreviewImage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [previewFile, setPreviewFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const textareaRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const typingTimeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Auto-focus input when reply is selected
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MessageInput.useEffect": ()=>{
            if (replyTo && textareaRef.current) {
                // Small delay to ensure the reply preview is rendered
                setTimeout({
                    "MessageInput.useEffect": ()=>{
                        textareaRef.current?.focus();
                    }
                }["MessageInput.useEffect"], 100);
            }
        }
    }["MessageInput.useEffect"], [
        replyTo
    ]);
    // Cleanup on unmount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MessageInput.useEffect": ()=>{
            return ({
                "MessageInput.useEffect": ()=>{
                    if (typingTimeoutRef.current) {
                        clearTimeout(typingTimeoutRef.current);
                    }
                }
            })["MessageInput.useEffect"];
        }
    }["MessageInput.useEffect"], []);
    const handleSend = ()=>{
        if (message.trim()) {
            onSendMessage(message, replyTo?.id);
            setMessage("");
            if (onCancelReply) {
                onCancelReply();
            }
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }
        }
    };
    const handleChange = (e)=>{
        setMessage(e.target.value);
        if (onTyping && e.target.value.trim()) {
            onTyping();
        }
    };
    const handleKeyDown = (e)=>{
    // Allow Enter for new lines, Shift+Enter also works
    // Removed auto-send on Enter key
    };
    const handleImageSelect = (e)=>{
        const file = e.target.files?.[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith("image/")) {
                alert("Please select an image file");
                return;
            }
            // Validate file size (max 10MB)
            if (file.size > 10 * 1024 * 1024) {
                alert("Image size must be less than 10MB");
                return;
            }
            const reader = new FileReader();
            reader.onload = (event)=>{
                const imageUrl = event.target?.result;
                setPreviewImage(imageUrl); // Show preview instead of sending immediately
                setPreviewFile(file); // Store the file for upload
            };
            reader.readAsDataURL(file);
        }
        // Reset input so same file can be selected again
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };
    const handleSendPreview = ()=>{
        if (previewImage) {
            onSendImage(previewImage);
            setPreviewImage(null);
        }
    };
    const handleRemovePreview = ()=>{
        setPreviewImage(null);
        setPreviewFile(null);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0,
            y: 20
        },
        animate: {
            opacity: 1,
            y: 0
        },
        className: "p-2 md:p-4 flex flex-col gap-2",
        children: [
            replyTo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 px-3 py-2 bg-secondary rounded-lg border-l-4 border-l-primary",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 min-w-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs font-medium text-primary mb-1",
                                children: [
                                    "Replying to ",
                                    replyTo.senderType === "business" ? "Business" : "You"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/message-input.tsx",
                                lineNumber: 131,
                                columnNumber: 13
                            }, this),
                            replyTo.text && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-muted-foreground truncate",
                                children: replyTo.text
                            }, void 0, false, {
                                fileName: "[project]/components/message-input.tsx",
                                lineNumber: 135,
                                columnNumber: 15
                            }, this),
                            replyTo.imageUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-muted-foreground",
                                children: "📷 Image"
                            }, void 0, false, {
                                fileName: "[project]/components/message-input.tsx",
                                lineNumber: 138,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/message-input.tsx",
                        lineNumber: 130,
                        columnNumber: 11
                    }, this),
                    onCancelReply && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onCancelReply,
                        className: "p-1 hover:bg-secondary-foreground/10 rounded-full transition-colors",
                        "aria-label": "Cancel reply",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                            className: "w-4 h-4 text-muted-foreground"
                        }, void 0, false, {
                            fileName: "[project]/components/message-input.tsx",
                            lineNumber: 147,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/message-input.tsx",
                        lineNumber: 142,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/message-input.tsx",
                lineNumber: 129,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>fileInputRef.current?.click(),
                        disabled: disabled,
                        className: "p-2 hover:bg-secondary rounded-lg transition-colors disabled:opacity-50 text-muted-foreground",
                        "aria-label": "Upload image",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ImageIcon$3e$__["ImageIcon"], {
                            className: "w-5 h-5"
                        }, void 0, false, {
                            fileName: "[project]/components/message-input.tsx",
                            lineNumber: 160,
                            columnNumber: 9
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/message-input.tsx",
                        lineNumber: 154,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        ref: fileInputRef,
                        type: "file",
                        accept: "image/*",
                        onChange: handleImageSelect,
                        className: "hidden"
                    }, void 0, false, {
                        fileName: "[project]/components/message-input.tsx",
                        lineNumber: 162,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                        ref: textareaRef,
                        value: message,
                        onChange: handleChange,
                        onKeyDown: handleKeyDown,
                        placeholder: "Type a message...",
                        disabled: disabled,
                        className: "flex-1 bg-input border border-border rounded-lg px-3 md:px-4 py-2 md:py-2.5 resize-none focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 text-foreground placeholder:text-muted-foreground text-sm md:text-base",
                        rows: 1
                    }, void 0, false, {
                        fileName: "[project]/components/message-input.tsx",
                        lineNumber: 163,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        onClick: handleSend,
                        disabled: !message.trim() || disabled,
                        size: "sm",
                        className: "self-end bg-primary hover:opacity-90 text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed rounded-full aspect-square p-2.5",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                            className: "w-4 h-4"
                        }, void 0, false, {
                            fileName: "[project]/components/message-input.tsx",
                            lineNumber: 179,
                            columnNumber: 9
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/message-input.tsx",
                        lineNumber: 173,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/message-input.tsx",
                lineNumber: 153,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$image$2d$preview$2d$modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImagePreviewModal"], {
                imageUrl: previewImage,
                onClose: handleRemovePreview,
                onSend: (annotatedImageUrl)=>{
                    // Use annotated image if provided, otherwise use original preview
                    if (annotatedImageUrl) {
                        setPreviewImage(annotatedImageUrl);
                        onSendImage(annotatedImageUrl, replyTo?.id);
                        setPreviewImage(null);
                        setPreviewFile(null);
                        if (onCancelReply) {
                            onCancelReply();
                        }
                    } else {
                        handleSendPreview();
                    }
                },
                onRemove: handleRemovePreview,
                isSending: disabled
            }, void 0, false, {
                fileName: "[project]/components/message-input.tsx",
                lineNumber: 184,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/message-input.tsx",
        lineNumber: 122,
        columnNumber: 5
    }, this);
}
_s(MessageInput, "GYI5wZT/TrSke/MCToOIGKfOnm8=");
_c = MessageInput;
var _c;
__turbopack_context__.k.register(_c, "MessageInput");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/typing-indicator.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TypingIndicator",
    ()=>TypingIndicator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
"use client";
;
;
function TypingIndicator({ isOwn = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0,
            y: 10
        },
        animate: {
            opacity: 1,
            y: 0
        },
        exit: {
            opacity: 0,
            y: -10
        },
        className: `flex ${isOwn ? "justify-end" : "justify-start"} mb-3`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `px-4 py-3 rounded-2xl ${isOwn ? "bg-primary text-primary-foreground rounded-br-none" : "bg-secondary text-secondary-foreground rounded-bl-none"}`,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-1.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "w-2 h-2 rounded-full bg-current opacity-60",
                        animate: {
                            scale: [
                                1,
                                1.2,
                                1
                            ],
                            opacity: [
                                0.6,
                                1,
                                0.6
                            ]
                        },
                        transition: {
                            duration: 0.6,
                            repeat: Infinity,
                            delay: 0
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/typing-indicator.tsx",
                        lineNumber: 25,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "w-2 h-2 rounded-full bg-current opacity-60",
                        animate: {
                            scale: [
                                1,
                                1.2,
                                1
                            ],
                            opacity: [
                                0.6,
                                1,
                                0.6
                            ]
                        },
                        transition: {
                            duration: 0.6,
                            repeat: Infinity,
                            delay: 0.2
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/typing-indicator.tsx",
                        lineNumber: 37,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "w-2 h-2 rounded-full bg-current opacity-60",
                        animate: {
                            scale: [
                                1,
                                1.2,
                                1
                            ],
                            opacity: [
                                0.6,
                                1,
                                0.6
                            ]
                        },
                        transition: {
                            duration: 0.6,
                            repeat: Infinity,
                            delay: 0.4
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/typing-indicator.tsx",
                        lineNumber: 49,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/typing-indicator.tsx",
                lineNumber: 24,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/typing-indicator.tsx",
            lineNumber: 17,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/typing-indicator.tsx",
        lineNumber: 11,
        columnNumber: 5
    }, this);
}
_c = TypingIndicator;
var _c;
__turbopack_context__.k.register(_c, "TypingIndicator");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/supabase/client.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createClient",
    ()=>createClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/createBrowserClient.js [app-client] (ecmascript)");
;
function createClient() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createBrowserClient"])(("TURBOPACK compile-time value", "https://gvliedhyogzxwcbpljrk.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd2bGllZGh5b2d6eHdjYnBsanJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwMzQ4NDYsImV4cCI6MjA4MDYxMDg0Nn0.c3IWCeoG_iZlyxCjgox484TCbBJLVhqIOa6k0QJQumc"), {
        realtime: {
            params: {
                eventsPerSecond: 10
            }
        }
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/supabase/db.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "db",
    ()=>db
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-client] (ecmascript)");
;
// Convert DB Business to App Business
function dbBusinessToApp(db) {
    return {
        id: db.id,
        email: db.email,
        phone: db.phone || "",
        businessName: db.business_name || "",
        businessLogo: db.business_logo || undefined,
        address: db.address || "",
        online: db.online ?? false,
        createdAt: db.created_at
    };
}
// Convert App Business to DB Business
function appBusinessToDB(business, passwordHash) {
    const dbData = {};
    // Only include fields that are actually provided (not undefined)
    if (business.email !== undefined) {
        dbData.email = business.email;
    }
    if (passwordHash !== undefined && passwordHash !== "") {
        dbData.password_hash = passwordHash;
    }
    if (business.businessName !== undefined) {
        // Convert empty string to null for database
        dbData.business_name = business.businessName.trim() || null;
    }
    if (business.phone !== undefined) {
        // Convert empty string to null for database
        dbData.phone = business.phone.trim() || null;
    }
    if (business.address !== undefined) {
        // Convert empty string to null for database
        dbData.address = business.address.trim() || null;
    }
    if (business.businessLogo !== undefined) {
        dbData.business_logo = business.businessLogo || null;
    }
    return dbData;
}
// Convert DB Conversation to App Conversation (with messages)
async function dbConversationToApp(db, messages = []) {
    // Create a map of messages by ID for quick lookup
    const messagesMap = new Map();
    messages.forEach((m)=>messagesMap.set(m.id, m));
    // Convert messages and resolve replyTo references
    const appMessages = messages.map((m)=>{
        const message = {
            id: m.id,
            conversationId: m.conversation_id,
            senderType: m.sender_type,
            senderId: m.sender_id,
            text: m.content || undefined,
            imageUrl: m.image_url || undefined,
            status: m.status || "sent",
            createdAt: m.created_at,
            replyToId: m.reply_to_id || undefined
        };
        // If this message is a reply, find and attach the original message
        if (m.reply_to_id) {
            const replyToMessage = messagesMap.get(m.reply_to_id);
            if (replyToMessage) {
                message.replyTo = {
                    id: replyToMessage.id,
                    conversationId: replyToMessage.conversation_id,
                    senderType: replyToMessage.sender_type,
                    senderId: replyToMessage.sender_id,
                    text: replyToMessage.content || undefined,
                    imageUrl: replyToMessage.image_url || undefined,
                    status: replyToMessage.status || "sent",
                    createdAt: replyToMessage.created_at
                };
            }
        }
        return message;
    });
    return {
        id: db.id,
        businessId: db.business_id,
        customerEmail: db.customer_email,
        customerName: db.customer_name || undefined,
        createdAt: db.created_at,
        lastMessageAt: db.updated_at,
        messages: appMessages,
        pinned: db.pinned ?? false
    };
}
// Convert App Conversation to DB Conversation
function appConversationToDB(conversation, customerPhone) {
    return {
        business_id: conversation.businessId,
        customer_phone: customerPhone || "",
        customer_email: conversation.customerEmail || undefined
    };
}
// Convert App Message to DB Message
function appMessageToDB(message) {
    return {
        conversation_id: message.conversationId,
        sender_type: message.senderType,
        sender_id: message.senderId || "",
        content: message.text || null,
        image_url: message.imageUrl || null,
        status: message.status || "sent",
        reply_to_id: message.replyToId || null
    };
}
const db = {
    // Businesses
    async getBusinessById (id) {
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
        const { data, error } = await supabase.from("businesses").select("*").eq("id", id).single();
        if (error || !data) return null;
        return dbBusinessToApp(data);
    },
    async getBusinessByEmail (email) {
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
        const { data, error } = await supabase.from("businesses").select("*").eq("email", email).single();
        if (error || !data) return null;
        return dbBusinessToApp(data);
    },
    async getBusinessByPhone (phone) {
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
        const { data, error } = await supabase.from("businesses").select("*").eq("phone", phone).single();
        if (error || !data) return null;
        return dbBusinessToApp(data);
    },
    async createBusiness (business, passwordHash = "") {
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
        const dbData = {
            id: business.id,
            email: business.email,
            password_hash: passwordHash,
            business_name: business.businessName || null,
            phone: business.phone || null,
            address: business.address || null,
            business_logo: business.businessLogo || null
        };
        const { data, error } = await supabase.from("businesses").insert(dbData).select().single();
        if (error) throw error;
        return dbBusinessToApp(data);
    },
    async updateBusiness (id, updates) {
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
        const dbData = appBusinessToDB(updates);
        // Make sure to include business_logo if it's being updated
        if (updates.businessLogo !== undefined) {
            dbData.business_logo = updates.businessLogo || null;
        }
        // Try to include online status if it's being updated
        // If the column doesn't exist yet, we'll skip it and continue with other updates
        if (updates.online !== undefined) {
            // Check if online column exists by trying a test query first
            // For now, we'll include it and let the error be caught if column doesn't exist
            dbData.online = updates.online;
        }
        const { data, error } = await supabase.from("businesses").update(dbData).eq("id", id).select().single();
        if (error) {
            // If error is about missing 'online' column, try again without it
            if (error.message?.includes("online") && error.code === "PGRST204") {
                console.warn("Online column not found, updating without online status. Please run migration 008_add_online_status.sql");
                delete dbData.online;
                const { data: retryData, error: retryError } = await supabase.from("businesses").update(dbData).eq("id", id).select().single();
                if (retryError) {
                    console.error("Error updating business:", retryError);
                    throw new Error(retryError.message || "Failed to update business");
                }
                if (!retryData) {
                    throw new Error("No data returned from update");
                }
                return dbBusinessToApp(retryData);
            }
            console.error("Error updating business:", error);
            throw new Error(error.message || "Failed to update business");
        }
        if (!data) {
            throw new Error("No data returned from update");
        }
        return dbBusinessToApp(data);
    },
    // Conversations
    async getConversationsByBusinessId (businessId) {
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
        const { data: conversations, error } = await supabase.from("conversations").select("*").eq("business_id", businessId).order("updated_at", {
            ascending: false
        });
        if (error || !conversations || conversations.length === 0) return [];
        // Fetch messages for unread count calculation and last message preview
        const conversationIds = conversations.map((c)=>c.id);
        // Batch fetch messages in parallel for better performance
        // Fetch all messages to calculate unread count accurately
        const messagesPromises = conversationIds.map(async (conversationId)=>{
            const { data: messages, error: msgError } = await supabase.from("messages").select("*").eq("conversation_id", conversationId).order("created_at", {
                ascending: false
            });
            // Return empty array on error (conversation might have no messages yet)
            if (msgError || !messages) return {
                conversationId,
                messages: []
            };
            return {
                conversationId,
                messages: messages
            };
        });
        const messagesResults = await Promise.all(messagesPromises);
        const messagesMap = new Map();
        messagesResults.forEach(({ conversationId, messages })=>{
            if (messages.length > 0) {
                // Reverse to get chronological order (oldest first)
                messagesMap.set(conversationId, messages.reverse());
            }
        });
        return Promise.all(conversations.map((conv)=>dbConversationToApp(conv, messagesMap.get(conv.id) || [])));
    },
    async getConversationById (id) {
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
        const { data: conversation, error } = await supabase.from("conversations").select("*").eq("id", id).single();
        if (error || !conversation) return null;
        // Limit initial message fetch to 100 most recent messages for performance
        const { data: messages } = await supabase.from("messages").select("*").eq("conversation_id", id).order("created_at", {
            ascending: false
        }).limit(100);
        // Reverse to get chronological order (oldest first)
        const sortedMessages = messages ? [
            ...messages
        ].reverse() : [];
        return dbConversationToApp(conversation, sortedMessages || []);
    },
    async getConversationByBusinessAndEmail (businessId, customerEmail) {
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
        const { data: conversation, error } = await supabase.from("conversations").select("*").eq("business_id", businessId).eq("customer_email", customerEmail).single();
        if (error || !conversation) return null;
        const { data: messages } = await supabase.from("messages").select("*").eq("conversation_id", conversation.id).order("created_at", {
            ascending: true
        });
        return dbConversationToApp(conversation, messages || []);
    },
    async createConversation (conversation) {
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
        const dbData = {
            id: conversation.id,
            business_id: conversation.businessId,
            customer_email: conversation.customerEmail,
            customer_name: conversation.customerName || null,
            customer_phone: null
        };
        const { data, error } = await supabase.from("conversations").insert(dbData).select().single();
        if (error) throw error;
        // Create messages if any
        if (conversation.messages && conversation.messages.length > 0) {
            const messagesData = conversation.messages.map((m)=>({
                    id: m.id,
                    conversation_id: m.conversationId,
                    sender_type: m.senderType,
                    sender_id: m.senderId || conversation.businessId,
                    content: m.text || null,
                    image_url: m.imageUrl || null
                }));
            await supabase.from("messages").insert(messagesData);
        }
        return dbConversationToApp(data, []);
    },
    async updateConversation (id, updates) {
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
        const dbData = {};
        if (updates.customerEmail !== undefined) {
            dbData.customer_email = updates.customerEmail;
        }
        if (updates.customerName !== undefined) {
            dbData.customer_name = updates.customerName || null;
        }
        if (updates.pinned !== undefined) {
            dbData.pinned = updates.pinned;
        }
        const { data, error } = await supabase.from("conversations").update(dbData).eq("id", id).select().single();
        if (error || !data) return null;
        // Get messages
        const { data: messages } = await supabase.from("messages").select("*").eq("conversation_id", id).order("created_at", {
            ascending: true
        });
        return dbConversationToApp(data, messages || []);
    },
    async updateMessageStatus (id, status) {
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
        await supabase.from("messages").update({
            status
        }).eq("id", id);
    },
    async markMessagesAsDelivered (conversationId, senderType) {
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
        // Mark all messages from the other sender as delivered
        await supabase.from("messages").update({
            status: "delivered"
        }).eq("conversation_id", conversationId).eq("sender_type", senderType).in("status", [
            "sent"
        ]);
    },
    async markMessagesAsRead (conversationId, senderType) {
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
        // Mark all messages from the other sender as read
        await supabase.from("messages").update({
            status: "read"
        }).eq("conversation_id", conversationId).eq("sender_type", senderType).in("status", [
            "sent",
            "delivered"
        ]);
    },
    // Messages
    async createMessage (message) {
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
        const dbData = {
            id: message.id,
            conversation_id: message.conversationId,
            sender_type: message.senderType,
            sender_id: message.senderId || "",
            content: message.text || null,
            image_url: message.imageUrl || null,
            status: message.status || "sent",
            reply_to_id: message.replyToId || null
        };
        const { data, error } = await supabase.from("messages").insert(dbData).select().single();
        if (error) throw error;
        // Update conversation's updated_at
        await supabase.from("conversations").update({
            updated_at: new Date().toISOString()
        }).eq("id", message.conversationId);
        return {
            id: data.id,
            conversationId: data.conversation_id,
            senderType: data.sender_type,
            senderId: data.sender_id,
            text: data.content || undefined,
            imageUrl: data.image_url || undefined,
            status: data.status || "sent",
            createdAt: data.created_at,
            replyToId: data.reply_to_id || undefined
        };
    },
    async deleteConversation (id) {
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
        const { error } = await supabase.from("conversations").delete().eq("id", id);
        if (error) throw error;
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/auth.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "auth",
    ()=>auth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/db.ts [app-client] (ecmascript)");
;
;
const auth = {
    // Sign up with email and password
    async signUp (email, password) {
        try {
            const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
            // Sign up with Supabase Auth
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email,
                password
            });
            if (authError) {
                return {
                    user: null,
                    error: authError
                };
            }
            if (!authData.user) {
                return {
                    user: null,
                    error: new Error("Failed to create user")
                };
            }
            // Create business record in database
            const business = {
                id: authData.user.id,
                email,
                phone: "",
                businessName: "",
                address: "",
                online: false,
                createdAt: new Date().toISOString()
            };
            // Create business record in database (no password hash needed, Supabase handles auth)
            try {
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].createBusiness(business, "");
            } catch (dbError) {
                // If business creation fails, the auth user is still created
                // This should be handled by a database trigger or cleanup job
                return {
                    user: null,
                    error: new Error("Failed to create business profile")
                };
            }
            const createdBusiness = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].getBusinessById(authData.user.id);
            if (!createdBusiness) {
                return {
                    user: null,
                    error: new Error("Failed to retrieve business profile")
                };
            }
            const authUser = {
                id: authData.user.id,
                email,
                business: createdBusiness
            };
            return {
                user: authUser,
                error: null
            };
        } catch (error) {
            return {
                user: null,
                error: error
            };
        }
    },
    // Sign in with email and password
    async signIn (email, password) {
        try {
            const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
            const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
                email,
                password
            });
            if (authError || !authData.user) {
                return {
                    user: null,
                    error: authError || new Error("Invalid credentials")
                };
            }
            // Get business data
            const business = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].getBusinessById(authData.user.id);
            if (!business) {
                return {
                    user: null,
                    error: new Error("Business profile not found")
                };
            }
            // Business is always online - no need to update status
            const updatedBusiness = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].getBusinessById(authData.user.id);
            const authUser = {
                id: authData.user.id,
                email: authData.user.email,
                business: updatedBusiness || business
            };
            return {
                user: authUser,
                error: null
            };
        } catch (error) {
            return {
                user: null,
                error: error
            };
        }
    },
    // Sign out
    async signOut () {
        try {
            const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
            // Business is always online - no need to update status
            const { error } = await supabase.auth.signOut();
            return {
                error: error
            };
        } catch (error) {
            return {
                error: error
            };
        }
    },
    // Get current user
    async getCurrentUser () {
        try {
            const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
            const { data: { user: authUser }, error } = await supabase.auth.getUser();
            if (error || !authUser) {
                return null;
            }
            const business = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].getBusinessById(authUser.id);
            if (!business) {
                return null;
            }
            return {
                id: authUser.id,
                email: authUser.email,
                business
            };
        } catch (error) {
            return null;
        }
    },
    // Get session
    async getSession () {
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
        return await supabase.auth.getSession();
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/storage.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "storage",
    ()=>storage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/db.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.ts [app-client] (ecmascript)");
;
;
const storage = {
    // Businesses
    getAllBusinesses: async ()=>{
        // Note: This is not ideal for Supabase as it would return all businesses
        // In a real app, you'd only get businesses the user has access to
        // For now, return empty array - this method might not be needed
        return [];
    },
    getBusinessByPhone: async (phone)=>{
        return await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].getBusinessByPhone(phone);
    },
    getBusinessById: async (id)=>{
        return await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].getBusinessById(id);
    },
    createBusiness: async (business)=>{
        // Note: This should typically be called through auth.signUp
        // Password hash would be handled by Supabase Auth
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].createBusiness(business, "");
    },
    updateBusiness: async (id, updates)=>{
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].updateBusiness(id, updates);
        if (!result) {
            throw new Error("Failed to update business");
        }
        return result;
    },
    // Conversations
    getConversationsByBusinessId: async (businessId)=>{
        return await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].getConversationsByBusinessId(businessId);
    },
    getConversationById: async (id)=>{
        return await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].getConversationById(id);
    },
    createConversation: async (conversation)=>{
        if (!conversation.customerEmail) {
            throw new Error("customerEmail is required to create a conversation");
        }
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].createConversation(conversation);
    },
    updateConversation: async (id, updates)=>{
        return await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].updateConversation(id, updates);
    },
    deleteConversation: async (id)=>{
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].deleteConversation(id);
    },
    // Auth
    getAuth: async ()=>{
        return await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["auth"].getCurrentUser();
    },
    setAuth: async (user)=>{
    // Auth is managed by Supabase sessions
    // This method is kept for compatibility but doesn't need to do anything
    // The session is automatically managed by Supabase
    },
    clearAuth: async ()=>{
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["auth"].signOut();
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/wallpaper.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Wallpaper",
    ()=>Wallpaper
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
"use client";
;
;
function Wallpaper({ businessLogo, className = "" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `fixed inset-0 z-0 pointer-events-none ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-black/40"
            }, void 0, false, {
                fileName: "[project]/components/wallpaper.tsx",
                lineNumber: 13,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                src: "/chat-bg.jpg",
                alt: "Wallpaper",
                fill: true,
                className: "object-cover opacity-10",
                priority: false
            }, void 0, false, {
                fileName: "[project]/components/wallpaper.tsx",
                lineNumber: 14,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/wallpaper.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
_c = Wallpaper;
var _c;
__turbopack_context__.k.register(_c, "Wallpaper");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/avatar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Avatar",
    ()=>Avatar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
function getInitials(name) {
    if (!name) return "?";
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) {
        return parts[0].charAt(0).toUpperCase();
    }
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}
function getSizeClasses(size) {
    switch(size){
        case "sm":
            return "w-8 h-8 text-xs";
        case "md":
            return "w-10 h-10 text-sm";
        case "lg":
            return "w-12 h-12 text-base";
        case "xl":
            return "w-16 h-16 text-xl";
        default:
            return "w-10 h-10 text-sm";
    }
}
function Avatar({ src, name, size = "md", className }) {
    const initials = getInitials(name);
    const sizeClasses = getSizeClasses(size);
    if (src) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative rounded-full overflow-hidden bg-muted flex items-center justify-center", sizeClasses, className),
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                src: src,
                alt: name || "Avatar",
                fill: true,
                className: "object-cover",
                priority: size === "md" || size === "lg" || size === "xl"
            }, void 0, false, {
                fileName: "[project]/components/avatar.tsx",
                lineNumber: 45,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/avatar.tsx",
            lineNumber: 44,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium", sizeClasses, className),
        children: initials
    }, void 0, false, {
        fileName: "[project]/components/avatar.tsx",
        lineNumber: 57,
        columnNumber: 5
    }, this);
}
_c = Avatar;
var _c;
__turbopack_context__.k.register(_c, "Avatar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/hooks/use-realtime.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useRealtime",
    ()=>useRealtime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/db.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
;
const maxReconnectAttempts = 5;
function useRealtime() {
    _s();
    const [connectionStatus, setConnectionStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("connecting");
    const channelsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new Map());
    const typingCallbacksRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new Map());
    const reconnectAttemptsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new Map());
    const heartbeatIntervalsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new Map());
    const reconnectTimersRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new Map());
    const typingBroadcastThrottlesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new Map());
    const cleanupChannel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useRealtime.useCallback[cleanupChannel]": (channelName)=>{
            const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
            const channel = channelsRef.current.get(channelName);
            if (channel) {
                supabase.removeChannel(channel);
                channelsRef.current.delete(channelName);
            }
            const interval = heartbeatIntervalsRef.current.get(channelName);
            if (interval) {
                clearInterval(interval);
                heartbeatIntervalsRef.current.delete(channelName);
            }
            const timer = reconnectTimersRef.current.get(channelName);
            if (timer) {
                clearTimeout(timer);
                reconnectTimersRef.current.delete(channelName);
            }
            reconnectAttemptsRef.current.delete(channelName);
        }
    }["useRealtime.useCallback[cleanupChannel]"], []);
    const setupConversationChannel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useRealtime.useCallback[setupConversationChannel]": (conversationId, senderType, senderId, onTyping, onMessageUpdate, onMessageDelete, onConversationUpdate)=>{
            const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
            const channelName = `conversation:${conversationId}`;
            // Clean up existing channel if any
            cleanupChannel(channelName);
            const channel = supabase.channel(channelName, {
                config: {
                    broadcast: {
                        self: true
                    },
                    presence: {
                        key: senderId
                    }
                }
            }).on("broadcast", {
                event: "typing"
            }, {
                "useRealtime.useCallback[setupConversationChannel].channel": (payload)=>{
                    // Only trigger callback if it's from the other user
                    const otherSenderType = senderType === "business" ? "customer" : "business";
                    if (payload.payload.senderType === otherSenderType && onTyping) {
                        onTyping(payload.payload.senderType);
                    }
                }
            }["useRealtime.useCallback[setupConversationChannel].channel"]).on("postgres_changes", {
                event: "*",
                schema: "public",
                table: "messages",
                filter: `conversation_id=eq.${conversationId}`
            }, {
                "useRealtime.useCallback[setupConversationChannel].channel": async (payload)=>{
                    console.log("🔔 Real-time event received:", payload.eventType, payload);
                    if (payload.eventType === "INSERT" || payload.eventType === "UPDATE") {
                        try {
                            const dbMessage = payload.new;
                            const newMessage = {
                                id: dbMessage.id,
                                conversationId: dbMessage.conversation_id,
                                senderType: dbMessage.sender_type,
                                senderId: dbMessage.sender_id,
                                text: dbMessage.content || undefined,
                                imageUrl: dbMessage.image_url || undefined,
                                status: dbMessage.status || "sent",
                                createdAt: dbMessage.created_at,
                                replyToId: dbMessage.reply_to_id || undefined
                            };
                            // If this message is a reply, fetch the original message
                            if (dbMessage.reply_to_id) {
                                try {
                                    const { data: replyToMessage, error: replyError } = await supabase.from("messages").select("*").eq("id", dbMessage.reply_to_id).single();
                                    if (!replyError && replyToMessage) {
                                        newMessage.replyTo = {
                                            id: replyToMessage.id,
                                            conversationId: replyToMessage.conversation_id,
                                            senderType: replyToMessage.sender_type,
                                            senderId: replyToMessage.sender_id,
                                            text: replyToMessage.content || undefined,
                                            imageUrl: replyToMessage.image_url || undefined,
                                            status: replyToMessage.status || "sent",
                                            createdAt: replyToMessage.created_at
                                        };
                                    }
                                } catch (replyError) {
                                    console.error("Error fetching reply message:", replyError);
                                // Continue without reply info if fetch fails
                                }
                            }
                            console.log("📨 Processed message:", newMessage);
                            // Mark as delivered if it's a new message from the other user
                            const otherSenderType = senderType === "business" ? "customer" : "business";
                            if (payload.eventType === "INSERT" && newMessage.senderType === otherSenderType) {
                                try {
                                    await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].updateMessageStatus(newMessage.id, "delivered");
                                    // Update the message status after marking as delivered
                                    newMessage.status = "delivered";
                                } catch (error) {
                                    console.error("Error updating message status:", error);
                                }
                            }
                            // Only call update if message has required fields
                            if (newMessage.id && newMessage.conversationId && onMessageUpdate) {
                                console.log("✅ Calling onMessageUpdate callback with message:", newMessage.id);
                                onMessageUpdate(newMessage);
                            } else {
                                console.warn("⚠️ onMessageUpdate callback not provided or message missing required fields", {
                                    hasId: !!newMessage.id,
                                    hasConversationId: !!newMessage.conversationId,
                                    hasCallback: !!onMessageUpdate
                                });
                            }
                        } catch (error) {
                            console.error("❌ Error processing real-time message:", error);
                        }
                    } else if (payload.eventType === "DELETE") {
                        const deletedId = payload.old?.id;
                        console.log("🗑️ Message deleted:", deletedId);
                        if (deletedId && onMessageDelete) {
                            onMessageDelete(deletedId);
                        }
                    }
                }
            }["useRealtime.useCallback[setupConversationChannel].channel"]).on("postgres_changes", {
                event: "UPDATE",
                schema: "public",
                table: "conversations",
                filter: `id=eq.${conversationId}`
            }, {
                "useRealtime.useCallback[setupConversationChannel].channel": async ()=>{
                    if (onConversationUpdate) {
                        onConversationUpdate();
                    }
                }
            }["useRealtime.useCallback[setupConversationChannel].channel"]).subscribe({
                "useRealtime.useCallback[setupConversationChannel].channel": (status, err)=>{
                    if (status === "SUBSCRIBED") {
                        setConnectionStatus("connected");
                        reconnectAttemptsRef.current.set(channelName, 0);
                        channelsRef.current.set(channelName, channel);
                        if (onTyping) {
                            typingCallbacksRef.current.set(channelName, onTyping);
                        }
                        console.log(`✅ Real-time connected: ${channelName}`);
                        // Set up heartbeat to keep connection alive
                        const interval = setInterval({
                            "useRealtime.useCallback[setupConversationChannel].channel.interval": ()=>{
                                try {
                                    channel.send({
                                        type: "presence",
                                        event: "heartbeat",
                                        payload: {
                                            user_id: senderId,
                                            timestamp: Date.now()
                                        }
                                    });
                                } catch (error) {
                                    console.error("Heartbeat error:", error);
                                }
                            }
                        }["useRealtime.useCallback[setupConversationChannel].channel.interval"], 30000);
                        heartbeatIntervalsRef.current.set(channelName, interval);
                    } else if (status === "CHANNEL_ERROR" || status === "TIMED_OUT" || status === "CLOSED") {
                        console.warn(`⚠️ Real-time disconnected: ${channelName}`, err);
                        setConnectionStatus("disconnected");
                        const interval = heartbeatIntervalsRef.current.get(channelName);
                        if (interval) {
                            clearInterval(interval);
                            heartbeatIntervalsRef.current.delete(channelName);
                        }
                        // Attempt reconnection with exponential backoff
                        const attempts = reconnectAttemptsRef.current.get(channelName) || 0;
                        if (attempts < maxReconnectAttempts) {
                            reconnectAttemptsRef.current.set(channelName, attempts + 1);
                            const delay = Math.min(1000 * Math.pow(2, attempts + 1), 30000);
                            console.log(`🔄 Reconnecting ${channelName} (attempt ${attempts + 1}/${maxReconnectAttempts}) in ${delay}ms`);
                            const timer = setTimeout({
                                "useRealtime.useCallback[setupConversationChannel].channel.timer": ()=>{
                                    setupConversationChannel(conversationId, senderType, senderId, onTyping, onMessageUpdate, onMessageDelete, onConversationUpdate);
                                }
                            }["useRealtime.useCallback[setupConversationChannel].channel.timer"], delay);
                            reconnectTimersRef.current.set(channelName, timer);
                        } else {
                            console.error(`❌ Max reconnection attempts reached for ${channelName}`);
                        }
                    }
                }
            }["useRealtime.useCallback[setupConversationChannel].channel"]);
            return ({
                "useRealtime.useCallback[setupConversationChannel]": ()=>{
                    typingCallbacksRef.current.delete(channelName);
                    cleanupChannel(channelName);
                }
            })["useRealtime.useCallback[setupConversationChannel]"];
        }
    }["useRealtime.useCallback[setupConversationChannel]"], [
        cleanupChannel
    ]);
    const broadcastTyping = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useRealtime.useCallback[broadcastTyping]": (conversationId, senderType)=>{
            const channelName = `conversation:${conversationId}`;
            const channel = channelsRef.current.get(channelName);
            if (!channel) return;
            // Throttle broadcasts to once per second
            const throttleKey = `${channelName}:${senderType}`;
            if (typingBroadcastThrottlesRef.current.has(throttleKey)) {
                return;
            }
            channel.send({
                type: "broadcast",
                event: "typing",
                payload: {
                    senderType,
                    conversationId
                }
            });
            const timer = setTimeout({
                "useRealtime.useCallback[broadcastTyping].timer": ()=>{
                    typingBroadcastThrottlesRef.current.delete(throttleKey);
                }
            }["useRealtime.useCallback[broadcastTyping].timer"], 1000);
            typingBroadcastThrottlesRef.current.set(throttleKey, timer);
        }
    }["useRealtime.useCallback[broadcastTyping]"], []);
    const setupBusinessChannel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useRealtime.useCallback[setupBusinessChannel]": (businessId, onConversationsUpdate)=>{
            const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
            const channelName = `business:${businessId}`;
            // Clean up existing channel if any
            cleanupChannel(channelName);
            const channel = supabase.channel(channelName, {
                config: {
                    broadcast: {
                        self: true
                    }
                }
            }).on("postgres_changes", {
                event: "INSERT",
                schema: "public",
                table: "messages"
            }, {
                "useRealtime.useCallback[setupBusinessChannel].channel": async ()=>{
                    // Refresh conversations list when new messages arrive
                    if (onConversationsUpdate) {
                        onConversationsUpdate();
                    }
                }
            }["useRealtime.useCallback[setupBusinessChannel].channel"]).on("postgres_changes", {
                event: "UPDATE",
                schema: "public",
                table: "messages"
            }, {
                "useRealtime.useCallback[setupBusinessChannel].channel": async ()=>{
                    // Refresh conversations list when message status changes (e.g., marked as read)
                    if (onConversationsUpdate) {
                        onConversationsUpdate();
                    }
                }
            }["useRealtime.useCallback[setupBusinessChannel].channel"]).on("postgres_changes", {
                event: "UPDATE",
                schema: "public",
                table: "conversations"
            }, {
                "useRealtime.useCallback[setupBusinessChannel].channel": async ()=>{
                    // Refresh conversations list when conversations are updated
                    if (onConversationsUpdate) {
                        onConversationsUpdate();
                    }
                }
            }["useRealtime.useCallback[setupBusinessChannel].channel"]).subscribe({
                "useRealtime.useCallback[setupBusinessChannel].channel": (status)=>{
                    console.log("Business channel subscription status:", status);
                }
            }["useRealtime.useCallback[setupBusinessChannel].channel"]);
            channelsRef.current.set(channelName, channel);
            return ({
                "useRealtime.useCallback[setupBusinessChannel]": ()=>{
                    cleanupChannel(channelName);
                }
            })["useRealtime.useCallback[setupBusinessChannel]"];
        }
    }["useRealtime.useCallback[setupBusinessChannel]"], [
        cleanupChannel
    ]);
    const cleanup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useRealtime.useCallback[cleanup]": ()=>{
            channelsRef.current.forEach({
                "useRealtime.useCallback[cleanup]": (_, channelName)=>{
                    typingCallbacksRef.current.delete(channelName);
                    cleanupChannel(channelName);
                }
            }["useRealtime.useCallback[cleanup]"]);
            typingBroadcastThrottlesRef.current.forEach({
                "useRealtime.useCallback[cleanup]": (timer)=>clearTimeout(timer)
            }["useRealtime.useCallback[cleanup]"]);
            typingBroadcastThrottlesRef.current.clear();
            setConnectionStatus("disconnected");
        }
    }["useRealtime.useCallback[cleanup]"], [
        cleanupChannel
    ]);
    // Cleanup on unmount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useRealtime.useEffect": ()=>{
            return ({
                "useRealtime.useEffect": ()=>{
                    cleanup();
                }
            })["useRealtime.useEffect"];
        }
    }["useRealtime.useEffect"], [
        cleanup
    ]);
    return {
        connectionStatus,
        setupConversationChannel,
        broadcastTyping,
        setupBusinessChannel,
        cleanup
    };
}
_s(useRealtime, "/7ossjZMGZHvP8gqqKw3g618980=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/hooks/use-business.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useBusinessById",
    ()=>useBusinessById,
    "useBusinessByPhone",
    ()=>useBusinessByPhone
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/swr/dist/index/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/storage.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
;
;
// Fetcher function for SWR
const businessFetcher = async (key)=>{
    if (key.startsWith("phone:")) {
        const phone = key.replace("phone:", "");
        return await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].getBusinessByPhone(phone);
    }
    if (key.startsWith("id:")) {
        const id = key.replace("id:", "");
        return await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].getBusinessById(id);
    }
    return null;
};
function useBusinessByPhone(phone) {
    _s();
    const { data, error, isLoading, mutate } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])(phone ? `phone:${phone}` : null, businessFetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: true,
        dedupingInterval: 10000,
        refreshInterval: 5000
    });
    return {
        business: data,
        isLoading,
        error,
        mutate
    };
}
_s(useBusinessByPhone, "VRI3YSxoWYZ/jyoKeeIu/AvyMKw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"]
    ];
});
function useBusinessById(id) {
    _s1();
    const { data, error, isLoading, mutate } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])(id ? `id:${id}` : null, businessFetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: true,
        dedupingInterval: 10000
    });
    return {
        business: data,
        isLoading,
        error,
        mutate
    };
}
_s1(useBusinessById, "VRI3YSxoWYZ/jyoKeeIu/AvyMKw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/chat/[phone]/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CustomerChatPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$chat$2d$bubble$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/chat-bubble.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$message$2d$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/message-input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$typing$2d$indicator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/typing-indicator.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/storage.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/db.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__ = __turbopack_context__.i("[project]/node_modules/uuid/dist/v4.js [app-client] (ecmascript) <export default as v4>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-client] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mail.js [app-client] (ecmascript) <export default as Mail>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$wallpaper$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/wallpaper.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/avatar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$use$2d$realtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/use-realtime.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$use$2d$business$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/use-business.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const CUSTOMER_EMAIL_STORAGE_KEY = "leenk_customer_email";
function CustomerChatPage() {
    _s();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const phone = params.phone;
    const { business, isLoading: businessLoading, mutate: mutateBusiness } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$use$2d$business$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBusinessByPhone"])(phone);
    // Debug: Log business online status
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CustomerChatPage.useEffect": ()=>{
            if (business) {
                console.log("Business online status:", {
                    id: business.id,
                    online: business.online,
                    onlineType: typeof business.online,
                    businessName: business.businessName
                });
            }
        }
    }["CustomerChatPage.useEffect"], [
        business
    ]);
    const [customerEmail, setCustomerEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [customerName, setCustomerName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [showEmailPrompt, setShowEmailPrompt] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [showNameInput, setShowNameInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSearching, setIsSearching] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [isTyping, setIsTyping] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [otherUserTyping, setOtherUserTyping] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSending, setIsSending] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [replyTo, setReplyTo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [currentConversation, setCurrentConversation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const messagesEndRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const typingTimeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const otherUserTypingTimeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { connectionStatus, setupConversationChannel, broadcastTyping } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$use$2d$realtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRealtime"])();
    // Load email from localStorage on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CustomerChatPage.useEffect": ()=>{
            const savedEmail = localStorage.getItem(CUSTOMER_EMAIL_STORAGE_KEY);
            if (savedEmail) {
                setCustomerEmail(savedEmail);
            }
        }
    }["CustomerChatPage.useEffect"], []);
    // Save email to localStorage when it changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CustomerChatPage.useEffect": ()=>{
            if (customerEmail) {
                localStorage.setItem(CUSTOMER_EMAIL_STORAGE_KEY, customerEmail);
            }
        }
    }["CustomerChatPage.useEffect"], [
        customerEmail
    ]);
    // Business is now loaded via SWR hook, handle errors
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CustomerChatPage.useEffect": ()=>{
            if (!businessLoading && !business && phone) {
                setError("Business not found");
            }
        }
    }["CustomerChatPage.useEffect"], [
        businessLoading,
        business,
        phone
    ]);
    // Business is always online - no real-time status updates needed
    // Search for existing conversation when email is entered
    const handleEmailSearch = async (email)=>{
        if (!business) return;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address");
            return;
        }
        setError("");
        setIsSearching(true);
        try {
            const existingConversation = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].getConversationByBusinessAndEmail(business.id, email.trim());
            if (existingConversation) {
                if (existingConversation.customerName) {
                    setCustomerName(existingConversation.customerName);
                }
                setCurrentConversation(existingConversation);
                setShowEmailPrompt(false);
                setShowNameInput(false);
            } else {
                setShowNameInput(true);
            }
        } catch (err) {
            console.error("Error searching for conversation:", err);
            setError("An error occurred. Please try again.");
        } finally{
            setIsSearching(false);
        }
    };
    const handleStartChat = async (e)=>{
        if (e) {
            e.preventDefault();
        }
        if (!business) return;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(customerEmail.trim())) {
            setError("Please enter a valid email address");
            return;
        }
        if (!showNameInput && !currentConversation) {
            await handleEmailSearch(customerEmail);
            return;
        }
        if (showNameInput && !customerName.trim()) {
            setError("Please provide your name");
            return;
        }
        setError("");
        if (currentConversation) {
            if (customerName.trim() && currentConversation.customerName !== customerName.trim()) {
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].updateConversation(currentConversation.id, {
                    customerName: customerName.trim()
                });
                const updated = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].getConversationById(currentConversation.id);
                if (updated) {
                    setCurrentConversation(updated);
                }
            }
            setShowEmailPrompt(false);
            return;
        }
        // New user - create conversation
        const newConversation = {
            id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
            businessId: business.id,
            customerEmail: customerEmail.trim(),
            customerName: customerName.trim(),
            createdAt: new Date().toISOString(),
            lastMessageAt: new Date().toISOString(),
            messages: []
        };
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].createConversation(newConversation);
            const created = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].getConversationById(newConversation.id);
            if (created) {
                setCurrentConversation(created);
                setShowEmailPrompt(false);
                setShowNameInput(false);
            }
        } catch (err) {
            console.error("Error creating conversation:", err);
            setError("Failed to start chat. Please try again.");
        }
    };
    // Set up real-time subscription when conversation is loaded
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CustomerChatPage.useEffect": ()=>{
            if (!currentConversation?.id) return;
            const handleTyping = {
                "CustomerChatPage.useEffect.handleTyping": (senderType)=>{
                    if (senderType === "business") {
                        setOtherUserTyping(true);
                        if (otherUserTypingTimeoutRef.current) {
                            clearTimeout(otherUserTypingTimeoutRef.current);
                        }
                        otherUserTypingTimeoutRef.current = setTimeout({
                            "CustomerChatPage.useEffect.handleTyping": ()=>{
                                setOtherUserTyping(false);
                            }
                        }["CustomerChatPage.useEffect.handleTyping"], 3000);
                    }
                }
            }["CustomerChatPage.useEffect.handleTyping"];
            const handleMessageUpdate = {
                "CustomerChatPage.useEffect.handleMessageUpdate": (message)=>{
                    console.log("📨 Real-time message update received (customer):", message);
                    // Use functional update to always work with latest state
                    setCurrentConversation({
                        "CustomerChatPage.useEffect.handleMessageUpdate": (prev)=>{
                            if (!prev) return prev;
                            // Check if message already exists (might be from optimistic update)
                            const existingIndex = prev.messages.findIndex({
                                "CustomerChatPage.useEffect.handleMessageUpdate.existingIndex": (m)=>m.id === message.id
                            }["CustomerChatPage.useEffect.handleMessageUpdate.existingIndex"]);
                            let updatedMessages;
                            if (existingIndex >= 0) {
                                // Update existing message (replace optimistic with real)
                                updatedMessages = [
                                    ...prev.messages
                                ];
                                updatedMessages[existingIndex] = message;
                            } else {
                                // Add new message (from other user or real-time sync)
                                updatedMessages = [
                                    ...prev.messages,
                                    message
                                ];
                            }
                            // Sort by creation time
                            updatedMessages.sort({
                                "CustomerChatPage.useEffect.handleMessageUpdate": (a, b)=>new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                            }["CustomerChatPage.useEffect.handleMessageUpdate"]);
                            return {
                                ...prev,
                                messages: updatedMessages,
                                lastMessageAt: message.createdAt
                            };
                        }
                    }["CustomerChatPage.useEffect.handleMessageUpdate"]);
                }
            }["CustomerChatPage.useEffect.handleMessageUpdate"];
            const handleMessageDelete = {
                "CustomerChatPage.useEffect.handleMessageDelete": (messageId)=>{
                    console.log("🗑️ Real-time message delete received (customer):", messageId);
                    setCurrentConversation({
                        "CustomerChatPage.useEffect.handleMessageDelete": (prev)=>{
                            if (!prev) return prev;
                            return {
                                ...prev,
                                messages: prev.messages.filter({
                                    "CustomerChatPage.useEffect.handleMessageDelete": (m)=>m.id !== messageId
                                }["CustomerChatPage.useEffect.handleMessageDelete"])
                            };
                        }
                    }["CustomerChatPage.useEffect.handleMessageDelete"]);
                }
            }["CustomerChatPage.useEffect.handleMessageDelete"];
            const handleConversationUpdate = {
                "CustomerChatPage.useEffect.handleConversationUpdate": async ()=>{
                    if (!currentConversation?.id) return;
                    // Merge messages instead of replacing - preserve optimistic updates
                    const updated = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].getConversationById(currentConversation.id);
                    if (updated) {
                        setCurrentConversation({
                            "CustomerChatPage.useEffect.handleConversationUpdate": (prev)=>{
                                if (!prev) return updated;
                                // Merge messages: keep optimistic messages, add/update real ones
                                const messageMap = new Map();
                                // First, add all existing messages (including optimistic ones)
                                prev.messages.forEach({
                                    "CustomerChatPage.useEffect.handleConversationUpdate": (msg)=>{
                                        messageMap.set(msg.id, msg);
                                    }
                                }["CustomerChatPage.useEffect.handleConversationUpdate"]);
                                // Then, update with real messages from database
                                updated.messages.forEach({
                                    "CustomerChatPage.useEffect.handleConversationUpdate": (msg)=>{
                                        messageMap.set(msg.id, msg);
                                    }
                                }["CustomerChatPage.useEffect.handleConversationUpdate"]);
                                const mergedMessages = Array.from(messageMap.values()).sort({
                                    "CustomerChatPage.useEffect.handleConversationUpdate.mergedMessages": (a, b)=>new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                                }["CustomerChatPage.useEffect.handleConversationUpdate.mergedMessages"]);
                                return {
                                    ...updated,
                                    messages: mergedMessages
                                };
                            }
                        }["CustomerChatPage.useEffect.handleConversationUpdate"]);
                    }
                }
            }["CustomerChatPage.useEffect.handleConversationUpdate"];
            const cleanup = setupConversationChannel(currentConversation.id, "customer", "customer", handleTyping, handleMessageUpdate, handleMessageDelete, handleConversationUpdate);
            return cleanup;
        }
    }["CustomerChatPage.useEffect"], [
        currentConversation?.id,
        setupConversationChannel
    ]);
    // Auto-scroll to bottom when messages change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CustomerChatPage.useEffect": ()=>{
            if (currentConversation?.messages) {
                messagesEndRef.current?.scrollIntoView({
                    behavior: "smooth"
                });
            }
        }
    }["CustomerChatPage.useEffect"], [
        currentConversation?.messages
    ]);
    // Fallback: Poll for new messages if WebSocket fails
    const lastMessageCountRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CustomerChatPage.useEffect": ()=>{
            if (!currentConversation?.id || connectionStatus === "connected") {
                lastMessageCountRef.current = currentConversation?.messages.length || 0;
                return;
            }
            const pollInterval = setInterval({
                "CustomerChatPage.useEffect.pollInterval": async ()=>{
                    if (!currentConversation.id) return;
                    try {
                        const updated = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].getConversationById(currentConversation.id);
                        if (updated && updated.messages.length > lastMessageCountRef.current) {
                            lastMessageCountRef.current = updated.messages.length;
                            setCurrentConversation(updated);
                        }
                    } catch (error) {
                        console.error("Error polling for messages:", error);
                    }
                }
            }["CustomerChatPage.useEffect.pollInterval"], 2000) // Poll every 2 seconds as fallback
            ;
            return ({
                "CustomerChatPage.useEffect": ()=>{
                    clearInterval(pollInterval);
                }
            })["CustomerChatPage.useEffect"];
        }
    }["CustomerChatPage.useEffect"], [
        currentConversation?.id,
        connectionStatus,
        currentConversation?.messages.length
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CustomerChatPage.useEffect": ()=>{
            messagesEndRef.current?.scrollIntoView({
                behavior: "smooth"
            });
        }
    }["CustomerChatPage.useEffect"], [
        currentConversation?.messages
    ]);
    // Mark messages as read when conversation is viewed
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CustomerChatPage.useEffect": ()=>{
            if (!currentConversation?.id || !business) return;
            const markAsRead = {
                "CustomerChatPage.useEffect.markAsRead": async ()=>{
                    try {
                        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].markMessagesAsRead(currentConversation.id, "business");
                        const updated = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].getConversationById(currentConversation.id);
                        if (updated) {
                            setCurrentConversation(updated);
                        }
                    } catch (error) {
                        console.error("Error marking messages as read:", error);
                    }
                }
            }["CustomerChatPage.useEffect.markAsRead"];
            const timeout = setTimeout(markAsRead, 500);
            return ({
                "CustomerChatPage.useEffect": ()=>clearTimeout(timeout)
            })["CustomerChatPage.useEffect"];
        }
    }["CustomerChatPage.useEffect"], [
        currentConversation?.id,
        business?.id
    ]);
    // Cleanup typing timeout on unmount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CustomerChatPage.useEffect": ()=>{
            return ({
                "CustomerChatPage.useEffect": ()=>{
                    if (typingTimeoutRef.current) {
                        clearTimeout(typingTimeoutRef.current);
                    }
                    if (otherUserTypingTimeoutRef.current) {
                        clearTimeout(otherUserTypingTimeoutRef.current);
                    }
                }
            })["CustomerChatPage.useEffect"];
        }
    }["CustomerChatPage.useEffect"], []);
    const handleSendMessage = async (text, replyToId)=>{
        if (!currentConversation) return;
        if (isSending) return;
        setIsSending(true);
        const tempId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])();
        const newMessage = {
            id: tempId,
            conversationId: currentConversation.id,
            senderType: "customer",
            senderId: "customer",
            text,
            status: "sent",
            createdAt: new Date().toISOString(),
            replyToId: replyToId || undefined
        };
        // Optimistic update: Show message immediately using functional update
        setCurrentConversation((prev)=>{
            if (!prev) return prev;
            const updatedMessages = [
                ...prev.messages,
                newMessage
            ].sort((a, b)=>new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
            return {
                ...prev,
                messages: updatedMessages,
                lastMessageAt: newMessage.createdAt
            };
        });
        setIsTyping(false);
        try {
            // Send message to server
            const createdMessage = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].createMessage(newMessage);
            console.log("✅ Message created on server:", createdMessage);
            // Replace temp message with real message (with server ID) using functional update
            // The real-time handler will also receive this, but we update immediately to avoid flicker
            setCurrentConversation((prev)=>{
                if (!prev) return prev;
                const updatedMessages = prev.messages.map((m)=>m.id === tempId ? createdMessage : m).sort((a, b)=>new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
                return {
                    ...prev,
                    messages: updatedMessages,
                    lastMessageAt: createdMessage.createdAt
                };
            });
        } catch (error) {
            console.error("❌ Failed to send message:", error);
            // Rollback optimistic update on error using functional update
            setCurrentConversation((prev)=>{
                if (!prev) return prev;
                return {
                    ...prev,
                    messages: prev.messages.filter((m)=>m.id !== tempId)
                };
            });
            // Show error to user
            setError("Failed to send message. Please try again.");
            setTimeout(()=>setError(""), 3000);
        } finally{
            setIsSending(false);
            setReplyTo(null);
        }
    };
    const handleSendImage = async (imageUrl, replyToId)=>{
        if (!currentConversation) return;
        if (isSending) return;
        setIsSending(true);
        const tempId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])();
        const newMessage = {
            id: tempId,
            conversationId: currentConversation.id,
            senderType: "customer",
            senderId: "customer",
            imageUrl,
            status: "sent",
            createdAt: new Date().toISOString(),
            replyToId: replyToId || undefined
        };
        // Optimistic update: Show image immediately using functional update
        setCurrentConversation((prev)=>{
            if (!prev) return prev;
            const updatedMessages = [
                ...prev.messages,
                newMessage
            ].sort((a, b)=>new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
            return {
                ...prev,
                messages: updatedMessages,
                lastMessageAt: newMessage.createdAt
            };
        });
        setIsTyping(false);
        try {
            const createdMessage = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].createMessage(newMessage);
            console.log("✅ Image message created on server:", createdMessage);
            // Replace temp message with real message (with server ID) using functional update
            setCurrentConversation((prev)=>{
                if (!prev) return prev;
                const updatedMessages = prev.messages.map((m)=>m.id === tempId ? createdMessage : m).sort((a, b)=>new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
                return {
                    ...prev,
                    messages: updatedMessages,
                    lastMessageAt: createdMessage.createdAt
                };
            });
        } catch (error) {
            console.error("❌ Failed to send image:", error);
            // Rollback optimistic update on error using functional update
            setCurrentConversation((prev)=>{
                if (!prev) return prev;
                return {
                    ...prev,
                    messages: prev.messages.filter((m)=>m.id !== tempId)
                };
            });
            setError("Failed to send image. Please try again.");
            setTimeout(()=>setError(""), 3000);
        } finally{
            setIsSending(false);
            setReplyTo(null);
        }
    };
    const handleTyping = ()=>{
        setIsTyping(true);
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }
        typingTimeoutRef.current = setTimeout(()=>{
            setIsTyping(false);
        }, 3000);
        // Broadcast typing status
        if (currentConversation?.id) {
            broadcastTyping(currentConversation.id, "customer");
        }
    };
    if (businessLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 text-slate-600 dark:text-slate-400",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                        className: "w-5 h-5 animate-spin"
                    }, void 0, false, {
                        fileName: "[project]/app/chat/[phone]/page.tsx",
                        lineNumber: 515,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "Loading..."
                    }, void 0, false, {
                        fileName: "[project]/app/chat/[phone]/page.tsx",
                        lineNumber: 516,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/chat/[phone]/page.tsx",
                lineNumber: 514,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/chat/[phone]/page.tsx",
            lineNumber: 513,
            columnNumber: 7
        }, this);
    }
    if (error || !business) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "h-screen flex items-center justify-center bg-background p-4",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                        className: "w-12 h-12 text-destructive mx-auto mb-4"
                    }, void 0, false, {
                        fileName: "[project]/app/chat/[phone]/page.tsx",
                        lineNumber: 526,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-bold mb-2",
                        children: "Error"
                    }, void 0, false, {
                        fileName: "[project]/app/chat/[phone]/page.tsx",
                        lineNumber: 527,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-muted-foreground",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/app/chat/[phone]/page.tsx",
                        lineNumber: 528,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/chat/[phone]/page.tsx",
                lineNumber: 525,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/chat/[phone]/page.tsx",
            lineNumber: 524,
            columnNumber: 7
        }, this);
    }
    if (showEmailPrompt) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 p-4",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    opacity: 0,
                    y: 20
                },
                animate: {
                    opacity: 1,
                    y: 0
                },
                transition: {
                    duration: 0.3
                },
                className: "w-full max-w-md",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-gradient-to-br from-primary/10 via-primary/5 to-transparent dark:from-primary/20 dark:via-primary/10 p-6 text-center border-b border-slate-200 dark:border-slate-800",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        scale: 0.9
                                    },
                                    animate: {
                                        scale: 1
                                    },
                                    transition: {
                                        delay: 0.1
                                    },
                                    className: "flex justify-center mb-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            src: "/logo.png",
                                            alt: "Leenk",
                                            width: 80,
                                            height: 80,
                                            className: "object-contain drop-shadow-lg"
                                        }, void 0, false, {
                                            fileName: "[project]/app/chat/[phone]/page.tsx",
                                            lineNumber: 553,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/chat/[phone]/page.tsx",
                                        lineNumber: 552,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/chat/[phone]/page.tsx",
                                    lineNumber: 546,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].h2, {
                                    initial: {
                                        opacity: 0
                                    },
                                    animate: {
                                        opacity: 1
                                    },
                                    transition: {
                                        delay: 0.2
                                    },
                                    className: "text-2xl font-bold text-slate-900 dark:text-white mb-3",
                                    children: business.businessName
                                }, void 0, false, {
                                    fileName: "[project]/app/chat/[phone]/page.tsx",
                                    lineNumber: 563,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        opacity: 0
                                    },
                                    animate: {
                                        opacity: 1
                                    },
                                    transition: {
                                        delay: 0.3
                                    },
                                    className: "flex items-center justify-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-2 h-2 rounded-full bg-green-500 animate-pulse"
                                        }, void 0, false, {
                                            fileName: "[project]/app/chat/[phone]/page.tsx",
                                            lineNumber: 578,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm font-medium text-slate-600 dark:text-slate-400",
                                            children: "Online"
                                        }, void 0, false, {
                                            fileName: "[project]/app/chat/[phone]/page.tsx",
                                            lineNumber: 579,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/chat/[phone]/page.tsx",
                                    lineNumber: 572,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/chat/[phone]/page.tsx",
                            lineNumber: 545,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-6 md:p-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                    onSubmit: handleStartChat,
                                    className: "space-y-5",
                                    children: [
                                        error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                            initial: {
                                                opacity: 0,
                                                y: -10
                                            },
                                            animate: {
                                                opacity: 1,
                                                y: 0
                                            },
                                            className: "p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                                    className: "w-4 h-4 flex-shrink-0"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/chat/[phone]/page.tsx",
                                                    lineNumber: 594,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: error
                                                }, void 0, false, {
                                                    fileName: "[project]/app/chat/[phone]/page.tsx",
                                                    lineNumber: 595,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/chat/[phone]/page.tsx",
                                            lineNumber: 589,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block text-sm font-semibold text-slate-700 dark:text-slate-300",
                                                    children: [
                                                        "Email Address ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-red-500",
                                                            children: "*"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/chat/[phone]/page.tsx",
                                                            lineNumber: 602,
                                                            columnNumber: 35
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/chat/[phone]/page.tsx",
                                                    lineNumber: 601,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "relative",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__["Mail"], {
                                                            className: "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/chat/[phone]/page.tsx",
                                                            lineNumber: 605,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "email",
                                                            value: customerEmail,
                                                            onChange: (e)=>{
                                                                setCustomerEmail(e.target.value);
                                                                setError("");
                                                            },
                                                            onBlur: (e)=>{
                                                                if (e.target.value.trim()) {
                                                                    handleEmailSearch(e.target.value);
                                                                }
                                                            },
                                                            onKeyDown: (e)=>{
                                                                if (e.key === "Enter" && customerEmail.trim() && !showNameInput) {
                                                                    e.preventDefault();
                                                                    handleEmailSearch(customerEmail);
                                                                }
                                                            },
                                                            placeholder: "your@email.com",
                                                            className: "w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 pl-11 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed",
                                                            required: true,
                                                            disabled: isSearching
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/chat/[phone]/page.tsx",
                                                            lineNumber: 606,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/chat/[phone]/page.tsx",
                                                    lineNumber: 604,
                                                    columnNumber: 19
                                                }, this),
                                                isSearching && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                            className: "w-3 h-3 animate-spin"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/chat/[phone]/page.tsx",
                                                            lineNumber: 632,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "Searching for existing conversations..."
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/chat/[phone]/page.tsx",
                                                            lineNumber: 633,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/chat/[phone]/page.tsx",
                                                    lineNumber: 631,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/chat/[phone]/page.tsx",
                                            lineNumber: 600,
                                            columnNumber: 17
                                        }, this),
                                        showNameInput && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                            initial: {
                                                opacity: 0,
                                                height: 0
                                            },
                                            animate: {
                                                opacity: 1,
                                                height: "auto"
                                            },
                                            exit: {
                                                opacity: 0,
                                                height: 0
                                            },
                                            transition: {
                                                duration: 0.3
                                            },
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block text-sm font-semibold text-slate-700 dark:text-slate-300",
                                                    children: [
                                                        "Your Name ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-red-500",
                                                            children: "*"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/chat/[phone]/page.tsx",
                                                            lineNumber: 648,
                                                            columnNumber: 33
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/chat/[phone]/page.tsx",
                                                    lineNumber: 647,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "relative",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                                            className: "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/chat/[phone]/page.tsx",
                                                            lineNumber: 651,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "text",
                                                            value: customerName,
                                                            onChange: (e)=>{
                                                                setCustomerName(e.target.value);
                                                                setError("");
                                                            },
                                                            placeholder: "John Doe",
                                                            className: "w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 pl-11 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all",
                                                            required: true,
                                                            autoFocus: true
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/chat/[phone]/page.tsx",
                                                            lineNumber: 652,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/chat/[phone]/page.tsx",
                                                    lineNumber: 650,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/chat/[phone]/page.tsx",
                                            lineNumber: 640,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            type: "submit",
                                            className: "w-full h-12 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
                                            disabled: isSearching || !customerEmail.trim() || showNameInput && !customerName.trim(),
                                            children: isSearching ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                        className: "w-4 h-4 animate-spin"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/chat/[phone]/page.tsx",
                                                        lineNumber: 676,
                                                        columnNumber: 23
                                                    }, this),
                                                    "Searching..."
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/chat/[phone]/page.tsx",
                                                lineNumber: 675,
                                                columnNumber: 21
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: showNameInput ? "Start Chat" : "Continue"
                                            }, void 0, false, {
                                                fileName: "[project]/app/chat/[phone]/page.tsx",
                                                lineNumber: 680,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/chat/[phone]/page.tsx",
                                            lineNumber: 669,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/chat/[phone]/page.tsx",
                                    lineNumber: 587,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-center text-slate-500 dark:text-slate-400 mt-6",
                                    children: [
                                        "By continuing, you agree to start a conversation with ",
                                        business.businessName
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/chat/[phone]/page.tsx",
                                    lineNumber: 686,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/chat/[phone]/page.tsx",
                            lineNumber: 586,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/chat/[phone]/page.tsx",
                    lineNumber: 543,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/chat/[phone]/page.tsx",
                lineNumber: 537,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/chat/[phone]/page.tsx",
            lineNumber: 536,
            columnNumber: 7
        }, this);
    }
    if (!currentConversation) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "h-screen flex flex-col bg-[var(--chat-bg)] dark:bg-[var(--chat-bg)] relative",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$wallpaper$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Wallpaper"], {}, void 0, false, {
                    fileName: "[project]/app/chat/[phone]/page.tsx",
                    lineNumber: 699,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative z-10",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0,
                            y: -20
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        className: "border-b border-border bg-card/80 backdrop-blur-sm p-3 md:p-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Avatar"], {
                                    src: business.businessLogo,
                                    name: business.businessName,
                                    size: "md"
                                }, void 0, false, {
                                    fileName: "[project]/app/chat/[phone]/page.tsx",
                                    lineNumber: 707,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "font-semibold text-lg text-foreground",
                                            children: business.businessName
                                        }, void 0, false, {
                                            fileName: "[project]/app/chat/[phone]/page.tsx",
                                            lineNumber: 709,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-2 h-2 rounded-full bg-green-500 animate-pulse"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/chat/[phone]/page.tsx",
                                                    lineNumber: 711,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-muted-foreground",
                                                    children: "Online"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/chat/[phone]/page.tsx",
                                                    lineNumber: 712,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/chat/[phone]/page.tsx",
                                            lineNumber: 710,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/chat/[phone]/page.tsx",
                                    lineNumber: 708,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/chat/[phone]/page.tsx",
                            lineNumber: 706,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/chat/[phone]/page.tsx",
                        lineNumber: 701,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/chat/[phone]/page.tsx",
                    lineNumber: 700,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/chat/[phone]/page.tsx",
            lineNumber: 698,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "h-screen flex flex-col bg-[var(--chat-bg)] dark:bg-[var(--chat-bg)] relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$wallpaper$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Wallpaper"], {}, void 0, false, {
                fileName: "[project]/app/chat/[phone]/page.tsx",
                lineNumber: 724,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    opacity: 0,
                    y: -20
                },
                animate: {
                    opacity: 1,
                    y: 0
                },
                className: "sticky top-0 z-20 border-b border-border bg-card/80 backdrop-blur-sm p-3 md:p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Avatar"], {
                            src: business.businessLogo,
                            name: business.businessName,
                            size: "md"
                        }, void 0, false, {
                            fileName: "[project]/app/chat/[phone]/page.tsx",
                            lineNumber: 732,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "font-semibold text-lg text-foreground",
                                    children: business.businessName
                                }, void 0, false, {
                                    fileName: "[project]/app/chat/[phone]/page.tsx",
                                    lineNumber: 734,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-2 h-2 rounded-full bg-green-500 animate-pulse"
                                        }, void 0, false, {
                                            fileName: "[project]/app/chat/[phone]/page.tsx",
                                            lineNumber: 736,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-muted-foreground",
                                            children: [
                                                "Online",
                                                connectionStatus === "connected" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "ml-2 text-primary",
                                                    title: "Real-time connected",
                                                    children: "●"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/chat/[phone]/page.tsx",
                                                    lineNumber: 740,
                                                    columnNumber: 17
                                                }, this),
                                                connectionStatus === "disconnected" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "ml-2 text-yellow-500",
                                                    title: "Reconnecting...",
                                                    children: "●"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/chat/[phone]/page.tsx",
                                                    lineNumber: 743,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/chat/[phone]/page.tsx",
                                            lineNumber: 737,
                                            columnNumber: 13
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/chat/[phone]/page.tsx",
                                    lineNumber: 735,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/chat/[phone]/page.tsx",
                            lineNumber: 733,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/chat/[phone]/page.tsx",
                    lineNumber: 731,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/chat/[phone]/page.tsx",
                lineNumber: 726,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    opacity: 0
                },
                animate: {
                    opacity: 1
                },
                className: "flex-1 overflow-y-auto p-3 md:p-4 space-y-2 relative z-0",
                children: [
                    !currentConversation || currentConversation.messages.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-center h-full text-muted-foreground text-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: [
                                "Start a conversation with ",
                                business.businessName
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/chat/[phone]/page.tsx",
                            lineNumber: 759,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/chat/[phone]/page.tsx",
                        lineNumber: 758,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            currentConversation.messages.map((msg, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$chat$2d$bubble$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChatBubble"], {
                                    message: msg,
                                    isOwn: msg.senderType === "customer",
                                    index: idx,
                                    onReply: setReplyTo
                                }, msg.id, false, {
                                    fileName: "[project]/app/chat/[phone]/page.tsx",
                                    lineNumber: 764,
                                    columnNumber: 15
                                }, this)),
                            otherUserTyping && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$typing$2d$indicator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TypingIndicator"], {
                                isOwn: false
                            }, void 0, false, {
                                fileName: "[project]/app/chat/[phone]/page.tsx",
                                lineNumber: 772,
                                columnNumber: 33
                            }, this)
                        ]
                    }, void 0, true),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: messagesEndRef
                    }, void 0, false, {
                        fileName: "[project]/app/chat/[phone]/page.tsx",
                        lineNumber: 775,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/chat/[phone]/page.tsx",
                lineNumber: 752,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "sticky bottom-0 z-20 bg-card/80 backdrop-blur-sm border-t border-border",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$message$2d$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MessageInput"], {
                    onSendMessage: handleSendMessage,
                    onSendImage: handleSendImage,
                    onTyping: handleTyping,
                    disabled: isSending || !currentConversation,
                    replyTo: replyTo,
                    onCancelReply: ()=>setReplyTo(null)
                }, void 0, false, {
                    fileName: "[project]/app/chat/[phone]/page.tsx",
                    lineNumber: 780,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/chat/[phone]/page.tsx",
                lineNumber: 779,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/chat/[phone]/page.tsx",
        lineNumber: 723,
        columnNumber: 5
    }, this);
}
_s(CustomerChatPage, "aV+/SNKNsyIO8WI90rGX7dIdU0o=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$use$2d$business$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBusinessByPhone"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$use$2d$realtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRealtime"]
    ];
});
_c = CustomerChatPage;
var _c;
__turbopack_context__.k.register(_c, "CustomerChatPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_f6b13aad._.js.map