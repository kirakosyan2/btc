import path from 'path';
import { InlineConfig, UserConfig, defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

import react from '@vitejs/plugin-react';

import packageJson from './package.json';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    define: {
        'import.meta.env.PACKAGE_VERSION': JSON.stringify(packageJson.version),
    },
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: ['./setupTests.js'],
    },
    build: {
        minify: false, // отключает минификацию
        rollupOptions: {
            treeshake: false, // отключает tree shaking
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@components/*': path.resolve('src/components/*'),
            '@assets/*': path.resolve('src/assets/*'),
            '@services/*': path.resolve('src/services/*'),
            '@utils/*': path.resolve('src/utility/*'),
            '@hooks/*': path.resolve('src/hooks/*'),
            '@store/*': path.resolve('src/store/*'),
            '@api/*': path.resolve('src/api/*'),
            '@src/*': path.resolve('src/*'),
            '@layout/*': path.resolve('src/layout/*'),
            '@pages/*': path.resolve('src/pages/*'),
            '@providers/*': path.resolve('src/providers/*'),
            '@redux/*': path.resolve('src/redux/*'),
            '@types/*': path.resolve('src/types/*'),
        },
    },
    server: {
        proxy: {
            '/foo': 'https://b2c-sql-web.sigma.sbrf.ru:82/',

            '/api': {
                target: 'https://b2c-sql-web.sigma.sbrf.ru:85/',
                changeOrigin: true,
                secure: false,
            },
        },
    },
} as UserConfig & { test: InlineConfig });
