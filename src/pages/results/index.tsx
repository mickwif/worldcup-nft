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

import { AntTable } from '@/components/antd';
import BackButton from '@/components/BackButton';
const MatchResults = () => {
    const [list, setList] = useState([]);
    useEffect(() => {
        const item = {
            match: 'Group Stage · matchday 1 ',
            time: 'Nov.21 00:00',
            result: '3:0',
            teamA: 'South Korea',
            teamB: 'Qatar',
            poll: 3000,
            reward: 3000,
            bet: 400000,
        };
        const list = new Array(10).fill(item);
        setList(list);
    }, []);
    const columns = [
        {
            title: 'Match',
            dataIndex: 'match',
            key: 'match',
            render: (text) => (
                <Big3FlexBox align="center">
                    <Big3Text fontFamily="Codec Pro" fontWeight={500} fontSize={14} color="#7E829D">
                        {text}
                    </Big3Text>
                </Big3FlexBox>
            ),
        },
        {
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
            render: (text) => (
                <Big3FlexBox align="center">
                    <Big3Text fontFamily="Codec Pro" fontWeight={500} fontSize={14} color="#FFFFFF">
                        {text}
                    </Big3Text>
                </Big3FlexBox>
            ),
        },
        {
            title: 'Results',
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
            title: 'Prize Poll',
            dataIndex: 'poll',
            key: 'poll',
            render: (text) => (
                <Big3FlexBox align="center">
                    <Big3Text fontFamily="Codec Pro" fontWeight={500} fontSize={14} color="#F2DA0E">
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
                        {text} ETH
                    </Big3Text>
                </Big3FlexBox>
            ),
        },
        {
            title: 'Total Bet',
            dataIndex: 'bet',
            key: 'bet',
            render: (text) => (
                <Big3FlexBox align="center">
                    <Big3Text fontFamily="Codec Pro" fontWeight={500} fontSize={14} color="#1FCFF1">
                        {text}
                    </Big3Text>
                </Big3FlexBox>
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
                    2022 World Cup Match Results{' '}
                </Big3Heading>

                <AntTable columns={columns} dataSource={list} className="my-positions-table" pagination={false} />
            </Big3FlexBox>
        </Big3Page>
    );
};

export default MatchResults;
