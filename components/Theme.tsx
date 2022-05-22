import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { animated, SpringRef, SpringValue, useChain, useSpring, useSpringRef, useSprings } from "react-spring";
import { AlertProvider, AttentionProvider, ThemeContext, ThemeProvider } from "../context/context";
import { classNames } from "../helpers";
import NavColumn from "./NavColumn";
import { useRouter } from "next/router";
import MenuToggle from './MenuToggle';
import Overlay from './Overlay';
import About from "./About";
import Confirmation from "./Confirmation";
import Attention from "./Attention";
export function AppThemeWithContext({
    children
}: {
    children: React.ReactNode
}): JSX.Element {
    const [toggle, setToggle] = useState<boolean>(false);
    const router = useRouter();
    const contentDiv = useRef() as MutableRefObject<HTMLDivElement>;
    function handleClick() {
        setToggle(!toggle)
    }
    //springs for left and right panes, nav and content
    const [springs, api] = useSprings(2, i => ({
        translateX: i === 0 ? -250 : 0,
        opacity: 0,
        boxShadow: '0px 0px 0px transparent'
    }));
    //spring for menu toggle, settings, and other styles for nav
    const [styles, tagApi] = useSpring(() => ({
        translateX: 0,
        rotation: 0,
        boxShadow: '0px 0px 0px transparent',
        color: '#666',
        borderRight: '0px solid #000000',
        borderBottom: '0px solid #000000',
    }));
    const springsRef = useSpringRef()

    //spring for menu toggle, settings, and other styles for nav
    const tagRef = useSpringRef();


    useChain([springsRef, tagRef], [0, 0.2])
    useEffect(() => {
        api.start(i => {
            return {
                translateX: i === 0 ? (toggle ? 0 : -250) : (toggle ? 175 : 0),
                opacity: toggle ? .7 : 0,
                boxShadow: toggle ? '0px 10px 8px #000' : '0px 0px 0px transparent',
            }
        })
        tagApi.start({
            translateX: toggle ? 250 : 0,
            rotation: toggle ? 0 : 180,
            color: toggle ? '#c93b3b' : '#666',
            boxShadow: toggle ? '5px 1px 3px rgba(0,0,0,.3)' : '2px 0px 1px rgba(0,0,0,.2)',
            borderRight: toggle ? '1px solid #333' : '0px solid #000000',
            borderBottom: toggle ? '1px solid #333' : '0px solid #000000'
        })

    }, [toggle]);

    useEffect(() => {
        setToggle(false);
        contentDiv?.current.parentElement?.scroll({
            top: 0,
            left: 0,
            behavior: "smooth"
        })
    }, [router.asPath])
    return (<ThemeProvider>
        <AlertProvider>
            <AttentionProvider>
                <Base>
                    <Attention />
                    <Confirmation />
                    {
                        springs.map(({ translateX, opacity, boxShadow }, index) => {

                            if (index === 0) {
                                return (
                                    <React.Fragment key={`menu_${index}`}>
                                        {/* menu toggle & settings */}
                                        <MenuToggle
                                            {...styles}
                                            onClick={handleClick}
                                            toggle={toggle}
                                        />
                                        {/* overlay */}
                                        <Overlay
                                            opacity={opacity}
                                            onClick={handleClick}
                                            showContent={toggle}
                                            Child={About}
                                        />

                                        {/* nav column */}
                                        <NavColumn
                                            translate={translateX}
                                            boxShadow={boxShadow}
                                            borderRight={styles.borderRight} />
                                    </React.Fragment>
                                )
                            } else {
                                return (
                                    <ContentWrap
                                        key={"content"}
                                        ref={contentDiv}
                                        translateX={translateX}
                                    > {children} </ContentWrap>
                                )
                            }
                        })
                    }

                </Base>
            </AttentionProvider>
        </AlertProvider>
    </ThemeProvider>)
}
interface ContentWrapProps {
    translateX: SpringValue<number>,
    children: React.ReactNode,
}
const ContentWrap = React.forwardRef(({ translateX, children }: ContentWrapProps, ref) => (
    <animated.div
        ref={ref as MutableRefObject<HTMLDivElement>}
        style={{
            position: 'relative',
            top: 0,
            zIndex: 996,
            translateX,
            height: '100%'
        }}>
        {children}
    </animated.div>
))
ContentWrap.displayName = "ContentWrap";
function Base({
    children
}: {
    children: React.ReactNode
}): JSX.Element {
    const { state } = React.useContext(ThemeContext);

    return (<>
        <div className={classNames('container', state)}>
            {children}
        </div>
    </>

    )
}
