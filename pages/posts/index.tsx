import React from 'react';
import { getAllPosts } from 'lib/posts';
import { Divider, PostImage } from '@components/ContentContainer';
import { dateFormatLong } from 'helpers';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { Col, Row } from '@components/Row';
import styles from '@styles/Container.module.css';
import PostGrid from '@components/PostGrid';
interface Props {
    posts:Array<any>
}
const Posts = ({posts}:Props):JSX.Element =>{
    const heroPost = posts[0];
    const  morePosts = posts.slice(1);
    return(<>
        <h1>Posts</h1>
        <Row align='center' mobileBreak direction='vertical'>
            <Col columns={8} style={{display:'block'}} classes={[styles.hero]}> 
                <Row justify='center' mobileBreak>
                    <Col columns={6}><Link href={`/posts/${heroPost.slug}`}><a><PostImage src={heroPost.coverImage}/></a></Link></Col>
                    <Col columns={6} direction="vertical"> 
                    <h2>{heroPost.title}</h2>
                    <span className={styles.meta}>{dateFormatLong(heroPost.date)}</span>
                    <p>{heroPost.excerpt}  <span><Link href={`/posts/${heroPost.slug}`}><a>Read more</a></Link></span></p></Col>
                </Row>
            </Col>
            <Col columns={8} style={{display:'block'}}>
                <Divider/>
            <PostGrid posts={morePosts} title="More Posts"/>
            </Col>
            
        </Row>
    </>)
}
export const getStaticProps: GetStaticProps = async () => {
    const posts =  await getAllPosts([
        'slug',
        'title',
        'excerpt',
        'date',
        'coverImage',
        'content',
       
    ])
    return {
        props:{posts}
    }
}
export default Posts;