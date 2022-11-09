import './index.less';
import { Big3Box, Big3FlexBox, Big3Image, Big3Text, Big3Icon } from 'big3-styled-base';
import { MatchType } from '@/config/constant';

import { useMemo, useState } from 'react';
import { Button } from 'antd';
import TimeCountDown from '../TimeCountdown';
import Teams from '@/config/team.json';
import { useGroupGameContract } from '@/hooks/useContract';
import { useWeb3React, useWeb3Provider } from 'big3-web3';
interface IProps {
    id: number;
    type: MatchType;
    typeText: string;
    teamA: string;
    teamB: string;
    deadline: number;
    date: string;
    matchResult?: string;
}

export default (props: IProps) => {
    const { id, type, typeText, deadline, date, matchResult, teamA, teamB } = props;
    const { account } = useWeb3React();
    const { provider } = useWeb3Provider();
    const [rewardAmount, setRewardAmount] = useState(0);
    const [totalPredictCount, setTotalPredictCount] = useState(0);
    const groupGameContract = useGroupGameContract();
    const teamAName = useMemo(() => {
        return Teams[teamA];
    }, [teamA]);
    const teamBName = useMemo(() => {
        return Teams[teamB];
    }, [teamB]);

    const getRewardAmount = async () => {
        try {
            const res = await groupGameContract.getRewardAmount();
        } catch (e) {
            console.log(e);
        }
    };
    const getTotalPredictCountByGame = async () => {
        try {
            const res = await groupGameContract.getTotalPredictCountByGame();
        } catch (e) {
            console.log(e);
        }
    };
    const handleBet = async () => {
        
    }
    return (
        <Big3Box className="betting-card">
            <Big3FlexBox marginBottom={30} justify="space-between" align="center">
                <Big3FlexBox align="center" fontFamily="Helvetica" fontWeight={700} fontSize={12}>
                    <Big3Icon src="/football-token.svg" marginRight={6} />
                    <Big3Text color="#7E829D" marginRight={3}>
                        Price Poll:
                    </Big3Text>
                    <Big3Text color="#F2DA0E">{rewardAmount} Token</Big3Text>
                </Big3FlexBox>
                <Big3Box className="match-type">{typeText}</Big3Box>
                <Big3FlexBox align="center" fontFamily="Helvetica" fontWeight={700} fontSize={12}>
                    <Big3Text color="#7E829D" marginRight={3}>
                        Total Bet:
                    </Big3Text>
                    <Big3Text color="#1FCFF1">{totalPredictCount}</Big3Text>
                    <Big3Icon src="/betting-token.svg" marginLeft={6} />
                </Big3FlexBox>
            </Big3FlexBox>

            <Big3FlexBox justify="space-between" align="flex-end">
                <Big3FlexBox column align="center">
                    <Big3Image
                        src={`/nations/${teamAName.toLowerCase()}.png`}
                        width={72}
                        height={72}
                        marginBottom={10}
                    />
                    <Big3Text fontFamily="Codec Pro" fontWeight={600} fontSize={20} color="#ffffff" lineHeight={17}>
                        {teamAName}
                    </Big3Text>
                    <Button className="btn-bet btn-bet-left">Win</Button>
                </Big3FlexBox>
                <TimeCountDown matchResult={matchResult} matchTime={deadline} type={type} />

                <Big3FlexBox column align="center">
                    <Big3Image
                        src={`/nations/${teamBName.toLowerCase()}.png`}
                        width={80}
                        height={80}
                        marginBottom={10}
                    />
                    <Big3Text fontFamily="Codec Pro" fontWeight={600} fontSize={20} color="#ffffff" lineHeight={17}>
                        {teamBName}
                    </Big3Text>
                    <Button className="btn-bet btn-bet-right">Win</Button>
                </Big3FlexBox>
            </Big3FlexBox>
        </Big3Box>
    );
};
