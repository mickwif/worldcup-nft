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
import { MatchType, GAMES_JSON_URL } from '@/config/constant';
import { useState, useEffect, useRef } from 'react';
import GroupMatches from '@/utils/matches';
import { formatTimestamp } from '@/utils';
import { useGroupGameContract } from '@/hooks/useContract';
import { useWeb3React, useWeb3Provider } from 'big3-web3';
import { getGameDatesJson, getGamesJson } from '@/api/games';

const Betting = () => {
    const [matchType, setMatchType] = useState(MatchType.Group);
    const { provider } = useWeb3Provider();
    const groupGameContract = useGroupGameContract();
    const [groupMatches, setGroupMatches] = useState<any>({});
    const [finalMatches, setFinalMatches] = useState<any>({});
    const internalRef = useRef(null);
    console.log('GroupMatches: ', GroupMatches);

    const fetchMatches = async () => {
        const gamesJson = await getGamesJson();
        const gameDates = await getGameDatesJson();
        const groupGames = {};
        for (const key of Object.keys(gameDates)) {
            const matches = gameDates[key]
                .map((id) => {
                    const game = gamesJson[id];
                    return game;
                })
                .filter((item) => item.deadline * 1000 > Date.now());
            if (matches.length > 0) {
                groupGames[key] = matches;
            }
        }
        setGroupMatches(groupGames);
    };

    useEffect(() => {
        fetchMatches();
    }, []);

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
            <Big3FlexBox className="betting-head-bg"></Big3FlexBox>
            {/* <Big3PortalNode className="betting-head-bg" container={document.querySelector('main')} /> */}
            <Big3PortalNode className="betting-bg" container={document.getElementById('content')} />
            <BettingHeader />
            <Big3FlexBox column align="center" marginBottom={110} marginTop={88}>
                <Big3Heading className="balance-heading">The Simpsons NFTfi Game</Big3Heading>
                {/* <Big3Paragraph className="balance-match-text">Group Stage</Big3Paragraph> */}
            </Big3FlexBox>
            <Big3FlexBox column>
                {Object.keys(groupMatches).map((key: string) => (
                    <Big3FlexBox column align="center" marginBottom={56} width="100%">
                        <div className="match-date">{formatTimestamp(key, 'DD MMM')}- All Match</div>
                        <Big3FlexBox className="group-match-list">
                            {groupMatches[key].map((item: any) => (
                                <BettingCard
                                    id={item.id}
                                    type={item.type}
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
