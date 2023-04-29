import React, { useEffect, useState } from 'react'
import HisotryCard from '../components/HistoryCard'
import ProgressBar from 'react-bootstrap/ProgressBar';
import Dropdown from 'react-bootstrap/Dropdown';



//xport default ScreenreaderLabelExample;

export default function History() {
    const now = 60;
    return (
        <><h1>Calendar View</h1>

            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Month
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Jan 2023</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Feb 2023</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Mar 2023</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Apr 2023</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <div>
            <HisotryCard _id={'111'} name={'water plants'} date={'2023-02-21'} description={'water three plants'} image={'/'}></HisotryCard>
            <HisotryCard _id={'112'} name={'take supplement'} date={'2023-02-24'} description={'zinc, meg, fish oil'} image={'/'}></HisotryCard>
            <HisotryCard _id={'113'} name={'renew credit card'} date={'2023-03-24'} description={'activate the card'} image={'/'}></HisotryCard>
            <HisotryCard _id={'114'} name={'feed my cat'} date={'2023-03-22'} description={'10 oz'} image={'/'}></HisotryCard>
            </div>
            <text>Progress Bar</text>
            <ProgressBar now={now} label={`${now}%`} visuallyHidden /></>

    )

}