import React from 'react';
import { Row } from './Row';
import styles from '@styles/Comments.module.css';
export default function Comments():JSX.Element {
    return (<>
        <h2>Comments</h2>
        <Row classes={[styles.wrap]} justify="center" align='center'>

            <div>Comments Disabled</div>
        </Row>
    </>)
}