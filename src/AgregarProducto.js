import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Rings } from "react-loader-spinner";

import backImage from "./assets/backImage.png";
import Logo from "./assets/Logo.png";

const AgregarProducto = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [form, setValues] = useState({
    producto: "",
    codigo: "",
    precio: "",
    tipo: "",
    expedicion: null,
    vencimiento: null,
    imagen: null,
  });

  const handleInput = async (event) => {
    await setValues({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleFile = async (event) => {
    await setValues({
      ...form,
      [event.target.name]: event.target.files[0],
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (form.vencimiento && form.expedicion) {
      const dateExp = new Date(form.expedicion);
      const dateVenc = new Date(form.vencimiento);
      if (dateVenc >= dateExp) {
        setIsLoading(true);

        const res = await axios({
          method: "post",
          url: "https://appdistribuidora.vercel.app/productos",
          data: {
            producto: form.producto,
            precio: form.precio,
            tipo: form.tipo,
            imagen: form.imagen,
            vencimiento: form.vencimiento,
            expedicion: form.expedicion,
            codigo: form.codigo,
          },
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (res.data.result === "success") {
          Swal.fire({
            icon: "success",
            title: "Producto agregado con éxito!",
            imageUrl: Logo,
            imageHeight: 100,
            imageAlt: "Logo",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error inesperado!",
            imageUrl: Logo,
            imageHeight: 100,
            imageAlt: "Logo",
          });
        }

        setIsLoading(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "La fecha de vencimiento debe ser mayor a la de expedicion",
          imageUrl: Logo,
          imageHeight: 100,
          imageAlt: "Logo",
        });
      }
    } else {
      const res = await axios({
        method: "post",
        url: "https://appdistribuidora.vercel.app/productos",
        data: {
          producto: form.producto,
          precio: form.precio,
          tipo: form.tipo,
          imagen: form.imagen,
          vencimiento: form.vencimiento,
          expedicion: form.expedicion,
          codigo: form.codigo,
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.result === "success") {
        Swal.fire({
          icon: "success",
          title: "Producto agregado con éxito!",
          imageUrl: Logo,
          imageHeight: 100,
          imageAlt: "Logo",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error inesperado!",
          imageUrl: Logo,
          imageHeight: 100,
          imageAlt: "Logo",
        });
      }

      setIsLoading(false);
    }

    document.getElementById("Agregar").reset();
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
        <div className="col-5 d-flex justify-content-center align-items-center my-4">
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
              <h4
                className="text-center"
                style={{
                  color: "#fff",
                  fontFamily: "roboto",
                }}
              >
                Agregar un Producto
              </h4>
              <form
                id="Agregar"
                onSubmit={handleSubmit}
                encType="multipart/form-data"
              >
                <input
                  name="producto"
                  className="form-control my-4 rounded-3"
                  type="text"
                  placeholder="Nombre del Producto"
                  required
                  onChange={handleInput}
                />
                <input
                  name="codigo"
                  className="form-control my-4 rounded-3"
                  type="text"
                  placeholder="Código"
                  required
                  onChange={handleInput}
                />
                <input
                  name="tipo"
                  className="form-control my-4 rounded-3"
                  type="text"
                  placeholder="Tipo de Producto"
                  required
                  onChange={handleInput}
                />
                <input
                  name="precio"
                  className="form-control my-4 rounded-3"
                  type="text"
                  placeholder="Precio"
                  required
                  onChange={handleInput}
                />
                <label
                  style={{
                    color: "#fff",
                    fontFamily: "roboto",
                    fontSize: "1.3rem",
                  }}
                >
                  Fecha de expedición
                </label>
                <input
                  name="expedicion"
                  className="form-control my-1 mb-3 rounded-3"
                  aria-label="Fecha"
                  type="date"
                  onChange={handleInput}
                />
                <label
                  style={{
                    color: "#fff",
                    fontFamily: "roboto",
                    fontSize: "1.3rem",
                  }}
                >
                  Fecha de vencimiento
                </label>
                <input
                  name="vencimiento"
                  className="form-control my-1 mb-3 rounded-3"
                  type="date"
                  onChange={handleInput}
                />

                <label
                  style={{
                    color: "#fff",
                    fontFamily: "roboto",
                    fontSize: "1.3rem",
                  }}
                >
                  Imagen
                </label>
                <input
                  name="imagen"
                  className="form-control my-1 mb-4 rounded-3"
                  id="fileInput"
                  type="file"
                  placeholder="Imagen"
                  accept="image/png, image/jpeg"
                  multiple
                  required
                  onChange={handleFile}
                />

                <div className="d-flex justify-content-center">
                  <button
                    type="submit"
                    className="btn"
                    style={{
                      fontSize: "1rem",
                      fontFamily: "roboto",
                      backgroundColor: "white",
                    }}
                  >
                    Guardar
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

export default AgregarProducto;
