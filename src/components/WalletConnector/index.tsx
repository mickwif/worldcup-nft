import './index.less';
import './mobile.less';

import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { useEagerConnect, useWeb3React } from 'big3-web3';
import WalletModal from './WalletList';
import { AntButton, AntModal, AntPopover } from '..';
import classNames from 'classnames';
import { message as AntMessage } from 'antd';
import { debounce } from 'lodash';
import { useModel } from 'umi';
import { WiredFlexBox, WiredImage, WiredIcon, WiredText, WiredHeading, WiredLink } from '../base';
import { IWiredProps } from '@/components/components';
import { eventBus } from '@/utils/eventBus';

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
    const outlink = useRef<string>(null);

    const handleConnect = () => {
        setVisible(true);
    };

    const handleDisconnect = () => {
        disconnect();
    };

    const addressDisplay = useMemo(() => {
        if (account) {
            return account.substr(0, 5) + '...' + account.substr(-5);
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
                    width={156}
                    height={44}
                    fontSize={16}
                    fontWeight={400}
                    color="var(--black-color)"
                    $wiredTheme="pure"
                    className="connect-wallet-btn"
                >
                    <WiredText>Connect Wallet</WiredText>
                </AntButton>
            )}
            {matched && account && (
                <AntPopover
                    trigger="hover"
                    placement="bottomRight"
                    content={
                        <WiredFlexBox className="my-wallet-address" column align="center">
                            <WiredHeading
                                color="var(--black-color)"
                                fontSize={22}
                                fontWeight={500}
                                lineHeight={32}
                                headingType="h3"
                            >
                                My Wallet Address
                            </WiredHeading>
                            <WiredText
                                fontSize={16}
                                fontWeight={400}
                                lineHeight={19}
                                color="var(--gray-color)"
                                marginTop={2}
                            >
                                {formatAddress(account)}
                            </WiredText>

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
                    <AntButton
                        height={44}
                        fontSize={16}
                        fontWeight={400}
                        background="var(--white-color)"
                        border="2px solid #000000"
                        color="var(--black-color)"
                        borderRadius={8}
                    >
                        <WiredText>{addressDisplay}</WiredText>
                    </AntButton>
                </AntPopover>
            )}
        </WiredFlexBox>
    );
};

WalletConnector.displayName = WalletConnector.name;

export default WalletConnector;
