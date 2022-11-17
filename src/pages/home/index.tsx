import './index.less';

import { Big3Page, Big3PortalNode, Big3FlexBox, Big3Image } from 'big3-styled-base';
import { history } from 'umi';
const Home = () => {
    return (
        <Big3Page>
            <Big3PortalNode className="home-bg" container={document.getElementById('content')} />
            <Big3FlexBox justify="center" align="center" column>
                <Big3Image src="/header-title.png" marginTop={16} height={100} left={609} />
                <Big3Image
                    onClick={() => history.push('/betting')}
                    // src="/home-btn-betting.png"
                    src="home-btn-play.png"
                    marginTop={14}
                    width={162}
                    height={51}
                    cursor="pointer"
                />
            </Big3FlexBox>
        </Big3Page>
    );
};

export default Home;
