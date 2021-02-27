import React, { Component } from 'react';
import { Transition } from 'react-transition-group';
import { Alert, Button } from 'react-bootstrap';
import VideoRecorder from 'react-video-recorder'
import axios from "axios";

import "./styles.css"
import image from "../../assets/plant.png"

const duration = 300;

const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
}

const transitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
};
class Journal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            video: null,
            success: false,
            time: 0,
        }
    }

    componentDidMount() {
        axios.get("/api/progress/latest")
            .then(res => {
                var time = 0;
                if (res.data) {
                    const uploadDate = new Date(res.data.date);
                    const currDate = new Date();
                    time = Math.round(Math.abs(currDate - uploadDate) / 36e5);
                }
                this.setState({ time })
            })
    }

    render() {
        const { success, time, video } = this.state;

        return (
            <div className="journal">
                <div className="journal-reminder">
                    <h5><span>{time} hours</span> since your last check-in</h5>
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
                {
                    this.renderSuggestion(success)
                }
            </div>
        )
    }

    renderSuggestion = (inProp) => {
        if (inProp === true) {
            setInterval(() => {
                this.setState({ success: false })
            }, 2000);
        }
        if (inProp === true) {
            return (
                <Transition in={inProp} timeout={500}>
                    {state => (
                        <div
                            className="journal-alert"
                            style={{
                                ...defaultStyle,
                                ...transitionStyles[state]
                            }}>
                            <Alert variant="success">
                                Great work!
                        </Alert>
                        </div>
                    )}
                </Transition>
            );
        } else {
            return "";
        }
    }

    submitVideo = () => {
        const { video } = this.state;

        const fd = new FormData();
        fd.append("video", video, "video.webm");
        axios.post("/api/progress", fd)
            .then(res => {
                this.setState({ success: true })
            })
    }
}

export default Journal;