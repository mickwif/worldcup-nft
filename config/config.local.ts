import './loadEnv';
import { defineConfig } from 'umi';
import { withChainWebpack } from 'big3-adaptive-media-loader';

export default defineConfig({
    define: {
        // 'process.env.MOCK_TOKEN': process.env.MOCK_TOKEN, // .env.development
        'process.env.HASURA_API': '/api/hasura-cache/v1/graphql',
        'process.env.HASURA_ADMIN_SECRET': '',
        // 'process.env.RPC_URL': 'https://goerli.infura.io/v3/5f8cbc2e323b4613b0cab671d1c31ee3',
        'process.env.RPC_URL': 'https://eth-04.dccn.ankr.com/',
        // 'process.env.CHAIN_ENV': 'goerli',
        'process.env.CHAIN_ENV': 'prod',
        'process.env.EKS': '',
    },
    fastRefresh: {},
    proxy: {
        '/api/hasura-cache/v1/graphql': {
            target: 'https://api.wired.network',
            changeOrigin: true,
            secure: false,
        },
        '/api/ugc-gateway': {
            target: 'https://api.wired.network',
            changeOrigin: true,
            secure: false,
        },
    },
    chainWebpack(memo) {
        withChainWebpack(memo, [
            { designDraft: [0, 800], rule: 'mobile', regex: /mobile\.less$/ },
            { designDraft: 801, rule: 'desktop', regex: /index\.less$/ },
        ]);
    },
    favicon: `/favicon.svg`,
});
