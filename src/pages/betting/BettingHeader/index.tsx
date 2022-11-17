import './index.less';
import { Big3Box, Big3FlexBox, Big3Image, Big3Text, Big3Icon, Big3Heading, Big3Paragraph } from 'big3-styled-base';
import { Button } from 'antd';
import { history } from 'umi';
import { useEffect, useState } from 'react';
import { useWeb3React, useWeb3Provider } from 'big3-web3';
import { ethers } from 'ethers';
export default () => {
    const [ethBalance, setEthBalance] = useState('0.0');
    const [tokenBalance, setTokenBalance] = useState(0);
    const { account } = useWeb3React();
    const { provider } = useWeb3Provider();
    const fetchBalance = async () => {
        const balance = await provider.getSigner().getBalance();
        const balanceNum = ethers.utils.formatEther(balance);
        console.log('balance: ', balanceNum);
        setEthBalance(Number(balanceNum).toFixed(2));
    };
    const fetchTokenBalance = async () => {};
    useEffect(() => {
        if (account && provider) {
            fetchBalance();
            fetchTokenBalance();
        }
    }, [account, provider]);
    return (
        <Big3FlexBox justify="space-between" align="center" marginTop={10} className="betting-header">
            <Big3FlexBox align="center">
                <Big3FlexBox className="betting-balance">
                    <Big3Image src="./betting-balance-bg.png" />
                    <Big3FlexBox justify="space-between" align="center" className="betting-balance-tokens">
                        <Big3Text>{ethBalance} ETH</Big3Text>
                        <div className="line"></div>
                        <Big3Text>0 Token</Big3Text>
                    </Big3FlexBox>
                </Big3FlexBox>
                {/* <Button className="betting-balance-claim">Claim</Button> */}
            </Big3FlexBox>
           
            <Big3FlexBox align="center">
                <Big3FlexBox
                    onClick={() => {
                        history.push('/positions');
                    }}
                    align="center"
                    className="betting-positions-results betting-positions"
                >
                    <Big3Image src="./betting-token.svg" width={16} height={16} marginRight={8} />
                    <Big3Text>My Positions</Big3Text>
                    {/* <div className="positions-badge">18</div> */}
                </Big3FlexBox>
                <Big3FlexBox
                    onClick={() => {
                        history.push('/results');
                    }}
                    align="center"
                    className="betting-positions-results betting-results"
                >
                    <Big3Image src="./icon-cup.svg" width={16} height={16} marginRight={8} />
                    <Big3Text>Match Results</Big3Text>
                    {/* <div className="results-badge">23</div> */}
                </Big3FlexBox>
            </Big3FlexBox>
        </Big3FlexBox>
    );
};
