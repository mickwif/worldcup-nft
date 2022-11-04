import './index.less';
import './mobile.less';

import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { useEagerConnect, useWeb3React } from 'big3-web3';
import WalletModal from './WalletList';
import { AntButton, AntModal, AntPopover } from '..';
import classNames from 'classnames';
import { message as AntMessage } from 'antd';
import { debounce } from 'lodash';
import { useModel, history } from 'umi';
import { WiredFlexBox, WiredImage, WiredIcon, WiredText, WiredHeading, WiredLink } from '../base';
import { IWiredProps } from '@/components/components';
import { eventBus } from '@/utils/eventBus';
import { Button } from 'antd';
import { formatAddress } from '@/utils';
import { useWallet, useChain } from 'big3-web3';
export const connectedKey = 'connected';

import { Big3Box, Big3Image, Big3FlexBox, Big3Paragraph, Big3Text } from 'big3-styled-base';

const wrappedFail = debounce((message) => AntMessage.error(message, 1000));

const WalletConnector: FC<IWiredProps<HTMLDivElement> & FlexCss> = (props) => {
    const { ...rest } = props;
    const { error = {} as any } = useEagerConnect();
    const { matched, setChain } = useModel('@@chain');
    const { switchChain } = useChain({ setChain });

    const [visible, setVisible] = useState(false);
    const [verifyTipsVisible, setVerifyTipsVisible] = useState(false);
    const { account } = useWeb3React();
    const { chain } = useModel('@@chain');
    const { disconnect } = useWallet(chain);

    const handleConnect = () => {
        setVisible(true);
    };

    const handleDisconnect = () => {
        disconnect();
    };

    const handleSwitch = () => {
        disconnect();
        setVisible(true);
    };

    const addressDisplay = useMemo(() => {
        if (account) {
            return account.substr(0, 6) + '...' + account.substr(-2);
        }
    }, [account]);

    useEffect(() => {}, [handleDisconnect]);

    return (
        <WiredFlexBox {...(rest as any)}>
            <WalletModal visible={visible} onClose={() => setVisible(false)} />
            {!matched && !account && <AntButton onClick={() => switchChain('ETH')}>Connect Wallet</AntButton>}
            {matched && !account && (
                <AntButton
                    onClick={handleConnect}
                    fontSize={16}
                    fontWeight={400}
                    color="var(--black-color)"
                    $wiredTheme="pure"
                    className="connect-wallet-btn"
                >
                    <WiredImage src="./icon-wallet.svg" width={22} height={18} marginRight={10}></WiredImage>
                    <WiredText>Wallet</WiredText>
                </AntButton>
            )}
            {matched && account && (
                <AntPopover
                    overlayClassName="my-wallet-address-popover"
                    trigger="hover"
                    placement="bottom"
                    arrowContent={null}
                    content={
                        <WiredFlexBox className="my-wallet-address" column align="center">
                            <WiredHeading
                                color="var(--white-color)"
                                fontSize={18}
                                fontWeight={500}
                                lineHeight={15}
                                headingType="h3"
                                fontFamily="Codec Pro"
                            >
                                My Wallet Address
                            </WiredHeading>
                            <WiredText
                                fontFamily="Codec Pro"
                                fontSize={16}
                                fontWeight={400}
                                lineHeight={14}
                                color="var(--gray-color)"
                                marginTop={8}
                                marginBottom={20}
                            >
                                （{addressDisplay})
                            </WiredText>

                            <Big3FlexBox align="center" justify="center" marginBottom={35}>
                                <Big3FlexBox
                                    align="center"
                                    justify="center"
                                    column
                                    marginRight={12}
                                    className="my-wallet-card"
                                    onClick={() => history.push('/my-asset')}
                                >
                                    <WiredImage
                                        src="./icon-my-asset.svg"
                                        width={18}
                                        height={18}
                                        marginBottom={10}
                                    ></WiredImage>
                                    <Big3Text fontFamily="Codec Pro" color="#7E829D" fontWeight={400} fontSize={14}>
                                        Asset
                                    </Big3Text>
                                </Big3FlexBox>
                                <Big3FlexBox
                                    align="center"
                                    justify="center"
                                    column
                                    className="my-wallet-card"
                                    onClick={handleSwitch}
                                >
                                    <WiredImage
                                        src="./icon-switch-wallet.svg"
                                        width={15}
                                        height={15}
                                        marginBottom={11}
                                    ></WiredImage>
                                    <Big3Text fontFamily="Codec Pro" color="#7E829D" fontWeight={400} fontSize={14}>
                                        Switch
                                    </Big3Text>
                                </Big3FlexBox>
                            </Big3FlexBox>

                            <WiredLink
                                align="center"
                                marginLeft={8}
                                fontSize={14}
                                fontWeight={400}
                                color="var(--gray-color)"
                                onClick={handleDisconnect}
                            >
                                <WiredImage width={13.7} src="/btn-wallet-disconnect.svg" />
                                <WiredText marginLeft={8}>Disconnect</WiredText>
                            </WiredLink>
                        </WiredFlexBox>
                    }
                >
                    <Button className="btn-address-display">{addressDisplay}</Button>
                </AntPopover>
            )}
        </WiredFlexBox>
    );
};

WalletConnector.displayName = WalletConnector.name;

export default WalletConnector;
