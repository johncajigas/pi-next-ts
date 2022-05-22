import React, { useMemo } from 'react';
import { animated, SpringValue } from 'react-spring';
import navStyles from '../styles/Nav.module.css';
import { nav } from '../paths';
import NavLink from './NavLink';
import { Row } from './Row';
import About from './About';
import {useRouter} from 'next/router';
interface NavColumProps {
    translate: SpringValue<number>,
    boxShadow: SpringValue<string>,
    borderRight: SpringValue<string>
}
export default function NavColumn({ translate, boxShadow, borderRight }: NavColumProps): JSX.Element {
    const router = useRouter();
    const menuItems = useMemo(() => nav.map((link: NavItem, index) => {
        return (
           
            <NavLink
                key={`${link.url}_${index}`}
                link={link}
                columns={12}
                active={router.asPath === link.url}

            />
        )
    }), [router.asPath])
    return (
          <animated.div
            className={navStyles.navColumn}
            style={{
                borderRight: borderRight,
                translateX: translate,
                boxShadow,
            }}
            >
            <About onClick={()=>{}} toggle={true} mobile={true}/>
            <Row direction='vertical'>
                {menuItems}
            </Row>
            </animated.div>
      
    )
}