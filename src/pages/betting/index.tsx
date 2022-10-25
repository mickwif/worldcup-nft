import './index.less';
import { Big3Page, Big3PortalNode, Big3FlexBox, Big3Image, Big3Heading, Big3Paragraph } from 'big3-styled-base';
import BettingHeader from './BettingHeader';
import BettingCard from '@/components/BettingCard';
import GroupMatches from './group_matches.json';
import { MatchType } from '@/config/constant';

const Betting = () => {
    return (
        <Big3Page>
            <Big3PortalNode className="betting-bg" container={document.getElementById('content')} />
            <BettingHeader />
            <Big3FlexBox column align="center">
                <Big3Heading className="balance-heading">The Simpsons NFTfi Game</Big3Heading>
                <Big3Paragraph className="balance-match-text">Group Stage · matchday 1 of 3</Big3Paragraph>
            </Big3FlexBox>
            <Big3FlexBox column>
                {Object.keys(GroupMatches).map((key: string) => (
                    <Big3FlexBox column align="center" marginBottom={56} width="100%">
                        <Big3Image src="./img-match-day.png" marginBottom={24} width={235} height={61} />
                        <Big3FlexBox className="group-match-list">
                            {GroupMatches[key].map((item: any) => (
                                <BettingCard
                                    type={MatchType.Group}
                                    typeText={'Group' + item.group}
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
