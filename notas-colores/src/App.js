import React, { useState } from "react";
import html2canvas from "html2canvas";
import "./App.css";

function App() {
  const notasIniciales = [
    { nombre: "DO", color: "#FF4D4D" },
    { nombre: "RE", color: "#4CAF50" },
    { nombre: "MI", color: "#2196F3" },
    { nombre: "FA", color: "#F8BBD0" },
    { nombre: "SOL", color: "#FFEB3B" },
    { nombre: "LA", color: "#BBDEFB" },
    { nombre: "SI", color: "#9C27B0" },
    { nombre: "Do", color: "#f331d3ff" }
  ];

  const [paleta, setPaleta] = useState(notasIniciales);
  const [partitura, setPartitura] = useState([]);
  const [titulo, setTitulo] = useState("");

  const cambiarColor = (index, nuevoColor) => {
    const nuevaPaleta = [...paleta];
    nuevaPaleta[index].color = nuevoColor;
    setPaleta(nuevaPaleta);
  };

  const agregarNota = (nota) => {
    setPartitura([...partitura, nota]);
  };

  const agregarNotaBlanca = () => {
    setPartitura([...partitura, { nombre: "", color: "#FFFFFF", vacia: true }]);
  };

  const saltoLinea = () => {
    setPartitura([...partitura, { salto: true }]);
  };

  const borrarUltima = () => {
    setPartitura(partitura.slice(0, -1));
  };

  const borrarTodo = () => {
    setPartitura([]);
  };

  const exportarPNG = () => {
    const elemento = document.getElementById("partitura");
    html2canvas(elemento).then((canvas) => {
      const enlace = document.createElement("a");
      enlace.download = "partitura.png";
      enlace.href = canvas.toDataURL();
      enlace.click();
    });
  };

  const imprimir = () => {
    window.print();
  };

  const BotonAccion = ({ onClick, color, children }) => (
    <button
      onClick={onClick}
      style={{
        background: color,
        color: "white",
        border: "none",
        padding: "10px 15px",
        borderRadius: "6px",
        cursor: "pointer",
        fontWeight: "bold",
        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
        transition: "0.2s"
      }}
      onMouseOver={(e) => (e.target.style.opacity = "0.85")}
      onMouseOut={(e) => (e.target.style.opacity = "1")}
    >
      {children}
    </button>
  );

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Editor de notas por colores</h1>
      <p>Define colores, título y crea partituras imprimibles.</p>

      <label style={{ fontWeight: "bold" }}>
        Título de la partitura:{" "}
        <input
          type="text"
          value={titulo}
          size="100px"
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Introduce el título de la canción..."
        />
      </label>

      <h2>1) Paleta de notas</h2>
      <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
        {paleta.map((nota, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <div
              style={{
                background: nota.color,
                padding: "10px",
                borderRadius: "50%",
                color: "white",
                width: "50px",
                height: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold"
              }}
            >
              {nota.nombre}
            </div>
            <input
              type="color"
              value={nota.color}
              onChange={(e) => cambiarColor(i, e.target.value)}
            />
          </div>
        ))}
      </div>

      <h2>2) Botones de notas</h2>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {paleta.map((nota, i) => (
          <button
            key={i}
            style={{
              background: nota.color,
              color: "white",
              border: "none",
              padding: "10px 15px",
              borderRadius: "50%",
              cursor: "pointer",
              fontWeight: "bold",
              boxShadow: "0 2px 5px rgba(0,0,0,0.2)"
            }}
            onClick={() => agregarNota(nota)}
          >
            {nota.nombre}
          </button>
        ))}
        <button
          onClick={agregarNotaBlanca}
          style={{
            background: "#ffffffff",
            border: "none",
            padding: "10px 15px",
            borderRadius: "50%",
            cursor: "pointer",
            fontWeight: "bold",
            boxShadow: "0 2px 5px rgba(0,0,0,0.2)"
          }}
        >&nbsp;&nbsp;&nbsp;
          
        </button>
        <button
          onClick={saltoLinea}
          style={{
            background: "#795548",
            color: "white",
            border: "none",
            padding: "10px 15px",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
            boxShadow: "0 2px 5px rgba(0,0,0,0.2)"
          }}
        >
          ↵ Salto
        </button>
      </div>

      <div style={{ marginTop: "15px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <BotonAccion color="#F44336" onClick={borrarUltima}>Borrar última</BotonAccion>
        <BotonAccion color="#9E9E9E" onClick={borrarTodo}>Borrar todo</BotonAccion>
        <BotonAccion color="#4CAF50" onClick={exportarPNG}>Exportar PNG</BotonAccion>
        <BotonAccion color="#2196F3" onClick={imprimir}>Imprimir</BotonAccion>
      </div>

      <div
        id="partitura"
        style={{
          marginTop: "20px",
          border: "1px solid #ccc",
          padding: "10px",
          minHeight: "80px",
          display: "flex",
          gap: "10px",
          flexWrap: "wrap"
        }}
      >
        {titulo && (
          <h3 style={{ width: "100%", textAlign: "center" }}>{titulo}</h3>
        )}
        {partitura.map((item, i) =>
          item.salto ? (
            <div key={i} style={{ width: "100%" }}></div>
          ) : (
            <div
              key={i}
              style={{
                background: item.color,
                padding: "10px",
                borderRadius: "50%",
                color: item.vacia ? "transparent" : "white",
                width: "50px",
                height: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                border: item.vacia ? "1px solid #ccc" : "none"
              }}
            >
              {item.nombre}
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default App;
