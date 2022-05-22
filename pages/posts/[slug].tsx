
import ContentContainer, { Author, ContentColumn, ContentPostImage, Divider, PostImage } from '@components/ContentContainer';

import { getAllPosts, getPostsBySlug } from 'lib/posts';

import { MDXRemote } from 'next-mdx-remote';
import React from 'react';
import containerStyles from '@styles/Container.module.css';
import DateDisplay from '@components/DateDisplay';
import { Row } from '@components/Row';
import Comments from '@components/Comments';
import PostGrid from '@components/PostGrid';

const components = {
    Image:ContentPostImage,
}
const Post = ({ post, related }: Params['params']): JSX.Element => {

    return (<>
        <div style={{ position: 'relative' }}>
            <div className={containerStyles.contentHeader}>
                <h1>{post.title}</h1>
            </div>
            <PostImage
                src={post.coverImage}
            />
        </div>

        <ContentColumn classes={[containerStyles.content]} >
            <Row justify='center'>
                <DateDisplay date={post.date} />
            </Row>
            <ContentContainer>
                <MDXRemote 
                    compiledSource={post.compiledSource} components={components} 
                    
                />
                <Divider />
                <Author />
            </ContentContainer>
        </ContentColumn>


        <ContentColumn>
            <PostGrid posts={related} title="Related Posts" />
            <Divider />
        </ContentColumn>

        <ContentColumn>
            <Comments />
        </ContentColumn>

    </>)
}
type Params = {
    params: {
        slug: string,
        post: any,
        related: any
    }

}
export const getStaticProps = async ({ params }: Params) => {

    const post = await getPostsBySlug(params.slug, [
        'slug',
        'title',
        'date',
        'content',
        'coverImage',
    ]);
    let related = [];
    related = await getAllPosts([
        'slug',
        'title',
        'date',
        'coverImage'
    ]);

    return {
        props: {
            post,
            related: related.filter((e, i) => i < 3)
        }
    }
}
export async function getStaticPaths() {
    const posts = await getAllPosts(['slug'])
    return {
        paths: posts.map((post: any) => {
            return {
                params: {
                    slug: post.slug
                }
            }
        }),
        fallback: false
    }
}
export default Post;