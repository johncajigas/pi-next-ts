import { classNames } from 'helpers';
import React from 'react';
import { animated, useTrail } from 'react-spring';

const Trail: React.FC<{ open: boolean, from: object, to: object,classes?: Array<string>}> = ({ open, from, to, children, classes }) => {
   
    const handleClick = (e: React.MouseEvent<HTMLDivElement,MouseEvent>) =>{
        e.stopPropagation();
    }
    const items = React.Children.toArray(children);
    let toStyles = to;
    if (!open) toStyles = from;
    const trail = useTrail(items.length, {
        config: { mass: 5, tension: 2000, friction: 200 },
        ...toStyles,
        from,
    })
    return (
        <div className={`${classNames(classes && classes.join(' '))}`}>
            {trail.map(({ ...style }, index) => (
                <animated.div key={index} style={style} >
                    <span onClick={handleClick}>{items[index]}</span>
                </animated.div>
            ))}
        </div>
    )
}

export default Trail;