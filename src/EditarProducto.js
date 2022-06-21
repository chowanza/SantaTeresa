import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Rings } from "react-loader-spinner";

import backImage from "./assets/backsantate.png";
import Logo from "./assets/santate.png";
import { useParams, useNavigate } from "react-router-dom";

const EditarProducto = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setValues] = useState({
    producto: "",
    codigo: "",
    precio: "",
    tipo: "",
    expedicion: "",
    vencimiento: "",
    imagen: null,
  });

  useEffect(() => {
    (async function () {
      setIsLoading(true);
      const res = await axios.get(
        `https://appdistribuidora.vercel.app/productos`,
        {
          params: {
            id,
          },
        }
      );

      const expedicionFormat =
        res.data.data.expedicion === null
          ? null
          : `${res.data.data.expedicion}`.split("T")[0];
      const vencimientoFormat =
        res.data.data.vencimiento === null
          ? null
          : `${res.data.data.vencimiento}`.split("T")[0];

      setValues({
        ...form,
        producto: res.data.data.producto,
        codigo: res.data.data.codigo,
        precio: res.data.data.precio,
        tipo: res.data.data.tipo,
        expedicion: expedicionFormat,
        vencimiento: vencimientoFormat,
      });
      setIsLoading(false);
    })();
  }, []);

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
      const dateExp = new Date(form.expedicion)
      const dateVenc = new Date(form.vencimiento)
      if (dateVenc >= dateExp) {
        setIsLoading(true);

        const res = await axios({
          method: "patch",
          url: "https://appdistribuidora.vercel.app/productos",
          data: {
            id,
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
            title: "Producto editado con éxito!",
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
      setIsLoading(true);

      const res = await axios({
        method: "patch",
        url: "https://appdistribuidora.vercel.app/productos",
        data: {
          id,
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
          title: "Producto editado con éxito!",
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
    }

    setIsLoading(false);

    navigate(`/productos`);
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
              backgroundColor: "rgb(0, 0, 0)",
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
                  fontFamily: "Impact",
                }}
              >
                Editar un Producto
              </h4>
              <form
                id="Editar"
                onSubmit={handleSubmit}
                encType="multipart/form-data"
              >
                <input
                  name="producto"
                  value={form.producto}
                  className="form-control my-4 rounded-3"
                  type="text"
                  placeholder="Nombre del Producto"
                  onChange={handleInput}
                />
                <input
                  name="codigo"
                  value={form.codigo}
                  className="form-control my-4 rounded-3"
                  type="text"
                  placeholder="Código"
                  onChange={handleInput}
                />
                <input
                  name="tipo"
                  className="form-control my-4 rounded-3"
                  value={form.tipo}
                  type="text"
                  placeholder="Tipo de Producto"
                  onChange={handleInput}
                />
                <input
                  name="precio"
                  className="form-control my-4 rounded-3"
                  value={form.precio}
                  type="text"
                  placeholder="Precio"
                  onChange={handleInput}
                />
                <label
                  style={{
                    color: "#fff",
                    fontFamily: "Impact",
                    fontSize: "1.3rem",
                  }}
                >
                  Fecha de expedición
                </label>
                <input
                  name="expedicion"
                  value={form.expedicion}
                  className="form-control my-1 mb-3 rounded-3"
                  aria-label="Fecha"
                  type="date"
                  onChange={handleInput}
                />
                <label
                  style={{
                    color: "#fff",
                    fontFamily: "Impact",
                    fontSize: "1.3rem",
                  }}
                >
                  Fecha de vencimiento
                </label>
                <input
                  name="vencimiento"
                  value={form.vencimiento}
                  className="form-control my-1 mb-3 rounded-3"
                  type="date"
                  onChange={handleInput}
                />

                <label
                  style={{
                    color: "#fff",
                    fontFamily: "Impact",
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
                  onChange={handleFile}
                />

                <div className="d-flex justify-content-center">
                  <button
                    type="submit"
                    className="btn"
                    style={{
                      fontSize: "1rem",
                      fontFamily: "Impact",
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

export default EditarProducto;
