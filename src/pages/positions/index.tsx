import './index.less';
import { useEffect, useState, useCallback } from 'react';
import {
    Big3Page,
    Big3PortalNode,
    Big3FlexBox,
    Big3Text,
    Big3Image,
    Big3Heading,
    Big3Paragraph,
} from 'big3-styled-base';
import { Button } from 'antd';
import { AntTable } from '@/components/antd';
import BackButton from '@/components/BackButton';
import { useGroupGameContract } from '@/hooks/useContract';
import { useWeb3React, useWeb3Provider } from 'big3-web3';
import { AntPagination } from '@/components';
import Teams from '@/config/team.json';
import { formatTimestamp } from '@/utils';
import { GameResult } from '@/config/constant';
import { message } from 'antd';
const PAGE_SIZE = 10;

const MyPositions = () => {
    const [list, setList] = useState([]);
    const { provider } = useWeb3Provider();
    const { account } = useWeb3React();
    const groupGameContract = useGroupGameContract();
    const [pageNum, setPageNum] = useState(1);
    const [total, setTotal] = useState(0);

    const getBetTeam = (item: any) => {
        if (item.result === GameResult.Win) {
            return Teams[item.homeTeamId];
        } else if (item.result === GameResult.Lose) {
            return Teams[item.awayTeamId];
        } else {
            return '';
        }
    };
    const getBetType = (item: any) => {
        if (item.result === GameResult.Win) {
            return 'Win';
        } else if (item.result === GameResult.Lose) {
            return 'Win';
        } else if (item.result === GameResult.Draw) {
            return 'Draw';
        } else {
            return '';
        }
    };
    const fetchUserPositions = async () => {
        if (!account || !provider) {
            return;
        }
        try {
            const res = await groupGameContract.getPredictsByUser(account, pageNum, PAGE_SIZE);
            const total = res[0].toNumber();

            const list = res[1].map((item) => ({
                id: item.id.toNumber(),
                betTime: formatTimestamp(item.time.toNumber() * 1000, 'YYYY.MM.DD HH:mm'),
                teamA: Teams[item.homeTeamId],
                teamB: Teams[item.awayTeamId],
                result: `${item.homeScore}:${item.awayScore}`,
                betTeam: getBetTeam(item),
                betType: getBetType(item),
                stakeToken: item.count.toNumber(),
                reward: item.reward.toNumber(),
                isClaimed: item.isClaimed,
            }));
            list.sort((a, b) => {
                return b.id - a.id;
            });
            setList(list);
            setTotal(total);
        } catch (e) {
            console.log(e);
        }
    };

    const handleClaim = async (item: any) => {
        try {
            const tx = await groupGameContract.claim(item.id);
            const res = await tx.wait();
            console.log(res);
            fetchUserPositions();
        } catch (e) {
            console.log(e);
            message.error('Claim failed. Please try later.');
        } finally {
        }
    };

    useEffect(() => {
        fetchUserPositions();
    }, [account, pageNum, provider]);

    const columns = [
        {
            title: 'Bet Time',
            dataIndex: 'betTime',
            key: 'betTime',
            render: (text) => (
                <Big3FlexBox align="center">
                    <Big3Text fontFamily="Codec Pro" fontWeight={500} fontSize={14} color="#7E829D">
                        {text}
                    </Big3Text>
                </Big3FlexBox>
            ),
        },
        {
            title: 'Match',
            dataIndex: 'results',
            key: 'results',
            render: (text, item) => (
                <Big3FlexBox align="center">
                    <Big3FlexBox align="center" width={144} justify="flex-end">
                        <Big3Text
                            fontFamily="Codec Pro"
                            fontWeight={500}
                            fontSize={14}
                            color="#FFFFFF"
                            marginRight={12}
                        >
                            {item.teamA}
                        </Big3Text>
                        <Big3Image
                            src={`./nations/${item.teamA.toLowerCase()}.png`}
                            width={28}
                            height={28}
                            marginRight={22}
                        ></Big3Image>
                    </Big3FlexBox>
                    <Big3Text fontFamily="Codec Pro" fontWeight={500} fontSize={16} color="#FFFFFF">
                        {item.result.split(':')[0]}
                    </Big3Text>
                    <Big3Text fontFamily="Codec Pro" fontWeight={400} fontSize={14} color="#4A4A60" margin="0 8px">
                        :
                    </Big3Text>
                    <Big3Text fontFamily="Codec Pro" fontWeight={500} fontSize={16} color="#FFFFFF" marginRight={22}>
                        {item.result.split(':')[1]}
                    </Big3Text>
                    <Big3Image
                        src={`./nations/${item.teamB.toLowerCase()}.png`}
                        width={28}
                        height={28}
                        marginRight={14}
                    ></Big3Image>
                    <Big3Text fontFamily="Codec Pro" fontWeight={500} fontSize={14} color="#FFFFFF">
                        {item.teamB}
                    </Big3Text>
                </Big3FlexBox>
            ),
        },
        {
            title: 'Bet',
            dataIndex: 'betTeam',
            key: 'betTeam',
            render: (text, item) => (
                <Big3FlexBox align="center">
                    {item.betType !== 'Draw' && (
                        <Big3Image
                            src={`./nations/${item.betTeam.toLowerCase()}.png`}
                            width={16}
                            height={16}
                            marginRight={8}
                        ></Big3Image>
                    )}
                    <Big3Text fontFamily="Codec Pro" fontWeight={500} fontSize={14} color="#FFFFFF">
                        {item.betType}
                    </Big3Text>
                </Big3FlexBox>
            ),
        },
        {
            title: 'Stake',
            dataIndex: 'stake',
            key: 'stake',
            render: (text, item) => (
                <Big3FlexBox align="center">
                    <Big3Text marginRight={6} fontFamily="Codec Pro" fontWeight={500} fontSize={14} color="#F2DA0E">
                        {item.stakeToken} NFT
                    </Big3Text>
                    {/* <Big3Paragraph>
                        <Big3Text marginRight={2} fontFamily="Codec Pro" fontWeight={500} fontSize={14} color="#4A4A60">
                            (
                        </Big3Text>
                        <Big3Text fontFamily="Codec Pro" fontWeight={500} fontSize={14} color="#1FCFF1" marginRight={3}>
                            {item.stakeToken} Bet
                        </Big3Text>
                        <Big3Text fontFamily="Codec Pro" fontWeight={500} fontSize={14} color="#4A4A60">
                            )
                        </Big3Text>
                    </Big3Paragraph> */}
                </Big3FlexBox>
            ),
        },
        // {
        //     title: 'Win',
        //     dataIndex: 'win',
        //     key: 'win',
        //     render: (text) => (
        //         <Big3FlexBox align="center">
        //             <Big3Text
        //                 fontFamily="Codec Pro"
        //                 fontWeight={500}
        //                 fontSize={14}
        //                 color={Number(text) >= 0 ? '#2FB773' : '#FA4A27'}
        //             >
        //                 {Number(text) > 0 ? '' : '-'}
        //                 {text} ETH
        //             </Big3Text>
        //         </Big3FlexBox>
        //     ),
        // },
        {
            title: 'Reward',
            dataIndex: 'reward',
            key: 'reward',
            render: (text) => (
                <Big3FlexBox align="center">
                    <Big3Text fontFamily="Codec Pro" fontWeight={500} fontSize={14} color="#F2DA0E">
                        {text} Token
                    </Big3Text>
                </Big3FlexBox>
            ),
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (text, item) => (
                <>
                    {!item.isClaimed && (
                        <Button className="btn-claim-reward" onClick={() => handleClaim(item)}>
                            Claim
                        </Button>
                    )}
                </>
            ),
        },
    ];
    return (
        <Big3Page>
            <Big3PortalNode className="betting-bg" container={document.getElementById('content')} />
            <BackButton />
            <Big3FlexBox column align="center">
                <Big3Heading
                    fontFamily="Lilita One"
                    font-weight={400}
                    font-size={40}
                    line-height={56}
                    color="#FFFFFF"
                    marginBottom={40}
                >
                    My Positions
                </Big3Heading>

                <AntTable columns={columns} dataSource={list} className="my-positions-table" pagination={false} />
            </Big3FlexBox>
            {list.length > 0 && (
                <Big3FlexBox justify="center" width="100%" marginTop={30}>
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
        </Big3Page>
    );
};

export default MyPositions;
