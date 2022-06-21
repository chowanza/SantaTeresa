import React from "react";
import { Link } from "react-router-dom";
import backImage from "./assets/backsantate.png";
import Logo from "./assets/santate.png";

const Home = () => {
  let cookies = {};
  let listCookies = document.cookie;
  listCookies = listCookies.split("; ");
  for (let cookie in listCookies) {
    let valueCookie = listCookies[cookie].split("=");
    let key = valueCookie[0];
    let value = valueCookie[1];
    cookies = { ...cookies, [key]: value };
  }

  return (
    <div
      style={{
        background: `url(${backImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        height: "90.6vh",
      }}
    >
      <div
        className="d-flex align-items-center"
        style={{
          height: "89.5vh",
          color: "rgb(0 0 0)",
          fontFamily: "Impact",
        }}
      >
        <div className="col-6 ps-4 d-flex justify-content-center">
          <div style={{ width: "80%" }}>
            <div className="d-flex justify-content-center">
              <img src={Logo} alt="Logo" style={{ width: "400px" }} />
            </div>

            {cookies.nombre ? (
              <h1
                style={{
                  textAlign: "center",
                  fontSize: "2rem",
                  fontFamily: "Impact",
                }}
              >
                ¡Bienvenido {cookies.nombre} {cookies.apellido}!
              </h1>
            ) : (
              <h1
                style={{
                  textAlign: "center",
                  fontSize: "2rem",
                  fontFamily: "Impact",
                  color: "rgb(0 0 0)"
                }}
              >
                ¡BIENVENIDO A DISTRIBUIDORA SANTA TERESA!
              </h1>
            )}

            <div className="d-flex justify-content-center">
              {cookies.nombre ? (
                <Link
                  style={{
                    color: "inherit",
                    cursor: "pointer",
                    textDecoration: "none",
                  }}
                  to="/productos"
                >
                  <button
                    type="button"
                    className="btn btn-danger btn-lg"
                    style={{ fontSize: "1.3rem" }}
                  >
                    Ver Productos
                  </button>
                </Link>
              ) : (
                <Link
                  style={{
                    color: "inherit",
                    cursor: "pointer",
                    textDecoration: "none",
                  }}
                  to="/login"
                >
                  <button
                    type="button"
                    className="btn btn-danger btn-lg"
                    style={{ fontSize: "1.3rem" }}
                  >
                    Ingresar
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
