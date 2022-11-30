import React, { useState, useEffect, useMemo } from 'react';
import './index.less';
import { Big3Box, Big3FlexBox, Big3Image, Big3Text, Big3Icon } from 'big3-styled-base';
import { Button } from 'antd';
import { MatchType } from '@/config/constant';
interface IProps {
    matchTime: number | string;
    matchResult?: string;
    type: MatchType;
    [key: string]: any;
    handleDraw?: Function;
}

export default (props: IProps) => {
    const { matchTime, matchResult, type, handleDraw, ...rest } = props;
    const [time, setTime] = useState({ h: '00', m: '00', s: '00' });
    let interval;
    let timeLeft;

    const status = useMemo(() => {
        if (matchResult) {
            return 'Full';
        }
        const now = Date.now();
        if (now > new Date(matchTime).getTime()) {
            return 'Live';
        } else {
            return 'NotStart';
        }
    }, [matchTime, matchResult]);
    const cardLarge = useMemo(() => {
        return type !== MatchType.Group;
    }, [type]);
    const pad = (n: number) => {
        if (n < 0) return '00';
        return n < 10 ? '0' + n : String(n);
    };
    const countdown = () => {
        const _d = Math.floor(timeLeft / (3600 * 1000 * 24));
        const _h = Math.floor((timeLeft / (3600 * 1000)) % 24);
        const _m = Math.floor((timeLeft / (60 * 1000)) % 60);
        const _s = Math.floor((timeLeft / 1000) % 60);
        setTime({
            // d: pad(_d),
            h: pad(_h + _d * 24),
            m: pad(_m),
            s: pad(_s),
        });
        if (timeLeft <= 0) {
            stopTimer();
        } else {
            timeLeft = timeLeft - 1000;
        }
    };

    const startTimer = () => {
        timeLeft = new Date(matchTime).getTime() - new Date().getTime();
        if (timeLeft > 0) {
            interval = setInterval(countdown, 1000);
        }
    };
    const stopTimer = () => {
        clearInterval(interval);
    };
    useEffect(() => {
        if (matchTime) {
            startTimer();
        }
        return () => {
            stopTimer();
        };
    }, [matchTime]);
    return (
        <Big3FlexBox column align="center" {...rest}>
            <>
                {status === 'NotStart' && (
                    <Big3Text
                        fontFamily="Lilita One"
                        fontWeight={400}
                        fontSize={cardLarge ? 56 : 32}
                        color="#4A4A60"
                        marginBottom={cardLarge ? 53 : 27}
                        lineHeight={cardLarge ? 64 : 37}
                    >
                        VS
                    </Big3Text>
                )}
                {status === 'Full' && (
                    <Big3FlexBox marginBottom={cardLarge ? 57 : 27} align="center">
                        <Big3Text
                            fontFamily="Lilita One"
                            fontWeight={400}
                            fontSize={cardLarge ? 56 : 32}
                            color="#FFFFFF"
                            marginRight={24}
                            lineHeight={cardLarge ? 64 : 37}
                        >
                            {matchResult?.split(':')[0]}
                        </Big3Text>
                        <Big3Text
                            fontFamily="Lilita One"
                            fontWeight={400}
                            fontSize={cardLarge ? 56 : 32}
                            color="#4A4A60"
                        >
                            :
                        </Big3Text>
                        <Big3Text
                            fontFamily="Lilita One"
                            fontWeight={400}
                            fontSize={cardLarge ? 56 : 32}
                            color="#FFFFFF"
                            marginRight={24}
                            lineHeight={cardLarge ? 64 : 37}
                        >
                            {matchResult?.split(':')[1]}
                        </Big3Text>
                    </Big3FlexBox>
                )}
            </>
            <>
                {status === 'NotStart' && (
                    <Big3Box marginBottom={cardLarge ? 10 : 0} className={'timer-container'} {...rest}>
                        {/* <div className={'timer-item'}>{time.d}</div>
            <span>:</span> */}
                        <span className={'timer-item'}>{time.h}</span>
                        <span>:</span>
                        <span className={'timer-item'}>{time.m}</span>
                        <span>:</span>
                        <span className={'timer-item'}>{time.s}</span>
                    </Big3Box>
                )}
                {status === 'Live' && (
                    <Big3Text color="#FF1515" fontSize={16} fontWeight={400} fontFamily="Helvetica">
                        Live
                    </Big3Text>
                )}
                {status === 'Full' && (
                    <Big3Text color="#F2DA0E" fontSize={16} fontWeight={400} fontFamily="Helvetica">
                        Full
                    </Big3Text>
                )}
            </>
            {!cardLarge && type === MatchType.Group && (
                <Button className="btn-bet btn-draw" onClick={handleDraw}>
                    Draw
                </Button>
            )}
        </Big3FlexBox>
    );
};
