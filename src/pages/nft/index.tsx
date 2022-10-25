import './index.less';

import { Big3Page, Big3PortalNode } from 'big3-styled-base';

const Home = () => {
    return (
        <Big3Page>
            <Big3PortalNode className="nft-bg" container={document.getElementById('content')} />
        </Big3Page>
    );
};

export default Home;
