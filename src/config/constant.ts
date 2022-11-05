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
    Final,
}

export const Contracts = {
    '0x5': {
        GroupNFT: '0xdb2dc33222C46cF82222fff7Ec41f62C8072499C',
    },
};

export const IPFS_URL = 'https://ipfs.io/ipfs/QmPRsH1ZVYTeV5VdV4aAPekK33jYvKpJ6PhjjVxg6aWnns';
export const META_URL = 'https://bafybeiacetdrnjarh55hmdbgrpvcgi6rfluat3q7xcpi5l4oyclrag4vau.ipfs.nftstorage.link'