// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
// import polyfillNode from 'rollup-plugin-polyfill-node'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   define: {
//     'import.meta.env.': {}
//   },
//   optimizeDeps: {
//     esbuildOptions: {

//         define: {
//           global: 'globalThis',
//         },
//         plugins: [
//             NodeGlobalsPolyfillPlugin({
//                 process: true,
//                 buffer: true,
//             }),
//         ],
//     },
// },
// build: {
//   rollupOptions: {
//       plugins: [
//           polyfillNode(),
//       ]
//   }
// },
// resolve: {
//   alias: {
//     events: 'events',
//     crypto: 'crypto-browserify',
//     stream: 'stream-browserify',
//     http: 'stream-http',
//     https: 'https-browserify',
//     ws: 'xrpl/dist/npm/client/WSWrapper',
//   },
// }})




import { defineConfig, loadEnv } from 'vite';

import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import polyfillNode from 'rollup-plugin-polyfill-node';

const viteConfig = ({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, '', '') };
    return defineConfig({
        define: {
            'process.env': process.env,
        },
        optimizeDeps: {
            esbuildOptions: {
                define: {
                    global: 'globalThis',
                },
                plugins: [
                    NodeGlobalsPolyfillPlugin({
                        process: true,
                        buffer: true,
                    }),
                ],
            },
        },
        build: {
            rollupOptions: {
                plugins: [polyfillNode()],
            },
        },
        resolve: {
            alias: {
                events: 'events',
                crypto: 'crypto-browserify',
                stream: 'stream-browserify',
                http: 'stream-http',
                https: 'https-browserify',
                ws: 'xrpl/dist/npm/client/WSWrapper',
            },
        },
    });
};

export default viteConfig;

// import { defineConfig, loadEnv } from 'vite';

// import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
// import polyfillNode from 'rollup-plugin-polyfill-node';

// const viteConfig = ({ mode }) => {
//     import.meta.env = { ...import.meta.env, ...loadEnv(mode, '', '') };
//     return defineConfig({
//         define: {
//             'import.meta.env.': import.meta.env,
//         },
//         optimizeDeps: {
//             esbuildOptions: {
//                 define: {
//                     global: 'globalThis',
//                 },
//                 plugins: [
//                     NodeGlobalsPolyfillPlugin({
//                         process: true,
//                         buffer: true,
//                     }),
//                 ],
//             },
//         },
//         build: {
//             rollupOptions: {
//                 plugins: [polyfillNode()],
//             },
//         },
//         resolve: {
//             alias: {
//                 events: 'events',
//                 crypto: 'crypto-browserify',
//                 stream: 'stream-browserify',
//                 http: 'stream-http',
//                 https: 'https-browserify',
//                 ws: 'xrpl/dist/npm/client/WSWrapper',
//             },
//         },
//     });
// };

// export default viteConfig;