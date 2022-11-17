import './index.less';
import { Big3Box, Big3FlexBox, Big3Image, Big3Text, Big3Icon, Big3Paragraph } from 'big3-styled-base';
import { TomatoFullscreenModal, AntButton, AntModal } from '@/components/antd';
import { GameResult, IPFS_URL, Group_Match_Reward } from '@/config/constant';
import { useState, useEffect, useMemo } from 'react';
import Teams from '@/config/team.json';
import NationFlagRect from '../NationFlagRect';
import NationCircle from '../NationCircle';
import NationPair from '../NationPair';
import { fetchPlayerName } from '@/utils';
import { useGroupGameContract } from '@/hooks/useContract';
import { message } from 'antd';
import BackButton from '@/components/BackButton';
interface IProps {
    gameId: number;
    homeTeamId: number;
    awayTeamId: number;
    tokenIds: number[];
    betType: GameResult;
    onCancel: Function;
    onOK: Function;
}
const TOKEN_REWARD_UNIT = Group_Match_Reward;
export default (props: IProps) => {
    const { gameId, homeTeamId, awayTeamId, tokenIds, betType, onCancel, onOK } = props;
    const groupGameContract = useGroupGameContract();
    const [currentStep, setCurrentStep] = useState(1);
    const [tokenSelected, setTokenSelected] = useState([]);
    const [list, setList] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const handleBettingSubmit = async () => {
        try {
            setLoading(true);
            const tx = await groupGameContract.predict(gameId, tokenSelected, betType);
            const res = await tx.wait();
            console.log(res);
            message.success('Betting successfully。');
            onOK();
        } catch (e) {
            console.log(e);
            message.error('Betting failed. Please try later.');
        } finally {
            setLoading(false);
        }
    };
    const fetchPlayerList = async () => {
        const list: any[] = tokenIds.map((id) => ({
            nation: Teams[id % 32],
            tokenId: id,
        }));
        const players = await Promise.all(list.map((item) => fetchPlayerName(item.tokenId)));
        players.forEach((name, index) => {
            list[index].name = name;
        });
        setList(list);
    };
    const handleSelect = (item: any) => {
        const _list = tokenSelected.slice();
        const index = _list.findIndex((id) => id === item.tokenId);
        if (index > -1) {
            _list.splice(index, 1);
        } else {
            _list.push(item.tokenId);
        }
        setTokenSelected(_list);
    };
    useEffect(() => {
        fetchPlayerList();
    }, [tokenIds]);
    return (
        <Big3FlexBox width="100%" height="calc(100vh - 88px)" column align="center">
            {currentStep > 1 && (
                <div className="betting-btn-back">
                    <BackButton handler={() => setCurrentStep(currentStep - 1)} />
                </div>
            )}
            {currentStep === 1 && (
                <Big3FlexBox column align="center">
                    <Big3Image src="./icon-step-1.svg"></Big3Image>
                    <p className="select-team-token">Select your Simpson To Join The NFootball Game</p>
                </Big3FlexBox>
            )}

            {currentStep === 2 && (
                <Big3FlexBox column align="center">
                    <Big3Image src="./icon-step-2.svg"></Big3Image>
                    <p className="select-team-token">Please Check Your Game Parameters</p>
                </Big3FlexBox>
            )}

            {currentStep === 1 && (
                <>
                    <Big3FlexBox className="betting-nft-list">
                        {list.map((item) => (
                            <Big3FlexBox column key={item.tokenId}>
                                <Big3Image
                                    src={`${IPFS_URL}/${item?.tokenId}.png`}
                                    width={140}
                                    height={140}
                                    marginBottom={16}
                                    borderRadius={14}
                                    className={`betting-img-player ${
                                        tokenSelected.includes(item.tokenId) ? 'betting-img-selected' : ''
                                    }`}
                                    onClick={() => handleSelect(item)}
                                ></Big3Image>
                                <Big3Paragraph
                                    width={140}
                                    fontFamily="Codec Pro"
                                    fontWeight="600"
                                    fontSize={14}
                                    lineHeight={12}
                                    color="#ffffff"
                                    marginBottom={12}
                                    textAlign="center"
                                >
                                    {item.name}
                                </Big3Paragraph>
                                <Big3FlexBox justify="center" align="center" width="100%">
                                    <NationFlagRect nation={item?.nation} marginRight={7} width={18} height={12} />
                                    <Big3Text className="nation-name">{item?.nation}</Big3Text>
                                </Big3FlexBox>
                            </Big3FlexBox>
                        ))}
                    </Big3FlexBox>
                    <Big3FlexBox className="betting-steps-footer">
                        <AntButton
                            width={240}
                            height={48}
                            disabled={tokenSelected.length === 0}
                            onClick={() => setCurrentStep(currentStep + 1)}
                        >
                            OK
                        </AntButton>
                    </Big3FlexBox>
                </>
            )}
            {currentStep === 2 && (
                <Big3FlexBox column className="bet-submit-card">
                    <Big3FlexBox justify="space-between" className="bet-submit-results">
                        <Big3FlexBox
                            column
                            align="center"
                            className={`bet-result ${betType === GameResult.Win ? 'bet-result-selected' : ''} `}
                            padding="12px 24px"
                        >
                            <NationCircle nation={Teams[homeTeamId]} width={36} height={36}></NationCircle>
                            <Big3Text className="bet-nation-name">{Teams[homeTeamId]} Win</Big3Text>
                        </Big3FlexBox>
                        <Big3FlexBox
                            column
                            align="center"
                            className={`bet-result ${betType === GameResult.Draw ? 'bet-result-selected' : ''} `}
                            padding="12px 24px"
                            marginLeft={16}
                            marginRight={16}
                        >
                            <NationPair nation1={Teams[homeTeamId]} nation2={Teams[awayTeamId]}></NationPair>
                            <Big3Text className="bet-nation-name">Draw</Big3Text>
                        </Big3FlexBox>
                        <Big3FlexBox
                            column
                            align="center"
                            className={`bet-result ${betType === GameResult.Lose ? 'bet-result-selected' : ''} `}
                            padding="12px 24px"
                        >
                            <NationCircle nation={Teams[awayTeamId]} width={36} height={36}></NationCircle>
                            <Big3Text className="bet-nation-name">{Teams[awayTeamId]} Win</Big3Text>
                        </Big3FlexBox>
                    </Big3FlexBox>

                    <Big3FlexBox justify="space-between" marginBottom={20} align="center" width="100%">
                        <Big3Text className="bet-submit-label">Betting details</Big3Text>
                        <Big3Paragraph className="bet-submit-value">
                            {tokenSelected.length} NFT(
                            <NationCircle nation={Teams[homeTeamId]} width={21.6} /> Win)
                        </Big3Paragraph>
                    </Big3FlexBox>
                    <Big3FlexBox justify="space-between" marginBottom={20} align="center" width="100%">
                        <Big3Text className="bet-submit-label">Bonus estimates</Big3Text>
                        <Big3Text className="bet-submit-value">
                            {tokenSelected.length * TOKEN_REWARD_UNIT} Token
                        </Big3Text>
                    </Big3FlexBox>
                    <Big3FlexBox justify="space-between" marginBottom={70} align="center" width="100%">
                        <Big3Text className="bet-submit-label">Total locked</Big3Text>
                        <Big3Text className="bet-submit-value">{tokenSelected.length} NFT</Big3Text>
                    </Big3FlexBox>
                    <Big3FlexBox justify="center" width="100%">
                        <AntButton width={240} height={48} onClick={handleBettingSubmit} loading={loading}>
                            OK
                        </AntButton>
                    </Big3FlexBox>
                </Big3FlexBox>
            )}
        </Big3FlexBox>
    );
};
