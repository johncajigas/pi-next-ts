import React from 'react';
import { animated } from 'react-spring';
import { classNames } from '../helpers';
import layout from '../styles/Layout.module.css';

interface Props {
    children: React.ReactNode,
    justify?: Justification,
    align?: Alignment,
    style?: React.CSSProperties,
    classes?:Array<string>,
    direction?:Direction,
    mobileBreak?:boolean,
    spring?:any,
    bind?:any
}
interface ColProps extends Props {
    columns?: ColumnCount,
}
export function Row({
    children,
    justify,
    align,
    style,
    classes,
    direction,
    mobileBreak,
    spring,
    bind=()=>{}
}: Props): JSX.Element {
    return (
        <animated.div  {...bind()} className={classNames(
            layout.row, 
            mobileBreak && layout['mobileBreak'],
            direction && layout[direction],
            justify && layout[justify], 
            align && layout[align],
            classes && `${classes.join(' ')}`
            )} style={{
                ...style,
                ...spring
            }}>
            {children}
        </animated.div>
    )
}
export function Col({
    children,
    columns,
    align,
    justify,
    direction,
    style,
    classes,
    spring,
    bind=()=>{}
}: ColProps): JSX.Element {
    return (
        <animated.div className={classNames(
            layout.col,
            columns ? layout[`col${columns}`] : layout.col1, 
            justify && layout[justify], 
            align && layout[align],
            direction && layout[direction],
            classes && `${classes.join(' ')}`
            )} style={{...style,...spring}}>
            {children}
        </animated.div>
    )
}