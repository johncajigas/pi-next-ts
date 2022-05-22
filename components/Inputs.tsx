import React, { ChangeEvent, ChangeEventHandler, DetailedHTMLProps, InputHTMLAttributes, MutableRefObject, RefObject, useEffect, useRef, useState } from "react";
import styles from '@styles/Inputs.module.css';
import { classNames, debounce } from '../helpers'
import { Row, Col } from '@components/Row'
import { Circle } from "./Shapes";
import { useIsMounted } from "hooks";
interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    returnOnChange?: Function,
    loading?:boolean,
    setValue?:any,
}
export function Input({ returnOnChange, className, type = "text", disabled, prefix,setValue,loading, ...props }: Props): JSX.Element {
    const isMounted = useIsMounted();
    const [focus, setFocus] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const outerRef = useRef<HTMLDivElement | null>(null);
    const handleChange = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
        returnOnChange && returnOnChange(event.target.value,reset);
    }, 500);
    const reset = () =>{
      if(isMounted.current && inputRef.current) inputRef.current.value = '';
    }
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target !== inputRef.current) {
            inputRef.current?.focus()
        }
    }
    useEffect(()=>{
        if(setValue !== undefined) {
           if(inputRef.current) inputRef.current.value = setValue;
        }
    },[setValue])
    return (
        <div ref={outerRef} className={classNames(styles.wrap, focus && styles.focus, (disabled || loading) && styles.disabled)} onClick={handleClick}>
            {prefix !== undefined ?
                <span className={classNames(styles.prefix, disabled && styles.disabled)}>
                   {prefix}
                </span>
                : null
            }

            <input
                ref={inputRef}
                onChange={handleChange}
                className={classNames(className, styles.input)}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                disabled={disabled}
                {...props}
            />
            { 
                loading &&  <div className={styles.loading}>
                 loading...
                       
                </div>
            }
           
        </div>

    )
}
