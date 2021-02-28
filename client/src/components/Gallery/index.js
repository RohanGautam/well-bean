import React, { Component } from 'react';
import { Badge, Modal } from 'react-bootstrap';
import axios from "axios";

import "./styles.css"

class History extends Component {

    constructor(props) {
        super(props);
        this.state = {
            videos: [],
            activeVideo: null,
            open: false,
        }
    }

    componentDidMount() {
        axios.get("/api/progress")
            .then(res => {
                if (res.data) {
                    const videos = res.data.map(checkin => {
                        var mood = "Neutral";
                        if (checkin.happy > checkin.sad) {
                            if (checkin.happy > checkin.neutral) {
                                mood = "Happy"
                            } else {
                                mood = "Neutral"
                            }
                        } else {
                            if (checkin.sad > checkin.neutral) {
                                mood = "Sad"
                            } else {
                                mood = "Neutral"
                            }
                        }

                        return {
                            "date": new Date(checkin.date),
                            "path": checkin.video_path,
                            "mood": mood
                        }
                    })
                    this.setState({ videos })
                }
            })
    }

    render() {
        const { videos, open, activeVideo } = this.state;
        const moodMap = {
            "Happy": "success",
            "Neutral": "secondary",
            "Sad": "primary"
        }
        return (
            <div className="gallery">
                {videos.map(video => {
                    const videoLink = `/${video.path}`;
                    return <div
                        className="gallery-item"
                        onClick={() => {
                            this.setState({
                                activeVideo: videoLink,
                                open: true
                            })
                        }}
                    >
                        {this.dateToYMD(video.date)}

                        <h4>
                            <Badge variant={moodMap[video.mood]}>{video.mood}</Badge>
                        </h4>
                    </div>
                })}
                <Modal
                    show={open}
                    onHide={this.handleClose}
                    centered
                >
                    <Modal.Body
                        className="gallery-modal"
                    >
                        <video
                            controls
                            className="gallery-video"
                        >
                            <source
                                src={activeVideo}
                                type="video/mp4"
                            />
                        </video>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }

    handleClose = () => {
        this.setState({
            open: false
        })
    }

    dateToYMD = (date) => {
        var strArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var d = date.getDate();
        var m = strArray[date.getMonth()];
        var y = date.getFullYear();
        return '' + (d <= 9 ? '0' + d : d) + '-' + m + '-' + y;
    }
}

export default History;