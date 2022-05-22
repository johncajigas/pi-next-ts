
import Link from "next/link";
import React from "react";
import { Col } from './Row';

import navStyles from '../styles/Nav.module.css';
import { classNames } from "helpers";
interface Props {
    link: NavItem,
    columns: ColumnCount,
    active:Boolean
}
const NavLink = (props: Props) => {
  
    return (
        <Col
            key={`${props.link.url}`}
            columns={props.columns}
            justify='center'
        >
            <Link href={props.link.url} passHref>
                <a className={classNames(navStyles.navItem,props.active && navStyles.active)}>
                    {props.link.name}
                </a>
            </Link>
        </Col>

    )
}
export default NavLink;