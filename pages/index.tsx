import FullScreen from '@components/Fullscreen';
import type { NextPage } from 'next'
import { useWindowSize } from 'hooks';
import React, { createRef, RefObject, useEffect, useRef, useState } from 'react';
import { animated, SpringValue, useSpring, } from 'react-spring';
import Circles from '@components/Circles';
import { Col, Row } from '@components/Row';
import Slider from '@components/Slider';
import { ContentColumn } from '@components/ContentContainer';
import ImageRow from '@components/ImageRow';
import AppDisplay from '@components/AppDisplay';
import {FullScreenGradient} from '@components/Gradient'

const Home: NextPage = () => {
  const [screen1Style, screen1Api] = useSpring(() => ({
    y: 250,
    opacity: 0
  }));
  const document = createRef<HTMLDivElement>();
  const content = [
    {
      title: 'eCommerce',
      url: '#ecommerce',
      ref: createRef()
    },
    {
      title: 'Shopify Dev',
      url: '#shopify',
      ref: createRef()
    },
    {
      title: 'App Dev',
      url: '#webapps',
      ref: createRef()
    }
  ];
  const onClick = (contentID: number) => {
    const current = content[contentID]?.ref?.current as HTMLDivElement;
    if (current) document?.current && document?.current?.parentElement?.parentElement?.scroll({ top: current.offsetTop, left: 0, behavior: 'smooth' });
  }

  useEffect(() => {
    screen1Api.start({
      y: 0,
      opacity: 1
    })
  }, [screen1Api])
  return (
    <div ref={document as RefObject<HTMLDivElement>}>
      {/* screen1 */}
      <FullScreen center={true} background={FullScreenGradient()}>
        <animated.h1 style={{ ...screen1Style }}>
          <span>cajigas.dev</span>
        </animated.h1>
        <Circles onClick={onClick} width={300} content={content} />
      </FullScreen>
      {/* screen2 */}
      <FullScreen ref={content[0].ref as RefObject<HTMLDivElement>} id="#ecommerce">
        <Slider>
          <div>
            <h2>eCommerce Consulting</h2>
            <p>
              Partner with Cajigas.dev and get your online business off the ground with ease.
            </p>
            <p>
              Whether you&apos;re just starting out, or want to bring in additional functionality to an existing site, <i>cajigas.dev</i> can bring your ideas to life without breaking your budget.
            </p>
            <p>Specializations &rarr;</p>
          </div>

          <div>
            <h3>Site Maintanence</h3>
            <p>Everyday updates to site content, UI, and functionality are important to keeping your site fresh and up-to-date.</p>
          </div>
          <div>
            <h3>Error Resolution</h3>
            <p>Something not working right on your site? Seeing <b>server or 404 errors</b>? I&apos;ll find the source of any issues and make proper fixes so your users can have a problem-free experience!</p>
          </div>
          <div>
            <h3>Data Migration</h3>
            <p>Moving customer and product data, along with site content, to a new platform can be a daunting task. I&apos;ll make it look easy!</p>
          </div>
          <div>
            <h3>Custom Builds</h3>
            <p>Custom builds are useful when ready-made ecommerce solutions don&apos;t meet all of your business requirements. Whether it&apos;s a new automation, or special feature on your site, the possibilities are endless!</p>
          </div>
        </Slider>
      </FullScreen>
      <FullScreen center ref={content[1].ref as RefObject<HTMLDivElement>} id="#shopify">

        <ContentColumn>
          <h2>Shopify Development</h2>
          <p>With over 3 years from Shopify and Shopify Plus development experience, we&apos;ll get your store up and running to your liking. </p>
          <p>Already have a store and need some extra functionality or basic store maintanence? Let&apos;s work together and get stuff done!</p>
          <p>Here are some of my happy clients:</p>

          <ImageRow>
            <a target={"_blank"} rel="noreferrer" href="https://www.creativeteaching.com">  <img src="https://cdn.johncajigas.com/ctp.webp" alt="creative teaching press" title="Creative Teaching Press" width="150" /></a>
            <a target={"_blank"} rel="noreferrer" href="https://pacificlearning.com"><img src="https://cdn.johncajigas.com/pl.webp" alt="pacific learning" title="Pacific Learning" width="150" /></a>
            <a target={"_blank"} rel="noreferrer" href="https://jfoxjewelry.com"><img src="https://cdn.johncajigas.com/jfox.webp" alt="jfox jewelry" title="JFOX Jewelry" width="150" /></a>
            <a href="https://hanahanabeauty.com" target={"_blank"} rel="noreferrer"><img src="https://cdn.johncajigas.com/hana.png" alt="hanahana beauty" title="Hanahana Beauty" width="150" /></a>
          </ImageRow>


        </ContentColumn>


      </FullScreen>
      <FullScreen ref={content[2].ref as RefObject<HTMLDivElement>} id="#webapps">
       
       
        <Slider>
          <AppDisplay/>
          <AppDisplay/>
        </Slider>


          </FullScreen>
    </div>
  )
}


export default Home
