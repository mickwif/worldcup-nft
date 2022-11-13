import { Big3Image } from 'big3-styled-base';
import './index.less';
interface IProps {
    nation1: string;
    nation2: string;
    width?: number;
    height?: number;
    [key: string]: any;
}

export default (props: IProps) => {
    const { nation1, nation2, width, height, ...rest } = props;

    return (
        <div className="nation-pair" {...rest}>
            <Big3Image
                src={`./nations/${nation1.toLowerCase()}.png`}
                width={width || 36}
                height={height || 36}
            ></Big3Image>
            <Big3Image
                src={`./nations/${nation2.toLowerCase()}.png`}
                width={width || 36}
                height={height || 36}
            ></Big3Image>
        </div>
    );
};
