declare interface TransientSpacing {
    $paddingLeft?: number | string;
    $paddingRight?: number | string;
    $paddingTop?: number | string;
    $paddingBottom?: number | string;
    $marginLeft?: number | string;
    $marginRight?: number | string;
    $marginTop?: number | string;
    $marginBottom?: number | string;
    $left?: number | string;
    $right?: number | string;
    $top?: number | string;
    $bottom?: number | string;
}

declare interface TransientCenter {
    $marginLeft?: number | string;
    $marginRight?: number | string;
    $marginTop?: number | string;
    $marginBottom?: number | string;
}

declare interface TransientBaseCss extends TransientSpacing {
    $maxWidth?: number;
    $minHeight?: number;
    $maxHeight?: number;
}

declare interface TransientTextCss extends TransientBaseCss {
    $color?: string;
    $textAlign?: string;
    $fontSize?: number;
    $fontWeight?: number;
    $lineHeight?: number;
    fontFamily?: string;
}
