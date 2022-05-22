import React, { useContext, useEffect, useMemo, useState } from 'react';
import Overlay from './Overlay';
import { useSpring } from 'react-spring';
import Alert from './Alert';
import { AlertContext } from 'context/context';
export default function Confirmation():JSX.Element {
    const [toggle,setToggle] = useState<boolean>(false);
    const {state,update} = useContext(AlertContext);
    const [overlayStyles,overlayApi] = useSpring(()=>({
        opacity:0,
        onRest:()=>toggle === true ? update(undefined) : null
    }));
    function handleClose(){
        setToggle(false)
    }
    useEffect(()=>{
        if(state){
            setToggle(true);
        } else {
            setToggle(false);
        }
    },[state])
    useEffect(()=>{
        overlayApi.start({
            opacity:toggle ? .7 : 0
        }) 
    },[toggle])
    return(
            <Overlay
                opacity={overlayStyles.opacity}
                onClick={handleClose}
                showContent={toggle}
                Child={Alert}
                onTop={true}
            />
    )
}
