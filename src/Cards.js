import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import indiaFlag from "./images/india.png";
import usFlag from "./images/us.png";
import ukFlag from "./images/uk.png";
import irelandFlag from "./images/ireland.png";
import canadaFlag from "./images/canada.png";
import netherlandsFlag from "./images/netherlands.png";
import germanyFlag from "./images/germany.png";

function Cards() {
  const [us, setUs] = useState(null);
  const [ireland, setIreland] = useState(null);
  const [india, setIndia] = useState(null);
  const [netherlands, setNetherlands] = useState(null);
  const [germany, setGermany] = useState(null);
  const [uk, setUk] = useState(null);
  const [canada, setCanada] = useState(null);

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
          console.log(res.status, res.data);
          setUs(res.data[209]);
          setIreland(res.data[97]);
          setIndia(res.data[93]);
          setNetherlands(res.data[143]);
          setGermany(res.data[76]);
          setUk(res.data[208]);
          setCanada(res.data[35]);
        })
    );
  }, []);

  return (
    <>
      <section className="landing-bg">
        <div className="container py-6 mt-6">
          <div className="columns mx-5 is-vcentered is-size-3-widescreen-only is-size-5-tablet is-size-6-mobile">
            <div className="column">
              <div className="box">
                <div className="card-content has-text-centered">
                  <div className="content has-text-weight-semibold underline">
                    United States
                  </div>
                  <img src={usFlag} alt="us-flag" />
                  {us && (
                    <div className="has-text-weight-semibold">
                      Tests: {us.tests}
                    </div>
                  )}
                  {us && (
                    <div className="has-text-weight-semibold">
                      Confirmed: {us.cases}
                    </div>
                  )}
                  {us && (
                    <div className="has-text-weight-semibold">
                      Active: {us.active}
                    </div>
                  )}
                  {us && (
                    <div className="has-text-weight-semibold">
                      Recovered: {us.recovered}
                    </div>
                  )}
                  {us && (
                    <div className="has-text-weight-semibold">
                      Deaths: {us.deaths}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="column">
              <div className="box">
                <div className="card-content has-text-centered">
                  <div className="content has-text-weight-semibold underline">
                    Ireland
                  </div>
                  <img src={irelandFlag} alt="ireland-flag" />
                  {ireland && (
                    <div className="has-text-weight-semibold">
                      Tests: {ireland.tests}
                    </div>
                  )}
                  {ireland && (
                    <div className="has-text-weight-semibold">
                      Confirmed: {ireland.cases}
                    </div>
                  )}
                  {ireland && (
                    <div className="has-text-weight-semibold">
                      Active: {ireland.active}
                    </div>
                  )}
                  {ireland && (
                    <div className="has-text-weight-semibold">
                      Recovered: {ireland.recovered}
                    </div>
                  )}
                  {ireland && (
                    <div className="has-text-weight-semibold">
                      Deaths: {ireland.deaths}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="column">
              <div className="box">
                <div className="card-content has-text-centered">
                  <div className="content has-text-weight-semibold underline">
                    India
                  </div>
                  <img src={indiaFlag} alt="india-flag" />
                  {india && (
                    <div className="has-text-weight-semibold">
                      Tests: {india.tests}
                    </div>
                  )}
                  {india && (
                    <div className="has-text-weight-semibold">
                      Confirmed: {india.cases}
                    </div>
                  )}
                  {india && (
                    <div className="has-text-weight-semibold">
                      Active: {india.active}
                    </div>
                  )}
                  {india && (
                    <div className="has-text-weight-semibold">
                      Recovered: {india.recovered}
                    </div>
                  )}
                  {india && (
                    <div className="has-text-weight-semibold">
                      Deaths: {india.deaths}
                    </div>
                  )}
                  {/* <div className="is-hidden-touch">
                    <Link
                      to="/india"
                      className="purple has-text-weight-semibold"
                    >
                      View more
                    </Link>
                  </div> */}
                </div>
              </div>
            </div>
            <div className="column">
              <div className="box">
                <div className="card-content has-text-centered">
                  <div className="content has-text-weight-semibold underline">
                    Netherlands
                  </div>
                  <img src={netherlandsFlag} alt="netherlands-flag" />
                  {netherlands && (
                    <div className="has-text-weight-semibold">
                      Tests: {netherlands.tests}
                    </div>
                  )}
                  {netherlands && (
                    <div className="has-text-weight-semibold">
                      Confirmed: {netherlands.cases}
                    </div>
                  )}
                  {netherlands && (
                    <div className="has-text-weight-semibold">
                      Active: {netherlands.active}
                    </div>
                  )}
                  {netherlands && (
                    <div className="has-text-weight-semibold">
                      Recovered: {netherlands.recovered}
                    </div>
                  )}
                  {netherlands && (
                    <div className="has-text-weight-semibold">
                      Deaths: {netherlands.deaths}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-bg">
        <div className="container py-6 mt-6">
          <div className="columns mx-5 is-size-3-widescreen-only is-size-5-tablet is-size-6-mobile">
            <div className="column">
              <div className="box">
                <div className="card-content has-text-centered">
                  <div className="content has-text-weight-semibold underline">
                    Canada
                  </div>
                  <img src={canadaFlag} alt="canada-flag" />
                  {canada && (
                    <div className="has-text-weight-semibold">
                      Tests: {canada.tests}
                    </div>
                  )}
                  {canada && (
                    <div className="has-text-weight-semibold">
                      Confirmed: {canada.cases}
                    </div>
                  )}
                  {canada && (
                    <div className="has-text-weight-semibold">
                      Active: {canada.active}
                    </div>
                  )}
                  {canada && (
                    <div className="has-text-weight-semibold">
                      Recovered: {canada.recovered}
                    </div>
                  )}
                  {canada && (
                    <div className="has-text-weight-semibold">
                      Deaths: {canada.deaths}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="column">
              <div className="box">
                <div className="card-content has-text-centered">
                  <div className="content has-text-weight-semibold underline">
                    Germany
                  </div>
                  <img src={germanyFlag} alt="germany-flag" />
                  {germany && (
                    <div className="has-text-weight-semibold">
                      Tests: {germany.tests}
                    </div>
                  )}
                  {germany && (
                    <div className="has-text-weight-semibold">
                      Confirmed: {germany.cases}
                    </div>
                  )}
                  {germany && (
                    <div className="has-text-weight-semibold">
                      Active: {germany.active}
                    </div>
                  )}
                  {germany && (
                    <div className="has-text-weight-semibold">
                      Recovered: {germany.recovered}
                    </div>
                  )}
                  {germany && (
                    <div className="has-text-weight-semibold">
                      Deaths: {germany.deaths}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="column">
              <div className="box">
                <div className="card-content has-text-centered">
                  <div className="content has-text-weight-semibold underline">
                    United Kingdom
                  </div>
                  <img src={ukFlag} alt="uk-flag" />
                  {uk && (
                    <div className="has-text-weight-semibold">
                      Tests: {uk.tests}
                    </div>
                  )}
                  {uk && (
                    <div className="has-text-weight-semibold">
                      Confirmed: {uk.cases}
                    </div>
                  )}
                  {uk && (
                    <div className="has-text-weight-semibold">
                      Active: {uk.active}
                    </div>
                  )}
                  {uk && (
                    <div className="has-text-weight-semibold">
                      Recovered: {uk.recovered}
                    </div>
                  )}
                  {uk && (
                    <div className="has-text-weight-semibold">
                      Deaths: {uk.deaths}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Cards;
