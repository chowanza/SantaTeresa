import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Rings } from "react-loader-spinner";
import { useNavigate, Link } from "react-router-dom";

import backImage from "./assets/backImage.png";
import Logo from "./assets/Logo.png";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [form, setValues] = useState({
    email: "",
    password: "",
  });

  const handleInput = async (event) => {
    await setValues({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    const res = await axios({
      method: "post",
      url: "https://appdistribuidora.vercel.app/login",
      data: {
        password: form.password,
        email: form.email,
      },
    });

    if (res.data.result === "success") {
      document.cookie = `email=${res.data.data.email}`;
      document.cookie = `apellido=${res.data.data.apellido}`;
      document.cookie = `nombre=${res.data.data.nombre}`;

      Swal.fire({
        icon: "success",
        imageUrl: Logo,
        imageHeight: 100,
        imageAlt: "Logo",
        showConfirmButton: false,
        timer: 500,
      }).then(() => navigate(`/`));
    } else {
      Swal.fire({
        icon: "error",
        title: res.data.message,
        imageUrl: Logo,
        imageHeight: 100,
        imageAlt: "Logo",
      });
      setIsLoading(false);

      document.getElementById("Ingresar").reset();
    }

    setIsLoading(false);
  };

  return (
    <div
      className="d-flex"
      style={{
        background: `url(${backImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        minHeight: "90.6vh",
      }}
    >
      {isLoading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ width: "100%" }}
        >
          <Rings color="#c84250" height={200} width={150} />
        </div>
      ) : (
        <div className="col-5 d-flex justify-content-center align-items-center ms-4">
          <div
            className="d-flex justify-content-center"
            style={{
              backgroundColor: "rgb(0, 124, 53)",
              borderRadius: "12px",
              width: "85%",
            }}
          >
            <div
              className="mt-3"
              style={{
                width: "80%",
              }}
            >
              <h3
                className="text-center"
                style={{
                  color: "#fff",
                  fontFamily: "roboto",
                }}
              >
                Ingresar
              </h3>
              <form
                id="Ingresar"
                onSubmit={handleSubmit}
                encType="multipart/form-data"
              >
                <input
                  name="email"
                  className="form-control my-4 rounded-3"
                  type="email"
                  placeholder="Email"
                  required
                  onChange={handleInput}
                />
                <input
                  name="password"
                  className="form-control my-4 rounded-3"
                  type="password"
                  placeholder="Contraseña"
                  required
                  onChange={handleInput}
                />

                <div className="d-flex justify-content-center">
                  <button
                    type="submit"
                    className="btn"
                    disabled={form.password.length < 8}
                    style={{
                      fontSize: "1rem",
                      fontFamily: "roboto",
                      backgroundColor: "white",
                    }}
                  >
                    Enviar
                  </button>
                </div>
              </form>
              <div className="d-flex justify-content-center mt-2 mb-0">
                <p
                  style={{
                    fontSize: "1.2rem",
                    fontFamily: "roboto",
                    color: "white",
                  }}
                >
                  No tienes una cuenta?{" "}
                  <Link
                    to="/register"
                    style={{ cursor: "pointer", color: "inherit" }}
                  >
                    Registrar
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
