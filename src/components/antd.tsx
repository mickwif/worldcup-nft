import {
    Select,
    Button,
    Tag,
    Modal,
    Divider,
    Carousel,
    Tabs,
    Popover,
    Radio,
    Form,
    Slider,
    Input,
    Checkbox,
    List,
    PopoverProps,
    Spin,
    SpinProps,
    Dropdown,
    Menu,
    Table,
    Pagination,
    PaginationProps,
} from 'antd';
import { ModalProps } from 'antd/lib/modal';

import styled, { css, createGlobalStyle } from 'wired-styled-px2vw';
import { IAntButton, IAntModal, IAntSelect, IAntCheckboxGroup, ISlider, ITag } from '@/components/components';
import { flexCss, iconCss, settleCss, textCss, bgCss, baseCss } from './css';
import { FC, Fragment, useEffect } from 'react';
import { useAntdModalIndex } from 'antd-enhancer';
import { WiredBox } from './base';
import { ModalCloseBtn } from './svg';
import { Big3FlexBox, Big3Icon, Big3Text } from 'big3-styled-base';
import ArrowLeft from '@/assets/images/icon-pagination-prev.png';
import ArrowRight from '@/assets/images/icon-pagination-next.png';
export const AntGlobalStyle = createGlobalStyle`
    /* spin */
    .ant-spin-nested-loading,
    .ant-spin-container {
        height: 100%;
        width: 100%;
    }
    .ant-spin-nested-loading {
        overflow: auto;
    }

    /* popover */
    .ant-popover {
        .ant-popover-inner {
            color: #ffffff;
            border-radius: 8px;
            background: #2b2b40;
        }
        .ant-popover-inner-content {
            font-family: 'Codec Pro';
            font-style: normal;
            font-weight: 500;
            font-size: 14px;
            line-height: 12px;
            color: #ffffff;
        }
        .ant-popover-arrow-content {
            background: #2b2b40;
        }
        .ant-popover-arrow-content::before {
            background: #2b2b40;
        }
    }
`;

export const AntForm = styled(Form)`
    width: 100%;
`;

export const AntFormItem = styled(Form.Item)`
    margin: 0;
    padding: 0;

    label {
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 32px;
        color: var(--black-color);
    }
`;

export const AntInput = styled(Input)`
    border: 2px solid var(--black-color);
    border-radius: 16px;
`;

export const AntTextArea = styled(Input.TextArea)`
    &.ant-input {
        border: 1px solid var(--primary-color);
        border-radius: 6px;
        resize: none;
    }
`;

export const AntList = styled(List)`
    &.ant-list {
        width: 100%;
    }
    .ant-list-item {
        ${(props) =>
            props.bordered === false &&
            css`
                border: none;
            `}
    }
`;

export const AntListItem = styled(List.Item)``;

export const AntListItemMeta = styled(List.Item.Meta)<Spacing>`
    ${(props) => flexCss(props)};
    width: 100%;

    .ant-list-item-meta-avatar {
        margin: 0;
        margin-right: 10px;
    }

    .ant-list-item-meta-content {
        width: auto;
    }

    .ant-list-item-meta-description {
        margin-top: 10px;
        font-style: normal;
        font-weight: 400;
        font-size: 15px;
        line-height: 18px;
        color: #626264;
    }
`;

export const AntTag = styled(Tag)<ITag & { $fontColor?: string }>`
    ${(props) => css`
        width: auto;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 24px;
        padding: 8px 12px;
        position: static;
        border-radius: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 8px 8px 0;
        border: none;
        background: none;
        .anticon-close {
            margin-left: 8px;

            svg {
                width: 8px;
                height: 8px;
            }
        }

        ${props.$fontColor &&
        css`
            color: ${props.$fontColor};
            .anticon-close svg {
                color: ${props.$fontColor};
            }

            *,
            *:hover {
                color: ${props.$fontColor};
                .anticon-close svg {
                    color: ${props.$fontColor};
                }
            }
        `};

        ${props.wiredmode === 'clickable' &&
        css`
            cursor: pointer;
        `}

        ${props.color &&
        props.$fontColor &&
        css`
            border: none;
        `}
    `}
`;

export const AntCheckboxGroup = styled(Checkbox.Group)<IAntCheckboxGroup & { value: any }>`
    .ant-checkbox-wrapper {
        margin: 0;
        padding: 0;
        display: flex;
        align-items: center;
    }

    .ant-checkbox-wrapper + .ant-checkbox-wrapper {
        margin-left: 0;
    }

    ${(props) =>
        !props.shape &&
        css`
            .ant-checkbox-wrapper {
                min-height: 40px;
                padding: 0 22px;
                &:hover {
                    background: #f9f6ff;
                }

                > span:last-child {
                    font-style: normal;
                    font-weight: 400;
                    font-size: 16px;
                    line-height: 24px;
                    color: #626264;
                    white-space: nowrap;
                    display: flex;
                    align-items: center;
                    padding: 0;
                    // margin-left: 8px;
                }

                &.single {
                    .ant-checkbox {
                        display: none;
                    }
                }
            }

            .ant-checkbox-wrapper-checked {
                position: relative;

                > * {
                    position: relative;
                    z-index: 10;
                }

                &:before {
                    content: '';
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background: #f9f7ff;
                    z-index: 0;
                }

                > span:last-child {
                    font-weight: 600;
                    color: var(--primary-color);
                }
            }

            .ant-checkbox {
                top: auto;
                margin-right: 8px;
            }

            .ant-checkbox-checked .ant-checkbox-inner {
                background-color: var(--primary-color);
                border-color: var(--primary-color);
            }
        `}

    ${(props) =>
        props.shape === 'button' &&
        css`
            &.ant-checkbox-group {
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
                padding: 0 22px;
            }

            .ant-checkbox-wrapper {
                padding: 0;
                width: 132px;
                height: 36px;
                border: 1px solid #dadada;
                border-radius: 6px;
                margin-bottom: 20px;

                :nth-last-child(1),
                :nth-last-child(2) {
                    margin-bottom: 0;
                }

                > span:last-child {
                    padding: 0;
                    font-style: normal;
                    font-weight: 400;
                    font-size: 16px;
                    line-height: 140%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #626264;
                    width: 100%;
                    height: 100%;
                }
            }

            .ant-checkbox {
                display: none;
            }

            .ant-checkbox-wrapper-checked {
                background-color: var(--primary-color);
                border-color: var(--primary-color);
                > span:last-child {
                    color: #ffffff;
                }
            }
        `}
`;

export const AntCheckbox = styled(Checkbox)``;

export const AntSlider = styled(Slider)<ISlider>`
    &.ant-slider {
        margin: 0;
        display: flex;
        align-items: center;
        margin-bottom: 28px;

        .ant-slider-dot {
            background: #c1c3c7;
            border-color: #c1c3c7;
            width: 8px;
            height: 8px;
        }

        .ant-slider-dot-active {
            background: #ffffff;
            border-color: var(--primary-color);
        }

        .ant-slider-rail {
            background: rgba(98, 98, 100, 0.5);
            height: 1px;
        }

        .ant-slider-track {
            background-color: var(--primary-color);
            height: 3px;
        }

        .ant-slider-handle {
            border: solid 2px #ffffff;
            background-color: var(--primary-color);
            width: 12px;
            height: 12px;
            margin-top: 0;
        }

        .ant-slider-mark-text {
            top: 12px;
            color: #c1c3c7;
            font-weight: 300;
            font-size: 16px;
            line-height: 120%;
            display: flex;
            align-items: center;
            text-align: center;
        }
    }
`;

export const AntPopover: FC<PopoverProps> = styled(Popover)`
    .ant-popover {
        .ant-popover-inner {
            color: #ffffff;
            border-radius: 8px;
            background: #2b2b40;
        }
        .ant-popover-inner-content {
            font-family: 'Codec Pro';
            font-style: normal;
            font-weight: 500;
            font-size: 14px;
            line-height: 12px;
            color: #ffffff;
        }
        .ant-popover-arrow-content::before {
            background: #2b2b40;
        }
    }
`;

export let AntModal: FC<IAntModal>;
{
    const InnerStyledComponent = styled(Modal)<IAntModal>`
        &.ant-modal {
            width: ${(props) => `${props.width ?? 552}px`} !important;
            border-radius: 6px;
            padding: 0;
            position: relative;

            .ant-modal-title {
                word-break: keep-all;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                padding-right: 0 40px;
                text-align: center;

                font-family: 'Teko';
                font-weight: 500;
                font-size: 36px;
                line-height: 52px;
                color: var(--black-color);
            }

            .ant-modal-header {
                border: none;
                background-color: transparent;
                padding: 0;
            }

            .ant-modal-title {
                font-style: normal;
                font-weight: 700;
                font-size: 24px;
                line-height: 140%;
                letter-spacing: 0.02em;
            }

            .ant-modal-body {
                padding: 0;
            }

            ${(props) =>
                !props.$wiredTheme &&
                css`
                    &:before {
                        background: var(--primary-color);
                    }

                    .ant-modal-title {
                        color: var(--black-color);
                        padding-bottom: 18px;
                        border-bottom: 1px solid #f9f1d3;
                    }

                    .ant-modal-content {
                        border-radius: 6px;
                        overflow: hidden;
                        background-color: transparent;
                        box-shadow: none;
                        ${bgCss('/modal-bg.png')};
                        background-size: 100% 100%;
                        padding: 48px 56px 40px 56px;
                    }

                    .ant-modal-close-x {
                        width: auto;
                        height: 34px;
                        box-sizing: content-box;
                        line-height: 0;
                        padding: 48px 56px;
                        display: flex;
                        align-items: center;

                        img {
                            width: 28px;
                        }
                    }
                `}

            ${(props) =>
                props.$wiredTheme === 'connect' &&
                css`
                    &:before {
                        background: var(--primary-color);
                    }

                    .ant-modal-title {
                        color: var(--black-color);
                        overflow: visible;
                    }

                    .ant-modal-content {
                        background: linear-gradient(
                            180.08deg,
                            #1d1d2c 0.05%,
                            #0e1723 67.82%,
                            rgba(5, 20, 30, 0.46) 99.92%
                        );
                        border-radius: 24px;
                        padding: 50px 40px 48px 40px;
                    }

                    .ant-modal-close-x {
                        width: auto;
                        height: 28px;
                        box-sizing: content-box;
                        line-height: 0;
                        padding: 16px;
                        display: flex;
                        align-items: center;

                        img {
                            width: 28px;
                        }
                    }
                `}
                ${(props) =>
                props.$wiredTheme === 'tip' &&
                css`
                    .ant-modal-title {
                        color: var(--black-color);
                        overflow: visible;
                    }

                    .ant-modal-content {
                        background: linear-gradient(0.27deg, #1d1d2c -5.75%, #0d1522 99.77%);
                        border-radius: 24px;
                        padding: 40px 48px;
                    }

                    .ant-modal-close-x {
                        display: none;
                    }
                `}
        }
    `;
    AntModal = (props: IAntModal) => {
        const { marker } = useAntdModalIndex(props.zIndexRoot ?? 1, props.visible);

        return (
            <InnerStyledComponent {...props} closeIcon={<ModalCloseBtn />}>
                <WiredBox ref={marker} />
                {props.children}
            </InnerStyledComponent>
        );
    };
}

export const AntButton: FC<IAntButton> = styled(Button)<IAntButton & TextCss>`
    &.ant-btn {
        width: ${(props) => settleCss(props.width, 'auto')};
        min-width: ${(props) => settleCss(props.width, '100%')};
        font-size: ${(props) => settleCss(props.fontSize, 16)};
        font-weight: ${(props) => settleCss(props.fontWeight, 400)};
        font-family: ${(props) => settleCss(props.fontFamily, 400)};
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        padding: 0 8px !important;
        * {
            letter-spacing: 0.02em;
        }

        &:disabled {
            background: rgba(254, 212, 17, 0.3);
            color: #ffffff;
            opacity: 0.4;
        }
        &[disabled] {
            &:hover {
                // filter: grayscale(1);
            }
        }

        ${(props) =>
            (!props.$wiredTheme || props.$wiredTheme === 'primary') &&
            css`
                ${textCss(props, { color: props.theme.SYSTEM.white })};
                font-family: 'Codec Pro';
                font-style: normal;
                font-weight: 500;
                font-size: 16px;
                border-radius: 8px;
                // border: 2px solid #7e1f1d;
                background-color: ${props.theme.SYSTEM.primary};
                color: #000000;
                &:hover {
                    filter: brightness(120%);
                    background-color: ${props.theme.SYSTEM.primary};
                }
            `}

        ${(props) =>
            props.$wiredTheme === 'black' &&
            css`
                ${textCss(props, { color: props.theme.SYSTEM.white })};
                font-family: 'Codec Pro';
                font-style: normal;
                font-weight: 500;
                font-size: 16px;
                background: #2b2b40;
                border-radius: 8px;
                color: #ffffff;
                border: 1px solid rgba(254, 212, 17, 0.03);
                &:hover {
                    filter: brightness(120%);
                    background: #2b2b40;
                }
                &:disabled {
                    background: rgba(43, 43, 64, 0.4);
                    border: 1px solid rgba(255, 255, 255, 0.03);
                    border-radius: 8px;
                    color: rgba(255, 255, 255, 0.4);
                }
            `}

        ${(props) =>
            props.$wiredTheme === 'red' &&
            css`
                ${textCss(props, { color: props.theme.SYSTEM.primary })};
                border: var(--black-color) 2px solid;
                background: #de372e;
                border: 2px solid #7e1f1d;
                border-radius: 51px;

                color: #ffffff;
                &:hover {
                    background: ${props.theme.SYSTEM.primary};
                    color: ${props.theme.SYSTEM.white};
                }
            `}

            ${(props) =>
            props.$wiredTheme === 'pure' &&
            css`
                ${textCss(props, { color: props.theme.SYSTEM.primary })};
                border: #7e1f1d 2px solid;
                /* background-color: ${settleCss(props.background, 'transparent')};
                background-size: contain;
                background-position: right center;
                background-repeat: no-repeat; */

                &:hover {
                    // background: ${props.theme.SYSTEM.primary};
                    color: ${props.theme.SYSTEM.white};
                }
            `}

        ${(props) =>
            (props.$wiredTheme === 'gradient' || props.$wiredTheme === 'secondary') &&
            css`
                ${textCss(props, { color: props.theme.SYSTEM.primary })};
                position: relative;
                > span {
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s;

                    * {
                        cursor: pointer;
                    }

                    &:hover {
                        background: ${props.theme.SYSTEM.primary};
                        color: ${props.theme.SYSTEM.white};
                        border-radius: 4px;

                        &:before,
                        &:after {
                            display: none;
                        }
                    }
                }
            `}
    }
`;

export let AntSelect: FC<IAntSelect>;
{
    const InnerGlobalStyleComponent = createGlobalStyle<{
        fontSize: number;
        fontcolor: string;
    }>`
       ${({ fontSize = 14 }) => css`
           .ant-select-cover {
               box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.08);
               border-radius: 6px;
               background: #ffffff;
               .ant-select-item {
                   min-width: 158px;
                   height: 40px;
               }

               .ant-select-item-option-selected,
               .ant-select-item-option-active {
                   color: var(--primary-color);
                   background: #f9f7ff;
               }
               .ant-select-item-option-content {
                   font-size: 15px;
                   font-weight: 400;
                   color: var(--gray-color-1);
                   display: flex;
                   align-items: center;
               }
               .ant-select-item-option-selected,
               .ant-select-item-option-active {
                   .ant-select-item-option-content {
                       color: var(--primary-color);
                       font-weight: 600;
                       font-size: 16px;
                   }
               }
           }
       `}
    `;
    const InnerStyledComponent: FC<IAntSelect> = styled(Select)`
        ${(props: IAntSelect) => css`
            &.ant-select {
                position: relative;
                display: flex;
                align-items: center;

                .ant-select-selection-item,
                .ant-select-selector {
                    padding: 0;
                    display: flex;
                    align-items: center;
                    color: var(--primary-color);
                    font-weight: 600;
                    font-size: 16px;
                    font-size: ${`${props.fontSize}px`};
                }

                .ant-select-selection-search,
                .ant-select-arrow {
                    display: none;
                }

                &:after {
                    content: '';
                    display: inline-block;
                    margin-left: 4px;
                    width: 10px;
                    height: 10px;
                    background-position: center;
                    background-repeat: no-repeat;
                    background-image: url(${BtnSelectorArrow});
                    background-color: transparent;
                    background-size: contain;
                    flex-shrink: 0;
                }
            }
        `}
    `;
    AntSelect = (props) => {
        return (
            <Fragment>
                <InnerStyledComponent {...props} dropdownClassName="ant-select-cover" />
                <InnerGlobalStyleComponent fontSize={props.fontSize} fontcolor={props.fontcolor} />
            </Fragment>
        );
    };
}

export const AntDropdown = styled(Dropdown)``;

export const AntMenu = styled(Menu)`
    &.ant-dropdown-menu {
        padding: 4px;
        width: 152px;
        .ant-dropdown-menu-item {
            font-style: normal;
            font-weight: 400;
            font-size: 15px;
            line-height: 16px;
            color: #626264;
            height: 40px;
            &:hover {
                background: #f9f7ff;
                border-radius: 4px;
                color: var(--primary-color);
                font-weight: 600;
            }
        }
    }
`;

export const AntTabs = styled(Tabs)`
    &.ant-tabs {
        .ant-tabs-tab-btn {
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 24px;
            color: var(--black-color);
            padding: 6px;
        }
        .ant-tabs-tab-active {
            .ant-tabs-tab-btn {
                // font-weight: 600;
            }
        }
        .ant-tabs-ink-bar {
            height: 6px;
            background: var(--primary-color);
        }
    }
`;

export const AntCarousel = styled(Carousel)`
    width: 100%;

    .slick-dots {
        bottom: -5%;

        > li {
            > button {
                width: 16px;
                height: 16px;
                border-radius: 50%;
                background: rgba(69, 54, 175, 0.3);
            }

            &.slick-active {
                > button {
                    background: var(--primary-color);
                }
            }
        }
    }
`;

export const AntDivider = styled(Divider)`
    border-left: 1px solid rgba(80, 62, 157, 0.32);
`;

export const AntSpin = styled(Spin)<SpinProps>``;

export const AntRatioGroup = styled(Radio.Group)`
    background: #f1f1fc;
    border-radius: 8px;
    padding: 6px 8px;

    .ant-radio-button-wrapper {
        border: none;
        background: transparent;
        height: auto;
        font-style: normal;
        font-weight: 400;
        font-size: 15px;
        color: var(--gray-color-1);
    }
    .ant-radio-button-wrapper-checked {
        background: var(--primary-color);
        border-radius: 4px;
        color: var(--white-color);
        font-style: normal;
        font-weight: 600;
        font-size: 15px;
    }
`;

export const AntRatioButton = styled(Radio.Button)``;

export const AntTable = styled(Table)`
    .ant-table {
        background: transparent;
        border-radius: 12px;
        box-shadow: 0px 12px 24px rgba(183, 196, 157, 0.06);
    }
    .ant-table table {
        border-collapse: separate;
        border-spacing: 0 15px;
    }

    .ant-table-tbody > tr > td:first-child {
        border-radius: 12px 0 0 12px;
        padding-left: 24px;
    }
    .ant-table-tbody > tr > td:last-child {
        border-radius: 0 12px 12px 0;
    }
    .ant-table-container table > thead > tr:first-child th:last-child {
        border-radius: 0 12px 12px 0;
    }
    .ant-table-container table > thead > tr:first-child th:first-child {
        border-radius: 12px 0 0 12px;
        padding-left: 24px;
    }
    .ant-table-thead > tr > th:before {
        display: none;
    }
    .ant-table-thead > tr > th {
        background: transparent;
        font-family: 'Codec Pro';
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        color: #4a4a60;
        border-bottom: none;
        padding-bottom: 0;
    }
    .ant-table-tbody > tr > td {
        border: none;
        padding: 12px;
    }
    .ant-table-row {
        background: linear-gradient(89.96deg, #121222 0.04%, #131325 131.81%);
        border-radius: 12px;
    }
    .ant-table-tbody > tr.ant-table-row:hover > td,
    .ant-table-tbody > tr > td.ant-table-cell-row-hover {
        background: #121222;
    }
    .ant-empty-normal {
        color: #fefefe;
        &:hover {
            background: transparent;
        }
    }
    .ant-table-tbody > tr.ant-table-placeholder:hover > td {
        background: transparent;
    }
    .ant-empty-description {
        color: rgba(255, 255, 255, 0.5);
    }
`;

export type TomatoModalProps = ModalProps &
    Omit<Big3Props<HTMLDivElement>, 'title'> & {
        circleBg?: boolean;
        titleStyle?: Big3Props<HTMLDivElement>;
        dialogStyle?: Big3Props<HTMLDivElement>;
    };
export const TomatoModal = styled(Modal).attrs<TomatoModalProps>((props) => ({
    closeIcon: <Big3Icon margin="8px 8px 0 auto" src="/icon-modal-close.png" size={28} />,
    ...props,
}))<TomatoModalProps>`
    && {
        ${(props) => baseCss(props.dialogStyle || {})};
    }

    .ant-modal-header {
        border: none;
        background: transparent;
        border-radius: 16px;
        padding: 0;
    }

    .ant-modal-title {
        font-family: 'Teko';
        font-style: normal;
        font-weight: 500;
        font-size: 36px;
        line-height: 52px;
        color: #000000;
        text-align: center;
        ${(props) =>
            props.titleStyle &&
            baseCss({
                fontSize: props.titleStyle.fontSize ?? 36,
                fontWeight: props.titleStyle.fontWeight ?? 500,
                color: props.titleStyle.color || '#000000',
                ...props.titleStyle,
            })}
    }

    .ant-modal-body {
        padding: 0;
    }

    .ant-modal-content {
        ${(props) =>
            props.circleBg
                ? css`
                      ${bgCss('/bg-modal-circle.png')};
                      padding: 40px 30px;
                      background-size: 100% 100%;

                      .ant-modal-close {
                          padding-top: 30px;
                          padding-right: 30px;
                      }
                  `
                : css`
                      background: linear-gradient(180deg, #fffbf1 2.29%, #ffffff 68.07%);
                      border-radius: 16px;
                  `}
        ${(props) => baseCss(props)}
    }
`;

export const TomatoFullscreenModal = (props: TomatoModalProps & { onClose: Function; isMobile?: boolean }) => {
    useEffect(() => {
        document.addEventListener('keyup', (e) => {
            if (e.key === 'Escape') {
                props.onClose();
            }
        });
    }, []);
    return (
        <TomatoModal
            footer={null}
            top={0}
            dialogStyle={{ top: 0, width: '100vw !important', position: 'relative' }}
            closable={false}
            background="rgba(5, 20, 30, 0.8)"
            backdropFilter="blur(7px)"
            /* Note: backdrop-filter has minimal browser support */
            border="none"
            boxShadow="none"
            paddingTop={props.isMobile ? 56 : 88}
            maskStyle={{ backdropFilter: 'blur(10px)' }}
            {...(props as any)}
        >
            <Big3FlexBox>
                <Big3FlexBox
                    position="absolute"
                    right={0}
                    top={0}
                    padding={props.isMobile ? '10px 12px' : '24px 32px'}
                    align="center"
                >
                    <Big3FlexBox
                        width={77}
                        height={32}
                        background="#2B2B40"
                        color="#FFFFFF"
                        fontSize={14}
                        borderRadius={8}
                        border="none"
                        onClick={() => props.onClose()}
                        cursor="pointer"
                        justify="center"
                        align="center"
                    >
                        <Big3Icon src="/icon-close.svg" width={14} height={14} marginRight={10} />
                        <Big3Text fontFamily="Codec Pro" fontWeight={500} fontSize={12}>
                            Close
                        </Big3Text>
                    </Big3FlexBox>
                </Big3FlexBox>

                {props.children}
            </Big3FlexBox>
        </TomatoModal>
    );
};

export const AntPagination: FC<PaginationProps> = styled(Pagination)<PaginationProps>`
    & {
        .ant-pagination-item,
        .ant-pagination-prev .ant-pagination-item-link,
        .ant-pagination-next .ant-pagination-item-link .ant-pagination-item-link,
        .ant-pagination-prev,
        .ant-pagination-next .ant-pagination-item-link {
            background-color: #2b2b40;
            font-family: 'Codec Pro';
            font-style: normal;
            font-weight: 500;
            font-size: 14px;
            color: #ffffff;
            border: none;
        }
        .ant-pagination-item a {
            color: #ffffff;
        }
        .ant-pagination-item-active a {
            color: var(--primary-color);
        }
    }
`;
