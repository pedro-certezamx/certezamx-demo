"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import DemoLayout from "../../components/DemoLayout";
import NotificacionSimulada from "../../components/NotificacionSimulada";
import { ORDEN } from "../../lib/demoData";
import { notificacionesActivadas } from "../../lib/notificacionesDemo";
import { useRecorrido } from "../../lib/recorridos";

const TIMELINE = [
  { texto: "Orden creada", completado: true, timestamp: "28 jun 2026 · 10:42 a.m." },
  { texto: "Pago notificado", completado: true, timestamp: "28 jun 2026 · 10:51 a.m." },
  { texto: "Proveedor declaró recepción del pago", completado: false, timestamp: null },
  { texto: "En preparación", completado: false, timestamp: null },
  { texto: "Entregado — Constancia emitida", completado: false, timestamp: null },
];

export default function Estado() {
  const recorrido = useRecorrido();
  // Elección hecha en Pagar; null mientras se lee, para no mostrar un aviso que luego desaparezca.
  const [avisosActivos, setAvisosActivos] = useState(null);

  useEffect(() => {
    setAvisosActivos(notificacionesActivadas());
  }, []);

  return (
    <DemoLayout paso={5} titulo={`Orden ${ORDEN.folio}`}>
      <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 mb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-bold" style={{ color: "#1A3A5C" }}>Estado actual:</span>
          <span
            className="text-xs px-2 py-0.5 rounded-full font-semibold"
            style={{ backgroundColor: "#FEF3C7", color: "#92400E" }}
          >
            📤 Pago notificado
          </span>
        </div>
        <p className="text-xs text-gray-500">El proveedor verificará la recepción en su cuenta bancaria.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 mb-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">Historial de la orden</p>
        <div className="space-y-4">
          {TIMELINE.map((item, i) => (
            <div key={i} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                  style={{
                    backgroundColor: item.completado ? "#C8890A" : "#E5E7EB",
                    color: item.completado ? "white" : "#9CA3AF",
                  }}
                >
                  {item.completado ? "✓" : "○"}
                </div>
                {i < TIMELINE.length - 1 && (
                  <div
                    className="w-0.5 mt-1"
                    style={{
                      height: "28px",
                      backgroundColor: item.completado ? "#C8890A" : "#E5E7EB",
                    }}
                  />
                )}
              </div>
              <div className="pb-2">
                <p
                  className="text-sm font-medium"
                  style={{ color: item.completado ? "#1A3A5C" : "#9CA3AF" }}
                >
                  {item.texto}
                </p>
                {item.timestamp && (
                  <p className="text-xs text-gray-400">{item.timestamp}</p>
                )}
                {!item.completado && (
                  <p className="text-xs text-gray-300">Pendiente</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {recorrido?.siguiente ? (
        // En el recorrido del comprador: el aviso de la Constancia (texto real del push) solo llega
        // si permitió las notificaciones en Pagar.
        <>
          {avisosActivos === true && (
            <NotificacionSimulada
              etiqueta="Notificación simulada · así te avisamos cuando tu Constancia está lista"
              titulo="Tu constancia está lista"
              cuerpo={`Tu Constancia de Evidencia Documental de la orden ${ORDEN.folio} ya está lista.`}
            />
          )}
          {/* "Ahora no", "No permitir" o sin elegir: no llega el aviso de la Constancia. */}
          {avisosActivos === false && (
            <div className="p-3 rounded-lg bg-amber-50 border border-amber-100 mb-4">
              <p className="text-xs text-amber-800">
                No activaste las notificaciones: tendrás que volver a entrar a tu orden para saber cuándo tu Constancia esté lista.
              </p>
            </div>
          )}
          <Link href={recorrido.siguiente}>
            <button
              className="w-full py-3 rounded-lg font-bold text-white"
              style={{ backgroundColor: "#16a34a" }}
            >
              Ver mi Constancia ›
            </button>
          </Link>
        </>
      ) : (
        <div className="p-3 rounded-lg bg-blue-50 border border-blue-100">
          <p className="text-xs text-blue-700">
            💡 <strong>¿Eres el proveedor?</strong> Mira cómo se ve tu panel de gestión:
          </p>
          <Link href="/demo/proveedor">
            <button
              className="mt-2 w-full py-2 rounded-lg text-sm font-semibold text-white"
              style={{ backgroundColor: "#1A3A5C" }}
            >
              Ver panel del proveedor →
            </button>
          </Link>
        </div>
      )}
    </DemoLayout>
  );
}
