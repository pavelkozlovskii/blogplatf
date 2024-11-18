import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    css: {
        preprocessorOptions: {
            scss: {
                silenceDeprecations: ['legacy-js-api'],
            },
        },
    },
    build: { chunkSizeWarningLimit: 1600 },
});

// import { defineConfig, loadEnv } from 'vite';
// import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
// export default defineConfig(({ mode }) => {
//     const env = loadEnv(mode, process.cwd(), '');
//     return {
//         define: {
//             // __APP_ENV__: process.env.VITE_VERCEL_ENV,
//             NEXT_PUBLIC_SOCKET_URI: JSON.stringify(env.NEXT_PUBLIC_SOCKET_URI),
//         },
//         css: {
//             preprocessorOptions: {
//                 scss: {
//                     silenceDeprecations: ['legacy-js-api'],
//                 },
//             },
//         },
//         build: { chunkSizeWarningLimit: 1600 },
//         plugins: [react()],
//     };
// });
