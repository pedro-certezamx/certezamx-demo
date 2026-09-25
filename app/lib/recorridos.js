"use client";
import { createContext, useContext } from "react";

// Recorridos interactivos con su propio enlace. Cada uno reutiliza las pantallas
// de la demo; aquí se define el orden de sus pasos y las etiquetas de su barra.
export const RECORRIDOS = {
  proveedor: [
    { paso: "catalogo", etiqueta: "Catálogo" },
    { paso: "panel", etiqueta: "Nueva orden" },
    { paso: "declarar", etiqueta: "Declarar" },
    { paso: "evidencia", etiqueta: "Evidencia" },
    { paso: "constancia", etiqueta: "Constancia" },
  ],
  comprador: [
    { paso: "explorar" }, // portada: sin etiqueta, queda fuera de la barra
    { paso: "catalogo", etiqueta: "Catálogo" },
    { paso: "orden", etiqueta: "Orden" },
    { paso: "pagar", etiqueta: "Pagar" },
    { paso: "comprobante", etiqueta: "Comprobante" },
    { paso: "seguimiento", etiqueta: "Seguimiento" },
    { paso: "constancia", etiqueta: "Constancia" },
  ],
};

export function rutaDelPaso(recorrido, paso) {
  return `/demo/recorrido/${recorrido}/${paso}`;
}

const RecorridoContext = createContext(null);

export function RecorridoProvider({ recorrido, paso, children }) {
  return (
    <RecorridoContext.Provider value={{ recorrido, paso }}>
      {children}
    </RecorridoContext.Provider>
  );
}

// Fuera de un recorrido devuelve null y cada pantalla se comporta como en /demo.
export function useRecorrido() {
  const contexto = useContext(RecorridoContext);
  if (!contexto) return null;

  const pasos = RECORRIDOS[contexto.recorrido];
  const indice = pasos.findIndex((p) => p.paso === contexto.paso);
  const siguiente = pasos[indice + 1];
  // Los pasos sin etiqueta (la portada) no aparecen en la barra.
  const pasosEnBarra = pasos.filter((p) => p.etiqueta);
  const primerPaso = pasos[0].paso;

  return {
    ...contexto,
    pasos: pasosEnBarra,
    numero: pasosEnBarra.findIndex((p) => p.paso === contexto.paso) + 1,
    siguiente: siguiente ? rutaDelPaso(contexto.recorrido, siguiente.paso) : null,
    // Primer paso del mismo recorrido: destino de "Reiniciar" y "Ver el ejemplo otra vez".
    inicio: rutaDelPaso(contexto.recorrido, primerPaso),
    esPrimerPaso: contexto.paso === primerPaso,
  };
}
