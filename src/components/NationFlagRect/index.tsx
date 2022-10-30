import { Big3Image } from 'big3-styled-base';

interface IProps {
    nation: string;
    width?: number;
    height?: number;
    [key: string]: any;
}

export default (props: IProps) => {
    const { nation, width, height, ...rest } = props;

    return (
        <Big3Image
            {...rest}
            src={`./nations-rect/${nation.toLowerCase()}.png`}
            width={width || 30}
            height={height || 20}
            border="2px solid #252837"
            borderRadius={4}
        ></Big3Image>
    );
};
