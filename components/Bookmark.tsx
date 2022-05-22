import React from "react";
import styles from '@styles/Bookmark.module.css';
import { Col, Row } from "./Row";
import { PostImage } from "./ContentContainer";
import Gradient from "./Gradient";
export default function BookmarkCard({ url, title, id, description, image }: Bookmark): JSX.Element {
    return (<Col columns={3} justify="center" align="top" classes={[styles.outer]}>

        <a href={url} target="_blank" rel="noreferrer" className={styles.inner}>
            <div className={styles.gradient}>
                <Gradient width={100} height={100} />
            </div>
            <Row direction="vertical" style={{backgroundColor:'white'}}>

                {image && <PostImage
                    src={`https://cdn.johncajigas.com/${image}`}

                />}
                <div className={styles.titleWrap}>
                    <span className={styles.title}>{title}</span>

                </div>

            </Row>

        </a>

    </Col>)
}