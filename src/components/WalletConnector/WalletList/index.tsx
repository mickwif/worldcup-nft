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
import { WiredBox, WiredFlexBox, WiredIcon, WiredParagraph, WiredText } from '@/components/base';

interface IWalletModalProps {
    visible: boolean;
    onClose: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    handleChatLogin?: () => Promise<void>;
}

type WalletModal = 'yes' | 'no';
let _handling = false;

const WalletModal = (props: IWalletModalProps) => {
    const { onClose, visible } = props;
    const { account } = useWeb3React();
    const { chain, chainChanged, allNotConnected, accountDisconnected, accountConnected, accountsChanged } =
        useModel('@@chain');
    const { connect, connectors } = useWallet(chain);
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
                    <WiredFlexBox column align="center" marginTop={-62}>
                        <WiredIcon src="/modal-icon-tomato.png" size={132} />
                        <WiredFlexBox width="100%" justify="center" marginTop={16}>
                            <WiredText color="var(--black-color)" fontSize={36} fontWeight={600} fontFamily="Teko">
                                Connect
                            </WiredText>
                            <WiredText
                                color="var(--primary-color)"
                                fontSize={36}
                                fontWeight={600}
                                marginLeft={8}
                                fontFamily="Teko"
                            >
                                Wallet
                            </WiredText>
                        </WiredFlexBox>
                        <WiredParagraph
                            marginTop={2}
                            fontSize={16}
                            fontWeight={400}
                            color="var(--gray-color)"
                            textAlign="center"
                            lineHeight={24}
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
                        <WiredFlexBox marginTop={72} column align="center">
                            {connectors
                                .filter(({ title }) => !/trust|math/i.test(title))
                                .map((walletConfig) => {
                                    // WalletCard
                                    const { title, icon: WalletIcon } = walletConfig;

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
                                            width={364}
                                            height={60}
                                            className="wallet-list-connect-btn"
                                            $wiredTheme="pure"
                                            background="#FFFFFE"
                                            color="#292725"
                                        >
                                            <WiredFlexBox align="center" justify="center">
                                                <WiredFlexBox width={28}>
                                                    <WalletIcon />
                                                </WiredFlexBox>
                                                <WiredText marginLeft={10} fontSize={16} fontWeight={500}>
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
