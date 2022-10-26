import './index.less';
import { Big3Box, Big3FlexBox, Big3Image, Big3Text, Big3Icon } from 'big3-styled-base';
import { MatchType } from '@/config/constant';

import { useMemo } from 'react';
import { Button } from 'antd';
import TimeCountDown from '../TimeCountdown';
interface IProps {
    type: MatchType;
    typeText: string;
    teamA: string;
    teamB: string;
    matchTime: string;
    matchResult?: string;
}

export default (props: IProps) => {
    const { type, typeText, matchTime, matchResult, teamA, teamB } = props;
    const matchType = useMemo(() => {}, [type]);

    return (
        <Big3Box className="betting-card-large">
            <Big3FlexBox marginBottom={30} justify="space-between" align="center" position="relative">
                <Big3FlexBox align="center" fontFamily="Helvetica" fontWeight={700} fontSize={12}>
                    <Big3Icon src="/football-token.svg" marginRight={6} />
                    <Big3Text color="#7E829D" marginRight={3}>
                        Price Poll:
                    </Big3Text>
                    <Big3Text color="#F2DA0E">30.00 Token</Big3Text>
                </Big3FlexBox>
                <Big3Box className="match-type">{typeText}</Big3Box>
                <Big3FlexBox align="center" fontFamily="Helvetica" fontWeight={700} fontSize={12}>
                    <Big3Text color="#7E829D" marginRight={3}>
                        Price Poll:
                    </Big3Text>
                    <Big3Text color="#1FCFF1">4000</Big3Text>
                    <Big3Icon src="/betting-token.svg" marginLeft={6} />
                </Big3FlexBox>
            </Big3FlexBox>

            <Big3FlexBox justify="space-between" align="flex-end" paddingLeft={120} paddingRight={120}>
                <Big3FlexBox column align="center">
                    <Big3Image src={`/nations/${teamA.toLowerCase()}.png`} width={72} height={72} marginBottom={10} />
                    <Big3Text fontFamily="Codec Pro" fontWeight={600} fontSize={20} color="#ffffff" lineHeight={17}>
                        {teamA}
                    </Big3Text>
                    <Button className="btn-bet btn-bet-left">Win</Button>
                </Big3FlexBox>
                <TimeCountDown matchResult={matchResult} matchTime={matchTime} type={type} cardLarge={true} />

                <Big3FlexBox column align="center">
                    <Big3Image src={`/nations/${teamB.toLowerCase()}.png`} width={80} height={80} marginBottom={10} />
                    <Big3Text fontFamily="Codec Pro" fontWeight={600} fontSize={20} color="#ffffff" lineHeight={17}>
                        {teamB}
                    </Big3Text>
                    <Button className="btn-bet btn-bet-right">Win</Button>
                </Big3FlexBox>
            </Big3FlexBox>
        </Big3Box>
    );
};
