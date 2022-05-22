import { classNames } from 'helpers';
import React, { MutableRefObject, useEffect, useMemo, useRef } from 'react';
import { animated, Interpolation, SpringValue } from 'react-spring';
import overlayStyles from '../styles/Overlay.module.css';
interface OverlayProps {
    opacity: SpringValue<number>,
    onClick?: React.MouseEventHandler<HTMLDivElement>,
    showContent: boolean,
    Child: React.ComponentType<any>,
    onTop?: boolean
    style?: React.CSSProperties
}
export default function Overlay({ opacity, onClick, showContent, Child, onTop, style }: OverlayProps): JSX.Element {
    const overlayRef = useRef<HTMLDivElement>();
    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.target) {
            onClick && onClick(e);
        }
    }
    Child.displayName = "OverlayContent";
    return (
        <animated.div style={{
            display: opacity.to({ range: [0, 1], output: [0, 1] }).to((op: number) => op < .005 ? 'none' : 'flex') as any,
            ...style
        }}
            className={classNames(onTop && overlayStyles.overlayOnTop)}
        >
            <OverlayInner
                ref={overlayRef}
                opacity={opacity}
                onClick={handleClick}
                onTop={onTop}

            />
            <Child onClick={handleClick} onComplete={onClick} onCancel={onClick} toggle={showContent} />
        </animated.div>

    )
}
const OverlayInner = React.forwardRef(({ opacity, onClick, onTop }: { opacity: SpringValue<number>, onClick: React.MouseEventHandler<HTMLDivElement>, onTop?: boolean }, ref) => (
    <animated.div
        ref={ref as React.RefObject<HTMLDivElement>}
        onClick={onClick}
        className={classNames(overlayStyles.overlay, onTop && overlayStyles.top)}
        style={{
            opacity,
        }} />
))
OverlayInner.displayName = "OverlayInner";
