import './index.less';
import {
    Big3Box,
    Big3FlexBox,
    Big3Image,
    Big3Text,
    Big3Icon,
    Big3Heading,
    Big3Paragraph,
    Big3Page,
    Big3PortalNode,
} from 'big3-styled-base';
import { history } from 'umi';
import { useEffect, useState } from 'react';
import { useWeb3React, useWeb3Provider } from 'big3-web3';
import { ethers } from 'ethers';
import { TomatoFullscreenModal, AntButton, AntModal } from '@/components/antd';
import UpgradeTeam from './UpgradeTeam';
const Synthetic = () => {
    const { account } = useWeb3React();
    const { provider } = useWeb3Provider();
    const [modalShow, setModalShow] = useState(false);
    useEffect(() => {}, []);

    const handleSelectNFT = () => {
        setModalShow(true);
    };
    const handleSelelctToken = () => {};
    const handleSynthetic = () => {};
    return (
        <Big3Page>
            <Big3PortalNode className="synthetic-bg" container={document.getElementById('content')} />
            <Big3FlexBox column align="center" marginBottom={24}>
                <Big3Heading className="nft-page-heading">Get Super Simpsons start here</Big3Heading>
                <Big3Paragraph className="nft-page-text">
                    you can synthesize new NFT to participate in the next game
                </Big3Paragraph>
            </Big3FlexBox>
            <Big3FlexBox align="center" justify="space-between" position="relative" width={1200} margin="0 auto">
                <Big3FlexBox column align="center" className="synthetic-card">
                    <Big3Text fontFamily="Jua" fontWeight={400} fontSize={20} lineHeight={25} color="#FFFFFF">
                        1. Select Your
                    </Big3Text>
                    <Big3Text
                        fontFamily="Lilita One"
                        fontWeight={400}
                        fontSize={32}
                        lineHeight={48}
                        color="#FED411"
                        marginBottom={10}
                    >
                        NFTs
                    </Big3Text>
                    <Big3Image src="./img-synthetic-1.png" width={238} height={285} marginBottom={52}></Big3Image>

                    <AntButton $wiredTheme="black" className="btn-select" onClick={handleSelectNFT}>
                        NFTs
                    </AntButton>
                </Big3FlexBox>
                <Big3Image src="./icon-plus.png" width={56} height={56} className="icon-plus"></Big3Image>
                <Big3FlexBox column align="center" className="synthetic-card">
                    <Big3Text fontFamily="Jua" fontWeight={400} fontSize={20} lineHeight={25} color="#FFFFFF">
                        2. Make Sure Your Have
                    </Big3Text>
                    <Big3Text
                        fontFamily="Lilita One"
                        fontWeight={400}
                        fontSize={32}
                        lineHeight={48}
                        color="#FED411"
                        marginBottom={10}
                    >
                        Token
                    </Big3Text>
                    <Big3Image src="./img-synthetic-2.png" width={238} height={285} marginBottom={52}></Big3Image>

                    <AntButton $wiredTheme="black" className="btn-select" onClick={handleSelectNFT}>
                        Token
                    </AntButton>
                </Big3FlexBox>
                <Big3Image src="./icon-equal.png" width={52} height={46} className="icon-equal"></Big3Image>
                <Big3FlexBox column align="center" className="synthetic-card">
                    <Big3Text fontFamily="Jua" fontWeight={400} fontSize={20} lineHeight={25} color="#FFFFFF">
                        3. Get
                    </Big3Text>
                    <Big3Text
                        fontFamily="Lilita One"
                        fontWeight={400}
                        fontSize={32}
                        lineHeight={48}
                        color="#FED411"
                        marginBottom={10}
                    >
                        Super Simpsons
                    </Big3Text>
                    <Big3Image src="./img-synthetic-3.png" width={238} height={285} marginBottom={52}></Big3Image>

                    <AntButton $wiredTheme="black" className="btn-select" onClick={handleSelectNFT}>
                        Get
                    </AntButton>
                </Big3FlexBox>
            </Big3FlexBox>
            <TomatoFullscreenModal visible={modalShow} onClose={() => setModalShow(false)}>
                <UpgradeTeam />
            </TomatoFullscreenModal>
        </Big3Page>
    );
};

export default Synthetic;
