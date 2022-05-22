import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import styles from '@styles/Container.module.css'
import Image, { ImageProps } from 'next/image';
import { Col, Row } from './Row';
import IconButton from './IconButton';
import { classNames } from 'helpers';
import { animated, SpringValue, useSpring } from 'react-spring';

import { AttentionContext } from 'context/context';

interface Props {
    children: React.ReactNode,
    style?: CSSProperties,
    classes?: Array<string>
}
const ContentContainer = ({ children }: Props): JSX.Element => {

    return (<div className={styles.wrap} >
        {children}
    </div>)
}

export const ContentColumn = ({ children, style, classes }: Props): JSX.Element => {
    return (<Row justify="center" mobileBreak style={style ? style : undefined}  >
        <Col columns={8} direction="vertical" style={{ position: 'relative' }} classes={classes}>
            {children}
        </Col>
    </Row>)
}
interface PostImageProps {
    src: string,
    preview?: Boolean,
    alt?: string,
    title?: string,
    onClick?: React.MouseEventHandler<HTMLDivElement>
}
export const PostImage = ({ src, preview, alt, title, onClick }: PostImageProps) => {
    return (<div onClick={onClick} className={classNames(styles.postImage, preview && styles.square)}><Image
        src={src}
        layout="fill"
        className={styles.image}
        title={title}
    />
        {
            alt && <div className={styles.imageCaption}>
                {alt}
            </div>
        }
    </div>)
}

export const ContentPostImage = ({ src, alt, title }: HTMLImageElement): JSX.Element => {

    const { state, update } = useContext(AttentionContext);
    const LargeImage = ({ opacity }: { opacity: SpringValue<number> }) => <animated.div style={{ zIndex: 1001, position: 'fixed', opacity:opacity.to({range:[0,.7], output:[0,1]})}}>
      
       <div className={styles.imageOverlay}>
            <Image
                src={src}
                onClick={()=>update({visible:false,child:state?.child})} 
                layout="fill"
                objectFit="scale-down"
            />
       </div>
    </animated.div>;
    function toggleFullview() {
        console.log('clicked')
        update({ visible: !state?.visible, child: LargeImage })
    }
    return (
        <div style={{ position: 'relative',cursor:'pointer' }}>
            <Row>
                <PostImage
                    src={src}
                    alt={alt}
                    title={title}
                    onClick={toggleFullview}
                />
            </Row>
        </div>
    )
}
export const Divider = (): JSX.Element => {
    return (<hr className={styles.hr} />)
}
export const Author = (): JSX.Element => {
    return (<Row justify='center' direction='vertical'>
        <div style={{ maxWidth: 100 }}>
            <PostImage src={'https://cdn.johncajigas.com/johncajigas.png'} />
        </div>
        <Col columns={7} classes={[styles.authorContent]} direction="vertical">
            <div className={styles.authorHeader}>John Cajigas <span className={styles.authorTitle}>&nbsp;- Web Development and eCommerce Consultant</span></div>
            <p className={styles.authorDescription}>John lives in Philadelphia, PA with his <a href="https://instagram.com/jfoxjewelry" target="_blank" rel="noreferrer">wife</a> and <a href="https://instagram.com/lexi_lee_puppy" target="_blank" rel="noreferrer">dog</a>. He&apos;s currently working as a Freelance Web Development Consultant and loves working on special projects, like <a>this one</a>! or <a>this one</a>! and <a>also this</a>!</p>
        </Col>
    </Row>)
}
interface StatusTextProps {
    status:'error' | 'success' | undefined,
    children:React.ReactNode
}
export const StatusText = ({status,children}:StatusTextProps): JSX.Element =>{

    return(<div className={classNames(styles.alert,status && styles[status])}>
        {children}
    </div>)
}
interface HeaderProps {
    title: string,
}
export const Header = ({ title }: HeaderProps): JSX.Element => {
    return (<div className={styles.header}>
        <Row justify='between' style={{ marginBottom: 10 }}>
            <h2>{title}</h2>
            <IconButton
                icon={'rocket_launch'}

            />


        </Row>


    </div>)
}
export default ContentContainer;

