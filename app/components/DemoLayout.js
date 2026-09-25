"use client";
import Link from "next/link";
import Image from "next/image";
import { useRecorrido } from "../lib/recorridos";

// Barra de pasos arriba de la pantalla; también la usa la Constancia, que no usa este layout.
export function BarraDePasos({ pasos, actual }) {
  return (
    <div style={{ backgroundColor: "#1A3A5C" }} className="px-4 pb-4">
      <div className="flex items-center justify-between max-w-lg mx-auto">
        {pasos.map((nombre, i) => {
          const num = i + 1;
          const activo = num === actual;
          const completado = num < actual;
          return (
            <div key={i} className="flex flex-col items-center" style={{ flex: 1 }}>
              <div className="flex items-center w-full">
                {i > 0 && (
                  <div
                    className="flex-1 h-0.5"
                    style={{ backgroundColor: completado ? "#C8890A" : "rgba(255,255,255,0.2)" }}
                  />
                )}
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                  style={{
                    backgroundColor: completado ? "#C8890A" : activo ? "white" : "rgba(255,255,255,0.2)",
                    color: completado ? "white" : activo ? "#1A3A5C" : "rgba(255,255,255,0.5)",
                  }}
                >
                  {completado ? "✓" : num}
                </div>
                {i < pasos.length - 1 && (
                  <div
                    className="flex-1 h-0.5"
                    style={{ backgroundColor: completado ? "#C8890A" : "rgba(255,255,255,0.2)" }}
                  />
                )}
              </div>
              <span
                className="text-xs mt-1"
                style={{ color: activo ? "white" : "rgba(255,255,255,0.5)", fontSize: "10px" }}
              >
                {nombre}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function DemoLayout({ children, paso, totalPasos, titulo, esProveedor = false }) {
  const pasosComprador = [
    "Catálogo",
    "Orden",
    "Pagar",
    "Comprobante",
    "Seguimiento",
  ];

  // Dentro de un recorrido la barra sale de sus pasos; fuera, solo el flujo del comprador la muestra.
  const recorrido = useRecorrido();
  const barra = recorrido
    ? { pasos: recorrido.pasos.map((p) => p.etiqueta), actual: recorrido.numero }
    : !esProveedor && paso
    ? { pasos: pasosComprador, actual: paso }
    : null;

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#F8F9FA" }}>
      {/* Header */}
      <header style={{ backgroundColor: "#1A3A5C" }} className="px-4 py-3 flex items-center justify-between">
        <Image src="/Asset_3.png" alt="CertezaMX" width={180} height={50} className="object-contain" />
        {esProveedor && (
          <span className="text-xs text-white opacity-70 bg-white bg-opacity-10 px-2 py-1 rounded">
            Vista Proveedor
          </span>
        )}
      </header>

      {/* Barra de progreso */}
      {barra && <BarraDePasos pasos={barra.pasos} actual={barra.actual} />}

      {/* Contenido */}
      <main className="flex-1 px-4 py-6 max-w-lg mx-auto w-full">
        {titulo && (
          <h1 className="text-xl font-bold mb-4" style={{ color: "#1A3A5C" }}>
            {titulo}
          </h1>
        )}
        {children}
      </main>

      {/* Botón volver al inicio */}
      <div className="px-4 pb-4 max-w-lg mx-auto w-full">
        <Link href="/demo">
          <button className="w-full py-2 text-sm rounded-lg border" style={{ borderColor: "#1A3A5C", color: "#1A3A5C" }}>
            ← Volver al inicio del demo
          </button>
        </Link>
      </div>

      {/* Footer MODO DEMO */}
      <footer className="py-3 text-center" style={{ backgroundColor: "#1A3A5C" }}>
        <p className="text-xs text-white opacity-60">
          MODO DEMO — Esta es una simulación de CertezaMX. Ningún dato es real.
        </p>
      </footer>
    </div>
  );
}
