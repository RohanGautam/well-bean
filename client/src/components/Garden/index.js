import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import "./styles.css"
import image from "../../assets/garden.png"

class Garden extends Component {

    render() {
        return (
            <div className="garden">
                <img
                    src={image}
                    className="garden-icon"
                />
                <Button
                    size="lg"
                    variant="success"
                >
                    <a target="_blank" href={process.env.REACT_APP_GARDEN_URL}>
                        Check out your garden!
                        </a>
                </Button>
            </div>
        )
    }
}

export default Garden;