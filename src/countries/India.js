import React, { useState, useEffect } from "react";
import { Line, defaults, Chart } from "react-chartjs-2";
import axios from "axios";
Chart.defaults.scale.ticks.display = false;
Chart.defaults.borderColor = "white";
Chart.defaults.plugins.legend.labels.boxHeight = 20;
Chart.defaults.font.size = 14;

function India() {
  const [chartData, setChartData] = useState({});
  const [stats, setStats] = useState(null);

  const options = {
    mainAspectRatio: false,
    layout: {
      padding: {
        left: 100,
        right: 100,
        top: 50,
        bottom: 20,
      },
    },
    aspectRatio: 3,
    legend: {
      display: false,
      position: "top",
      fullWidth: false,
    },
    elements: {
      point: {
        radius: 2,
        pointStyle: "circle",
      },
    },
    scales: {
      xAxes: [
        {
          ticks: {
            display: false,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            display: false,
          },
          gridLines: {
            display: false,
            drawBorder: false,
            color: "#ffffff",
          },
        },
      ],
    },
  };

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
            // console.log(dataItm);
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
              borderColor: "#33B7FF",
              backgroundColor: "#33B7FF",
              pointBackgroundColor: "#33B7FF",
              pointBorderColor: "#33B7FF",
              data: finalObj["totaldeceased"],
              fill: false,
            },
          ],
        });
      })
      .catch((err) => {
        console.log(err);
      });

    fetch("https://corona.lmao.ninja/v2/countries?yesterday=&sort=", {
      method: "get",
      headers: {},
    }).then((response) =>
      response
        .json()
        .then((data) => ({
          data: data,
          status: response.status,
        }))
        .then((res) => {
          console.log(res.status, res.data);
          console.log(res.data[93]);
          setStats(res.data[93]);
        })
    );
  };

  useEffect(() => {
    chart();
  }, []);

  return (
    <div className="App">
      <div className="is-hidden-touch">
        <Line data={chartData} options={options} />
      </div>
      <div className="container py-6 mt-1">
        <div className="columns mx-5 is-vcentered is-size-3-widescreen-only is-size-5-desktop is-size-6-tablet is-size-6-mobile">
          <div className="column">
            <div
              className="card-content has-text-centered has-background-black"
              style={{ color: "#f14668" }}
            >
              {stats && (
                <div className="has-text-weight-semibold">
                  Cases Today: {stats.todayCases}
                </div>
              )}
            </div>
          </div>
          <div className="column">
            <div
              className="card-content has-text-centered has-background-black"
              style={{ color: "#48c774" }}
            >
              {stats && (
                <div className="has-text-weight-semibold">
                  Deaths Today: {stats.todayDeaths}
                </div>
              )}
            </div>
          </div>
          <div className="column">
            <div
              className="card-content has-text-centered has-background-black"
              style={{ color: "#33B7FF" }}
            >
              {stats && (
                <div className="has-text-weight-semibold">
                  Recovered Today: {stats.todayRecovered}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default India;
