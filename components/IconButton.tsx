import React, { useState } from 'react';
import buttonStyles from '../styles/Button.module.css';
import { classNames, debounce } from '../helpers';
import Icon from './Icon';
import { Row } from './Row';
import { useHover } from '@use-gesture/react';
import { animated, useSpring, useTransition } from 'react-spring';
interface IconButtonProps {
    children?: React.ReactNode,
    onClick?: React.MouseEventHandler<HTMLDivElement>,
    icon: MaterialIcon,
    status?: Status,
    label?: string
}
export default function IconButton({ children, onClick, icon, status, label }: IconButtonProps): JSX.Element {
    const [hovering, setHovering] = useState<boolean>(false);
    const transition = useTransition(hovering, {
        from: { opacity: 0, translateX: 25, scale: 1 },
        enter: { opacity: 1, translateX: 0, scale: 1.2 },
        leave: { opacity: 0, translateX: 25, scale: 1 },
        reverse: hovering,
    })
    const { scale } = useSpring({
        config: { mass: 5, tension: 2000, friction: 200 },
        scale: hovering ? 1.1 : 1,
        from: { scale: 1 }
    })
    const bind = useHover(state => {
        setHovering(state.type === 'pointerenter')

    })
    return (
        <div style={{
            cursor: 'pointer',
            userSelect: 'none'
        }} onClick={onClick} {...bind()}>
            <Row align='center' justify='left' >
                <animated.div
                    className={classNames(buttonStyles.iconButton, status && buttonStyles[status])}
                    style={{ scale }}
                >
                    <div className={buttonStyles.inner}>
                        <Icon icon={icon} />
                        {children}
                    </div>
                </animated.div>
                {
                  label && transition(({ opacity, translateX }, item) => item ? (
                        <animated.div
                            style={{
                                translateX,
                                opacity
                            }}
                            className={buttonStyles.label}
                        >
                            {label}
                        </animated.div>
                    ) : null)
                }
            </Row>
        </div>

    )
}