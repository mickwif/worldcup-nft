import './index.less';
import './mobile.less';

import { useWeb3React, useWallet } from 'big3-web3';
import { useLocation, useModel } from 'umi';
import { AntButton, AntModal } from '@/components';
import useWeb3Provider from '@/hooks/useWeb3Provider';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { notification } from 'antd';
import { CacheKey, EventKey } from '@/config/constant';
import { eventBus } from '@/utils/eventBus';
import { WiredBox, WiredFlexBox, WiredIcon, WiredParagraph, WiredText, WiredImage } from '@/components/base';

interface IWalletModalProps {
    visible: boolean;
    onClose: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    handleChatLogin?: () => Promise<void>;
}

type WalletModal = 'yes' | 'no';
let _handling = false;

const Connectors = [
    {
        title: 'Metamask',
        connectorId: 'Injected',
        priority: 1,
        icon: './icon-metamask.svg',
    },
    {
        title: 'WalletConnect',
        connectorId: 'WalletConnect',
        priority: 2,
        icon: './icon-walletconnect.svg',
    },
];

const WalletModal = (props: IWalletModalProps) => {
    const { onClose, visible } = props;
    const { account } = useWeb3React();
    const { chain, chainChanged, allNotConnected, accountDisconnected, accountConnected, accountsChanged } =
        useModel('@@chain');
    const { connect } = useWallet(chain);

    const { provider } = useWeb3Provider();

    const umiLocation = useLocation();
    const [loginFailedTipVisible, setLoginFailedTipVisible] = useState(false);

    const handleLogin = useCallback(async () => {
        try {
            localStorage.setItem(CacheKey.METAMASK_WALLET, account);
        } catch (error: any) {
            console.error(error);

            notification.error({ message: 'Sorry.', description: error.message });
        } finally {
        }
    }, [account, provider, umiLocation]);

    useEffect(() => {
        if (chainChanged) {
            window.location.reload();
            return;
        }

        if (allNotConnected || accountDisconnected) {
            window.location.reload();
            return;
        }

        // disconnect perhaps
        if (!account) {
            return;
        }

        const changedWalletOffline =
            localStorage.getItem(CacheKey.METAMASK_WALLET) &&
            localStorage.getItem(CacheKey.METAMASK_WALLET) !== account;
        if (accountsChanged || accountConnected || changedWalletOffline) {
            handleLogin();
            return;
        }

        return () => {
            eventBus.$off(EventKey.UNAUTHORIZED);
        };
    }, [handleLogin, chainChanged, allNotConnected, accountDisconnected, accountConnected, accountsChanged, account]);

    return (
        <Fragment>
            <AntModal
                footer={null}
                title={
                    <WiredFlexBox column align="center">
                        <WiredImage src="./logo.svg" width={180} height={64} marginBottom={24} />
                        <WiredParagraph
                            fontFamily="Codec Pro"
                            fontSize={16}
                            fontWeight={400}
                            color="#7E829D"
                            textAlign="center"
                            lineHeight={20}
                        >
                            Connect with one of our available wallet providers
                        </WiredParagraph>
                    </WiredFlexBox>
                }
                onCancel={onClose}
                visible={visible}
                width={380}
                zIndexRoot={50}
                $wiredTheme="connect"
            >
                <WiredBox className="wallet-list">
                    {!account && (
                        <WiredFlexBox marginTop={64} column align="center">
                            {Connectors.filter(({ title }) => !/trust|math/i.test(title)).map((walletConfig) => {
                                // WalletCard
                                const { title, icon } = walletConfig;

                                return (
                                    <AntButton
                                        key={title}
                                        onClick={(e) => {
                                            onClose(e);
                                            if (account) {
                                                handleLogin();
                                            } else {
                                                connect(walletConfig);
                                            }
                                        }}
                                        id={`wallet-connect-${title.toLocaleLowerCase()}`}
                                        width={300}
                                        height={64}
                                        className="wallet-list-connect-btn"
                                        $wiredTheme="pure"
                                        background="#202334"
                                        color="#FFFFFE"
                                    >
                                        <WiredFlexBox align="center">
                                            <WiredIcon src={icon} size={36} />
                                            <WiredText
                                                marginLeft={24}
                                                fontSize={18}
                                                fontWeight={500}
                                                fontFamily="Codec Pro"
                                            >
                                                {title}
                                            </WiredText>
                                        </WiredFlexBox>
                                    </AntButton>
                                );
                            })}
                        </WiredFlexBox>
                    )}
                </WiredBox>
            </AntModal>
            <AntModal width={440} visible={loginFailedTipVisible} title="Sorry." footer={null}>
                <WiredParagraph
                    paddingTop={18}
                    fontSize={16}
                    lineHeight={24}
                    color="var(--gray-color)"
                    fontWeight={400}
                >
                    You didn't use the specific invitation link, so you can't participate in the voting or invitation
                    campaign.
                </WiredParagraph>
                <AntButton
                    marginLeft="auto"
                    marginRight="auto"
                    marginTop={70}
                    width={144}
                    height={40}
                    onClick={() => setLoginFailedTipVisible(false)}
                >
                    OK
                </AntButton>
            </AntModal>
        </Fragment>
    );
};

export default WalletModal;
