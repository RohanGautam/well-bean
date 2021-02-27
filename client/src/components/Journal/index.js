import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import VideoRecorder from 'react-video-recorder'
import axios from "axios";

import "./styles.css"
import image from "../../assets/plant.png"

class Journal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            video: null
        }
    }

    render() {
        const { video } = this.state;

        return (
            <div className="journal">
                <div className="journal-reminder">
                    <h5><span>5 hours</span> since your last check-in</h5>
                    <p>Remember to check-in often to <br /> track your progress!</p>
                    <img
                        src={image}
                        className="journal-reminder-img"
                    />
                </div>
                <div className="journal-recorder">
                    <VideoRecorder
                        onRecordingComplete={videoBlob => {
                            this.setState({ video: videoBlob })
                        }}
                    />
                </div>
                {video === null ? "" :
                    <Button
                        className="journal-btn"
                        size="lg"
                        variant="success"
                        onClick={() => {
                            this.submitVideo();
                        }}
                    >
                        Submit
                    </Button>
                }
            </div>
        )
    }

    submitVideo = () => {
        const { video } = this.state;

        const fd = new FormData();
        fd.append("video", video, "video.webm");
        axios.post("/api/progress", fd)
            .then(res => console.log(res))
    }
}

export default Journal;