import { ErcType } from '@/components/components';
import { css } from 'wired-styled-px2vw';

export const settleCss = (source: any, _default?: any) => {
    _default = typeof _default === 'number' ? `${_default}px` : _default;
    if (typeof source === 'number') {
        return source ? `${source}px` : _default;
    }
    if (typeof source === 'string') {
        return source ?? _default;
    }
    return source ?? _default;
};

export const spacingCss = (props) => css`
    padding-left: ${settleCss(props.paddingLeft ?? props.$paddingLeft, 'initial')};
    padding-right: ${settleCss(props.paddingRight ?? props.$paddingRight, 'initial')};
    padding-top: ${settleCss(props.paddingTop ?? props.$paddingTop, 'initial')};
    padding-bottom: ${settleCss(props.paddingBottom ?? props.$paddingBottom, 'initial')};
    margin-left: ${settleCss(props.marginLeft ?? props.$marginLeft, 'initial')};
    margin-right: ${settleCss(props.marginRight ?? props.$marginRight, 'initial')};
    margin-top: ${settleCss(props.marginTop ?? props.$marginTop, 'initial')};
    margin-bottom: ${settleCss(props.marginBottom ?? props.$marginBottom, 'initial')};
    left: ${settleCss(props.left ?? props.$left, 'initial')};
    right: ${settleCss(props.right ?? props.$right, 'initial')};
    top: ${settleCss(props.top ?? props.$top, 'initial')};
    bottom: ${settleCss(props.bottom ?? props.$bottom, 'initial')};
`;

export const baseCss = (props) => css`
    ${spacingCss(props)}
    width: ${settleCss(props.width, 'auto')};
    height: ${settleCss(props.height, 'auto')};
    flex: ${props.flex ?? 'initial'};
    background: ${settleCss(props.background, 'initial')};
    max-width: ${settleCss(props.maxWidth ?? props.$maxWidth, '100%')};
    min-width: ${settleCss(props.minWidth ?? props.$minWidth, 'auto')};
    min-height: ${settleCss(props.minHeight ?? props.$minHeight, '0')};
    max-height: ${settleCss(props.maxHeight ?? props.$maxHeight, '100%')};
`;

export const flexCss = (props) => css`
    ${baseCss(props)}
    display: flex;
    flex-wrap: ${settleCss(props.wrap, 'nowrap')};
    flex-direction: ${props.column ? 'column' : 'row'};
    justify-content: ${settleCss(props.justify, 'flex-start')};
    align-items: ${settleCss(props.align, 'flex-start')};
`;

export const textCss = (props, initial?: any) => css`
    ${baseCss(props)}
    font-style: normal;
    word-break: keep-all;
    white-space: nowrap;
    font-weight: ${props.fontWeight ?? props.$fontWeight ?? 'inherit'};
    font-size: ${settleCss(props.fontSize ?? props.$fontSize, 'inherit')};
    color: ${settleCss(props.color ?? props.$color, initial?.color || 'inherit')};
    text-align: ${settleCss(props.textAlign ?? props.$textAlign, 'left')};
    line-height: ${settleCss(props.lineHeight ?? props.$lineHeight, '100%')};
    font-family: ${settleCss(props.fontFamily ?? 'var(--roboto-font)')};
    text-overflow: ellipsis;
    overflow: hidden;
`;

export const centerCss = (props) => css`
    position: ${settleCss(props.position, 'initial')};
    margin-left: ${settleCss(props.marginLeft ?? props.$marginLeft, 'auto')};
    margin-right: ${settleCss(props.marginRight ?? props.$marginRight, 'auto')};
    margin-top: ${settleCss(props.marginTop ?? props.$marginTop, 'auto')};
    margin-bottom: ${settleCss(props.marginBottom ?? props.$marginBottom, 'auto')};
`;

export const cursorCss = (props) => css`
    cursor: ${settleCss(props.cursor, 'initial')};
`;

export const bgCss = (image) => css`
    background-position: center;
    background-repeat: no-repeat;
    background-image: url(${image});
    background-color: transparent;
    background-size: contain;
    flex-shrink: 0;
    mask: url(${image}) no-repeat 50% 50%;
    mask-size: cover;
`;

export const iconCss = (image, size, pure = true) => css`
    ${bgCss(image)}
    width: ${`${size}px`};
    height: ${`${size}px`};
    display: inline-block;

    ${pure &&
    css`
        border: none;
        outline: none;
    `}
`;

export const tokenCss = (token: string, type: ErcType, size: number) => {
    if (token && type && !/trade/i.test(type)) {
        token = token.replace(/\s/g, '');
        try {
            const icon = require('@/assets/images' +
                `/${type.toLowerCase()}` +
                `/${type.toLowerCase()}-` +
                `${type === 'erc721' ? token : token.toLowerCase()}.png`);
            return iconCss(icon, size ?? 18);
        } catch (error) {}
    }

    return css`
        display: none;
    `;
};

export const syntheticBgCss = (image) => css`
    position: relative;

    &:before {
        flex: 1;
        content: '';
        position: absolute;
        background-size: cover;
        background-repeat: no-repeat;
        background-image: url(${image});
        pointer-events: none;

        width: 100%;
        height: calc(50% + 1px);
        left: 50%;
        transform: translateX(-50%);
        top: 0;
        background-position: left top;
    }

    &:after {
        flex: 1;
        content: '';
        position: absolute;
        background-size: cover;
        background-repeat: no-repeat;
        background-image: url(${image});
        pointer-events: none;

        width: 100%;
        height: calc(50% + 1px);
        left: 50%;
        transform: translateX(-50%);
        bottom: 0;
        background-position: left bottom;
    }
`;
