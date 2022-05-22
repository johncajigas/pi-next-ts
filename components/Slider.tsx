import { useGesture } from '@use-gesture/react';
import {useIntersectionObserver,useWindowSize} from '../hooks';
import React, { createRef, RefObject, useEffect, useRef, useState } from 'react';
import { animated, SpringValue, useSpring, useSprings } from 'react-spring';
import { Col, Row } from './Row';
import styles from '@styles/SliderControls.module.css';
import { Circle } from './Shapes';
interface Props {
    children: React.ReactNode
}
export default function Slider({ children }: Props): JSX.Element {
    const outerRef = createRef<HTMLDivElement | null>();
    const [slideProgress, setSlideProgress] = useState<number>(0);
    const [slideTarget,setSlideTarget] = useState<number>(0);
    const [outerWidth, setOuterWidth] = useState<number>(0);
    const contentArray = React.Children.toArray(children);
    const windowSize = useWindowSize();
    const contentSwipeBind = useGesture({
        onDragCapture:()=>{
            swipeApi.stop()
        },
        onDrag: ({ dragging, movement: [mx, my] }) => {
            const slideWidth = outerRef?.current?.offsetWidth;
            if (slideWidth && mx !== 0) {
               swipeApi.start({
                    translateX: dragging ? (mx + -(slideWidth / contentArray.length) * slideProgress) : (-(slideWidth / contentArray.length) * slideProgress),
                }) 
            }
        },
        onDragEnd:()=>{
            const slideWidth = outerRef?.current?.offsetWidth;
            //whatever is visible, slide do that
            if(slideWidth && slideTarget !== slideProgress) {
                swipeApi.start({
                    translateX:(-(slideWidth / contentArray.length) * slideTarget),
                    onRest:()=>{
                        setSlideProgress(slideTarget)
                    },
                });
            }
          
        }
    })
    const slideVisible = (id: number) => {
        if(id!==slideProgress){
           
            setSlideTarget(id);
        }
    }
    const goTo = (id:number) =>{
        const slideWidth = outerRef?.current?.offsetWidth;
        if(slideWidth) swipeApi.start(({
            translateX:(-(slideWidth/contentArray.length) * id),
            onRest:()=>{
                setSlideProgress(id);
                setSlideTarget(id);
            }
        }))
    }
    const [swipeSpring, swipeApi] = useSpring(() => ({
        translateX: 0,
    }));
    useEffect(() => {
        if (outerRef.current?.offsetWidth) {
            setOuterWidth(outerRef.current.offsetWidth);
        }
    }, [outerRef?.current])
    useEffect(()=>{
      if(windowSize){
        if (outerRef.current?.offsetWidth) {
            setOuterWidth(windowSize.width);
        }
      }
    },[windowSize?.width]);
    
    return (<>
    
   
    <animated.div {...contentSwipeBind()} ref={outerRef as RefObject<HTMLDivElement>} style={{ display: 'flex', touchAction: 'none', ...swipeSpring, width: outerWidth ? undefined : '100%', overflowX: 'visible' }} >
         
        {contentArray.map((el, i) => {
            return (<Slide key={i} width={outerWidth} onVisible={() => slideVisible(i)}>
                {el}
            </Slide>)
        
        })}
         
    </animated.div> <SlideControls width={outerWidth} slides={contentArray.length} active={slideProgress} target={slideTarget} pos={swipeSpring.translateX} goTo={goTo}/> </>)
}

interface SlideProps {
    spring?: any,
    width: number | string,
    onVisible?: Function,
    children: React.ReactNode
}
const Slide = ({ spring, width, onVisible, children }: SlideProps) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const entry = useIntersectionObserver(ref, {});
    useEffect(() => {

        if (entry && entry.isIntersecting === true) {
            onVisible && onVisible();
        }
    }, [entry?.isIntersecting])
    return (
     
        <Row justify='center' direction='vertical' mobileBreak style={{ cursor: 'grab', width }}>
            <Col columns={8} direction={'vertical'} spring={spring} style={{ userSelect: 'none' }}>
                
                <animated.div style={{ width: '100%' }} ref={ref}>
                    {children}
                </animated.div>
            </Col>
        </Row>
    )
}
interface ControlProps { 
    slides:number,
    active:number,
    target:number,
    width:number,
    pos:SpringValue<number>,
    goTo:Function
}
const SlideControls = ({slides,active,width,pos,goTo}:ControlProps):JSX.Element =>{
    const [control,controlApi] = useSpring(()=>({
        config:{
            friction:90,
            tension:20,
            duration:2500
          },
        strokeWidth:2,
        opacity:1,
        position:'absolute',
        zIndex:2
    }))
    const [springs,api] = useSprings(slides, i => ({
        x:0,
        zIndex:0
    }));
    const spring = {
        ...control,
        translateX:pos.to({range:[0,width], output:[0,(-15 * slides)/slides]})
    }
    useEffect(()=>{
controlApi.start()
    },[])
    return (  <div className={styles.control}>
        <Circle
            width={15}
            spring={spring}
            color="white"
            fill="rgba(0,0,0,.4)"
            dropshadow
        />
        {
            springs.map((s,i)=>{
                return(
                    <Circle
                    key={i}
                    width={15}
                    spring={s}
                    fill="hsl(186, 85%, 55%)"
                    color="hsl(186, 85%, 55%)"
                    stroke={false}
                    onClick={()=>goTo(i)}
                />
                )
            })
        }
       
    </div>)
}