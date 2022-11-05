import './index.less';
import {
    Big3Page,
    Big3PortalNode,
    Big3FlexBox,
    Big3Image,
    Big3Heading,
    Big3Paragraph,
    Big3Text,
} from 'big3-styled-base';
import { TomatoFullscreenModal, AntButton, AntModal } from '@/components/antd';
import { useState, useEffect } from 'react';
import BuyNFT from './BuyNFT';
import { useGroupNFTContract } from '@/hooks/useContract';
import { useWeb3React, useWeb3Provider } from 'big3-web3';
import { ethers } from 'ethers';
import { message } from 'antd';
import useRefresh from '@/hooks/useRefresh';
import ClaimNFT from './ClaimNFT';
import teams from '@/config/team.json';
import { decodeMintEvent } from '@/utils';
import proof from '@/config/proof.json';
import TipModal from '@/components/TipModal';
const NFT = () => {
    const { account } = useWeb3React();
    const { provider } = useWeb3Provider();
    const [freeLeft, setFreeLeft] = useState(0);
    const [saleLeft, setSaleLeft] = useState(0);
    const [loading, setLoading] = useState(false);
    const [wlLoading, setWLLoading] = useState(false);
    const [errorText, setErrorText] = useState('');

    const [showResult, setShowResult] = useState(false);
    const [claimingNFT, setClaimingNFT] = useState<any>(null);
    const { slowRefresh } = useRefresh();
    const groupNFTContract = useGroupNFTContract();

    useEffect(() => {
        getFreeNFTLeft();
    }, [provider, slowRefresh]);

    const [modalShow, setModalShow] = useState(false);

    const getFreeNFTLeft = async () => {
        if (!provider) return;
        try {
            const res = await groupNFTContract.getFreeLeft();
            const num = res.toNumber();
            setFreeLeft(num);
            console.log(num);
            return num;
        } catch (e) {
            console.log(e);
        }
    };

    const handleFreeMint = async () => {
        const num = await getFreeNFTLeft();
        if (num < 1) {
            message.warn('No free NFT left.');
            return;
        }
        const time = await groupNFTContract._startTime();
        const WHITELIST_MINT_DURATION = 3600;
        const startTime = (time.toNumber() + WHITELIST_MINT_DURATION) * 1000;
        if (Date.now() < startTime) {
            setErrorText('Free mint not start yet.');
            return;
        }

        try {
            setLoading(true);
            const tx = await groupNFTContract.mint({ gasLimit: 500000 });
            const res = await tx.wait();
            console.log(res);
            const result = decodeMintEvent(res, 'Mint');
            if (result) {
                const tokenId = result._tokenId;
                const team = result._team;
                // const nationId = tokenId % 32;
                console.log('result: ', team, tokenId);
                setClaimingNFT({
                    nation: teams[team],
                    tokenId,
                });
                setShowResult(true);
            }
        } catch (e) {
            console.log(e);
            if (e && e.code === 4001) {
                message.warn('User canceled.');
            } else {
                message.error('Mint failed. Please try later.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleWLMint = async () => {
        if (!account || !proof[account]) {
            setErrorText('You do not have the right of Whitelist; please wait for the public mint.');
            return;
        }
        const time = await groupNFTContract._startTime();
        const startTime = time.toNumber() * 1000;
        if (Date.now() < startTime) {
            setErrorText('Whitelist mint not start yet.');
            return;
        }
        try {
            setWLLoading(true);
            const tx = await groupNFTContract.mintByWhiteList(proof[account]);
            const res = await tx.wait();
            console.log(res);
            const result = decodeMintEvent(res, 'MintByWhiteList');
            if (result) {
                const tokenId = result._tokenId;
                const team = result._team;
                // const nationId = tokenId % 32;
                console.log('result: ', team, tokenId);
                setClaimingNFT({
                    nation: teams[team],
                    tokenId,
                });
                setShowResult(true);
            }
        } catch (e) {
            console.log(e);
            if (e && e.code === 4001) {
                message.warn('User canceled.');
            } else if (e && e.message && e.message.includes('mint limit for whitelist')) {
                setErrorText('Only three Simpsons per account for whitelist mint.');
            } else if (e && e.message && e.message.includes('mint limit for free')) {
                setErrorText('The public mint limit reached.');
            } else {
                message.error('Mint failed. Please try later.');
            }
        } finally {
            setWLLoading(false);
        }
    };

    return (
        <Big3Page>
            <Big3PortalNode className="nft-bg" container={document.getElementById('content')} />
            <Big3FlexBox column align="center" marginBottom={24}>
                <Big3Heading className="nft-page-heading">Get your Simpsons start here</Big3Heading>
                <Big3Paragraph className="nft-page-text">
                    You need to mint a football player that will take your player to a game.{' '}
                </Big3Paragraph>
            </Big3FlexBox>
            <Big3FlexBox align="center" justify="center" position="relative" >
                <Big3FlexBox column align="center" className="nft-buy-card" marginRight={96}>
                    <Big3Image
                        src="./nft-bg-left.png"
                        width={552}
                        height={392}
                        position="absolute"
                        top={0}
                        left={0}
                    ></Big3Image>
                    <Big3Text fontFamily="Lilita One" fontWeight={400} fontSize={32} color="#1ECEF0">
                        Free mint NFTs
                    </Big3Text>
                    <Big3Paragraph
                        fontFamily="Helvetica"
                        fontWeight={400}
                        fontSize={15}
                        lineHeight={24}
                        textAlign="center"
                        color="#7E829D"
                        marginBottom={28}
                        marginTop={8}
                    >
                        After you complete the initial campaign, you will be eligible for WL. There are three rounds in
                        this series, 960, 1920, and 5760, respectively.
                    </Big3Paragraph>
                    <Big3FlexBox>
                        <AntButton
                            $wiredTheme="black"
                            className="btn-mint"
                            marginRight={24}
                            onClick={handleFreeMint}
                            disabled={freeLeft < 1}
                            loading={loading}
                        >
                            Mint
                        </AntButton>
                        <AntButton
                            $wiredTheme="black"
                            className="btn-mint"
                            onClick={handleWLMint}
                            disabled={!account || !proof[account]}
                            loading={wlLoading}
                        >
                            WL Mint
                        </AntButton>
                    </Big3FlexBox>
                </Big3FlexBox>
                <Big3Image className="nft-bg-middle" src="./nft-bg-middle.png" width={264} height={264}></Big3Image>
                <Big3FlexBox column align="center" className="nft-buy-card">
                    <Big3Image
                        src="./nft-bg-right.png"
                        width={552}
                        height={392}
                        position="absolute"
                        top={0}
                        left={0}
                    ></Big3Image>
                    <Big3Text fontFamily="Lilita One" fontWeight={400} fontSize={32} color="#FED411">
                        Buy mint NFTs
                    </Big3Text>
                    <Big3Paragraph
                        fontFamily="Helvetica"
                        fontWeight={400}
                        fontSize={16}
                        lineHeight={24}
                        textAlign="center"
                        color="#7E829D"
                        marginBottom={56}
                        marginTop={8}
                    >
                        This section is paid NFT with a total of 960. If you want to have your favorite team, you can
                        select the corresponding team to pay for mint.
                    </Big3Paragraph>
                    <AntButton
                        className="btn-mint"
                        $wiredTheme="black"
                        onClick={() => {
                            setModalShow(true);
                        }}
                    >
                        Buy
                    </AntButton>
                </Big3FlexBox>
            </Big3FlexBox>
            <TomatoFullscreenModal visible={modalShow} onClose={() => setModalShow(false)}>
                <BuyNFT />
            </TomatoFullscreenModal>
            <TipModal
                errorText={errorText}
                onOk={() => {
                    setErrorText('');
                }}
            />
            {showResult && <ClaimNFT nft={claimingNFT} onClaim={() => setShowResult(false)} />}
        </Big3Page>
    );
};

export default NFT;
