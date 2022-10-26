import './index.less';
import { Big3Box, Big3FlexBox, Big3Image, Big3Text, Big3Icon } from 'big3-styled-base';
import { Button } from 'antd';
import { history } from 'umi';
export default () => {
    return (
        <Big3FlexBox justify="space-between" align="center" marginTop={10}>
            <Big3FlexBox align="center">
                <Big3FlexBox className="betting-balance">
                    <Big3Image src="./betting-balance-bg.png" />
                    <Big3FlexBox justify="space-between" align="center" className="betting-balance-tokens">
                        <Big3Text>0.0 ETH</Big3Text>
                        <div className="line"></div>
                        <Big3Text>0 Token</Big3Text>
                    </Big3FlexBox>
                </Big3FlexBox>
                <Button className="betting-balance-claim">Claim</Button>
            </Big3FlexBox>

            <Big3FlexBox align="center">
                <Big3FlexBox
                    onClick={() => {
                        history.push('/positions');
                    }}
                    align="center"
                    className="betting-positions-results betting-positions"
                >
                    <Big3Image src="./betting-token.svg" width={16} height={16} marginRight={8} />
                    <Big3Text>My Positions</Big3Text>
                    <div className="positions-badge">18</div>
                </Big3FlexBox>
                <Big3FlexBox
                    onClick={() => {
                        history.push('/results');
                    }}
                    align="center"
                    className="betting-positions-results betting-results"
                >
                    <Big3Image src="./icon-cup.svg" width={16} height={16} marginRight={8} />
                    <Big3Text>Match Results</Big3Text>
                    <div className="results-badge">23</div>
                </Big3FlexBox>
            </Big3FlexBox>
        </Big3FlexBox>
    );
};
