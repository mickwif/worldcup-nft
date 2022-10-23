declare type HeadingType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

declare interface Spacing extends TransientSpacing {
    paddingLeft?: number | string;
    paddingRight?: number | string;
    paddingTop?: number | string;
    paddingBottom?: number | string;
    marginLeft?: number | string;
    marginRight?: number | string;
    marginTop?: number | string;
    marginBottom?: number | string;
    left?: number | string;
    right?: number | string;
    top?: number | string;
    bottom?: number | string;
}

declare interface Center extends TransientCenter {
    position?: string;
    marginLeft?: number | string;
    marginRight?: number | string;
    marginTop?: number | string;
    marginBottom?: number | string;
}

declare interface BaseCss extends Spacing, TransientBaseCss {
    width?: number | string;
    height?: number | string;
    flex?: number | string;
    background?: string;
    maxWidth?: number | string;
    minWidth?: number | string;
    maxHeight?: number | string;
    minHeight?: number | string;
}

declare interface FlexCss extends BaseCss {
    column?: boolean;
    wrap?: string;
    justify?: string;
    align?: string;
}

declare interface TextCss extends BaseCss, TransientTextCss {
    color?: string;
    textAlign?: string;
    fontSize?: number;
    lineHeight?: number;
    fontWeight?: number;
}

declare interface CursorCss {
    cursor?: string;
}
