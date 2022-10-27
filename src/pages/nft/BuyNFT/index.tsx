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
import nations from './nations.json';
import { AntButton } from '@/components';
export default () => {
    return (
        <Big3FlexBox column align="center" width="100%">
            <Big3Image src="./buy-nft-title.png" width={674} height={115} marginBottom={48}></Big3Image>
            <Big3Box className="nation-list">
                {nations.map((item) => (
                    <Big3FlexBox column align="center" className="nation-item">
                        <Big3Image
                            src={`./nations/${item.name.toLowerCase()}.png`}
                            width={72}
                            height={72}
                            marginBottom={14}
                        ></Big3Image>
                        <Big3Text
                            fontFamily="Codec Pro"
                            fontWeight={600}
                            fontSize={20}
                            lineHeight={17}
                            color="#ffffff"
                            marginBottom={22}
                        >
                            {item.name}
                        </Big3Text>
                        <AntButton width={148} height={32} marginBottom={10} disabled={item.left === 0}>
                            Mint
                        </AntButton>
                        <Big3Paragraph
                            color="#7E829D"
                            fontFamily="Codec Pro"
                            fontWeight={500}
                            fontSize={12}
                            lineHeight={10}
                            display="flex"
                            alignItems="center"
                        >
                            Total:
                            <Big3Text marginLeft={2} color={item.left === 0 ? '#7E829D' : '#ffffff'}>
                                {item.left}
                            </Big3Text>
                            /<Big3Text>{item.total}</Big3Text>
                        </Big3Paragraph>
                    </Big3FlexBox>
                ))}
            </Big3Box>
        </Big3FlexBox>
    );
};
