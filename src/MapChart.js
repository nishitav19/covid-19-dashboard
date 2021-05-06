import React, { memo, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import "bulma/css/bulma.css";

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
      <div className="columns is-mobile is-centered">
        <p className="is-size-1-desktop is-size-2-tablet is-size-3-mobile pt-6 px-6 mt-1 font-fam has-text-black has-text-weight-bold has-text-centered">
          Covid-19 Tracker
        </p>
      </div>

      <div className="columns is-mobile is-centered">
        <ComposableMap
          data-tip=""
          projectionConfig={{ scale: 200 }}
          width={1500}
          height={600}
        >
          <ZoomableGroup maxZoom={2}>
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
                        //   fill: "#D6D6DA",
                        outline: "none",
                      },
                      hover: {
                        fill: "#F53",
                        outline: "none",
                      },
                      pressed: {
                        fill: "#E42",
                        outline: "none",
                      },
                    }}
                  />
                ))
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
    </>
  );
};

export default memo(MapChart);
