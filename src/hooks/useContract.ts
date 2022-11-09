import { getContract, getErc20Contract } from '@/utils/contractHelper';
import { useMemo } from 'react';
import { useModel } from 'umi';
import { useWeb3Provider } from 'big3-web3';
import GroupNFTAbi from '@/config/abi/GroupNFT.json';
import GroupGameAbi from '@/config/abi/GroupPredict'
import { Contracts } from '@/config/constant';

export const useErc20Contract = (name: string) => {
    const { provider } = useWeb3Provider();
    const { chain } = useModel('@@chain');
    return useMemo(
        () => getErc20Contract(Contracts[chain.config.chainId]?.[`${name}_CONTRACT_ADDRESS`], provider?.getSigner()),
        [provider, chain],
    );
};

export const useGroupNFTContract = () => {
    const { provider } = useWeb3Provider();
    const { chain } = useModel('@@chain');
    return useMemo(
        () => getContract(GroupNFTAbi.abi, Contracts[chain.config.chainId]?.['GroupNFT'], provider?.getSigner()),
        [provider, chain],
    );
};

export const useGroupGameContract = () => {
    const { provider } = useWeb3Provider();
    const { chain } = useModel('@@chain');
    return useMemo(
        () => getContract(GroupGameAbi.abi, Contracts[chain.config.chainId]?.['GroupNFT'], provider?.getSigner()),
        [provider, chain],
    );
};
