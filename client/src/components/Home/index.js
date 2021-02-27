import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faBook,
    faChartBar,
    faComment,
    faSeedling
} from '@fortawesome/free-solid-svg-icons'

import Chat from "../Chat"

import "./styles.css"

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tab: 0,
        }
    }
    render() {
        const { tab } = this.state;
        return (
            <div className="body">
                {this.renderPage(tab)}
                <div
                    className="tabs"
                >
                    {this.renderTab("Check-in",
                        <FontAwesomeIcon icon={faBook} />,
                        () => { this.setState({ tab: 0 }) },
                        tab === 0
                    )}
                    {this.renderTab("Stats",
                        <FontAwesomeIcon icon={faChartBar} />,
                        () => { this.setState({ tab: 1 }) },
                        tab === 1
                    )}
                    {this.renderTab("Chat",
                        <FontAwesomeIcon icon={faComment} />,
                        () => { this.setState({ tab: 2 }) },
                        tab === 2
                    )}
                    {this.renderTab("Garden",
                        <FontAwesomeIcon icon={faSeedling} />,
                        () => { this.setState({ tab: 3 }) },
                        tab === 3
                    )}
                </div>
            </div>
        )
    }

    renderPage = (tab) => {
        switch (tab) {
            case 0:
                return <h1>{tab}</h1>
            case 1:
                return <h1>{tab}</h1>
            case 2:
                return <Chat />
            case 3:
                return <h1>{tab}</h1>
            default:
                return <h1>Error</h1>
        }
    }

    renderTab = (
        title,
        icon,
        handleClick,
        active) => {
        return (
            <div
                className={
                    active ?
                        "tab active-tab" :
                        "tab"
                }
                onClick={handleClick}
            >
                {icon}
                {title}
            </div>
        );
    }
}

export default Home;