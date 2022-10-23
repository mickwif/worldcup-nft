import { useLocation } from 'umi';
import { useCallback } from 'react';
import classnames from 'classnames';

export default () => {
    const location = useLocation();
    const activeStyle = useCallback(
        (path) => classnames({ active: path === location.pathname }),
        [location],
    );

    return { activeStyle };
};
