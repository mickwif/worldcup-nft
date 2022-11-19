import './index.less';
import { Big3Box, Big3FlexBox, Big3Image, Big3Text, Big3Icon } from 'big3-styled-base';
import { MatchType, GameResult } from '@/config/constant';

import { useMemo, useState, useEffect } from 'react';
import { Button, message } from 'antd';
import TimeCountDown from '../TimeCountdown';
import Teams from '@/config/team.json';
import { useGroupGameContract } from '@/hooks/useContract';
import { useWeb3React, useWeb3Provider } from 'big3-web3';
import TipModal from '@/components/TipModal';
import { history } from 'umi';
import { TomatoFullscreenModal, AntButton, AntModal } from '@/components/antd';
import BettingSteps from '../BettingSteps';
import { ethers } from 'ethers';
import { eventBus } from '@/utils/eventBus';
import { EventKey } from '@/config/constant';
import { Group_Match_Reward } from '@/config/constant';
interface IProps {
    id: number;
    type: MatchType;
    typeText: string;
    teamA: number;
    teamB: number;
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
    const [errorText, setErrorText] = useState('');
    const [selectModalShow, setSelectModalShow] = useState(false);
    const [tokenIds, setTokenIds] = useState([]);
    const [betType, setBetType] = useState<GameResult>(GameResult.None);
    const teamAName = useMemo(() => {
        return Teams[teamA];
    }, [teamA]);
    const teamBName = useMemo(() => {
        return Teams[teamB];
    }, [teamB]);

    // const getRewardAmount = async () => {
    //     try {
    //         const res = await groupGameContract.getRewardAmount();
    //         console.log('reward: ', ethers.utils.formatEther(res));
    //         setRewardAmount(Number(ethers.utils.formatEther(res)));
    //     } catch (e) {
    //         console.log(e);
    //     }
    // };
    const getTotalPredictCountByGame = async () => {
        try {
            const res = await groupGameContract.getTotalPredictCountByGame(id);
            const num = res.toNumber();
            setTotalPredictCount(num);
        } catch (e) {
            // console.log(e);
        }
    };
    // getUserNFTByGameAndNotPredicted
    const handleBet = async (gameId: number, homeTeamId: number, awayTeamId: number, result: GameResult) => {
        if (!account) {
            eventBus.$emit(EventKey.UNCONNECTED);
            return;
        }
        if (deadline * 1000 < Date.now()) {
            message.warning('Match started, can not bet now.');
            return;
        }
        try {
            const res = await groupGameContract.getUserNFTByGameAndNotPredicted(account, gameId);
            const num = res.map((item) => item.toNumber());
            console.log(num);
            if (num.length === 0) {
                setErrorText('You must have at least two NFTs to participate in the game; please see FAQ for details.');
                return;
            }
            setBetType(result);
            setTokenIds(num);
            setSelectModalShow(true);
        } catch (e) {
            console.log(e);
        }
    };
    const handleOk = async () => {
        // getRewardAmount();
        getTotalPredictCountByGame();
        handleCancel();
    };
    const handleCancel = () => {
        setSelectModalShow(false);
    };

    useEffect(() => {
        // getRewardAmount();
        getTotalPredictCountByGame();
    }, [id, provider]);
    return (
        <Big3Box className="betting-card">
            <Big3FlexBox marginBottom={30} justify="space-between" align="center" position="relative">
                <Big3FlexBox align="center" fontFamily="Helvetica" fontWeight={700} fontSize={12}>
                    <Big3Icon src="/football-token.svg" marginRight={6} />
                    <Big3Text color="#7E829D" marginRight={3}>
                        Prize Poll:
                    </Big3Text>
                    <Big3Text color="#F2DA0E">{Group_Match_Reward * totalPredictCount} Token</Big3Text>
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
                        border="4px solid #202C32"
                        borderRadius="50%"
                        marginBottom={10}
                    />
                    <Big3Text fontFamily="Codec Pro" fontWeight={600} fontSize={20} color="#ffffff" lineHeight={17}>
                        {teamAName}
                    </Big3Text>
                    <Button
                        className="btn-bet btn-bet-left"
                        onClick={() => handleBet(id, teamA, teamB, GameResult.Win)}
                    >
                        Win
                    </Button>
                </Big3FlexBox>
                <TimeCountDown
                    matchResult={matchResult}
                    matchTime={deadline}
                    type={type}
                    handleDraw={() => handleBet(id, teamA, teamB, GameResult.Draw)}
                />

                <Big3FlexBox column align="center">
                    <Big3Image
                        src={`/nations/${teamBName.toLowerCase()}.png`}
                        width={72}
                        height={72}
                        border="4px solid #202C32"
                        borderRadius="50%"
                        marginBottom={10}
                    />
                    <Big3Text fontFamily="Codec Pro" fontWeight={600} fontSize={20} color="#ffffff" lineHeight={17}>
                        {teamBName}
                    </Big3Text>
                    <Button
                        className="btn-bet btn-bet-right"
                        onClick={() => handleBet(id, teamA, teamB, GameResult.Lose)}
                    >
                        Win
                    </Button>
                </Big3FlexBox>
            </Big3FlexBox>
            <TipModal
                onCancel={() => setErrorText('')}
                onOk={() => history.push('/nft')}
                errorText={errorText}
                okText="Get NFTs"
                cancelText="Cancel"
            />
            <TomatoFullscreenModal visible={selectModalShow} onClose={() => setSelectModalShow(false)} destroyOnClose>
                <BettingSteps
                    gameId={id}
                    homeTeamId={teamA}
                    awayTeamId={teamB}
                    tokenIds={tokenIds}
                    betType={betType}
                    onOK={handleOk}
                    onCancel={handleCancel}
                />
            </TomatoFullscreenModal>
        </Big3Box>
    );
};
