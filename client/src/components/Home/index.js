import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faBook,
    faChartBar,
    faSeedling,
    faImages
} from '@fortawesome/free-solid-svg-icons'

import Garden from "../Garden"
import Gallery from "../Gallery"
import Journal from "../Journal"
import Stats from "../Stats"

import "./styles.css"

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tab: 0,
        }
    }

    componentDidMount() {
        (function (d, m) {
            var kommunicateSettings =
                { "appId": "2b2f5a27ef9ed5fdc037638ae14857d6c", "popupWidget": true, "automaticChatOpenOnNavigation": true };
            var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
            s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
            var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
            window.kommunicate = m; m._globals = kommunicateSettings;
        })(document, window.kommunicate || {});
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
                    {this.renderTab("Gallery",
                        <FontAwesomeIcon icon={faImages} />,
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
                return <Journal />
            case 1:
                return <Stats />
            case 2:
                return <Gallery />
            case 3:
                return <Garden />
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