import './index.less';
import { Button } from 'antd';
import { history } from 'umi';
import { Big3Image, Big3FlexBox, Big3Text } from 'big3-styled-base';

export default () => {
    return (
        <Big3FlexBox
            alignItems="center"
            justify="center"
            className="btn-back"
            onClick={() => {
                history.goBack();
            }}
        >
            <Big3Image src="./icon-btn-back.svg" marginRight={9}></Big3Image>
            <Big3Text fontFamily="Codec Pro" fontWeight={500} fontSize={12} color="#ffffff">
                Back
            </Big3Text>
        </Big3FlexBox>
    );
};
