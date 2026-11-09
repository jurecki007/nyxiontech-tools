/** package.json version, injected by vite.config.ts. */
declare const __APP_VERSION__: string;

/** The connect-src directive of the web (nginx) and desktop (Tauri) Content-Security-Policy, injected by vite.config.ts. */
declare const __CSP_CONNECT_SRC__: { web: string; desktop: string };

/** Link data for every guide (src/seo/guides.ts), injected by vite.config.ts so the app can link to them. */
declare const __GUIDES__: { tool: string; lang: string; path: string; name: string }[];
