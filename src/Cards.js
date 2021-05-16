import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import indiaFlag from "./images/india.png";
import usFlag from "./images/us.png";
import ukFlag from "./images/uk.png";
import irelandFlag from "./images/ireland.png";
import canadaFlag from "./images/canada.png";
import netherlandsFlag from "./images/netherlands.png";
import germanyFlag from "./images/germany.png";

const rounded = (num) => {
  if (num > 1000000000) {
    return Math.round(num / 100000000) / 10 + "Bn";
  } else if (num > 1000000) {
    return Math.round(num / 100000) / 10 + "M";
  } else {
    return Math.round(num / 100) / 10 + "K";
  }
};

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
          <div className="columns mx-5 is-vcentered is-size-3-widescreen-only is-size-5-desktop is-size-6-tablet is-size-6-mobile">
            <div className="column">
              <div className="box" data-aos="fade-left">
                <div className="card-content has-text-centered">
                  <div className="content has-text-weight-semibold underline">
                    United States
                  </div>
                  <img src={usFlag} alt="us-flag" />
                  {us && (
                    <div className="has-text-weight-semibold">
                      Tests: {`${rounded(us.tests)}`}
                    </div>
                  )}
                  {us && (
                    <div className="has-text-weight-semibold">
                      Confirmed: {`${rounded(us.cases)}`}
                    </div>
                  )}
                  {us && (
                    <div className="has-text-weight-semibold">
                      Active: {`${rounded(us.active)}`}
                    </div>
                  )}
                  {us && (
                    <div className="has-text-weight-semibold">
                      Recovered: {`${rounded(us.recovered)}`}
                    </div>
                  )}
                  {us && (
                    <div className="has-text-weight-semibold">
                      Deaths: {`${rounded(us.deaths)}`}
                    </div>
                  )}
                  {/* <div className="is-hidden-touch">
                    <Link to="/usa" className="purple has-text-weight-semibold">
                      View more
                    </Link>
                  </div> */}
                </div>
              </div>
            </div>
            <div className="column">
              <div className="box" data-aos="fade-left">
                <div className="card-content has-text-centered">
                  <div className="content has-text-weight-semibold underline">
                    Ireland
                  </div>
                  <img src={irelandFlag} alt="ireland-flag" />
                  {ireland && (
                    <div className="has-text-weight-semibold">
                      Tests: {`${rounded(ireland.tests)}`}
                    </div>
                  )}
                  {ireland && (
                    <div className="has-text-weight-semibold">
                      Confirmed: {`${rounded(ireland.cases)}`}
                    </div>
                  )}
                  {ireland && (
                    <div className="has-text-weight-semibold">
                      Active: {`${rounded(ireland.active)}`}
                    </div>
                  )}
                  {ireland && (
                    <div className="has-text-weight-semibold">
                      Recovered: {`${rounded(ireland.recovered)}`}
                    </div>
                  )}
                  {ireland && (
                    <div className="has-text-weight-semibold">
                      Deaths: {`${rounded(ireland.deaths)}`}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="column">
              <div className="box" data-aos="fade-left">
                <div className="card-content has-text-centered">
                  <div className="content has-text-weight-semibold underline">
                    India
                  </div>
                  <img src={indiaFlag} alt="india-flag" />
                  {india && (
                    <div className="has-text-weight-semibold">
                      Tests: {`${rounded(india.tests)}`}
                    </div>
                  )}
                  {india && (
                    <div className="has-text-weight-semibold">
                      Confirmed: {`${rounded(india.cases)}`}
                    </div>
                  )}
                  {india && (
                    <div className="has-text-weight-semibold">
                      Active: {`${rounded(india.active)}`}
                    </div>
                  )}
                  {india && (
                    <div className="has-text-weight-semibold">
                      Recovered: {`${rounded(india.recovered)}`}
                    </div>
                  )}
                  {india && (
                    <div className="has-text-weight-semibold">
                      Deaths: {`${rounded(india.deaths)}`}
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
              <div className="box" data-aos="fade-left">
                <div className="card-content has-text-centered">
                  <div className="content has-text-weight-semibold underline">
                    Netherlands
                  </div>
                  <img src={netherlandsFlag} alt="netherlands-flag" />
                  {netherlands && (
                    <div className="has-text-weight-semibold">
                      Tests: {`${rounded(netherlands.tests)}`}
                    </div>
                  )}
                  {netherlands && (
                    <div className="has-text-weight-semibold">
                      Confirmed: {`${rounded(netherlands.cases)}`}
                    </div>
                  )}
                  {netherlands && (
                    <div className="has-text-weight-semibold">
                      Active: {`${rounded(netherlands.active)}`}
                    </div>
                  )}
                  {netherlands && (
                    <div className="has-text-weight-semibold">
                      Recovered: {`${rounded(netherlands.recovered)}`}
                    </div>
                  )}
                  {netherlands && (
                    <div className="has-text-weight-semibold">
                      Deaths: {`${rounded(netherlands.deaths)}`}
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
          <div className="columns mx-5 is-size-3-widescreen-only is-size-5-desktop is-size-6-tablet is-size-6-mobile">
            <div className="column">
              <div className="box" data-aos="fade-right">
                <div className="card-content has-text-centered">
                  <div className="content has-text-weight-semibold underline">
                    Germany
                  </div>
                  <img src={germanyFlag} alt="germany-flag" />
                  {germany && (
                    <div className="has-text-weight-semibold">
                      Tests: {`${rounded(germany.tests)}`}
                    </div>
                  )}
                  {germany && (
                    <div className="has-text-weight-semibold">
                      Confirmed: {`${rounded(germany.cases)}`}
                    </div>
                  )}
                  {germany && (
                    <div className="has-text-weight-semibold">
                      Active: {`${rounded(germany.active)}`}
                    </div>
                  )}
                  {germany && (
                    <div className="has-text-weight-semibold">
                      Recovered: {`${rounded(germany.recovered)}`}
                    </div>
                  )}
                  {germany && (
                    <div className="has-text-weight-semibold">
                      Deaths: {`${rounded(germany.deaths)}`}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="column">
              <div className="box" data-aos="fade-right">
                <div className="card-content has-text-centered">
                  <div className="content has-text-weight-semibold underline">
                    Canada
                  </div>
                  <img src={canadaFlag} alt="canada-flag" />
                  {canada && (
                    <div className="has-text-weight-semibold">
                      Tests: {`${rounded(canada.tests)}`}
                    </div>
                  )}
                  {canada && (
                    <div className="has-text-weight-semibold">
                      Confirmed: {`${rounded(canada.cases)}`}
                    </div>
                  )}
                  {canada && (
                    <div className="has-text-weight-semibold">
                      Active: {`${rounded(canada.active)}`}
                    </div>
                  )}
                  {canada && (
                    <div className="has-text-weight-semibold">
                      Recovered: {`${rounded(canada.recovered)}`}
                    </div>
                  )}
                  {canada && (
                    <div className="has-text-weight-semibold">
                      Deaths: {`${rounded(canada.deaths)}`}
                    </div>
                  )}
                  {/* <div className="is-hidden-touch">
                    <Link
                      to="/canada"
                      className="purple has-text-weight-semibold"
                    >
                      View more
                    </Link>
                  </div> */}
                </div>
              </div>
            </div>
            <div className="column">
              <div className="box" data-aos="fade-right">
                <div className="card-content has-text-centered">
                  <div className="content has-text-weight-semibold underline">
                    United Kingdom
                  </div>
                  <img src={ukFlag} alt="uk-flag" />
                  {uk && (
                    <div className="has-text-weight-semibold">
                      Tests: {`${rounded(uk.tests)}`}
                    </div>
                  )}
                  {uk && (
                    <div className="has-text-weight-semibold">
                      Confirmed: {`${rounded(uk.cases)}`}
                    </div>
                  )}
                  {uk && (
                    <div className="has-text-weight-semibold">
                      Active: {`${rounded(uk.active)}`}
                    </div>
                  )}
                  {uk && (
                    <div className="has-text-weight-semibold">
                      Recovered: {`${rounded(uk.recovered)}`}
                    </div>
                  )}
                  {uk && (
                    <div className="has-text-weight-semibold">
                      Deaths: {`${rounded(uk.deaths)}`}
                    </div>
                  )}
                  {/* <div className="is-hidden-touch">
                    <Link
                      to="/uk"
                      className="purple has-text-weight-semibold"
                    >
                      View more
                    </Link>
                  </div> */}
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
