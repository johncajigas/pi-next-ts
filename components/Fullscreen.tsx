import React, { Children, RefObject } from 'react';
import { Row } from './Row';

interface Props {
    children: React.ReactNode,
    center?: Boolean,
    background?: React.ReactNode
}

function FullScreen({ children, center, background }: Props): JSX.Element {
    return (
        <Row

            style={{

                height: '100vh',

            }}
        >
            <div style={{
                position: 'absolute',
                zIndex: 0,
                height: '100vh',
                width: '100vw'
            }}>

                {background}
            </div>

            <Layer center={center}>
                {children}
            </Layer>

        </Row>

    )
}
interface FSProps extends Props {
    id?: string
}
const FSComponent = React.forwardRef((props: FSProps, ref) => {
    FSComponent.displayName = 'FullScreen';
    return (
        <div ref={ref as RefObject<HTMLDivElement>} id={props.id}>
            <FullScreen {...props} />
        </div>
    )
});
export default FSComponent;
const Layer = ({ children, center }: Props): JSX.Element => (<Row style={{
    height: '100%',
    zIndex: 1,
    position: 'relative'
}}
    justify={center ? 'center' : undefined}
    align={center ? 'center' : undefined}>
    {children}
</Row>)