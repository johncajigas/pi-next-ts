import { AttentionContext } from 'context/context';
import React, { useContext, useEffect, useState } from 'react';
import { useSpring } from 'react-spring';
import Overlay from './Overlay';

export default function Attention():JSX.Element {
   
    const {state,update} = useContext(AttentionContext);
    const [spring,api] = useSpring(()=>({
        opacity:0,
        onRest:()=>state?.visible === true ? update({visible:false,child:state?.child}) : null
    }))
    function handleClose(){
        update({visible:false,child:state?.child})
    }
  
    useEffect(()=>{
        api.start({
            opacity:state?.visible ? .7 : 0
        })
    },[state?.visible])
    const C = state?.child ? ()=>state.child({opacity:spring.opacity}) : ()=>null;  
    return (
        <Overlay
            opacity={spring.opacity}
            onClick={handleClose}
            showContent={state?.visible ?? false}
            Child={C}
            onTop={true}
        />
    )
}