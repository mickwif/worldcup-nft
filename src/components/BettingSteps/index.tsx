import './index.less';
import { Big3Box, Big3FlexBox, Big3Image, Big3Text, Big3Icon, Big3Paragraph } from 'big3-styled-base';
import { TomatoFullscreenModal, AntButton, AntModal } from '@/components/antd';
import { GameResult, IPFS_URL } from '@/config/constant';
import { useState, useEffect, useMemo } from 'react';
import Teams from '@/config/team.json';
import NationFlagRect from '../NationFlagRect';
import NationCircle from '../NationCircle';
import NationPair from '../NationPair';
import { fetchPlayerName } from '@/utils';

interface IProps {
    homeTeamId: number;
    awayTeamId: number;
    homeTokenIds: number[];
    awayTokenIds: number[];
    betType: GameResult;
    onCancel: Function;
    onOK: Function;
}
export default (props: IProps) => {
    const { homeTeamId, awayTeamId, homeTokenIds, awayTokenIds, betType, onCancel, onOK } = props;
    const [currentStep, setCurrentStep] = useState(1);
    const [homeTeamSelected, setHomeTeamSelected] = useState([]);
    const [awayTeamSelected, setAwayTeamSelected] = useState([]);
    const [list, setList] = useState<any[]>([]);
    const [currentListTeam, setCurrentListTeam] = useState<number>();

    const fetchPlayerList = async () => {
        const list: any[] = homeTokenIds.map((id) => ({
            nation: Teams[id],
            tokenId: id,
        }));
        const players = await Promise.all(list.map((item) => fetchPlayerName(item.tokenId)));
        players.forEach((name, index) => {
            list[index].name = name;
        });
        setList(list);
        setCurrentListTeam(homeTeamId);
    };
    const handleSelect = (item: any) => {
        const _list = homeTeamSelected.slice();
        const index = _list.findIndex((id) => id === item.tokenId);
        if (index > -1) {
            _list.splice(index, 1);
        } else {
            _list.push(item.tokenId);
        }
        setHomeTeamSelected(_list);
    };
    useEffect(() => {
        fetchPlayerList();
    }, [homeTokenIds, awayTokenIds, betType, currentStep]);
    return (
        <Big3FlexBox width="100%" height="calc(100vh - 88px)" column align="center">
            {currentStep === 1 && <Big3Image src="./icon-step-1.svg"></Big3Image>}
            {currentStep === 2 && <Big3Image src="./icon-step-2.svg"></Big3Image>}
            {currentStep === 3 && <Big3Image src="./icon-step-3.svg"></Big3Image>}
            {((currentStep === 1 && betType === GameResult.Win) ||
                (currentStep === 1 && betType === GameResult.Draw)) && (
                <p className="select-team-token">
                    Select your Simpson of <NationFlagRect nation={Teams[homeTeamId]} width={36} height={24} />{' '}
                    Teams[homeTeamId]
                </p>
            )}
            {((currentStep === 1 && betType === GameResult.Lose) ||
                (currentStep === 2 && betType === GameResult.Draw)) && (
                <p className="select-team-token">
                    Select your Simpson of <NationFlagRect nation={Teams[awayTeamId]} width={36} height={24} />{' '}
                    Teams[awayTeamId]
                </p>
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
                                        homeTeamSelected.includes(item.tokenId) ||
                                        awayTeamSelected.includes(item.tokenId)
                                            ? 'betting-img-selected'
                                            : ''
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
                            disabled={homeTeamSelected.length === 0 && awayTeamSelected.length === 0}
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
                            className="bet-result bet-result-selected"
                            padding="12px 24px"
                        >
                            <NationCircle nation={Teams[homeTeamId]} width={36} height={36}></NationCircle>
                            <Big3Text className="bet-nation-name">{Teams[homeTeamId]} Win</Big3Text>
                        </Big3FlexBox>
                        <Big3FlexBox
                            column
                            align="center"
                            className="bet-result"
                            padding="12px 24px"
                            marginLeft={16}
                            marginRight={16}
                        >
                            <NationPair nation1={Teams[homeTeamId]} nation2={Teams[awayTeamId]}></NationPair>
                            <Big3Text className="bet-nation-name">Draw</Big3Text>
                        </Big3FlexBox>
                        <Big3FlexBox column align="center" className="bet-result" padding="12px 24px">
                            <NationCircle nation={Teams[homeTeamId]} width={36} height={36}></NationCircle>
                            <Big3Text className="bet-nation-name">{Teams[homeTeamId]} Win</Big3Text>
                        </Big3FlexBox>
                    </Big3FlexBox>

                    <Big3FlexBox justify="space-between" marginBottom={20} align="center" width="100%">
                        <Big3Text className="bet-submit-label">投注详情</Big3Text>
                        <Big3Paragraph className="bet-submit-value">
                            3 NFT(
                            <NationCircle nation={Teams[homeTeamId]} width={21.6} /> Win)
                        </Big3Paragraph>
                    </Big3FlexBox>
                    <Big3FlexBox justify="space-between" marginBottom={20} align="center" width="100%">
                        <Big3Text className="bet-submit-label">预计奖励</Big3Text>
                        <Big3Text className="bet-submit-value">300000 Token</Big3Text>
                    </Big3FlexBox>
                    <Big3FlexBox justify="space-between" marginBottom={70} align="center" width="100%">
                        <Big3Text className="bet-submit-label">锁仓nft总数</Big3Text>
                        <Big3Text className="bet-submit-value">6 NFT</Big3Text>
                    </Big3FlexBox>
                    <Big3FlexBox justify="center" width="100%">
                        <AntButton width={240} height={48} onClick={() => onOK(homeTeamSelected, awayTeamSelected)}>
                            OK
                        </AntButton>
                    </Big3FlexBox>
                </Big3FlexBox>
            )}
        </Big3FlexBox>
    );
};
