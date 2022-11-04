import './index.less';
import './mobile.less';
import {
    Big3FlexBox,
    Big3Box,
    Big3Image,
    Big3Link,
    Big3Nav,
    Big3NavLink,
    Big3Text,
    Big3Header,
} from 'big3-styled-base';
import { useLocation, useHistory } from 'umi';
import useActivedStyle from '@/hooks/useActivedStyle';
import { Button } from 'antd';
import WalletConnector from '@/components/WalletConnector';
// const Routers = {
//     HOME: '/',
//     NFT: '/nft',
//     SYNTHETIC: '/synthetic',
//     BETTING: '/betting',
//     FAQ: '/faq',
// };

const Routers = {
    HOME: '/',
    NFT: '/',
    SYNTHETIC: '/',
    BETTING: '/',
    FAQ: '/',
};
export default () => {
    const history = useHistory();
    const { activeStyle } = useActivedStyle();

    return (
        <Big3Header width="100%" position="fixed" zIndex={100} top={0} left={0}>
            <div className="header-bg"></div>
            <Big3FlexBox
                padding="0 var(--both-spacing)"
                height="var(--header-height)"
                maxWidth="var(--design-draft-width)"
                margin="0 auto"
                justify="space-between"
                align="center"
            >
                <Big3Link position="relative" flexShrink="0" onClick={() => history.push('/')} className={'logo'}>
                    <Big3Image width={112.5} height={40} src={'/logo.svg'} />
                </Big3Link>
                <Big3FlexBox className="header-navs">
                    <Big3NavLink
                        className={activeStyle(Routers.HOME)}
                        onClick={() => history.push(Routers.HOME)}
                        fontSize={16}
                        lineHeight={16}
                        fontWeight={500}
                        fontFamily="Codec Pro"
                        disabled
                    >
                        <Big3Text>HOME</Big3Text>
                    </Big3NavLink>
                    <Big3NavLink
                        className={activeStyle(Routers.NFT)}
                        onClick={() => history.push(Routers.NFT)}
                        fontSize={16}
                        lineHeight={16}
                        fontWeight={500}
                        fontFamily="Codec Pro"
                        disabled
                    >
                        <Big3Text>NFT</Big3Text>
                    </Big3NavLink>
                    <Big3NavLink
                        className={activeStyle(Routers.SYNTHETIC)}
                        onClick={() => history.push(Routers.SYNTHETIC)}
                        fontSize={16}
                        lineHeight={16}
                        fontWeight={500}
                        fontFamily="Codec Pro"
                        disabled
                    >
                        <Big3Text>SYNTHETIC</Big3Text>
                    </Big3NavLink>
                    <Big3NavLink
                        className={activeStyle(Routers.BETTING)}
                        onClick={() => history.push(Routers.BETTING)}
                        fontSize={16}
                        lineHeight={16}
                        fontWeight={500}
                        fontFamily="Codec Pro"
                        disabled
                    >
                        <Big3Text>BETTING</Big3Text>
                    </Big3NavLink>
                    <Big3NavLink
                        className={activeStyle(Routers.FAQ)}
                        onClick={() => history.push(Routers.FAQ)}
                        fontSize={16}
                        lineHeight={16}
                        fontWeight={500}
                        fontFamily="Teko"
                        disabled
                    >
                        <Big3Text>FAQ</Big3Text>
                    </Big3NavLink>
                </Big3FlexBox>
                <Big3FlexBox className="header-right" align="center">
                    <Button
                        className="btn-get-token"
                        onClick={() => {
                            window.open('https://www.premint.xyz/nfootball-nft/', '_blank');
                        }}
                    >
                        Get Free Token
                    </Button>
                    <WalletConnector />
                </Big3FlexBox>
            </Big3FlexBox>
        </Big3Header>
    );
};
