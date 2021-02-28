import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import axios from "axios";

import "./styles.css"
import image from "../../assets/garden.png"

class Garden extends Component {

    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
    }

    componentDidMount = () => {
        axios.get("/api/progress/count")
            .then(res => {
                console.log(res)
                this.setState({ count: res.data })
            })
    }

    render() {
        const { count } = this.state;

        return (
            <div className="garden">
                <img
                    src={image}
                    className="garden-icon"
                />
                <div className="garden-pts">
                    <h1>You have <span className="garden-green-text">{count * 10}</span> beans</h1>
                </div>
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