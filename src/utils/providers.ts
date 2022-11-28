import { ethers } from 'ethers';

const RPC_URL = process.env.RPC_URL;

export const simpleRpcProvider = new ethers.providers.JsonRpcProvider(RPC_URL);
