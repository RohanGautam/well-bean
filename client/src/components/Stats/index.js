import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import axios from "axios";

import "./styles.css";


class Stats extends Component {

  constructor(props) {
    super(props);

    this.state = {
      piedata: [0, 0, 0],
      data: []
    }
  }

  componentDidMount = () => {
    axios.get("/api/progress/latest")
      .then(res => {
        const result = [res.data.sad, res.data.neutral, res.data.happy]
        this.setState({
          piedata: result
        })
      })

    axios.get("/api/progress/graph")
      .then(res => {
        const results = []
        for (var i = 0; i < res.data.length; i++) {
          results.push(res.data[i]["happy"])
          console.log(res.data[i]["happy"])
        }
        this.setState({
          data: results
        })
      })
  }

  render() {
    const { data, piedata } = this.state

    this.line = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "Happiness over time",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.state.data,
        },
      ],
    }

    this.piedata = {
      labels: ["Sad", "Neutral", "Happy"],
      datasets: [
        {
          data: piedata,
          backgroundColor: ["#FF6384", "#36A2EB", "rgba(75,192,192,1)"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        },
      ],
    }

    return (
      <>
        <div className="line-graph">
          <h4>A timeline of your happiness </h4>
          <Line data={this.line}></Line>
        </div>
        <div className="line-graph">
          <h4>Your most recent check in </h4>
          <Pie data={this.piedata}></Pie>
        </div>
      </>
    );
  }
}

export default Stats;
