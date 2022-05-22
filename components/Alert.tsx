import React, { useContext, useState } from 'react';
import styles from '@styles/Alert.module.css';
import { Row } from './Row';
import Trail from './Trail';
import { AlertContext } from 'context/context';

export default function Alert({title,action,actionLabel,content,status,onCancel,toggle, onComplete}:AlertProps):JSX.Element {
    const {state,update} = useContext(AlertContext);
    const [loading, setLoading] = useState<boolean>(false);
    async function handleSubmit(){
        setLoading(true);
        state?.action && await state.action();
        setLoading(false)
        onComplete()
       
   }
    return (
        <div style={{zIndex:'10000',position:'fixed'}}>
  <Trail open={toggle} to={{y:0,opacity:1}} from={{y:-100,opacity:0}}>
            <div className={styles.alert}>
                <div className={styles.header}>
                    {state?.title}
                </div>
                <div className={styles.content}>
                {state?.content}
                </div>
                <div className={styles.actions}>
                    <Row justify='between' align='center'>
                    <button onClick={onCancel}>Cancel</button>
                    {loading ? <>...loading</>
                    : <button onClick={handleSubmit}>
                        
                        {state?.actionLabel}</button> }
                    </Row>
                </div>
            </div>
        </Trail>
        </div>
      
       

    )
}