import { Big3Box, Big3FlexBox, Big3Image, Big3Text, Big3Icon } from 'big3-styled-base';
import { useMemo } from 'react';
interface IProps {
    matchTime: number | string;
    [key: string]: any;
}
export default ({ matchTime }: IProps) => {
    const status = useMemo(() => {
        const now = Date.now();
        if(now > new Date(matchTime).getTime()) {
            return 'Live'
        } else {
            
        }
    }, [matchTime]);
    return <Big3Text></Big3Text>;
};
