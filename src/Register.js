import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Rings } from "react-loader-spinner";

import backImage from "./assets/backImage.png";
import Logo from "./assets/Logo.png";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [form, setValues] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    passwordConfirm: null,
  });

  const handleInput = async (event) => {
    await setValues({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (form.password.length < 8) {
      Swal.fire({
        icon: "error",
        title: "La contraseña debe tener mínimo 8 caracteres!",
        imageUrl: Logo,
        imageHeight: 100,
        imageAlt: "Logo",
      });
    } else {
      if (form.password !== form.passwordConfirm) {
        Swal.fire({
          icon: "error",
          title: "Las contraseñas no coinciden!",
          imageUrl: Logo,
          imageHeight: 100,
          imageAlt: "Logo",
        });
      } else {
        setIsLoading(true);

        const res = await axios({
          method: "post",
          url: "https://appdistribuidora.vercel.app/register",
          data: {
            nombre: form.nombre,
            apellido: form.apellido,
            password: form.password,
            email: form.email,
          },
        });

        if (res.data.result === "success") {
          Swal.fire({
            icon: "success",
            title: "Cuenta creada con éxito!",
            imageUrl: Logo,
            imageHeight: 100,
            imageAlt: "Logo",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: res.data.message,
            imageUrl: Logo,
            imageHeight: 100,
            imageAlt: "Logo",
          });
        }

        setIsLoading(false);

        document.getElementById("Crear").reset();
      }
    }
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
              className="my-3"
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
                Crear una Cuenta
              </h3>
              <form
                id="Crear"
                onSubmit={handleSubmit}
                encType="multipart/form-data"
              >
                <input
                  name="nombre"
                  className="form-control my-4 rounded-3"
                  type="text"
                  placeholder="Nombre"
                  required
                  onChange={handleInput}
                />
                <input
                  name="apellido"
                  className="form-control my-4 rounded-3"
                  type="text"
                  placeholder="Apellido"
                  required
                  onChange={handleInput}
                />
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
                <input
                  name="passwordConfirm"
                  className="form-control my-4 rounded-3"
                  type="password"
                  placeholder="Confirmar contraseña"
                  required
                  onChange={handleInput}
                />

                <div className="d-flex justify-content-center">
                  <button
                    type="submit"
                    className="btn"
                    style={{
                      fontSize: "1.2rem",
                      fontFamily: "roboto",
                      backgroundColor: "white",
                    }}
                  >
                    Registrar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
