import './index.less';
import { Big3Box, Big3FlexBox, Big3Image, Big3Text, Big3Icon, Big3Paragraph } from 'big3-styled-base';
import { TomatoFullscreenModal, AntButton, AntModal } from '@/components/antd';
import { GameResult, IPFS_URL } from '@/config/constant';
import { useState, useEffect, useMemo } from 'react';
import Teams from '@/config/team.json';
import NationFlagRect from '../NationFlagRect';
import { fetchPlayerName } from '@/utils';

interface IProps {
    homeTeamId: number;
    awayTeamId: number;
    homeTokenIds: number[];
    awayTokenIds: number[];
    betType: GameResult;
    onCancel: Function;
    onOK: Function;
    visible: boolean;
}
export default (props: IProps) => {
    const { homeTeamId, awayTeamId, homeTokenIds, awayTokenIds, betType, onCancel, onOK, visible } = props;
    const [currentStep, setCurrentStep] = useState(1);
    const [homeTeamSelected, setHomeTeamSelected] = useState([]);
    const [awayTeamSelected, setAwayTeamSelected] = useState([]);
    const [list, setList] = useState<any[]>([]);

    const fetchPlayerList = async () => {
        const list: any[] = homeTokenIds.map((id) => ({
            nation: Teams[homeTeamId],
            tokenId: id,
        }));
        const players = await Promise.all(list.map((item) => fetchPlayerName(item.tokenId)));
        players.forEach((name, index) => {
            list[index].name = name;
        });
        setList(list);
    };
    useEffect(() => {
        fetchPlayerList();
    }, [homeTokenIds, awayTokenIds, betType, currentStep]);
    return (
        <TomatoFullscreenModal visible={visible} onClose={onCancel}>
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
                <Big3FlexBox className="betting-nft-list">
                    {list.map((item) => (
                        <Big3FlexBox column key={item.tokenId}>
                            <Big3Image
                                src={`${IPFS_URL}/${item?.tokenId}.png`}
                                width={140}
                                height={140}
                                marginBottom={16}
                                borderRadius={14}
                                className="img-player"
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
                    <AntButton width={240} height={48} onClick={() => onOK()}>
                        OK
                    </AntButton>
                </Big3FlexBox>
            </Big3FlexBox>
        </TomatoFullscreenModal>
    );
};
