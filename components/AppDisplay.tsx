import React from 'react';
import styles from '@styles/AppDisplay.module.css';
import { Row } from './Row';

export default function AppDisplay():JSX.Element {
    return(
     <div>
       
              <Row justify="center" direction="vertical">
              <h3>Quickfire Add-To-Cart</h3>
              <img className={styles.logo} width="75" src="https://cdn.johncajigas.com/quickfire.png" alt="quickfire logo" />
              <video className={styles.video} poster="https://cdn.johncajigas.com/quickfire.jpg" autoPlay loop style={{ width: '100%' }}>
                <source type="video/webm" src="https://cdn.johncajigas.com/quickfire.webm" />
                <source type="video/mp4" src="https://cdn.johncajigas.com/quickfire.mp4" />
              </video>
              </Row>
            
            </div>

    )
}