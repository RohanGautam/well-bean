import React, { Component } from 'react'
import VideoRecorder from 'react-video-recorder'

import "./styles.css"
import image from "../../assets/plant.png"

class Journal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            record: false
        }
    }

    render() {
        const { record } = this.state;

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
                            // Do something with the video...
                            console.log('videoBlob', videoBlob)
                        }}
                    />
                </div>
            </div>
        )
    }
}

export default Journal;