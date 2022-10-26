import './index.less';
import { Big3Page, Big3PortalNode, Big3FlexBox, Big3Image, Big3Heading, Big3Paragraph } from 'big3-styled-base';
import BettingHeader from './BettingHeader';
import BettingCard from '@/components/BettingCard';
import BettingCardLarge from '@/components/BettingCardLarge';
import GroupMatches from '@/config/matches/group_matches.json';
import Top8Matches from '@/config/matches/top8_matches.json';

import { MatchType } from '@/config/constant';
import { useState, useEffect, useRef } from 'react';

const Betting = () => {
    const [matchType, setMatchType] = useState(MatchType.Group);
    const internalRef = useRef(null);
    useEffect(() => {
        internalRef.current = setInterval(() => {
            const now = Date.now();
            const top8Start = new Date('2022-12-03 20:00').getTime();
            const top4Start = new Date('2022-12-09 20:00').getTime();
            const semiFinalStart = new Date('2022-12-14 00:00').getTime();
            const finalStart = new Date('2022-12-17 20:00').getTime();
            if (now >= top8Start && now < top4Start) {
                // TODO 时区问题
                setMatchType(MatchType.Top8);
            } else if (now >= top4Start && now < semiFinalStart) {
                setMatchType(MatchType.Top4);
            } else if (now >= semiFinalStart && now < finalStart) {
                setMatchType(MatchType.SemiFinal);
            } else if (now >= finalStart) {
                setMatchType(MatchType.Final);
            }
        }, 10 * 1000);
        return () => {
            clearInterval(internalRef.current);
            internalRef.current = null;
        };
    }, []);
    return (
        <Big3Page>
            <Big3PortalNode className="betting-bg" container={document.getElementById('content')} />
            <BettingHeader />
            <Big3FlexBox column align="center">
                <Big3Heading className="balance-heading">The Simpsons NFTfi Game</Big3Heading>
                <Big3Paragraph className="balance-match-text">Group Stage · matchday 1 of 3</Big3Paragraph>
            </Big3FlexBox>
            <Big3FlexBox column>
                {matchType === MatchType.Group &&
                    Object.keys(GroupMatches).map((key: string) => (
                        <Big3FlexBox column align="center" marginBottom={56} width="100%">
                            <Big3Image src="./img-match-day.png" marginBottom={24} width={235} height={61} />
                            <Big3FlexBox className="group-match-list">
                                {GroupMatches[key].map((item: any) => (
                                    <BettingCard
                                        type={MatchType.Group}
                                        typeText={'Group ' + item.group}
                                        teamA={item.teamA}
                                        teamB={item.teamB}
                                        matchTime={`${key} ${item.matchTime}`}
                                        matchResult={null}
                                    />
                                ))}
                            </Big3FlexBox>
                        </Big3FlexBox>
                    ))}
                {matchType !== MatchType.Group &&
                    Object.keys(Top8Matches).map((key: string) => (
                        <Big3FlexBox column align="center" marginBottom={56} width="100%">
                            <Big3Image src="./img-match-day.png" marginBottom={24} width={235} height={61} />
                            <Big3FlexBox className="top8-match-list" column>
                                {Top8Matches[key].map((item: any) => (
                                    <BettingCardLarge
                                        type={MatchType.Group}
                                        typeText={item.typeText}
                                        teamA={item.teamA}
                                        teamB={item.teamB}
                                        matchTime={`${key} ${item.matchTime}`}
                                        matchResult={null}
                                    />
                                ))}
                            </Big3FlexBox>
                        </Big3FlexBox>
                    ))}
            </Big3FlexBox>
        </Big3Page>
    );
};

export default Betting;
