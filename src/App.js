import React, { useState, useEffect } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Productos from "./Productos";
import AgregarProducto from "./AgregarProducto";
import EditarProducto from "./EditarProducto";
import Register from "./Register";
import Login from "./Login";

function App() {
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
    <div className="App">
      <Router>
        <Header />

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/productos" element={cookies.nombre ? <Productos /> : <Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/add-producto" element={cookies.nombre ? <AgregarProducto /> : <Home />} />
          <Route exact path="/edit-producto/:id" element={cookies.nombre ? <EditarProducto /> : <Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
