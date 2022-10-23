import styled from 'wired-styled-px2vw';
import { IWiredProps } from '@/components/components';
import { baseCss, flexCss, settleCss, spacingCss, textCss } from './css';
import React, { FC } from 'react';

export const WiredNav = styled.nav<IWiredProps<HTMLBaseElement> & FlexCss>`
    ${(props) => flexCss(props)}
`;

export const WiredNavLink = styled.a`
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    color: var(--gray-color-1);
    display: flex;
    align-items: center;
    text-overflow: ellipsis;
    word-break: keep-all;
    white-space: nowrap;

    &.active,
    &:hover {
        -webkit-text-stroke-width: 1px;
        color: var(--primary-color);
    }

    .wired-link-icon {
        width: 18px;
        margin-right: 10px;
    }
    .wired-link-icon-avatar {
        border-radius: 50%;
    }
`;

export const WiredIcon = styled.img<IWiredProps<HTMLImageElement> & BaseCss>`
    ${(props) => spacingCss(props)}
    width: ${(props) => settleCss(props.size, 'auto')};
    height: ${(props) => settleCss(props.size, 'auto')};
`;

export const WiredImage = styled.img<IWiredProps<HTMLImageElement> & BaseCss>`
    ${(props) => baseCss(props)}
    display: block;
    object-fit: contain;
    flex-shrink: 0;
`;

export const WiredAvatar = styled.img<IWiredProps<HTMLImageElement> & BaseCss>`
    ${(props) => spacingCss(props)}
    border-radius: 50%;
    width: ${(props) => settleCss(props.size, 18)};
`;

export const WiredText = styled.span<IWiredProps<HTMLSpanElement> & TextCss>`
    ${(props) => textCss(props)}
    display: inline-block;
    flex-shrink: 0;
`;

export const WiredBox = styled.div<IWiredProps<HTMLDivElement> & BaseCss>`
    ${(props) => baseCss(props)}
`;

export const WiredFlexBox = styled.div<IWiredProps<HTMLDivElement> & FlexCss>`
    ${(props) => flexCss(props)}
`;

export const WiredHeader = styled.header<IWiredProps<HTMLDivElement>>``;

export const WiredLayout = styled.div<IWiredProps<HTMLBaseElement> & BaseCss>`
    ${(props) => spacingCss(props)}
`;

export const WiredPage = styled.main<IWiredProps<HTMLBaseElement> & FlexCss>`
    ${(props) => flexCss(props)};
    flex-direction: column;
    max-width: var(--design-draft-width);
    margin: 0 auto;
    padding-top: var(--header-height);
    padding-left: var(--both-spacing);
    padding-right: var(--both-spacing);

    > * {
        width: 100%;
    }
`;

export const WiredParagraph = styled.p<IWiredProps<HTMLParagraphElement> & TextCss & { rows?: number }>`
    ${(props) => textCss(props)}
    word-break: keep-all;
    white-space: normal;
    display: -webkit-box;
    -webkit-line-clamp: ${(props) => `${props.rows ?? 4}`}; /* number of lines to show */
    line-clamp: ${(props) => `${props.rows ?? 4}`};
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const WiredHeading = styled(
    ({
        headingType = 'h1',
        children,
        ...rest
    }: IWiredProps<HTMLHeadingElement> & TextCss & { headingType?: HeadingType }) => {
        return React.createElement(headingType, rest as any, children);
    },
)`
    ${(props) => textCss(props)}
    flex-shrink: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const WiredLink = styled.a<IWiredProps<HTMLAnchorElement> & TextCss & FlexCss>`
    ${(props) => textCss(props)}
    ${(props) => flexCss(props)}
`;

export const WiredHotspotArea = styled.a<IWiredProps<HTMLAnchorElement> & BaseCss>`
    ${(props) => spacingCss(props)}
    position: absolute;
`;

export const WiredList = styled.ul<IWiredProps<HTMLUListElement> & FlexCss>`
    ${(props) => flexCss(props)}
    flex-direction: column;
    overflow: auto;
`;

export const WiredListItem = styled.li<IWiredProps<HTMLLIElement> & FlexCss>`
    ${(props) => flexCss(props)}
    flex-shrink: 0;
`;

export const WiredButtonGroup = styled.div<IWiredProps<HTMLDivElement> & BaseCss>`
    ${(props) => spacingCss(props)}
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
