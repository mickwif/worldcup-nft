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
import { Button } from 'antd';
import { TomatoFullscreenModal } from '@/components/antd';
import { useState, useEffect } from 'react';
import BuyNFT from './BuyNFT';
import { useGroupNFTContract } from '@/hooks/useContract';
import { useWeb3React, useWeb3Provider } from 'big3-web3';
import { ethers } from 'ethers';
import { message } from 'antd';
import useRefresh from '@/hooks/useRefresh';
import ClaimNFT from './ClaimNFT';
import teams from '@/config/team.json';

const NFT = () => {
    const { account } = useWeb3React();
    const { provider } = useWeb3Provider();
    const [freeLeft, setFreeLeft] = useState(0);
    const [saleLeft, setSaleLeft] = useState(0);
    const [loading, setLoading] = useState(false);
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
        try {
            setLoading(true);
            const tx = await groupNFTContract.mint({ gasLimit: 500000 });
            const res = await tx.wait();
            console.log(res);
            console.log(res.events[0].args['tokenId']);
            const tokenId = res.events[0].args['tokenId'];
            // setClaimingNFT({
            //     nation: teams[team],
            //     tokenId,
            // });
            // setShowResult(true);
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

    return (
        <Big3Page>
            <Big3PortalNode className="nft-bg" container={document.getElementById('content')} />
            <Big3FlexBox column align="center" marginBottom={24}>
                <Big3Heading className="nft-page-heading">Get your Simpsons start here</Big3Heading>
                <Big3Paragraph className="nft-page-text">
                    You need to mint a football player that will take your player to a game.{' '}
                </Big3Paragraph>
            </Big3FlexBox>
            <Big3FlexBox align="center" justify="center" position="relative">
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
                        this series, each round will issue 2880 NFT (32*90, 32 represents different countries, 90
                        represents the total number of players in each country).
                    </Big3Paragraph>
                    <Button className="btn-mint" onClick={handleFreeMint} disabled={freeLeft < 1} loading={loading}>
                        Mint
                    </Button>
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
                    <Button
                        className="btn-mint"
                        onClick={() => {
                            setModalShow(true);
                        }}
                    >
                        Buy
                    </Button>
                </Big3FlexBox>
            </Big3FlexBox>
            <TomatoFullscreenModal visible={modalShow} onClose={() => setModalShow(false)}>
                <BuyNFT />
            </TomatoFullscreenModal>
            {showResult && <ClaimNFT nft={claimingNFT} onClaim={() => setShowResult(false)} />}
        </Big3Page>
    );
};

export default NFT;
