import React, { memo, useState, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import "bulma/css/bulma.css";
import Cards from "./Cards";
import globalMap from "./globalMap";
import { scaleLinear } from "d3-scale";

const geoUrl = globalMap;

const confirmedColorScale = scaleLinear()
  .domain([0, 500000])
  .range(["#ffedea", "#ff5233"]);

const recoveredColorScale = scaleLinear()
  .domain([0, 10000000])
  .range(["#e5f5e0", "#74c476"]);

const deathsColorScale = scaleLinear()
  .domain([1000, 300000])
  .range(["#deebf7", "#4292c6"]);

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
  const [deaths, setDeaths] = useState(true);

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
        })
    );
  }, [ComposableMap]);

const handleRecovered = () => {
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
                fill={d ? recoveredColorScale(d["recovered"]) : "#F5F4F6"}
                onMouseEnter={() => {
                  data.find((s) => {
                    const { NAME } = geo.properties;
                    if (s.countryInfo.iso3 === geo.properties.ISO_A3) {
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
                    outline: "none",
                    stroke: "#ca4cf5",
                    strokeWidth: 0.1,
                  },
                  pressed: {
                    stroke: "#ca4cf5",
                    strokeWidth: 0.1,
                    outline: "none",
                  },
                  hover: {
                    stroke: "#ca4cf5",
                    strokeWidth: 0.1,
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
  setConfirmed(false);
  setDeaths(false);
};

const handleConfirmed = () => {
  setRecovered(false);
  setDeaths(false);
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
                fill={d ? confirmedColorScale(d["active"]) : "#F5F4F6"}
                onMouseEnter={() => {
                  data.find((s) => {
                    const { NAME } = geo.properties;
                    if (s.countryInfo.iso3 === geo.properties.ISO_A3) {
                      setTooltipContent(`${NAME} — ${rounded(s.cases)} Cases`);
                    }
                  });
                }}
                onMouseLeave={() => {
                  setTooltipContent("");
                }}
                style={{
                  default: {
                    outline: "none",
                    stroke: "#F08080",
                    strokeWidth: 0.2,
                  },
                  pressed: {
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

const handleDeaths = () => {
  setConfirmed(false);
  setRecovered(false);
  setDeaths(
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
                fill={d ? deathsColorScale(d["deaths"]) : "#F5F4F6"}
                onMouseEnter={() => {
                  data.find((s) => {
                    const { NAME } = geo.properties;
                    if (s.countryInfo.iso3 === geo.properties.ISO_A3) {
                      setTooltipContent(
                        `${NAME} — ${rounded(s.deaths)} Deaths`
                      );
                    }
                  });
                }}
                onMouseLeave={() => {
                  setTooltipContent("");
                }}
                style={{
                  default: {
                    outline: "none",
                    stroke: "#08519c",
                    strokeWidth: 0.1,
                  },
                  pressed: {
                    stroke: "#08519c",
                    strokeWidth: 0.1,
                    outline: "none",
                  },
                  hover: {
                    stroke: "#08519c",
                    strokeWidth: 0.1,
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

      <div className="columns is-mobile is-centered mb-5 pb-2">
        <button onClick={handleConfirmed} className="button">
          Confirmed
        </button>
        <button onClick={handleRecovered} className="button">
          Recovered
        </button>
        <button onClick={handleDeaths} className="button">
          Deaths
        </button>
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
            {confirmed && data.length > 0 && (
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
                          data.find((s) => {
                            const { NAME } = geo.properties;
                            if (s.countryInfo.iso3 === geo.properties.ISO_A3) {
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
                            outline: "none",
                            stroke: "#F08080",
                            strokeWidth: 0.2,
                          },
                          pressed: {
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

            {recovered}
            {deaths}

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
