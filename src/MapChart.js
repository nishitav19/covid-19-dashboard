import React, { memo, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import "bulma/css/bulma.css";
import Cards from "./Cards";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const MapChart = ({ setTooltipContent }) => {
  // useEffect(() => {
  //   fetch("https://corona.lmao.ninja/v2/countries?yesterday=&sort=", {
  //     method: "get",
  //     headers: {},
  //   }).then((response) =>
  //     response
  //       .json()
  //       .then((data) => ({
  //         data: data,
  //         status: response.status,
  //       }))
  //       .then((res) => {
  //         console.log(res.status, res.data);
  //         console.log(res.data[0].country);
  //       })
  //   );
  // }, [ComposableMap]);

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
            // projectionConfig={{ scale: 200 }}
            // width={1500}
            // height={600}
            projectionConfig={{
              scale: 155,
              rotation: [-11, 0, 0],
            }}
            width={800}
            height={400}
            style={{ width: "100%", height: "auto" }}
          >
            {/* <ZoomableGroup maxZoom={2}> */}
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => {
                      fetch(
                        "https://corona.lmao.ninja/v2/countries?yesterday=&sort=",
                        {
                          method: "get",
                          headers: {},
                        }
                      ).then((response) =>
                        response
                          .json()
                          .then((data) => ({
                            data: data,
                            status: response.status,
                          }))
                          .then((res) => {
                            console.log(res.status, res.data);
                            console.log(res.data.length);
                            const { NAME } = geo.properties;
                            console.log(geo.properties);
                            // setTooltipContent(`${NAME} — ${rounded(POP_EST)}`);
                            let idx = 0;
                            for (let i = 0; i < res.data.length; i++) {
                              if (`${NAME}` === `${res.data[i].country}`) {
                                idx = i;
                                break;
                              }
                            }
                            // Exception cases
                            if (`${NAME}` === "United States of America") {
                              idx = 209;
                            }
                            if (`${NAME}` === "United Arab Emirates") {
                              idx = 207;
                            }
                            if (`${NAME}` === "United Kingdom") {
                              idx = 208;
                            }
                            if (`${NAME}` === "South Korea") {
                              idx = 165;
                            }
                            if (
                              `${NAME}` === "North Korea" ||
                              `${NAME}` === "Antarctica"
                            ) {
                              setTooltipContent(`${NAME}: NA`);
                            } else {
                              console.log(res.data);
                              setTooltipContent(
                                `${NAME}: ${res.data[idx].active} Active Cases`
                              );
                            }
                          })
                      );
                    }}
                    onMouseLeave={() => {
                      setTooltipContent("");
                    }}
                    style={{
                      default: {
                        // fill: "#D6D6DA",
                        // fill: "#f4c2c2",
                        fill: "#989898",
                        outline: "none",
                        stroke: "#EAEAEC",
                        strokeWidth: 0.4,
                      },
                      hover: {
                        // fill: "#F53",
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
            </Geographies>
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
  paddingBottom: "50%",
};

const containerContent = {
  position: "absolute",
  top: 50,
  left: "0",
  right: "0",
  bottom: "0",
};

export default memo(MapChart);
