import React, { memo, useState, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import "bulma/css/bulma.css";
import Cards from "./Cards";
import { scaleLinear } from "d3-scale";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const confirmedColorScale = scaleLinear()
  .domain([0, 500000])
  .range(["#ffedea", "#ff5233"]);

const recoveredColorScale = scaleLinear()
  .domain([0, 10000000])
  .range(["#e5f5e0", "#74c476"]);

const rounded = (num) => {
  if (num > 1000000000) {
    return Math.round(num / 100000000) / 10 + "Bn";
  } else if (num > 1000000) {
    return Math.round(num / 100000) / 10 + "M";
  } else if (num > 1000) {
    return Math.round(num / 100) / 10 + "K";
  } else {
    return num;
  }
};

const MapChart = ({ setTooltipContent }) => {
  const [data, setData] = useState([]);
  const [confirmed, setConfirmed] = useState(true);
  const [recovered, setRecovered] = useState(true);
  // const [minConfirmed, setMinConfirmed] = useState([]);
  // const [maxConfirmed, setMaxConfirmed] = useState([]);
  // const [minRecovered, setMinRecovered] = useState([]);
  // const [maxRecovered, setMaxRecovered] = useState([]);

  useEffect(() => {
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
          console.log(res.data);
          setData(res.data);
          // let finalObj = {};
          // const initialElem = res.data[0];
          // const keyNames = Object.keys(initialElem);
          // keyNames.forEach((keyName) => {
          //   finalObj[keyName] = [];
          // });
          // res.data.forEach((dataItm) => {
          //   keyNames.forEach((keyName) => {
          //     finalObj[keyName].push(dataItm[keyName] || null);
          //   });
          // });
          // let cases = finalObj.cases;
          // let recovered = finalObj.recovered;
          // setMinConfirmed(Math.min(...cases));
          // setMaxConfirmed(Math.max(...cases));
          // setMinRecovered(Math.min(...recovered));
          // setMaxRecovered(Math.max(...recovered));
        })
    );
  }, [ComposableMap]);

  // const confirmedColorScale = scaleLinear()
  //   .domain([minConfirmed, maxConfirmed])
  //   .range(["#ffedea", "#ff5233"]);

  // const recoveredColorScale = scaleLinear()
  //   .domain([minRecovered, maxRecovered])
  //   .range(["#f7fcf5", "#00441b"]);

  const handleRecovered = () => {
    setConfirmed(
      data.length > 0 && (
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const d = data.find(
                (s) => s.countryInfo.iso3 === geo.properties.ISO_A3
              );
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={d ? recoveredColorScale(d["recovered"]) : "#F5F4F6"}
                  onMouseEnter={() => {
                    const countryData = data.find((s) => {
                      const { NAME } = geo.properties;
                      if (s.countryInfo.iso3 === geo.properties.ISO_A3) {
                        // setTooltipContent(`${NAME}: ${s.active} Cases`);
                        setTooltipContent(
                          `${NAME} — ${rounded(s.recovered)} Recovered`
                        );
                      }
                    });
                  }}
                  onMouseLeave={() => {
                    setTooltipContent("");
                  }}
                  style={{
                    default: {
                      // fill: "#D6D6DA",
                      // fill: "#989898",
                      outline: "none",
                      // stroke: "#EAEAEC",
                      stroke: "#D6D6DA",
                      strokeWidth: 0.6,
                    },
                    pressed: {
                      // fill: "#E42",
                      // fill: "#ca4cf5",
                      stroke: "#D6D6DA",
                      strokeWidth: 0.6,
                      outline: "none",
                    },
                    hover: {
                      stroke: "#D6D6DA",
                      strokeWidth: 0.6,
                      outline: "none",
                    },
                  }}
                />
              );
            })
          }
        </Geographies>
      )
    );
    setRecovered(false);
  };

  const handleConfirmed = () => {
    setConfirmed(false);
    setRecovered(
      data.length > 0 && (
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const d = data.find(
                (s) => s.countryInfo.iso3 === geo.properties.ISO_A3
              );
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={d ? confirmedColorScale(d["active"]) : "#F5F4F6"}
                  onMouseEnter={() => {
                    const countryData = data.find((s) => {
                      const { NAME } = geo.properties;
                      if (s.countryInfo.iso3 === geo.properties.ISO_A3) {
                        // setTooltipContent(`${NAME}: ${s.active} Cases`);
                        setTooltipContent(
                          `${NAME} — ${rounded(s.cases)} Cases`
                        );
                      }
                    });
                  }}
                  onMouseLeave={() => {
                    setTooltipContent("");
                  }}
                  style={{
                    default: {
                      // fill: "#D6D6DA",
                      // fill: "#989898",
                      outline: "none",
                      // stroke: "#EAEAEC",
                      stroke: "#F08080",
                      strokeWidth: 0.2,
                    },
                    pressed: {
                      // fill: "#E42",
                      // fill: "#ca4cf5",
                      stroke: "#F08080",
                      strokeWidth: 0.2,
                      outline: "none",
                    },
                    hover: {
                      stroke: "#F08080",
                      strokeWidth: 0.2,
                      outline: "none",
                    },
                  }}
                />
              );
            })
          }
        </Geographies>
      )
    );
  };

  return (
    <>
      <div className="columns is-mobile is-centered has-background-black">
        <div
          className="is-size-2-desktop is-size-3-tablet is-size-4-mobile has-text-centered mt-2 py-5 is-uppercase
                                has-text-white has-text-weight-bold"
        >
          Covid-19 Tracker
        </div>
      </div>

      <div className="columns is-mobile is-centered">
        <button onClick={handleConfirmed}>Confirmed</button>
        <button onClick={handleRecovered}>Recovered</button>
      </div>

      <div style={container}>
        <div style={containerContent}>
          <ComposableMap
            data-tip=""
            // projectionConfig={{ scale: 200 }}
            // width={1500}
            // height={600}
            projectionConfig={{
              scale: 150,
              rotation: [0, 0, 0],
            }}
            projection="geoEquirectangular"
            width={1000}
            height={400}
            style={{ width: "100%", height: "100%" }}
          >
            {data.length > 0 && (
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const d = data.find(
                      (s) => s.countryInfo.iso3 === geo.properties.ISO_A3
                    );
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={d ? confirmedColorScale(d["active"]) : "#F5F4F6"}
                        onMouseEnter={() => {
                          const countryData = data.find((s) => {
                            const { NAME } = geo.properties;
                            if (s.countryInfo.iso3 === geo.properties.ISO_A3) {
                              // setTooltipContent(`${NAME}: ${s.active} Cases`);
                              setTooltipContent(
                                `${NAME} — ${rounded(s.cases)} Cases`
                              );
                            }
                          });
                        }}
                        onMouseLeave={() => {
                          setTooltipContent("");
                        }}
                        style={{
                          default: {
                            // fill: "#D6D6DA",
                            // fill: "#989898",
                            outline: "none",
                            // stroke: "#EAEAEC",
                            stroke: "#F08080",
                            strokeWidth: 0.2,
                          },
                          pressed: {
                            // fill: "#E42",
                            // fill: "#ca4cf5",
                            outline: "none",
                          },
                          hover: {
                            stroke: "#F08080",
                            strokeWidth: 0.2,
                            outline: "none",
                          },
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            )}
            {confirmed}
            {recovered}
            {/* </ZoomableGroup> */}
          </ComposableMap>
        </div>
      </div>

      <Cards />
    </>
  );
};

const container = {
  position: "relative",
  height: "0",
  width: "100%",
  paddingBottom: "40%",
};

const containerContent = {
  position: "absolute",
  top: "0",
  left: "0",
  right: "0",
  bottom: "0",
};

export default memo(MapChart);
