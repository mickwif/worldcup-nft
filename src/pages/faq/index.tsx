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

const Home = () => {
    return (
        <Big3Page>
            <Big3PortalNode className="nft-bg" container={document.getElementById('content')} />
            <Big3FlexBox className="faq-title">
                <div className="faq-title-text"></div>
            </Big3FlexBox>
            <Big3FlexBox marginTop={158} marginBottom={168} justify="space-between">
                <Big3FlexBox column>
                    <p className="part-title">Overview</p>
                    <p className="part-content-white">
                        Make Football Great Again！Since the epidemic spread, it seems everyone has just started
                        thinking about what they want. Everyone takes various sports seriously because they represent a
                        way of life.
                    </p>
                    <p className="part-content-gray">
                        NFooTball is a new decentralized prediction platform based on ly2, introducing an Oracle Machine
                        to unify third-party data and player predictions, and the purpose of our platform is to be
                        efficient and self-made. As the most watched sport in the world, we started with the World Cup
                        and gradually geared towards all kinds of sporting events, including the UEFA Champions League
                        and the Big 5...
                    </p>
                </Big3FlexBox>
                <Big3Image src="./faq-img-1.png" width={511} height={272} marginLeft={89}></Big3Image>
            </Big3FlexBox>
            <Big3FlexBox marginBottom={168} justify="space-between">
                <Big3FlexBox column>
                    <p className="part-title">Roadmap</p>
                    <p className="part-content-white">
                        Our vision is to let people experience fun games and matches with cross-border cooperation. We
                        are committed to creating a decentralized tournament competitive game for soccer sports
                        worldwide. Players can participate in our games and get extra rewards as long as they hold the
                        NFT of the relevant tournament, truly realizing watch to earn and releasing NFT from their
                        wallet completely.
                    </p>
                    <p className="part-content-gray">
                        We love football and want to share this passion with everyone, and the NFooTball program is a
                        simple game that allows participants to learn more about the sport and earn different income
                        levels.
                    </p>
                </Big3FlexBox>
                <Big3Image src="./faq-img-2.png" width={511} height={272} marginLeft={89}></Big3Image>
            </Big3FlexBox>
            <Big3FlexBox marginBottom={168} justify="space-between">
                <Big3FlexBox column>
                    <p className="part-title">NFT</p>
                    <p className="part-content-white">
                        All of our NFTs will be available through whitelist and public sale, with only a small
                        percentage of paid NFTs to satisfy the needs of super fans. These NFTs will accompany the start
                        of the World Cup as a necessary element to participate in the game.
                    </p>
                </Big3FlexBox>
                <Big3Image src="./faq-img-3.png" width={511} height={248} marginLeft={89}></Big3Image>
            </Big3FlexBox>
            <Big3FlexBox marginBottom={168} justify="space-between">
                <Big3FlexBox column>
                    <p className="part-title">Game Guide</p>
                    <p className="part-content-gray">
                        Users can participate in the game of predicting the results of the two teams by holding one NFT
                        for any player.
                    </p>
                    <p className="part-content-gray">
                        Users can choose between winning and losing, choose the right one to get the token reward, and
                        choose the wrong one to get no bonus.
                    </p>
                    <p className="part-content-gray">The rest of the game is the same.</p>
                </Big3FlexBox>
                <Big3Image src="./faq-img-4.png" width={511} height={357} marginLeft={89}></Big3Image>
            </Big3FlexBox>
            <Big3FlexBox marginBottom={168} justify="space-between">
                <Big3FlexBox column>
                    <p className="part-title">Reward</p>
                    <p className="part-content-white">
                        At the end of the World Cup, the lucky prizes will be drawn according to the token ranking.
                    </p>
                </Big3FlexBox>
                <Big3Image src="./faq-img-5.png" width={511} height={272} marginLeft={89}></Big3Image>
            </Big3FlexBox>

            <Big3FlexBox marginBottom={168} justify="space-between">
                <Big3FlexBox column>
                    <p className="part-title">Resurrect</p>
                    <p className="part-content-white">
                        If you hold the NFT of a team headed home, you can choose to resurrect it. 3/4th * 3 + $nftb
                        300,000 = 1st/2nd in Round Of 16
                    </p>
                </Big3FlexBox>
                <Big3Image src="./faq-img-6.png" width={511} height={241} marginLeft={89}></Big3Image>
            </Big3FlexBox>
            {/* <Big3FlexBox marginBottom={168}>
                <Big3FlexBox column>
                    <p className="part-title">Contract Address</p>
                    <p className="part-content-gray">
                        If you hold the NFT of a team headed home, you can choose to resurrect it. 3/4th * 3 + $nftb
                        300,000 = 1st/2nd in Round Of 16
                    </p>
                </Big3FlexBox>
                <Big3Image src="./faq-img-7.png" width={511} height={241} marginLeft={89}></Big3Image>
            </Big3FlexBox> */}
        </Big3Page>
    );
};

export default Home;
