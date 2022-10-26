import './index.less';
import { useEffect, useState } from 'react';
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
const MyPositions = () => {
    const [list, setList] = useState([]);
    useEffect(() => {
        const item = {
            betTime: '2022.11.21 10:00',
            result: '3:0',
            teamA: 'South Korea',
            teamB: 'Qatar',
            betTeam: 'Qatar',
            betType: 'Win',
            stakeEth: 30,
            stakeToken: 400,
            stakeNFT: 3,
            win: 4000,
            reward: 3000,
        };
        const list = new Array(10).fill(item);
        setList(list);
    }, []);
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
                    <Big3Text fontFamily="Codec Pro" fontWeight={500} fontSize={14} color="#FFFFFF" marginRight={12}>
                        {item.teamA}
                    </Big3Text>
                    <Big3Image
                        src={`./nations/${item.teamA.toLowerCase()}.png`}
                        width={28}
                        height={28}
                        marginRight={22}
                    ></Big3Image>
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
                    <Big3Image
                        src={`./nations/${item.betTeam.toLowerCase()}.png`}
                        width={16}
                        height={16}
                        marginRight={8}
                    ></Big3Image>
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
                        {item.stakeEth} ETH
                    </Big3Text>
                    <Big3Paragraph>
                        <Big3Text marginRight={2} fontFamily="Codec Pro" fontWeight={500} fontSize={14} color="#4A4A60">
                            (
                        </Big3Text>
                        <Big3Text fontFamily="Codec Pro" fontWeight={500} fontSize={14} color="#1FCFF1" marginRight={3}>
                            {item.stakeToken} Bet
                        </Big3Text>
                        <Big3Text fontFamily="Codec Pro" fontWeight={500} fontSize={14} color="#4A4A60">
                            )
                        </Big3Text>
                    </Big3Paragraph>
                </Big3FlexBox>
            ),
        },
        {
            title: 'Win',
            dataIndex: 'win',
            key: 'win',
            render: (text) => (
                <Big3FlexBox align="center">
                    <Big3Text
                        fontFamily="Codec Pro"
                        fontWeight={500}
                        fontSize={14}
                        color={Number(text) >= 0 ? '#2FB773' : '#FA4A27'}
                    >
                        {Number(text) > 0 ? '' : '-'}
                        {text} ETH
                    </Big3Text>
                </Big3FlexBox>
            ),
        },
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
            render: (text, item) => <>{item.reward && <Button className="btn-claim-reward">Claim</Button>}</>,
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
                    2022 World Cup Match Results{' '}
                </Big3Heading>

                <AntTable columns={columns} dataSource={list} className="my-positions-table" pagination={false} />
            </Big3FlexBox>
        </Big3Page>
    );
};

export default MyPositions;
