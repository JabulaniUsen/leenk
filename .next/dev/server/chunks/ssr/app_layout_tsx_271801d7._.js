module.exports = [
"[project]/app/layout.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
import _geist from 'next/font/google/target.css?{"path":"layout.tsx","import":"Geist","arguments":[{"subsets":["latin"]}],"variableName":"_geist"}';
import _geistMono from 'next/font/google/target.css?{"path":"layout.tsx","import":"Geist_Mono","arguments":[{"subsets":["latin"]}],"variableName":"_geistMono"}';
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/lib/theme";
import "./globals.css";
export const metadata = {
    title: "Leenk - Business Chat",
    description: "Modern WhatsApp-like chat platform for businesses",
    generator: "v0.app",
    viewport: {
        width: "device-width",
        initialScale: 1,
        maximumScale: 1
    },
    icons: {
        icon: [
            {
                url: "/logo.png",
                media: "(prefers-color-scheme: light)"
            },
            {
                url: "/logo.png",
                media: "(prefers-color-scheme: dark)"
            },
            {
                url: "/logo.png",
                type: "image/png"
            }
        ],
        apple: "/logo.png"
    }
};
export default function RootLayout({ children }) {
    return /*#__PURE__*/ _jsxDEV("html", {
        lang: "en",
        suppressHydrationWarning: true,
        children: /*#__PURE__*/ _jsxDEV("body", {
            className: `font-sans antialiased`,
            children: [
                /*#__PURE__*/ _jsxDEV(ThemeProvider, {
                    children: children
                }, void 0, false, {
                    fileName: "[project]/app/layout.tsx",
                    lineNumber: 47,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ _jsxDEV(Analytics, {}, void 0, false, {
                    fileName: "[project]/app/layout.tsx",
                    lineNumber: 50,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/layout.tsx",
            lineNumber: 46,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/layout.tsx",
        lineNumber: 45,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=app_layout_tsx_271801d7._.js.map