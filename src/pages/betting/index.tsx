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
import BettingHeader from './BettingHeader';
import BettingCard from '@/components/BettingCard';
import BettingCardLarge from '@/components/BettingCardLarge';
// import GroupMatches from '@/config/matches/group_matches.json';
import Top8Matches from '@/config/matches/top8_matches.json';
import { getGroupByTeamId } from '@/utils/matches';
import { MatchType } from '@/config/constant';
import { useState, useEffect, useRef } from 'react';
import GroupMatches from '@/utils/matches';
import { formatTimestamp } from '@/utils';
const Betting = () => {
    const [matchType, setMatchType] = useState(MatchType.Group);
    const internalRef = useRef(null);
    console.log('GroupMatches: ', GroupMatches);
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
        <Big3Page position="relative">
            <Big3PortalNode className="betting-head-bg" container={document.getElementById('content')} />
            <Big3PortalNode className="betting-bg" container={document.getElementById('content')} />
            <BettingHeader />
            <Big3FlexBox column align="center" marginBottom={80}>
                <Big3Heading className="balance-heading">The Simpsons NFTfi Game</Big3Heading>
                <Big3Paragraph className="balance-match-text">Group Stage</Big3Paragraph>
            </Big3FlexBox>
            <Big3FlexBox column>
                {matchType === MatchType.Group &&
                    Object.keys(GroupMatches).map((key: string) => (
                        <Big3FlexBox column align="center" marginBottom={56} width="100%">
                            <div className="match-date">{formatTimestamp(key, 'DD MMM')}- All Match</div>
                            <Big3FlexBox className="group-match-list">
                                {GroupMatches[key].map((item: any) => (
                                    <BettingCard
                                        id={item.id}
                                        type={MatchType.Group}
                                        typeText={'Group ' + getGroupByTeamId(item.homeTeamId)}
                                        teamA={item.homeTeamId}
                                        teamB={item.awayTeamId}
                                        deadline={item.deadline * 1000}
                                        date={key}
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
            <Big3FlexBox column marginTop={80}>
                <Big3Text fontFamily="Codec Pro" fontWeight={600} fontSize="20px" color="#FFFFFF" marginBottom={24}>
                    How it Works
                </Big3Text>
                <ul className="betting-rules">
                    <li>
                        <Big3Text fontFamily="Codec Pro" fontWeight={500} fontSize={16} marginRight={11}>
                            01
                        </Big3Text>
                        <Big3Paragraph fontWeight={400} fontSize={14}>
                            All games are in line with the World Cup schedule.
                        </Big3Paragraph>
                    </li>
                    <li>
                        <Big3Text fontFamily="Codec Pro" fontWeight={500} fontSize={16} marginRight={11}>
                            02
                        </Big3Text>
                        <Big3Paragraph fontWeight={400} fontSize={14}>
                            In the group matches, you only need to hold anyone NFT of both sides to participate in the
                            game. The winning side will get a bonus. Please see FAQ and Twitter for details.
                        </Big3Paragraph>
                    </li>
                    <li>
                        <Big3Text fontFamily="Codec Pro" fontWeight={500} fontSize={16} marginRight={11}>
                            03
                        </Big3Text>
                        <Big3Paragraph fontWeight={400} fontSize={14}>
                            In the knockout stage, you can use the NFT held to predict the outcome of the game; it costs
                            0.01ETH as the cost of unlocking the prediction; these costs will finally be credited to the
                            prize pool. If your prediction is correct, you will be eligible for an equal share of the
                            prize pool.
                        </Big3Paragraph>
                    </li>
                </ul>
            </Big3FlexBox>
        </Big3Page>
    );
};

export default Betting;
