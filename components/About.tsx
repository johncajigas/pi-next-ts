import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image'
import logo from '../public/cajigasdev-logo.svg';
import styles from '@styles/About.module.css';
import Trail from './Trail';

import { classNames } from '../helpers';
export default function About({onClick,toggle,mobile}:{onClick?:React.MouseEventHandler,toggle:boolean,mobile?:boolean}):JSX.Element {
    const ref = useRef<HTMLDivElement>();
    const outerClick = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) =>{
        onClick && onClick(e);
    }
    
    return(<div className={classNames(styles.wrap, mobile && styles.mobile)}
        onClick={outerClick}
        ref={ref as React.MutableRefObject<HTMLDivElement>}
    >
        <Trail
            open={toggle}
            from={mobile ? {} :{translateX:250,opacity:0,y:-50,transform:'rotate(35deg)'}}
            to={mobile ? {} : {translateX:0,opacity:1,y:0,transform:'rotate(0deg)'}}
            
        >   
          
                    <Image
                    src={logo}
                    alt="cajigas logo"
                    width={mobile ? 65 : 175}
                    height={mobile ? 65 : 175}
                />
           
            
            <h1 className={styles.heading}>John Cajigas</h1>
            
           
            <h2 className={styles.heading}>Frontend Web Development</h2>
            
           
           <h3 className={styles.heading}>Philadelphia, PA</h3>
           <p className={styles.text}>Email: <a href="mailto:john@cajigas.dev" target="_blank" rel='noreferrer'>john@cajigas.dev</a></p>
           <p className={styles.text}>Telegram: <a href="https://t.me/johncajigas" target="_blank" rel='noreferrer'>@johncajigas</a></p>
            
        </Trail>
        
            
    </div>)
}
