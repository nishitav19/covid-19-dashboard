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

const colorScale = scaleLinear()
  .domain([0, 500000])
  .range(["#ffedea", "#ff5233"]);

const rounded = (num) => {
  if (num > 1000000000) {
    return Math.round(num / 100000000) / 10 + "Bn";
  } else if (num > 1000000) {
    return Math.round(num / 100000) / 10 + "M";
  } else {
    return Math.round(num / 100) / 10 + "K";
  }
};

const MapChart = ({ setTooltipContent }) => {
  const [data, setData] = useState([]);

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
          setData(res.data);
        })
    );
  }, [ComposableMap]);

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

      <div style={container}>
        <div style={containerContent}>
          <ComposableMap
            data-tip=""
            projectionConfig={{
              scale: 150,
              rotation: [0, 0, 0],
            }}
            projection="geoEquirectangular"
            width={1000}
            height={500}
            style={{ width: "100%", height: "auto" }}
          >
            {/* <ZoomableGroup maxZoom={2}> */}
            {/* <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => {
                      const countryData = data.find((s) => {
                        const { NAME } = geo.properties;
                        if (s.countryInfo.iso3 === geo.properties.ISO_A3) {
                          setTooltipContent(`${NAME}: ${s.active} Cases`);
                        }
                      });
                    }}
                    onMouseLeave={() => {
                      setTooltipContent("");
                    }}
                    style={{
                      default: {
                        // fill: "#D6D6DA",
                        fill: "#989898",
                        outline: "none",
                        stroke: "#EAEAEC",
                        strokeWidth: 0.4,
                      },
                      hover: {
                        // fill: "#F53",
                        // fill: "#862be7",
                        fill: "#ca4cf5",
                        outline: "none",
                      },
                      pressed: {
                        // fill: "#E42",
                        fill: "#ca4cf5",
                        outline: "none",
                      },
                    }}
                  />
                ))
              }
            </Geographies> */}

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
                        fill={d ? colorScale(d["active"]) : "#F5F4F6"}
                        onMouseEnter={() => {
                          const countryData = data.find((s) => {
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
                            // fill: "#D6D6DA",
                            // fill: "#989898",
                            outline: "none",
                            // stroke: "#EAEAEC",
                            stroke: "#F08080",
                            strokeWidth: 0.3,
                          },
                          hover: {
                            stroke: "#F08080",
                            strokeWidth: 0.3,
                            outline: "none",
                          },
                          pressed: {
                            // fill: "#E42",
                            // fill: "#ca4cf5",
                            stroke: "#F08080",
                            strokeWidth: 0.3,
                            outline: "none",
                          },
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            )}
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
