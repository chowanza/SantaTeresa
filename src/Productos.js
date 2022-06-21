import React, { useEffect, useState } from "react";
import axios from "axios";
import Logo from "./assets/Logo.png";
import { Rings } from "react-loader-spinner";

import backImage from "./assets/backImage.png";
import Card from "./Card";

const Productos = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    (async function () {
      setIsLoading(true);
      const res = await axios.get("https://appdistribuidora.vercel.app/productos");
      setProductos(res.data.data);
      setIsLoading(false);
    })();
  }, []);

  return (
    <>
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
            <Rings color="#c84250" height={150} width={150} />
          </div>
        ) : productos.length > 0 ? (
          <div
            className="d-flex justify-content-center"
            style={{ width: "100%" }}
          >
            <div
              className="d-flex flex-wrap my-3"
              style={{
                width: "90%",
              }}
            >
              {productos.map((item) => (
                <Card
                  image={item.imagen}
                  titulo={item.producto}
                  precio={item.precio}
                  tipo={item.tipo}
                  expedicion={item.expedicion}
                  vencimiento={item.vencimiento}
                  codigo={item.codigo}
                  id={item._id}
                />
              ))}
            </div>
          </div>
        ) : (
          <div style={{ width: "100%" }}>
            <div
              className="d-flex align-items-center"
              style={{
                height: "89.5vh",
                color: "rgb(57 102 47)",
                fontFamily: "roboto",
              }}
            >
              <div className="col-6 ps-4">
                <div className="d-flex justify-content-center col-10">
                  <img src={Logo} alt="Logo" style={{ width: "400px" }} />
                </div>
                <div className="d-flex justify-content-center col-10">
                  <h1
                    style={{
                      fontSize: "3rem",
                      fontFamily: "roboto",
                    }}
                  >
                    Sin productos registrados!
                  </h1>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Productos;
