import { NextPage } from "next";
import React, { useRef, useState } from "react";
import ContentContainer, { PostImage, Header } from '@components/ContentContainer'
import { Col, Row } from "@components/Row";
const Projects: NextPage = () => {

    return (
        <>
            <h1>Projects</h1>
            <Row mobileBreak justify="center">
                <Col columns={7}>
                    <ContentContainer>
                        <Header
                            title="Tasker Invoicing 2.0"
                        />
                        <PostImage
                            src={'/billit.png'}
                        />
                        <p>An upgraded <em>Tasker Invoicing</em>, built from the ground up for Android, iOS, and web! </p>

                        <ul>
                            <li>Create lists, attach clients, generate invoices and send them out to clients. EZ!</li>
                            <li>Generate invoice PDFs that can either be paid offline, or accept credit card payment directly through the Tasker Invoicing service (direct payment coming soon!)</li>
                            <li>Client dashboard that your clients can log into, pay invoices, view and collaborate on current lists, and view their past invoices</li>
                            <li>Integrate with your stripe for tracked and managed invoices that can be paid online</li>
                            <li>Tasks can have their own due dates, notes, and can be arranged within the list</li>
                            <li>Set custom hourly rates or invoice footers for lists, or simply use client defaults</li>
                            <li>Flexible pricing:
                                <ul>
                                    <li>Free: Unlimited invoices (offline/manual payments) and lists, one client</li>
                                    <li>$10/mo: Unlimited invoices (credit card or stripe/paypal connected) and lists, unlimited clients</li>
                                </ul>
                            </li>

                        </ul>
                    </ContentContainer>
                </Col>
            </Row>
            <Row mobileBreak justify="center">
                <Col columns={7}>
                    <ContentContainer>
                        <Header
                            title="Tasker Invoicing 1.0"
                        />
                        <PostImage
                            src={'/billit.png'}
                        />
                        <p>The first iteration of <em>Tasker Invoicing</em> is a web-based time tracker and invoicing tool for freelancers on a budget. Built for a single user with multiple clients, running on their own server.</p>

                        <ul>
                            <li>Easily create lists that contain individual tasks that each have their own accumilated time. Think of a list as a single project, or all work for a particular month.</li>
                            <li>Create clients that have their own hourly rate and attach them to lists.</li>
                            <li>Generate <em>Stripe</em> invoices that are automatically sent to the client and tracked for payment status. Clients can pay with credit cards, or through other offline methods. Payment reminder emails are handled through stripe. </li>
                            <li>Clients can log in to their account, view previous invoices and all of it&apos;s individual tasks.</li>

                        </ul>
                    </ContentContainer>
                </Col>

            </Row>


        </>
    )
}
export default Projects;

