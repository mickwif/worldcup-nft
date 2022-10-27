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
import { useState } from 'react';
import BuyNFT from './BuyNFT';
const NFT = () => {
    const [modalShow, setModalShow] = useState(true);
    return (
        <Big3Page>
            <Big3PortalNode className="nft-bg" container={document.getElementById('content')} />
            <Big3FlexBox column align="center" marginBottom={24}>
                <Big3Heading className="nft-page-heading">Get your Simpsons start here</Big3Heading>
                <Big3Paragraph className="nft-page-text">
                    You need to mint a football player that will take your player to a game.{' '}
                </Big3Paragraph>
            </Big3FlexBox>
            <Big3FlexBox align="center" justify="center">
                <Big3FlexBox column align="center">
                    <Big3Image src="./nft-bg-left.png" width={332} height={320}></Big3Image>
                    <Big3Text marginBottom={10}>Free mint NFTs</Big3Text>
                    <Big3Paragraph
                        fontFamily="Helvetica"
                        fontWeight={400}
                        fontSize={16}
                        lineHeight={24}
                        textAlign="center"
                        color="#7E829D"
                        marginBottom={32}
                    >
                        After you complete the initial campaign, you will be eligible for WL. There are three rounds in
                        this series, each round will issue 2880 NFT (32*90, 32 represents different countries, 90
                        represents the total number of players in each country).
                    </Big3Paragraph>
                    <Button className="btn-mint">Min</Button>
                </Big3FlexBox>
                <Big3Image
                    src="./nft-bg-middle.png"
                    width={264}
                    height={264}
                    marginLeft={42}
                    marginRight={42}
                ></Big3Image>
                <Big3FlexBox column align="center">
                    <Big3Image src="./nft-bg-right.png" width={332} height={320}></Big3Image>
                    <Big3Text marginBottom={10}>Buy mint NFTs</Big3Text>
                    <Big3Paragraph
                        fontFamily="Helvetica"
                        fontWeight={400}
                        fontSize={16}
                        lineHeight={24}
                        textAlign="center"
                        color="#7E829D"
                        marginBottom={32}
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
        </Big3Page>
    );
};

export default NFT;
