import React, { useContext, useEffect, useState } from 'react';
import { animated, SpringValue, useSpring } from 'react-spring';
import Icon from './Icon';
import Settings from './Settings';
import toggleStyles from '../styles/MenuToggle.module.css'
import { classNames } from '../helpers';
import IconButton from './IconButton';
import { AlertContext } from 'context/context';
import { useRouter } from 'next/router';
interface MenuProps {
    translateX: SpringValue<number>,
    borderBottom: SpringValue<string>,
    borderRight: SpringValue<string>,
    boxShadow: SpringValue<string>,
    onClick: React.MouseEventHandler<HTMLDivElement>,
    rotation: SpringValue<number>,
    color: SpringValue<string>,
    toggle: boolean
}
export default function MenuToggle({ translateX, borderBottom, borderRight, boxShadow, onClick, rotation, color, toggle }: MenuProps): JSX.Element {
    const [hasNotification, setHasNotification] = useState(false);
    const alertCtx = useContext(AlertContext);
    const router = useRouter();
    const [notificationStyles, notificationApi] = useSpring(() => ({
        config: { mass: 29, tension: 900, friction: 0 },
        to: { x: 3 },
        loop: true,
        reset: true,
        from: {
            x: 0
        }
    }));
    const [navButtonStyles, navButtonStylesApi] = useSpring(() => ({
        x: -100,
        opacity: 0
    }));
    function notificationAction() {
        alertCtx.update({
            action: () => new Promise<void>((resolve, reject) => {
                setTimeout(() => {
                    setHasNotification(false)
                    resolve();
                }, 1000)
            })
            ,
            title: "Do the thing?",
            actionLabel: 'Go do!',
            content: <>Do Stuff</>,
        });

    }
    useEffect(() => {
        if (router && router.pathname) {
            const match = router?.pathname.match(/^\/(.+)\/.+/gm);
         
            navButtonStylesApi.start({
                x: match ? 0 : -100,
                opacity: match ? 1 : 0
            })
        }

    }, [router?.pathname])
    return (<>
        <animated.div style={{
            translateX,
            display: navButtonStyles.opacity.to({
                range: [0, 1],
                output: [0, 1]
            }).to((x: number) => x === 0 ? 'none' : 'block'),
            ...navButtonStyles
        }} className={toggleStyles.navButtons}>
            <IconButton
                onClick={() => router.back()}
                icon="arrow_back"
                label='Navigate back'
            />

        </animated.div>
        <animated.div
            style={{ translateX }}
            className={classNames(toggleStyles.settingsWrap)}
        >
            {hasNotification && <animated.div style={{ ...notificationStyles }}>
                <IconButton
                    onClick={notificationAction}
                    icon='announcement'
                    status="error"
                    label="notification"
                />
            </animated.div>}


            <animated.div style={{
                display: translateX.to({
                    range: [0, 250],
                    output: [0, 250]
                }).to((x: number) => x === 0 ? 'none' : 'block')
            }}>
                <Settings visibility={toggle} />
            </animated.div>

        </animated.div>
        <animated.div
            style={{
                translateX,
                borderBottom,
                borderRight,
                boxShadow
            }}
            className={toggleStyles.outer}
            onClick={onClick}
        >
            <animated.div
                style={{
                    rotate: rotation,
                    color
                }}
                className={toggleStyles.inner}
            >
                <Icon icon={toggle ? "close" : "menu"} />
            </animated.div>
        </animated.div>
    </>)
}