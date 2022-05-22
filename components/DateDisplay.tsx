import React from 'react';
import {format} from 'date-fns';
import styles from '@styles/DateDisplay.module.css';
interface Props {
    date:Date
}
export default function DateDisplay({date}:Props):JSX.Element{
    const dateObj = new Date(date);
    const month = format(dateObj,'MMMM');
    const day = format(dateObj,'dd');
    const year = format(dateObj,'Y');
    return (<div className={styles.outer}>
       <div className={styles.month}>{month}</div> 
       <div className={styles.day}>{day}</div>
       <div className={styles.year}>{year}</div>
    </div>)
}