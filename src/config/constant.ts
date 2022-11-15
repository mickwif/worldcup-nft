import { SimpleProviderFactory } from 'big3-web3';

export const RCP_NODE = SimpleProviderFactory.create([
    process.env.RPC_NODE_1,
    process.env.RPC_NODE_2,
    process.env.RPC_NODE_3,
]);

export enum IndexDB {
    TASK_ACCESSED_ACCOUNTS = 'TASK_ACCESSED_ACCOUNTS',
}

export enum Exception {}

export enum EventBus {
    UNAUTHORIZED = 'UNAUTHORIZED',
    UNCONNECTED = 'UNCONNECTED',
}

export enum LocalStorage {
    TOKEN = 'TOKEN',
    WALLET = 'WALLET',
}

export enum CacheKey {
    METAMASK_WALLET = 'METAMASK_WALLET',
}

export enum EventKey {
    UNAUTHORIZED = 'UNAUTHORIZED',
    UNCONNECTED = 'UNCONNECTED',
    DISCONNECT = 'DISCONNECT',
    REFRESH_PAGE = 'REFRESH_PAGE',
    CONFIRM_SEARCH_ADDRESS = 'CONFIRM_SEARCH_ADDRESS',
    REFRESH_CREATED_LABELS = 'REFRESH_CREATED_LABELS',
    REQUEST_SIGN = 'REQUEST_SIGN',
    SIGN_RESULT = 'SIGN_RESULT',
}

export enum MatchType {
    Group,
    Top8,
    Top4,
    SemiFinal,
    ThirdFinal,
    Final,
}

// GameResult.None：还没有⽐赛结果，值为0
// GameResult.Win：主队获胜，值为1
// GameResult.Draw：⽐赛平局，值为2
// GameResult.Lose：：客队获胜，值为3
export enum GameResult {
    None,
    Win,
    Draw,
    Lose,
}

export const Contracts = {
    '0x5': {
        GroupNFT: '0xaD0C7B1df64170C385c665EB6214F370D80f5A85',
        GroupGame: '0x37173F08AA089c8C1Df8E0249577518564ee31f7',
    },
    '0x1': {
        GroupNFT: '0xC74407208c0b6dc1aa650545e099Df39770Dc88d',
        GroupGame: '0x7BA2743950C812476cDfcD3038e768d557Bc4D87',
    },
};

export const IPFS_URL = 'https://nftstorage.link/ipfs/bafybeiezadvcfvdrgc4rfaczqpywzqo6crsrsm7fob3gzz7bbdhkhtstgu';
export const META_URL = 'https://bafybeiacetdrnjarh55hmdbgrpvcgi6rfluat3q7xcpi5l4oyclrag4vau.ipfs.nftstorage.link';
