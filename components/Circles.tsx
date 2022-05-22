import { random } from 'helpers';
import {useIntersectionObserver} from 'hooks';
import React, { useEffect, useRef } from 'react';
import { useSprings } from 'react-spring';
import layoutStyles from '@styles/Layout.module.css';
import shapeStyles from '@styles/Shapes.module.css';
import Trail from '@components/Trail'
import { Circle } from './Shapes';
interface Props {
    content:Array<{url?:string,title?:string}>,
    width:number,
    onClick?:Function
}
export default function Circles ({content,width,onClick}:Props): JSX.Element  {
    const ref = useRef<HTMLDivElement | null>(null);
    const entry = useIntersectionObserver(ref, { });
    const isVisible = !!entry?.isIntersecting;
    const randos = random(0,250,content.length) as Array<number>;
    const [spring, api] = useSprings(content.length,i => ({
      config:{
        friction:90,
        tension:20,
        duration:2500
      },
      strokeDashoffset:2 * Math.PI * width,
      strokeDasharray:2 * Math.PI * width,
      strokeWidth:0,
      delay:randos[i],
      y:0,
      opacity:1,
      reset:true
    }))
    const onHover = (isHover:boolean,contentID:number) =>{
        
        api.start(i => ({
            config:{
                tension:20,
                mass:40,
                duration:250
            },
           strokeWidth: i === contentID && isHover ? 15 : 4
        }))
    }
    const handleClick = (contentID:number) => {
       
        api.start(i =>({
            config:{
                tension:20,
                mass:40,
                duration:250
            },
            y: i === contentID ? -250 : -150,
            opacity:i === contentID ? 1 : 0,
            onResolve:()=>{
                i === contentID && onClick && onClick(contentID)
            }
        }))
    }
    useEffect(() => {
        api.start(i =>({
          config:{
            friction:45,
            tension:20,
            duration:isVisible ? 2500 : 10
          },
          strokeWidth: isVisible ? 4 : 0,
          strokeDashoffset:isVisible ? 0 : 2 * Math.PI * width,
          delay:randos[i],
          opacity:1,
          y:0
        }));
    }, [isVisible])
  
    return (
      <div ref={ref} style={{display:'flex',flexDirection:'column'}}>
        <Trail to={{opacity:1,y:0}} from={{opacity:0,y:50}} open={isVisible} classes={[layoutStyles.row,layoutStyles.mobileBreak]}>
          {
            spring.map((s,i)=>{
              return (
                <div key={`circle_${i}`} className={shapeStyles.outer}>
                  <Circle dropshadow color="white" width={150} spring={s} onHover={onHover} contentID={i} onClick={handleClick} text={content[i].title}/>
                </div>
              )
            })
          }
        </Trail>
      </div>
     
    )
  
  }