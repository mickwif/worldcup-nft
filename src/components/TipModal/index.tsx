import './index.less';
import { AntModal, AntButton } from '..';
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
interface IProps {
    errorText: string;
    onOk: () => void;
}
export default (props: IProps) => {
    const { errorText, onOk } = props;
    return (
        <AntModal
            footer={null}
            getContainer={false}
            width={400}
            $wiredTheme="tip"
            visible={errorText !== ''}
            zIndex={1001}
        >
            <Big3FlexBox column align="center">
                <Big3Image src="./icon-modal-tip.svg" width={94} height={92} marginBottom={32}></Big3Image>
                <Big3Text fontFamily="Codec Pro" fontWeight={600} color="#ffffff" fontSize={20} marginBottom={16}>
                    Sorry!
                </Big3Text>
                <Big3Paragraph
                    fontFamily="Codec Pro"
                    fontWeight={400}
                    color="#7E829D"
                    fontSize={16}
                    lineHeight={22}
                    marginBottom={60}
                >
                    {errorText}
                </Big3Paragraph>
                <AntButton width={200} height={48} borderRadius={8} color="#000000" onClick={onOk}>
                    Ok
                </AntButton>
            </Big3FlexBox>
        </AntModal>
    );
};
