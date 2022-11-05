import './index.less';
import {
    Big3Page,
    Big3PortalNode,
    Big3FlexBox,
    Big3Image,
    Big3Heading,
    Big3Paragraph,
    Big3Text,
    Big3Box,
} from 'big3-styled-base';
import NationFlagRect from '@/components/NationFlagRect';
import { AntButton } from '@/components';
import { IPFS_URL } from '@/config/constant';
export interface IClaimingNFT {
    nation: string;
    tokenId: number;
}
interface IProps {
    nft: IClaimingNFT;
    onClaim: () => void;
}
export default (props: IProps) => {
    const { nft, onClaim } = props;
    const player = {
        name: 'Cristiano Ronaldo dos Santos Aveiro',
        nation: 'Portugal',
    };
    return (
        <Big3FlexBox className="buy-nft-result" paddingTop={75} justify="center">
            <Big3FlexBox column align="center" width="100%" className="nft-result">
                <Big3Text
                    fontFamily="Lilita One"
                    fontWeight={400}
                    fontSize={40}
                    lineHeight={50}
                    color="#FED411"
                    marginBottom={56}
                >
                    Congratulations
                </Big3Text>
                <Big3Image
                    src={`${IPFS_URL}/nftb${nft?.tokenId}.png`}
                    width={200}
                    height={200}
                    marginBottom={40}
                    className="img-player"
                ></Big3Image>
                {/* <Big3Text fontFamily="Codec Pro" fontWeight="600" fontSize={20} color="#ffffff" marginBottom={16}>
                    {player.name}
                </Big3Text> */}
                <Big3FlexBox justify="center" align="center" marginBottom={40}>
                    <NationFlagRect nation={nft?.nation} marginRight={12} />
                    <Big3Text className="nation-name">{nft?.nation}</Big3Text>
                </Big3FlexBox>
                <AntButton width={168} height={40} onClick={() => props.onClaim()}>
                    Claim
                </AntButton>
            </Big3FlexBox>
        </Big3FlexBox>
    );
};
