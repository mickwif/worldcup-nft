import './index.less';
import './mobile.less';
import { useLocation } from 'umi';

import { Big3FlexBox, Big3Footer, Big3Text, Big3Paragraph, Big3Image } from 'big3-styled-base';

export default () => {
    const location = useLocation();
    console.log(location.pathname);
    return (
        <Big3Footer
            width="100%"
            position={location.pathname === '/' ? 'fixed' : ''}
            zIndex={100}
            bottom={0}
            left={0}
            transition="all 0.2s"
        >
            <Big3FlexBox
                padding="0 var(--both-spacing)"
                height="var(--footer-height)"
                maxWidth="var(--design-draft-width)"
                margin="0 auto"
                paddingTop={52}
                justify="space-between"
            >
                <Big3Paragraph
                    color="rgba(255, 255, 255, 0.7)"
                    fontFamily="Helvetica"
                    fontWeight={400}
                    fontSize={14}
                    display="flex"
                    alignItems="center"
                >
                    ©2022 - <Big3Text color="#ffffff">NFooTball</Big3Text> - All Rights Reserved.
                </Big3Paragraph>
                <Big3FlexBox align="center">
                    <Big3Image
                        cursor="pointer"
                        src="/icon-twitter.svg"
                        height={20}
                        width={24}
                        marginRight={49}
                        onClick={() => window.open('https://twitter.com/NFootballl_', '_blank')}
                    />
                    <Big3Image
                        cursor="pointer"
                        src="/icon-opensea.svg"
                        height={20}
                        width={24}
                        marginRight={49}
                        onClick={() => window.open('https://opensea.io/collection/nfootball-group', '_blank')}
                    />
                    <Big3Image
                        cursor="pointer"
                        src="/icon-etherscan.svg"
                        height={20}
                        width={24}
                        marginRight={49}
                        onClick={() =>
                            window.open(
                                'https://etherscan.io/address/0xc74407208c0b6dc1aa650545e099df39770dc88d',
                                '_blank',
                            )
                        }
                    />
                    {/* <Big3Image src="/icon-discord.svg" height={25} width={22} /> */}
                </Big3FlexBox>
            </Big3FlexBox>
        </Big3Footer>
    );
};
