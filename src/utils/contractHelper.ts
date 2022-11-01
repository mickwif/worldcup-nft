import { ethers } from 'ethers';

import erc20ABI from '@/config/abi/ERC20.json';

export const exclusiveProvider = new ethers.providers.JsonRpcProvider(process.env.RPC_NODE_1);

export const getContract = (abi: any, address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
    if (!address || !abi) return null;

    const signerOrProvider = signer ?? exclusiveProvider;
    return new ethers.Contract(address, abi, signerOrProvider);
};

// standards are basically universal
// suck like erc20, bep20 etc.
export const getErc20Contract = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
    return getContract(erc20ABI, address, signer);
};
