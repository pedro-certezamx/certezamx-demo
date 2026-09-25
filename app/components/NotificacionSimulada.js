"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

// Imita el push que el service worker de la app real muestra con
// showNotification(). Solo es visual: no usa la API Notification ni
// pide permisos al navegador. Va dentro de la página, arriba del panel,
// ocupando su propio espacio para no tapar nada.
export default function NotificacionSimulada({ titulo, cuerpo }) {
  const [montada, setMontada] = useState(true);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const cuadro = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(cuadro);
  }, []);

  function cerrar() {
    setVisible(false);
    setTimeout(() => setMontada(false), 300);
  }

  if (!montada) return null;

  return (
    <div
      className="mb-4 transition-all duration-300 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-8px)",
      }}
    >
      <p
        className="text-center text-xs font-semibold mb-1.5 px-2 py-1 rounded-full mx-auto w-fit"
        style={{ backgroundColor: "#FEF3C7", color: "#92400E" }}
      >
        Notificación simulada · así te llega cada nueva orden
      </p>
      <div
        role="status"
        onClick={cerrar}
        className="cursor-pointer bg-white rounded-2xl shadow-sm border-2 border-dashed p-3 flex gap-3"
        style={{ borderColor: "#C8890A" }}
      >
        <Image
          src="/Asset_1.png"
          alt="CertezaMX"
          width={36}
          height={36}
          className="rounded-lg object-contain shrink-0 self-start"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-500">CertezaMX · ahora</p>
            <button
              type="button"
              aria-label="Cerrar"
              onClick={(e) => {
                e.stopPropagation();
                cerrar();
              }}
              className="text-gray-400 text-sm leading-none px-1"
            >
              ×
            </button>
          </div>
          <p className="text-sm font-bold" style={{ color: "#1A3A5C" }}>
            {titulo}
          </p>
          <p className="text-xs text-gray-700 mt-0.5">{cuerpo}</p>
        </div>
      </div>
    </div>
  );
}
