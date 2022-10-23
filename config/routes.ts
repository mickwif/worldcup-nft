const routes = [
    {
        exact: false,
        path: '/',
        component: '@/layouts/index',
        routes: [
            {
                exact: true,
                name: 'Home',
                path: '/',
                component: '@/pages/home',
            },
            {
                exact: true,
                name: 'NFT',
                path: '/nft',
                component: '@/pages/nft',
            },
            {
                exact: true,
                name: 'SYNTHETIC',
                path: '/synthetic',
                component: '@/pages/synthetic',
            },
            {
                exact: true,
                name: 'BETTING',
                path: '/betting',
                component: '@/pages/betting',
            },
            {
                exact: true,
                name: 'FAQ',
                path: '/faq',
                component: '@/pages/faq',
            },
        ],
    },
];

export default routes;
