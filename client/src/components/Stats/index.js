import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";

import "./styles.css";

const data = {
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
      data: [65, 59, 80, 81, 56, 55, 40],
    },
  ],
};

const piedata = {
  labels: ["Sad", "Neutral", "Happy"],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: ["#FF6384", "#36A2EB", "rgba(75,192,192,1)"],
      hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
    },
  ],
};
class Stats extends Component {
  render() {
    return (
      <>
        <div className="line-graph">
          <h4>A timeline of your happiness </h4>
          <Line data={data}></Line>
        </div>
        <div className="line-graph">
          <h4>Your most recent check in </h4>
          <Pie data={piedata}></Pie>
        </div>
      </>
    );
  }
}

export default Stats;
