import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "./assets/Logo.png";
import { useNavigate } from "react-router-dom";

const Header = ({}) => {
  const navigate = useNavigate();

  let cookies = {};
  let listCookies = document.cookie;
  listCookies = listCookies.split("; ");
  for (let cookie in listCookies) {
    let valueCookie = listCookies[cookie].split("=");
    let key = valueCookie[0];
    let value = valueCookie[1];
    cookies = { ...cookies, [key]: value };
  }

  const handleLogout = () => {
    document.cookie = "nombre=";
    document.cookie = "apellido=";
    document.cookie = "email=";

    navigate("/login");
  };

  return (
    <>
      <div
        className="row justify-content-start py-3 m-0"
        style={{
          backgroundColor: "rgb(71 118 63)",
          color: "#fff",
          fontFamily: "roboto",
        }}
      >
        <div className="col-8">
          <div className="d-flex ms-5 align-items-center">
            <Link
              style={{
                color: "inherit",
                cursor: "pointer",
                textDecoration: "none",
              }}
              to="/"
            >
              <img
                className="p-0 m-0"
                src={Logo}
                alt="Logo"
                style={{ width: "60px", cursor: "pointer" }}
              />
            </Link>

            <div className="d-flex ms-3 align-items-center">
              <h2>
                <Link
                  style={{
                    color: "inherit",
                    cursor: "pointer",
                    textDecoration: "none",
                  }}
                  to="/"
                >
                  Distribuidora F&S
                </Link>
              </h2>
            </div>
          </div>
        </div>

        {cookies?.nombre ? (
          <div className="col-4 d-flex p-0">
            <div className="col-4 justify-content-center align-items-center d-flex">
              <Link
                style={{
                  color: "inherit",
                  cursor: "pointer",
                  textDecoration: "none",
                  fontSize: "1.5rem",
                }}
                to="/productos"
              >
                Productos
              </Link>
            </div>
            <div className="col-4 justify-content-center align-items-center d-flex">
              <Link
                style={{
                  color: "inherit",
                  cursor: "pointer",
                  textDecoration: "none",
                  fontSize: "1.5rem",
                }}
                to="/add-producto"
              >
                Agregar
              </Link>
            </div>
            <div className="col-4 justify-content-center align-items-center d-flex">
              <div
                style={{
                  color: "inherit",
                  cursor: "pointer",
                  textDecoration: "none",
                  fontSize: "1.5rem",
                }}
                onClick={handleLogout}
              >
                Cerrar Sesion
              </div>
            </div>
          </div>
        ) : (
          <div className="col-4 d-flex p-0">
            <div className="col-10 justify-content-end align-items-center d-flex">
              <Link
                style={{
                  color: "inherit",
                  cursor: "pointer",
                  textDecoration: "none",
                  fontSize: "1.5rem",
                }}
                to="/login"
              >
                Iniciar Sesión
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
