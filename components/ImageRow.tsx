import React, { useRef } from 'react';
import Trail from '@components/Trail';
import layoutStyles from '@styles/Layout.module.css';
import styles from '@styles/ImageRow.module.css'
import {useIntersectionObserver} from 'hooks';
interface Props {
    children:React.ReactNode
}
export default function ImageRow({children}:Props):JSX.Element{
    const ref = useRef<HTMLDivElement | null>(null);
    const entry = useIntersectionObserver(ref,{});
    const isVisible = !!entry?.isIntersecting;
    const childArray = React.Children.toArray(children);
    return(
        <div ref={ref}>
<Trail classes={[layoutStyles.row,layoutStyles.overflow,layoutStyles.center,layoutStyles.left,styles.wrap]} from={{opacity:0,y:150,x:50}} to={{opacity:1,y:0,x:0}} open={isVisible}>
    {
        childArray.map((e,i)=>{
            return (
                <div className={styles.item} key={i}>
                    {e}
                </div>
            )
        })
    }
      </Trail>
        
        </div>

    )
}