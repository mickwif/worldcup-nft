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
import { useWeb3React, useWeb3Provider } from 'big3-web3';
import { useGroupNFTContract } from '@/hooks/useContract';
import teams from '@/config/team.json';
import { useState, useEffect } from 'react';
import { IPFS_URL } from '@/config/constant';
import NationFlagRect from '@/components/NationFlagRect';
import { AntPagination } from '@/components';
import { fetchPlayerName } from '@/utils';
const PAGE_SIZE = 10;
export default () => {
    const { account } = useWeb3React();
    const { provider } = useWeb3Provider();
    const groupNFTContract = useGroupNFTContract();
    const [list, setList] = useState<any[]>([]);
    const [pageNum, setPageNum] = useState(1);
    const [total, setTotal] = useState(0);

    const getMyNFTs = async () => {
        if (!account || !provider) {
            return;
        }
        await fetchPlayerName(2);
        try {
            const res = await groupNFTContract.getTokenIds(account, pageNum, PAGE_SIZE);
            const total = res[0].toNumber();
            const listIds = res[1].map((item) => item.toNumber());
            console.log(res, total, listIds);
            setTotal(total);
            const list = listIds.map((id) => ({
                nation: teams[id % 32],
                tokenId: id,
            }));
            const players = await Promise.all(list.map((item) => fetchPlayerName(item.tokenId)));
            players.forEach((name, index) => {
                list[index].name = name;
            });
            setList(list);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getMyNFTs();
    }, [account, pageNum, provider]);

    return (
        <Big3Page>
            <Big3PortalNode className="nft-bg" container={document.getElementById('content')} />
            <Big3FlexBox column>
                <Big3Heading className="my-nft-title">My Simpsons</Big3Heading>
                <Big3FlexBox className="my-nft-list">
                    {list.map((item) => (
                        <Big3FlexBox column key={item.tokenId}>
                            <Big3Image
                                src={`${IPFS_URL}/nftb${item?.tokenId}.png`}
                                width={204}
                                height={204}
                                marginBottom={16}
                                borderRadius={14}
                                className="img-player"
                            ></Big3Image>
                            <Big3Paragraph
                                width={204}
                                fontFamily="Codec Pro"
                                fontWeight="600"
                                fontSize={14}
                                lineHeight={12}
                                color="#ffffff"
                                marginBottom={12}
                                textAlign="center"
                            >
                                {item.name}
                            </Big3Paragraph>
                            <Big3FlexBox justify="center" align="center" width="100%">
                                <NationFlagRect nation={item?.nation} marginRight={7} />
                                <Big3Text className="nation-name">{item?.nation}</Big3Text>
                            </Big3FlexBox>
                        </Big3FlexBox>
                    ))}
                </Big3FlexBox>
                {list.length > 0 && (
                    <Big3FlexBox justify="center" width="100%">
                        <AntPagination
                            total={total}
                            pageSize={PAGE_SIZE}
                            onChange={(page: number) => {
                                setPageNum(page);
                            }}
                            current={pageNum}
                            showQuickJumper={false}
                            showSizeChanger={false}
                        />
                    </Big3FlexBox>
                )}
                {total === 0 && (
                    <Big3FlexBox width="100%" height="100%" className="my-nft-empty">
                        No data
                    </Big3FlexBox>
                )}
            </Big3FlexBox>
        </Big3Page>
    );
};
