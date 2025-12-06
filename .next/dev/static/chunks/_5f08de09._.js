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
"[project]/components/chat-bubble.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChatBubble",
    ()=>ChatBubble
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CircleCheck>");
"use client";
;
;
;
;
function ChatBubble({ message, isOwn, index }) {
    const getStatusIcon = ()=>{
        if (!isOwn) return null;
        switch(message.status){
            case "sent":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleCheck$3e$__["CircleCheck"], {
                    className: "w-3 h-3 opacity-70"
                }, void 0, false, {
                    fileName: "[project]/components/chat-bubble.tsx",
                    lineNumber: 20,
                    columnNumber: 16
                }, this);
            case "delivered":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                    className: "w-3.5 h-3.5 opacity-70"
                }, void 0, false, {
                    fileName: "[project]/components/chat-bubble.tsx",
                    lineNumber: 22,
                    columnNumber: 16
                }, this);
            case "read":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                    className: "w-3.5 h-3.5 text-primary"
                }, void 0, false, {
                    fileName: "[project]/components/chat-bubble.tsx",
                    lineNumber: 24,
                    columnNumber: 16
                }, this);
            default:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleCheck$3e$__["CircleCheck"], {
                    className: "w-3 h-3 opacity-70"
                }, void 0, false, {
                    fileName: "[project]/components/chat-bubble.tsx",
                    lineNumber: 26,
                    columnNumber: 16
                }, this);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
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
        className: `flex ${isOwn ? "justify-end" : "justify-start"} mb-3`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `max-w-[80%] md:max-w-md lg:max-w-lg px-3 md:px-4 py-2 rounded-lg ${isOwn ? "bg-[var(--chat-sent)] text-[var(--chat-sent-text)] rounded-br-none ml-auto dark:bg-[var(--chat-sent)] dark:text-[var(--chat-sent-text)]" : "bg-[var(--chat-received)] text-[var(--chat-received-text)] rounded-bl-none dark:bg-[var(--chat-received)] dark:text-[var(--chat-received-text)]"}`,
            children: [
                message.text && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm md:text-base break-words",
                    children: message.text
                }, void 0, false, {
                    fileName: "[project]/components/chat-bubble.tsx",
                    lineNumber: 44,
                    columnNumber: 26
                }, this),
                message.imageUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative w-48 h-48 rounded-lg overflow-hidden mb-2",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        src: message.imageUrl || "/placeholder.svg",
                        alt: "Chat image",
                        fill: true,
                        className: "object-cover"
                    }, void 0, false, {
                        fileName: "[project]/components/chat-bubble.tsx",
                        lineNumber: 47,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/chat-bubble.tsx",
                    lineNumber: 46,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-1.5 mt-1 justify-end",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: `text-xs opacity-70`,
                            children: new Date(message.createdAt).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit"
                            })
                        }, void 0, false, {
                            fileName: "[project]/components/chat-bubble.tsx",
                            lineNumber: 51,
                            columnNumber: 11
                        }, this),
                        getStatusIcon()
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/chat-bubble.tsx",
                    lineNumber: 50,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/chat-bubble.tsx",
            lineNumber: 37,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/chat-bubble.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}
_c = ChatBubble;
var _c;
__turbopack_context__.k.register(_c, "ChatBubble");
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function MessageInput({ onSendMessage, onSendImage, onTyping, disabled }) {
    _s();
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const typingTimeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
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
            onSendMessage(message);
            setMessage("");
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
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };
    const handleImageSelect = (e)=>{
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event)=>{
                const imageUrl = event.target?.result;
                onSendImage(imageUrl);
            };
            reader.readAsDataURL(file);
        }
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
        className: "p-2 md:p-4 flex gap-2",
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
                    lineNumber: 79,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/message-input.tsx",
                lineNumber: 73,
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
                lineNumber: 81,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                value: message,
                onChange: handleChange,
                onKeyDown: handleKeyDown,
                placeholder: "Type a message...",
                disabled: disabled,
                className: "flex-1 bg-input border border-border rounded-lg px-3 md:px-4 py-2 md:py-2.5 resize-none focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 text-foreground placeholder:text-muted-foreground text-sm md:text-base",
                rows: 1
            }, void 0, false, {
                fileName: "[project]/components/message-input.tsx",
                lineNumber: 82,
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
                    lineNumber: 97,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/message-input.tsx",
                lineNumber: 91,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/message-input.tsx",
        lineNumber: 68,
        columnNumber: 5
    }, this);
}
_s(MessageInput, "Xdsg+dYsG8JfE5DnA3mDA8VSibQ=");
_c = MessageInput;
var _c;
__turbopack_context__.k.register(_c, "MessageInput");
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
                className: "object-cover"
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
        lineNumber: 56,
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
"[project]/components/conversation-list.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ConversationList",
    ()=>ConversationList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$formatDistanceToNow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/formatDistanceToNow.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/avatar.tsx [app-client] (ecmascript)");
"use client";
;
;
;
;
;
function ConversationList({ conversations, selectedId }) {
    const sorted = [
        ...conversations
    ].sort((a, b)=>new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime());
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        className: "flex flex-col overflow-y-auto",
        children: sorted.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center h-full text-muted-foreground p-4 text-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: "No conversations yet. Start a new chat to begin."
            }, void 0, false, {
                fileName: "[project]/components/conversation-list.tsx",
                lineNumber: 23,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/conversation-list.tsx",
            lineNumber: 22,
            columnNumber: 9
        }, this) : sorted.map((conv, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    opacity: 0,
                    x: -20
                },
                animate: {
                    opacity: 1,
                    x: 0
                },
                transition: {
                    delay: index * 0.05
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: `/dashboard/${conv.id}`,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `p-3 md:p-4 border-b border-border hover:bg-secondary transition-colors cursor-pointer active:bg-secondary/50 ${selectedId === conv.id ? "bg-secondary" : ""}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-3 items-start",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Avatar"], {
                                    name: conv.customerName || conv.customerEmail,
                                    size: "md"
                                }, void 0, false, {
                                    fileName: "[project]/components/conversation-list.tsx",
                                    lineNumber: 40,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 min-w-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between items-start mb-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-medium text-foreground truncate",
                                                    children: conv.customerName || conv.customerEmail
                                                }, void 0, false, {
                                                    fileName: "[project]/components/conversation-list.tsx",
                                                    lineNumber: 43,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs text-muted-foreground whitespace-nowrap ml-2",
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$formatDistanceToNow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDistanceToNow"])(new Date(conv.lastMessageAt), {
                                                        addSuffix: true
                                                    })
                                                }, void 0, false, {
                                                    fileName: "[project]/components/conversation-list.tsx",
                                                    lineNumber: 44,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/conversation-list.tsx",
                                            lineNumber: 42,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-muted-foreground truncate mb-1",
                                            children: conv.customerEmail
                                        }, void 0, false, {
                                            fileName: "[project]/components/conversation-list.tsx",
                                            lineNumber: 48,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-muted-foreground truncate",
                                            children: conv.messages[conv.messages.length - 1]?.text || "No messages"
                                        }, void 0, false, {
                                            fileName: "[project]/components/conversation-list.tsx",
                                            lineNumber: 49,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/conversation-list.tsx",
                                    lineNumber: 41,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/conversation-list.tsx",
                            lineNumber: 39,
                            columnNumber: 17
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/conversation-list.tsx",
                        lineNumber: 34,
                        columnNumber: 15
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/conversation-list.tsx",
                    lineNumber: 33,
                    columnNumber: 13
                }, this)
            }, conv.id, false, {
                fileName: "[project]/components/conversation-list.tsx",
                lineNumber: 27,
                columnNumber: 11
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/conversation-list.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_c = ConversationList;
var _c;
__turbopack_context__.k.register(_c, "ConversationList");
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
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createBrowserClient"])(("TURBOPACK compile-time value", "https://gvliedhyogzxwcbpljrk.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd2bGllZGh5b2d6eHdjYnBsanJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwMzQ4NDYsImV4cCI6MjA4MDYxMDg0Nn0.c3IWCeoG_iZlyxCjgox484TCbBJLVhqIOa6k0QJQumc"));
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
        online: false,
        createdAt: db.created_at
    };
}
// Convert App Business to DB Business
function appBusinessToDB(business, passwordHash) {
    return {
        email: business.email,
        password_hash: passwordHash || "",
        business_name: business.businessName || null,
        phone: business.phone || null,
        address: business.address || null,
        business_logo: business.businessLogo || null
    };
}
// Convert DB Conversation to App Conversation (with messages)
async function dbConversationToApp(db, messages = []) {
    const appMessages = messages.map((m)=>({
            id: m.id,
            conversationId: m.conversation_id,
            senderType: m.sender_type,
            senderId: m.sender_id,
            text: m.content || undefined,
            imageUrl: m.image_url || undefined,
            status: m.status || "sent",
            createdAt: m.created_at
        }));
    return {
        id: db.id,
        businessId: db.business_id,
        customerEmail: db.customer_email,
        customerName: db.customer_name || undefined,
        createdAt: db.created_at,
        lastMessageAt: db.updated_at,
        messages: appMessages
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
        status: message.status || "sent"
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
        const { data, error } = await supabase.from("businesses").update(dbData).eq("id", id).select().single();
        if (error || !data) return null;
        return dbBusinessToApp(data);
    },
    // Conversations
    async getConversationsByBusinessId (businessId) {
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
        const { data: conversations, error } = await supabase.from("conversations").select("*").eq("business_id", businessId).order("updated_at", {
            ascending: false
        });
        if (error || !conversations || conversations.length === 0) return [];
        // Performance optimization: Only load the last message per conversation
        // For the conversation list view, we only need the most recent message as a preview
        // This dramatically reduces data transfer and improves load times
        const conversationIds = conversations.map((c)=>c.id);
        // Batch fetch last messages in parallel for better performance
        // Using Promise.all ensures all queries run concurrently
        const lastMessagesPromises = conversationIds.map(async (conversationId)=>{
            const { data: messages, error: msgError } = await supabase.from("messages").select("*").eq("conversation_id", conversationId).order("created_at", {
                ascending: false
            }).limit(1);
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
        const lastMessagesResults = await Promise.all(lastMessagesPromises);
        const messagesMap = new Map();
        lastMessagesResults.forEach(({ conversationId, messages })=>{
            if (messages.length > 0) {
                messagesMap.set(conversationId, messages);
            }
        });
        return Promise.all(conversations.map((conv)=>dbConversationToApp(conv, messagesMap.get(conv.id) || [])));
    },
    async getConversationById (id) {
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
        const { data: conversation, error } = await supabase.from("conversations").select("*").eq("id", id).single();
        if (error || !conversation) return null;
        const { data: messages } = await supabase.from("messages").select("*").eq("conversation_id", id).order("created_at", {
            ascending: true
        });
        return dbConversationToApp(conversation, messages || []);
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
            status: message.status || "sent"
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
            createdAt: data.created_at
        };
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
            const authUser = {
                id: authData.user.id,
                email: authData.user.email,
                business
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
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].updateBusiness(id, updates);
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
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].updateConversation(id, updates);
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
                                createdAt: dbMessage.created_at
                            };
                            // Mark as delivered if it's a new message from the other user
                            const otherSenderType = senderType === "business" ? "customer" : "business";
                            if (payload.eventType === "INSERT" && newMessage.senderType === otherSenderType) {
                                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].updateMessageStatus(newMessage.id, "delivered");
                            }
                            if (onMessageUpdate) {
                                onMessageUpdate(newMessage);
                            }
                        } catch (error) {
                            console.error("Error processing real-time message:", error);
                        }
                    } else if (payload.eventType === "DELETE") {
                        const deletedId = payload.old?.id;
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
                        // Set up heartbeat
                        const interval = setInterval({
                            "useRealtime.useCallback[setupConversationChannel].channel.interval": ()=>{
                                channel.send({
                                    type: "presence",
                                    event: "heartbeat",
                                    payload: {
                                        user_id: senderId,
                                        timestamp: Date.now()
                                    }
                                });
                            }
                        }["useRealtime.useCallback[setupConversationChannel].channel.interval"], 30000);
                        heartbeatIntervalsRef.current.set(channelName, interval);
                    } else if (status === "CHANNEL_ERROR" || status === "TIMED_OUT" || status === "CLOSED") {
                        setConnectionStatus("disconnected");
                        const interval = heartbeatIntervalsRef.current.get(channelName);
                        if (interval) {
                            clearInterval(interval);
                            heartbeatIntervalsRef.current.delete(channelName);
                        }
                        // Attempt reconnection
                        const attempts = reconnectAttemptsRef.current.get(channelName) || 0;
                        if (attempts < maxReconnectAttempts) {
                            reconnectAttemptsRef.current.set(channelName, attempts + 1);
                            const delay = Math.min(1000 * Math.pow(2, attempts + 1), 30000);
                            const timer = setTimeout({
                                "useRealtime.useCallback[setupConversationChannel].channel.timer": ()=>{
                                    setupConversationChannel(conversationId, senderType, senderId, onTyping, onMessageUpdate, onMessageDelete, onConversationUpdate);
                                }
                            }["useRealtime.useCallback[setupConversationChannel].channel.timer"], delay);
                            reconnectTimersRef.current.set(channelName, timer);
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
"[project]/app/dashboard/[conversationId]/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ChatPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$chat$2d$bubble$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/chat-bubble.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$message$2d$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/message-input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$conversation$2d$list$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/conversation-list.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$typing$2d$indicator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/typing-indicator.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/db.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/storage.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__ = __turbopack_context__.i("[project]/node_modules/uuid/dist/v4.js [app-client] (ecmascript) <export default as v4>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreVertical$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/ellipsis-vertical.js [app-client] (ecmascript) <export default as MoreVertical>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$wallpaper$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/wallpaper.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/avatar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$use$2d$realtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/use-realtime.ts [app-client] (ecmascript)");
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
function ChatPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const conversationId = params.conversationId;
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [initialized, setInitialized] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [currentConversation, setCurrentConversation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [conversations, setConversations] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { connectionStatus, setupConversationChannel, broadcastTyping } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$use$2d$realtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRealtime"])();
    const [isTyping, setIsTyping] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [otherUserTyping, setOtherUserTyping] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSending, setIsSending] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const messagesEndRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const typingTimeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const otherUserTypingTimeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Helper function to check if onboarding is complete
    const isOnboardingComplete = (business)=>{
        if (!business) return false;
        return !!(business.businessName && business.phone && business.address);
    };
    // Load auth and conversation data
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatPage.useEffect": ()=>{
            const loadAuth = {
                "ChatPage.useEffect.loadAuth": async ()=>{
                    try {
                        const authUser = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].getAuth();
                        setUser(authUser);
                        setInitialized(true);
                        if (!authUser) {
                            router.push("/login");
                            return;
                        }
                        if (!isOnboardingComplete(authUser.business)) {
                            router.push("/onboarding");
                            return;
                        }
                        if (conversationId) {
                            setLoading(true);
                            const conv = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].getConversationById(conversationId);
                            if (!conv) {
                                router.push("/dashboard");
                            } else {
                                setCurrentConversation(conv);
                                const convs = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].getConversationsByBusinessId(authUser.id);
                                setConversations(convs);
                            }
                            setLoading(false);
                        }
                    } catch (error) {
                        console.error("Error loading auth:", error);
                        setInitialized(true);
                        router.push("/login");
                    }
                }
            }["ChatPage.useEffect.loadAuth"];
            if (!initialized) {
                loadAuth();
            } else if (user && conversationId && !currentConversation) {
                const loadConv = {
                    "ChatPage.useEffect.loadConv": async ()=>{
                        if (!isOnboardingComplete(user.business)) {
                            router.push("/onboarding");
                            return;
                        }
                        setLoading(true);
                        const conv = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].getConversationById(conversationId);
                        if (!conv) {
                            router.push("/dashboard");
                        } else {
                            setCurrentConversation(conv);
                            const convs = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].getConversationsByBusinessId(user.id);
                            setConversations(convs);
                        }
                        setLoading(false);
                    }
                }["ChatPage.useEffect.loadConv"];
                loadConv();
            } else if (!user) {
                router.push("/login");
            }
        }
    }["ChatPage.useEffect"], [
        initialized,
        user,
        conversationId,
        currentConversation,
        router
    ]);
    // Set up real-time subscription
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatPage.useEffect": ()=>{
            if (!conversationId || !user) return;
            const handleTyping = {
                "ChatPage.useEffect.handleTyping": (senderType)=>{
                    if (senderType === "customer") {
                        setOtherUserTyping(true);
                        if (otherUserTypingTimeoutRef.current) {
                            clearTimeout(otherUserTypingTimeoutRef.current);
                        }
                        otherUserTypingTimeoutRef.current = setTimeout({
                            "ChatPage.useEffect.handleTyping": ()=>{
                                setOtherUserTyping(false);
                            }
                        }["ChatPage.useEffect.handleTyping"], 3000);
                    }
                }
            }["ChatPage.useEffect.handleTyping"];
            const handleMessageUpdate = {
                "ChatPage.useEffect.handleMessageUpdate": (message)=>{
                    if (!currentConversation) return;
                    // Check if message already exists
                    const existingIndex = currentConversation.messages.findIndex({
                        "ChatPage.useEffect.handleMessageUpdate.existingIndex": (m)=>m.id === message.id
                    }["ChatPage.useEffect.handleMessageUpdate.existingIndex"]);
                    if (existingIndex >= 0) {
                        // Update existing message
                        const updatedMessages = [
                            ...currentConversation.messages
                        ];
                        updatedMessages[existingIndex] = message;
                        setCurrentConversation({
                            ...currentConversation,
                            messages: updatedMessages.sort({
                                "ChatPage.useEffect.handleMessageUpdate": (a, b)=>new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                            }["ChatPage.useEffect.handleMessageUpdate"]),
                            lastMessageAt: message.createdAt
                        });
                    } else {
                        // Add new message
                        const updatedMessages = [
                            ...currentConversation.messages,
                            message
                        ].sort({
                            "ChatPage.useEffect.handleMessageUpdate.updatedMessages": (a, b)=>new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                        }["ChatPage.useEffect.handleMessageUpdate.updatedMessages"]);
                        setCurrentConversation({
                            ...currentConversation,
                            messages: updatedMessages,
                            lastMessageAt: message.createdAt
                        });
                    }
                    // Update conversations list
                    const conversationIndex = conversations.findIndex({
                        "ChatPage.useEffect.handleMessageUpdate.conversationIndex": (c)=>c.id === message.conversationId
                    }["ChatPage.useEffect.handleMessageUpdate.conversationIndex"]);
                    if (conversationIndex >= 0) {
                        const updatedConversations = [
                            ...conversations
                        ];
                        const conv = updatedConversations[conversationIndex];
                        const existingMessageIndex = conv.messages.findIndex({
                            "ChatPage.useEffect.handleMessageUpdate.existingMessageIndex": (m)=>m.id === message.id
                        }["ChatPage.useEffect.handleMessageUpdate.existingMessageIndex"]);
                        let updatedMessages;
                        if (existingMessageIndex >= 0) {
                            updatedMessages = [
                                ...conv.messages
                            ];
                            updatedMessages[existingMessageIndex] = message;
                        } else {
                            updatedMessages = [
                                ...conv.messages,
                                message
                            ];
                        }
                        updatedConversations[conversationIndex] = {
                            ...conv,
                            messages: updatedMessages.sort({
                                "ChatPage.useEffect.handleMessageUpdate": (a, b)=>new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                            }["ChatPage.useEffect.handleMessageUpdate"]),
                            lastMessageAt: message.createdAt
                        };
                        updatedConversations.sort({
                            "ChatPage.useEffect.handleMessageUpdate": (a, b)=>new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime()
                        }["ChatPage.useEffect.handleMessageUpdate"]);
                        setConversations(updatedConversations);
                    }
                }
            }["ChatPage.useEffect.handleMessageUpdate"];
            const handleMessageDelete = {
                "ChatPage.useEffect.handleMessageDelete": (messageId)=>{
                    if (!currentConversation) return;
                    setCurrentConversation({
                        ...currentConversation,
                        messages: currentConversation.messages.filter({
                            "ChatPage.useEffect.handleMessageDelete": (m)=>m.id !== messageId
                        }["ChatPage.useEffect.handleMessageDelete"])
                    });
                    const updatedConversations = conversations.map({
                        "ChatPage.useEffect.handleMessageDelete.updatedConversations": (conv)=>({
                                ...conv,
                                messages: conv.messages.filter({
                                    "ChatPage.useEffect.handleMessageDelete.updatedConversations": (m)=>m.id !== messageId
                                }["ChatPage.useEffect.handleMessageDelete.updatedConversations"])
                            })
                    }["ChatPage.useEffect.handleMessageDelete.updatedConversations"]);
                    setConversations(updatedConversations);
                }
            }["ChatPage.useEffect.handleMessageDelete"];
            const handleConversationUpdate = {
                "ChatPage.useEffect.handleConversationUpdate": async ()=>{
                    if (!conversationId) return;
                    const updated = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].getConversationById(conversationId);
                    if (updated) {
                        setCurrentConversation(updated);
                    }
                }
            }["ChatPage.useEffect.handleConversationUpdate"];
            const cleanup = setupConversationChannel(conversationId, "business", user.id, handleTyping, handleMessageUpdate, handleMessageDelete, handleConversationUpdate);
            return cleanup;
        }
    }["ChatPage.useEffect"], [
        conversationId,
        user?.id,
        setupConversationChannel,
        currentConversation,
        conversations
    ]);
    // Fallback: Poll for new messages if WebSocket fails
    const lastMessageCountRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatPage.useEffect": ()=>{
            if (!currentConversation?.id || connectionStatus === "connected") {
                lastMessageCountRef.current = currentConversation?.messages.length || 0;
                return;
            }
            const pollInterval = setInterval({
                "ChatPage.useEffect.pollInterval": async ()=>{
                    if (!currentConversation.id || !user) return;
                    try {
                        const updated = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].getConversationById(currentConversation.id);
                        if (updated && updated.messages.length > lastMessageCountRef.current) {
                            lastMessageCountRef.current = updated.messages.length;
                            setCurrentConversation(updated);
                            if (user) {
                                const convs = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].getConversationsByBusinessId(user.id);
                                setConversations(convs);
                            }
                        }
                    } catch (error) {
                        console.error("Error polling for messages:", error);
                    }
                }
            }["ChatPage.useEffect.pollInterval"], 5000);
            return ({
                "ChatPage.useEffect": ()=>{
                    clearInterval(pollInterval);
                }
            })["ChatPage.useEffect"];
        }
    }["ChatPage.useEffect"], [
        currentConversation?.id,
        connectionStatus,
        user
    ]);
    // Auto-scroll to bottom when messages change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatPage.useEffect": ()=>{
            messagesEndRef.current?.scrollIntoView({
                behavior: "smooth"
            });
        }
    }["ChatPage.useEffect"], [
        currentConversation?.messages
    ]);
    // Mark messages as read when conversation is viewed
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatPage.useEffect": ()=>{
            if (!conversationId || !user) return;
            const markAsRead = {
                "ChatPage.useEffect.markAsRead": async ()=>{
                    try {
                        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].markMessagesAsRead(conversationId, "customer");
                        const updated = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].getConversationById(conversationId);
                        if (updated) {
                            setCurrentConversation(updated);
                        }
                    } catch (error) {
                        console.error("Error marking messages as read:", error);
                    }
                }
            }["ChatPage.useEffect.markAsRead"];
            const timeout = setTimeout(markAsRead, 500);
            return ({
                "ChatPage.useEffect": ()=>clearTimeout(timeout)
            })["ChatPage.useEffect"];
        }
    }["ChatPage.useEffect"], [
        conversationId,
        user?.id
    ]);
    // Cleanup typing timeouts
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatPage.useEffect": ()=>{
            return ({
                "ChatPage.useEffect": ()=>{
                    if (typingTimeoutRef.current) {
                        clearTimeout(typingTimeoutRef.current);
                    }
                    if (otherUserTypingTimeoutRef.current) {
                        clearTimeout(otherUserTypingTimeoutRef.current);
                    }
                }
            })["ChatPage.useEffect"];
        }
    }["ChatPage.useEffect"], []);
    const handleSendMessage = async (text)=>{
        if (!currentConversation || !user) return;
        if (isSending) return;
        setIsSending(true);
        const tempId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])();
        const newMessage = {
            id: tempId,
            conversationId: currentConversation.id,
            senderType: "business",
            senderId: user.id,
            text,
            status: "sent",
            createdAt: new Date().toISOString()
        };
        // Optimistically update UI
        if (currentConversation) {
            const updatedMessages = [
                ...currentConversation.messages,
                newMessage
            ].sort((a, b)=>new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
            setCurrentConversation({
                ...currentConversation,
                messages: updatedMessages,
                lastMessageAt: newMessage.createdAt
            });
        }
        setIsTyping(false);
        try {
            const createdMessage = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].createMessage(newMessage);
            // Update with real message
            if (currentConversation) {
                const updatedMessages = currentConversation.messages.map((m)=>m.id === tempId ? createdMessage : m).sort((a, b)=>new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
                setCurrentConversation({
                    ...currentConversation,
                    messages: updatedMessages,
                    lastMessageAt: createdMessage.createdAt
                });
            }
            // Send email notification to customer
            try {
                await fetch("/api/send-email", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        conversationId: currentConversation.id,
                        messageId: createdMessage.id
                    })
                });
            } catch (emailError) {
                console.error("Failed to send email notification:", emailError);
            // Don't fail the message send if email fails
            }
            // Refresh conversations list
            setTimeout(async ()=>{
                if (user) {
                    const convs = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].getConversationsByBusinessId(user.id);
                    setConversations(convs);
                }
            }, 500);
        } catch (error) {
            console.error("Failed to send message:", error);
            // Remove optimistic message on error
            if (currentConversation) {
                setCurrentConversation({
                    ...currentConversation,
                    messages: currentConversation.messages.filter((m)=>m.id !== tempId)
                });
            }
        } finally{
            setIsSending(false);
        }
    };
    const handleSendImage = async (imageUrl)=>{
        if (!currentConversation || !user) return;
        if (isSending) return;
        setIsSending(true);
        const tempId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])();
        const newMessage = {
            id: tempId,
            conversationId: currentConversation.id,
            senderType: "business",
            senderId: user.id,
            imageUrl,
            status: "sent",
            createdAt: new Date().toISOString()
        };
        // Optimistically update UI
        if (currentConversation) {
            const updatedMessages = [
                ...currentConversation.messages,
                newMessage
            ].sort((a, b)=>new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
            setCurrentConversation({
                ...currentConversation,
                messages: updatedMessages,
                lastMessageAt: newMessage.createdAt
            });
        }
        setIsTyping(false);
        try {
            const createdMessage = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].createMessage(newMessage);
            // Update with real message
            if (currentConversation) {
                const updatedMessages = currentConversation.messages.map((m)=>m.id === tempId ? createdMessage : m).sort((a, b)=>new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
                setCurrentConversation({
                    ...currentConversation,
                    messages: updatedMessages,
                    lastMessageAt: createdMessage.createdAt
                });
            }
            // Send email notification to customer
            try {
                await fetch("/api/send-email", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        conversationId: currentConversation.id,
                        messageId: createdMessage.id
                    })
                });
            } catch (emailError) {
                console.error("Failed to send email notification:", emailError);
            // Don't fail the message send if email fails
            }
            setTimeout(async ()=>{
                if (user) {
                    const convs = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].getConversationsByBusinessId(user.id);
                    setConversations(convs);
                }
            }, 500);
        } catch (error) {
            console.error("Failed to send image:", error);
            if (currentConversation) {
                setCurrentConversation({
                    ...currentConversation,
                    messages: currentConversation.messages.filter((m)=>m.id !== tempId)
                });
            }
        } finally{
            setIsSending(false);
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
        if (conversationId) {
            broadcastTyping(conversationId, "business");
        }
    };
    // Show loading skeleton while initializing
    if (!initialized || !user || loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "h-screen flex flex-col md:flex-row bg-[var(--chat-bg)] dark:bg-[var(--chat-bg)] relative",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$wallpaper$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Wallpaper"], {}, void 0, false, {
                    fileName: "[project]/app/dashboard/[conversationId]/page.tsx",
                    lineNumber: 469,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "hidden md:flex w-80 border-r border-border flex-col bg-card/80 backdrop-blur-sm z-10",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-4 border-b border-border",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Skeleton, {
                                className: "h-8 w-24"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/[conversationId]/page.tsx",
                                lineNumber: 472,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/[conversationId]/page.tsx",
                            lineNumber: 471,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 overflow-y-auto",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ConversationSkeleton, {}, void 0, false, {
                                fileName: "[project]/app/dashboard/[conversationId]/page.tsx",
                                lineNumber: 475,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/[conversationId]/page.tsx",
                            lineNumber: 474,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/dashboard/[conversationId]/page.tsx",
                    lineNumber: 470,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 flex flex-col bg-[var(--chat-bg)] dark:bg-[var(--chat-bg)] relative z-10",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "border-b border-border bg-card/80 backdrop-blur-sm p-3 md:p-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Skeleton, {
                                        className: "w-10 h-10 rounded-full"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/[conversationId]/page.tsx",
                                        lineNumber: 481,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Skeleton, {
                                                className: "h-4 w-32"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/[conversationId]/page.tsx",
                                                lineNumber: 483,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Skeleton, {
                                                className: "h-3 w-24"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/[conversationId]/page.tsx",
                                                lineNumber: 484,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/[conversationId]/page.tsx",
                                        lineNumber: 482,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/[conversationId]/page.tsx",
                                lineNumber: 480,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/[conversationId]/page.tsx",
                            lineNumber: 479,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 overflow-y-auto p-3 md:p-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChatSkeleton, {}, void 0, false, {
                                fileName: "[project]/app/dashboard/[conversationId]/page.tsx",
                                lineNumber: 489,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/[conversationId]/page.tsx",
                            lineNumber: 488,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-card/80 backdrop-blur-sm border-t border-border p-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Skeleton, {
                                className: "h-12 w-full rounded-lg"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/[conversationId]/page.tsx",
                                lineNumber: 492,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/[conversationId]/page.tsx",
                            lineNumber: 491,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/dashboard/[conversationId]/page.tsx",
                    lineNumber: 478,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/dashboard/[conversationId]/page.tsx",
            lineNumber: 468,
            columnNumber: 7
        }, this);
    }
    if (!currentConversation) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "h-screen flex flex-col md:flex-row bg-[var(--chat-bg)] dark:bg-[var(--chat-bg)] relative",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$wallpaper$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Wallpaper"], {}, void 0, false, {
                    fileName: "[project]/app/dashboard/[conversationId]/page.tsx",
                    lineNumber: 502,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "hidden md:flex w-80 border-r border-border flex-col bg-card/80 backdrop-blur-sm z-10",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-4 border-b border-border",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/dashboard",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-2xl font-bold text-primary cursor-pointer hover:opacity-80",
                                    children: "Leenk"
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/[conversationId]/page.tsx",
                                    lineNumber: 506,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/[conversationId]/page.tsx",
                                lineNumber: 505,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/[conversationId]/page.tsx",
                            lineNumber: 504,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 overflow-y-auto",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$conversation$2d$list$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConversationList"], {
                                conversations: conversations,
                                selectedId: conversationId
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/[conversationId]/page.tsx",
                                lineNumber: 510,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/[conversationId]/page.tsx",
                            lineNumber: 509,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/dashboard/[conversationId]/page.tsx",
                    lineNumber: 503,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 flex items-center justify-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-muted-foreground",
                            children: "Loading conversation..."
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/[conversationId]/page.tsx",
                            lineNumber: 515,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/[conversationId]/page.tsx",
                        lineNumber: 514,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/dashboard/[conversationId]/page.tsx",
                    lineNumber: 513,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/dashboard/[conversationId]/page.tsx",
            lineNumber: 501,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "h-screen flex flex-col md:flex-row bg-[var(--chat-bg)] dark:bg-[var(--chat-bg)] relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$wallpaper$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Wallpaper"], {
                businessLogo: user?.business?.businessLogo
            }, void 0, false, {
                fileName: "[project]/app/dashboard/[conversationId]/page.tsx",
                lineNumber: 524,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].aside, {
                initial: {
                    opacity: 0,
                    x: -20
                },
                animate: {
                    opacity: 1,
                    x: 0
                },
                className: "hidden md:flex w-80 border-r border-border flex-col bg-card/80 backdrop-blur-sm z-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 border-b border-border",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/dashboard",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-2xl font-bold text-primary cursor-pointer hover:opacity-80",
                                children: "Leenk"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/[conversationId]/page.tsx",
                                lineNumber: 533,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/[conversationId]/page.tsx",
                            lineNumber: 532,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/[conversationId]/page.tsx",
                        lineNumber: 531,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 overflow-y-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$conversation$2d$list$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConversationList"], {
                            conversations: conversations,
                            selectedId: conversationId
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/[conversationId]/page.tsx",
                            lineNumber: 537,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/[conversationId]/page.tsx",
                        lineNumber: 536,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/[conversationId]/page.tsx",
                lineNumber: 526,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    opacity: 0
                },
                animate: {
                    opacity: 1
                },
                className: "flex-1 flex flex-col bg-[var(--chat-bg)] dark:bg-[var(--chat-bg)] relative z-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border-b border-border bg-card/80 backdrop-blur-sm p-3 md:p-4 flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/dashboard",
                                        className: "md:hidden",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "ghost",
                                            size: "sm",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                                                className: "w-4 h-4"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/[conversationId]/page.tsx",
                                                lineNumber: 548,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/[conversationId]/page.tsx",
                                            lineNumber: 547,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/[conversationId]/page.tsx",
                                        lineNumber: 546,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Avatar"], {
                                        name: currentConversation.customerName || currentConversation.customerEmail,
                                        size: "md"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/[conversationId]/page.tsx",
                                        lineNumber: 551,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "font-semibold text-foreground",
                                                children: currentConversation.customerName || currentConversation.customerEmail
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/[conversationId]/page.tsx",
                                                lineNumber: 553,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-muted-foreground",
                                                children: [
                                                    currentConversation.customerEmail,
                                                    connectionStatus === "connected" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ml-2 text-primary",
                                                        title: "Real-time connected",
                                                        children: "●"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/[conversationId]/page.tsx",
                                                        lineNumber: 557,
                                                        columnNumber: 19
                                                    }, this),
                                                    connectionStatus === "disconnected" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ml-2 text-yellow-500",
                                                        title: "Reconnecting...",
                                                        children: "●"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/[conversationId]/page.tsx",
                                                        lineNumber: 560,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/dashboard/[conversationId]/page.tsx",
                                                lineNumber: 554,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/[conversationId]/page.tsx",
                                        lineNumber: 552,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/[conversationId]/page.tsx",
                                lineNumber: 545,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "ghost",
                                size: "sm",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreVertical$3e$__["MoreVertical"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/[conversationId]/page.tsx",
                                    lineNumber: 566,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/[conversationId]/page.tsx",
                                lineNumber: 565,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/[conversationId]/page.tsx",
                        lineNumber: 544,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 overflow-y-auto p-3 md:p-4 space-y-2 relative z-0",
                        children: [
                            currentConversation.messages.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-center h-full text-muted-foreground",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: "No messages yet. Start the conversation!"
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/[conversationId]/page.tsx",
                                    lineNumber: 574,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/[conversationId]/page.tsx",
                                lineNumber: 573,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    currentConversation.messages.map((msg, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$chat$2d$bubble$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChatBubble"], {
                                            message: msg,
                                            isOwn: msg.senderType === "business",
                                            index: idx
                                        }, msg.id, false, {
                                            fileName: "[project]/app/dashboard/[conversationId]/page.tsx",
                                            lineNumber: 579,
                                            columnNumber: 17
                                        }, this)),
                                    otherUserTyping && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$typing$2d$indicator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TypingIndicator"], {
                                        isOwn: false
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/[conversationId]/page.tsx",
                                        lineNumber: 581,
                                        columnNumber: 35
                                    }, this)
                                ]
                            }, void 0, true),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                ref: messagesEndRef
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/[conversationId]/page.tsx",
                                lineNumber: 584,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/[conversationId]/page.tsx",
                        lineNumber: 571,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-card/80 backdrop-blur-sm border-t border-border relative z-10",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$message$2d$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MessageInput"], {
                            onSendMessage: handleSendMessage,
                            onSendImage: handleSendImage,
                            onTyping: handleTyping,
                            disabled: isSending
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/[conversationId]/page.tsx",
                            lineNumber: 589,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/[conversationId]/page.tsx",
                        lineNumber: 588,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/[conversationId]/page.tsx",
                lineNumber: 542,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/dashboard/[conversationId]/page.tsx",
        lineNumber: 523,
        columnNumber: 5
    }, this);
}
_s(ChatPage, "zICDzuNOr5F2qHwH1eJBGrlasUA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$use$2d$realtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRealtime"]
    ];
});
_c = ChatPage;
var _c;
__turbopack_context__.k.register(_c, "ChatPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_5f08de09._.js.map