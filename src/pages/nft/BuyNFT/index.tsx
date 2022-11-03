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
import nations from './nations.json';
import { AntButton } from '@/components';
import ClaimNFT from '../ClaimNFT';
import { useState, useEffect } from 'react';
import { useGroupNFTContract } from '@/hooks/useContract';
import teams from '@/config/team.json';
import { ethers } from 'ethers';
import { message } from 'antd';
interface IProps {}
export default (props: IProps) => {
    const [showResult, setShowResult] = useState(false);
    const [claimingNFT, setClaimingNFT] = useState<any>(null);
    const [nationNFTs, setNationNFTs] = useState<any[]>(nations);
    const [loading, setLoading] = useState(false);
    const groupNFTContract = useGroupNFTContract();

    const getSaleLeft = async () => {
        try {
            const res = await groupNFTContract.getSaleInfo();
            const nums = res.map((item) => item.toNumber());
            console.log(nums);
            const Nations = Object.keys(teams).map((key) => ({
                name: teams[key],
                left: nums[key],
                total: 30,
            }));
            setNationNFTs(Nations);
        } catch (e) {
            console.log(e);
        }
    };

    const handleSaleMint = async (team: number) => {
        try {
            setLoading(true);
            const tx = await groupNFTContract.buy(team, { value: ethers.utils.parseUnits('0.05', 'ether') });
            const res = await tx.wait();
            console.log(res);
            const tokenId = res.events[0].args['tokenId'];
            console.log(res.events[0].args['tokenId']);
            setClaimingNFT({
                nation: teams[team],
                tokenId,
            });
            setShowResult(true);
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
    useEffect(() => {
        getSaleLeft();
    }, []);

    return (
        <Big3FlexBox column align="center" width="100%">
            {showResult && <ClaimNFT nft={claimingNFT} onClaim={() => setShowResult(false)} />}

            <Big3Image src="./buy-nft-title.png" width={674} height={115} marginBottom={48}></Big3Image>
            <Big3Box className="nation-list">
                {nationNFTs.map((item, index) => (
                    <Big3FlexBox column align="center" className="nation-item">
                        <Big3Image
                            src={`./nations/${item.name.toLowerCase()}.png`}
                            width={72}
                            height={72}
                            marginBottom={14}
                        ></Big3Image>
                        <Big3Text
                            fontFamily="Codec Pro"
                            fontWeight={600}
                            fontSize={20}
                            lineHeight={17}
                            color="#ffffff"
                            marginBottom={22}
                        >
                            {item.name}
                        </Big3Text>
                        <AntButton
                            width={148}
                            height={32}
                            marginBottom={10}
                            disabled={item.left === 0}
                            onClick={() => handleSaleMint(index)}
                            loading={loading}
                        >
                            Mint
                        </AntButton>
                        <Big3Paragraph
                            color="#7E829D"
                            fontFamily="Codec Pro"
                            fontWeight={500}
                            fontSize={12}
                            lineHeight={10}
                            display="flex"
                            alignItems="center"
                        >
                            Total:
                            <Big3Text marginLeft={2} color={item.left === 0 ? '#7E829D' : '#ffffff'}>
                                {item.left}
                            </Big3Text>
                            /<Big3Text>{item.total}</Big3Text>
                        </Big3Paragraph>
                    </Big3FlexBox>
                ))}
            </Big3Box>
        </Big3FlexBox>
    );
};
