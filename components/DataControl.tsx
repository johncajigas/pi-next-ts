import React, { useState } from 'react';
import { Col, Row } from './Row';
interface Props {
    type: string,
    pluralType?:string,
    total: number,
    onSearch: Function,
    searchFilters?: Array<string>,
    searching:boolean
}
export default function DataControl({ }: Props): JSX.Element {
    const [searchView, setSearchView] = useState<boolean>(false);
    return (
    
        <Row justify='between'>
            <Col>
                hi
            </Col>
            <Col>
            there</Col>
        </Row>
    )
}