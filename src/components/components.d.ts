import { ButtonProps, ModalProps, SelectProps, SliderSingleProps, TagProps, InputProps, PaginationProps } from 'antd';

import { SliderRangeProps } from 'antd/lib/slider';
import { CheckboxGroupProps } from 'antd/lib/checkbox';

type SliderProps = SliderSingleProps | SliderRangeProps;

declare interface WiredComponent {
    children?: JSX.Element | JSX.Element[] | string | string[];
}

declare type ErcType = 'erc721' | 'erc1155' | 'erc20' | 'platform';
declare interface ErcTokenProps {
    displayName?: string;
    type?: ErcType;
    name: string;
    isLp?: boolean;
    token0?: string;
    token1?: string;
    code?: string;
}

/**
 * antd
 */
declare type ISlider = SliderProps;

declare interface IAntPagination extends PaginationProps {}

declare type IAntModeType = 'card' | 'pure' | undefined;

declare type CheckboxShape = 'button' | undefined;
declare interface IAntCheckboxGroup extends CheckboxGroupProps {
    shape?: CheckboxShape;
}

declare interface IAntButton extends ButtonProps, TextCss, FlexCss, CursorCss {
    $wiredTheme?:
        | 'pure'
        | 'red'
        | 'black'
        | 'gradient'
        | 'selector'
        | 'primary'
        | 'secondary'
        | 'destructive'
        | undefined;
}

declare interface IAntModal extends ModalProps {
    $wiredTheme?: 'connect' | undefined;
    zIndexRoot?: number;
}

declare interface IAntSelect extends SelectProps {
    fontcolor?: string;
    fontSize?: number;
}

declare interface ITag extends TagProps {
    wiredmode?: 'clickable' | undefined;
}

/**
 * html base elements
 */
declare interface IWiredProps<T> extends React.HTMLProps<T>, React.HTMLAttributes<T> {}

declare interface IWiredToken extends IWiredProps<HTMLBaseElement> {
    size: number;
    type: ErcType;
    token: string;
}

declare interface IWiredLpToken extends IWiredProps<HTMLDivElement> {
    size: number;
    type: ErcType;
    token0: string;
    token1: string;
}

declare interface IWiredSearchBar extends InputProps, BaseCss {
    $wiredTheme?: 'pure' | undefined;
    $iconSize?: number;
    fontSize?: number;
    fontWeight?: number;
    fontColor?: string;
    $placeholderColor?: string;
    $textIdent?: number;
    $iconLeft?: number;
}
