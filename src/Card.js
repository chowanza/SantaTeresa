import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Logo from "./assets/Logo.png";
import axios from "axios";

const Card = ({
  id,
  image,
  titulo,
  precio,
  tipo,
  expedicion,
  vencimiento,
  codigo,
}) => {
  const navigate = useNavigate();
  const expedicionFormat =
    expedicion === null ? "No aplica" : `${expedicion}`.split("T")[0];
  const vencimientoFormat =
    vencimiento === null ? "No aplica" : `${vencimiento}`.split("T")[0];

  const handleDelete = () => {
    Swal.fire({
      title: "Estas seguro de eliminar este producto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(71 118 63)",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      imageUrl: Logo,
      imageHeight: 100,
      imageAlt: "Logo",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`https://appdistribuidora.vercel.app/productos`, {
          params: {
            id,
          },
        });

        Swal.fire({
          title: "Producto eliminado con éxito",
          icon: "success",
          imageUrl: Logo,
          imageHeight: 100,
          imageAlt: "Logo",
        }).then(() => navigate(`/`));
      }
    });
  };

  const handleEdit = () => {
    navigate(`/edit-producto/${id}`);
  };

  return (
    <div
      className="card m-2"
      style={{ width: "18rem", height: "450px", fontFamily: "roboto" }}
    >
      <div className="d-flex justify-content-center mt-3">
        <img src={image} alt="Logo" style={{ width: "80%", height: "180px" }} />
      </div>
      <div className="card-body">
        <h3 className="card-title" style={{ textTransform: "capitalize" }}>
          {titulo}
        </h3>
        <p className="card-title my-0">Código: {codigo}</p>
        <p className="card-title my-0">Precio: {precio} Bs</p>
        <p className="card-title my-0">
          Fecha de expedición: {expedicionFormat}
        </p>
        <p className="card-title my-0">
          Fecha de vencimiento: {vencimientoFormat}
        </p>
        <p className="card-title my-0" style={{ textTransform: "capitalize" }}>
          Tipo: {tipo}
        </p>
        <div className="d-flex justify-content-around mt-2">
          <button
            type="button"
            onClick={handleEdit}
            className="btn btn-success bt-sm"
            style={{ fontSize: "1.3rem" }}
          >
            Editar
          </button>

          <button
            type="button"
            className="btn btn-danger"
            style={{ fontSize: "1.3rem" }}
            onClick={handleDelete}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
