import './index.less';
import {
    Big3Page,
    Big3PortalNode,
    Big3FlexBox,
    Big3Image,
    Big3Heading,
    Big3Paragraph,
    Big3Text,
    Big3Box,
} from 'big3-styled-base';
import { AntButton } from '@/components';

export default () => {
    return (
        <Big3FlexBox align="center" justify="center" width="100%" height="calc(100vh - 80px)">
            <Big3FlexBox className="upgrade-card upgrade-card-left">
                <Big3Text
                    fontFamily="Lilita One"
                    fontWeight={400}
                    fontSize={24}
                    lineHeight={27}
                    marginBottom={16}
                    color="#F2CA0E"
                >
                    Advance Your Team
                </Big3Text>
                <Big3Paragraph className="upgrade-description">
                    If you hold the NFT that has reached the next stage, you can choose to advance it. 1st/2nd + 300,000
                    $nftb = 1st/2nd in Round Of 16
                </Big3Paragraph>
                <AntButton width={148} height={32} marginBottom={10}>
                    Ok
                </AntButton>
            </Big3FlexBox>

            <Big3FlexBox className="upgrade-card upgrade-card-right">
                <Big3Text
                    fontFamily="Lilita One"
                    fontWeight={400}
                    fontSize={24}
                    lineHeight={27}
                    marginBottom={16}
                    color="#1ECEF0"
                >
                    Resurrect Your Team
                </Big3Text>
                <Big3Paragraph className="upgrade-description">
                    If you hold the NFT of a team headed home, you can choose to resurrect it. 3/4th * 3 + $nftb 300,000
                    = 1st/2nd in Round Of 16
                </Big3Paragraph>
                <AntButton width={148} height={32} marginBottom={10}>
                    Ok
                </AntButton>
            </Big3FlexBox>
        </Big3FlexBox>
    );
};
