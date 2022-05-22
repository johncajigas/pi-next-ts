import React from 'react';
import { Col, Row } from './Row';
import styles from '@styles/Container.module.css';
import Link from 'next/link';
import { PostImage } from './ContentContainer';
interface Props {
    posts: Array<any>,
    title: String
}
export default function PostGrid({ posts, title }: Props): JSX.Element {
    return (
    
    <Row direction='vertical' justify='center'>
        <h3>{title}</h3>
        <Row style={{ flexWrap: 'wrap', marginTop: 20 }} justify="center">
        {
            posts.map((post, i) => {
                return (
                    <Col key={`${post.slug}_${i}`} columns={3} direction="vertical" classes={[styles.morePosts]}>
                        <Link href={`/posts/${post.slug}`}>
                            <a>

                                <PostImage src={post.coverImage} preview />
                                <h4>{post.title}</h4>

                            </a>
                        </Link>
                    </Col>

                )
            })
        }
    </Row>
        </Row>)
}