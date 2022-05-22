import React, { useEffect } from 'react';
import { SpringValue, useSpring, animated } from 'react-spring';
import { useWindowSize } from '../hooks';
interface GradientProps {
    width?: number,
    height?: number,
}
const Gradient = ({ width = 0, height = 0 }: GradientProps): JSX.Element => {

    const [styles, api] = useSpring(() => ({
        config: {
            tension: 2000, mass: 500, friction: 600,
        },
        y1: 1

    }));

    useEffect(() => {
        api.start({
            y1: 5
        });
    }, [])
    return (<svg
        version='1.1'
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox={`0 0 ${width} ${height}`}
    >
        <defs>
            <animated.linearGradient
                id="lg"
                x1="0"
                x2="0.5"
                y2="0"
                {...styles}
                >
                <animated.stop offset="55%" stopColor="var(--primary)" />
                <animated.stop offset="95%" stopColor="var(--accent)" />

            </animated.linearGradient>
        </defs>
        <rect width={'100%'} height={"100%"} fill="url('#lg')" />

    </svg>)
}
export default Gradient;
export function FullScreenGradient(): JSX.Element {
    const windowSize = useWindowSize();

    return (<Gradient width={windowSize?.width} height={windowSize?.height} />)
}