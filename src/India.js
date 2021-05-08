import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

function India() {
  const [chartData, setChartData] = useState({});

  const chart = () => {
    axios
      .get("https://api.covid19india.org/data.json")
      .then((res) => {
        let data = res.data.cases_time_series;
        const initialElem = res.data.cases_time_series[0];
        let finalObj = {};

        if (
          data.length !== 0 &&
          initialElem &&
          typeof initialElem === "object" &&
          Object.keys(initialElem).length !== 0
        ) {
          const keyNames = Object.keys(initialElem);
          keyNames.forEach((keyName) => {
            finalObj[keyName] = [];
          });
          data.forEach((dataItm) => {
            console.log(dataItm);
            keyNames.forEach((keyName) => {
              finalObj[keyName].push(dataItm[keyName] || null);
            });
          });

          console.log(finalObj);
        } else {
          return {};
        }

        setChartData({
          labels: finalObj["date"],
          datasets: [
            {
              label: "Confirmed",
              backgroundColor: "#f14668",
              borderColor: "#f14668",
              pointBackgroundColor: "#f14668",
              pointBorderColor: "#f14668",
              data: finalObj["totalconfirmed"],
              fill: false,
            },
            {
              label: "Recovered",
              borderColor: "#48c774",
              backgroundColor: "#48c774",
              pointBackgroundColor: "#48c774",
              pointBorderColor: "#48c774",
              data: finalObj["totalrecovered"],
              fill: false,
            },
            {
              label: "Deaths",
              borderColor: "hsl(48, 100%, 67%)",
              backgroundColor: "hsl(48, 100%, 67%)",
              pointBackgroundColor: "hsl(48, 100%, 67%)",
              pointBorderColor: "hsl(48, 100%, 67%)",
              data: finalObj["totaldeceased"],
              fill: false,
            },
          ],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    chart();
  }, []);
  return (
    <div className="App">
      <h1>Dankmemes</h1>
      <div>
        <Line
          data={chartData}
          options={{
            responsive: true,
            title: { text: "Thickness scale", display: true },
            scales: {
              yAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                    beginAtZero: true,
                  },
                  gridLines: {
                    display: false,
                  },
                },
              ],
              xAxes: [
                {
                  gridLines: {
                    display: false,
                  },
                },
              ],
            },
          }}
        />
      </div>
    </div>
  );
}

export default India;
