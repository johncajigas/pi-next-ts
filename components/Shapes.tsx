import React from 'react';
import styles from '@styles/Shapes.module.css';
import { classNames } from 'helpers';
import { animated, SpringValue, SpringValues } from 'react-spring';
import { useGesture, useHover } from '@use-gesture/react';
import { useNanoid } from 'hooks';
const matrixes = {
    purplish: `
        0 0 .3 0 0
        0 0 0 0 0
        0 0 1 0 0
        0 0 1 1 0`,
    red: `
        1 0 0 0 0
        0 0 0 0 0
        0 0 0 0 0
        1 0 1 1 0`,
    blue: `
        0 0 0 0 0
        0 .7 0 0 0
        0 0 1 0 0
        0 0 1 0 0`
}
interface CircleProps {
    width: number,
    text?:string,
    spring:any,
    onClick?:any,
    onHover?:Function,
    contentID?:number,
    fill?:string,
    dropshadow?:boolean,
    stroke?:boolean,
    color?:string

}
export const Circle = ({ width, text,spring,onClick,onHover,contentID,fill = 'rgba(0,0,0,0)',dropshadow,color = "rgba(0,0,0,0)",stroke = true}: CircleProps): JSX.Element => {
    const id = useNanoid();
    const bind = useGesture({
        onHover: (state)=>onHover && onHover(state.hovering,contentID),
        onClick:(state)=> onClick && onClick(contentID)
    })
    return (
        <SVG width={width} height={width} classes={[styles.circle]} spring={spring} bind={bind}>
            <g>
                {
                    text &&  <text
                    dominantBaseline="middle"
                    fontWeight="bold"
                    textAnchor="middle"
                    x={width / 2}
                    y={width / 2}
                    fill={color}
                    filter={dropshadow ? `url(#${id})` : undefined}
                >
                    {text}
                </text>
                }
               
                <defs>
                    {
                        dropshadow &&   <filter id={id} x="-100%" y="-100%" width={width} height={width}>
                        <feOffset result="offOut" in="SourceGraphic" dx="0" dy="0" />
                        <feColorMatrix result="matrixOut" in="offOut" type="matrix" values={matrixes.blue} />
                        <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="5" />
                        <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
                    </filter>
                    }
                  
                </defs>
                <circle cx={width/2} cy={width/2} r={(width/2)} stroke={stroke ? color : 'rgba(0,0,0,0)'} fill={fill} filter={dropshadow ? `url(#${id})` : undefined}/>
            </g>
        </SVG>
    )
}

interface DYNAMICSVGProps extends CircleProps {
    classes?:Array<string>,
    bind?:any,
    height:number,
    children:React.ReactNode
}
const SVG = ({ children, width,height,classes,spring,onClick,bind=()=>{}}: DYNAMICSVGProps): JSX.Element => {
   
    return (<div className={styles.svg}>

        <animated.svg
        className={classNames(classes && `${classes.join(' ')}`)}
        width={width}
        height={height}
        style={{...spring}}
        {...bind()}
        >
            {children}
        </animated.svg>
    </div>)
}