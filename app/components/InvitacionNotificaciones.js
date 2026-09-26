"use client";
import { useState } from "react";

// Simula la invitación a activar notificaciones de la app real (bloque-notificaciones.js y
// BloqueNotificacionesProveedor.js) y la ventana de permiso del celular. Solo es visual:
// no usa la API Notification ni registra suscripciones.
export default function InvitacionNotificaciones({ etiqueta, titulo, texto, pasoIphone = false, nota, onDecidir }) {
  const [estado, setEstado] = useState("invitacion"); // invitacion | ventana | activadas | descartada

  function decidir(activadas) {
    setEstado(activadas ? "activadas" : "descartada");
    onDecidir?.(activadas);
  }

  // Como en la app real, al decir que no el bloque desaparece sin mensaje; solo queda la nota,
  // si la hay, para que siga claro por dónde llegan los avisos.
  if (estado === "descartada") {
    return nota ? <p className="mb-4 text-xs text-gray-400">{nota}</p> : null;
  }

  if (estado === "activadas") {
    return (
      <p className="mb-4 text-sm font-medium text-green-700 text-center">
        ✓ Notificaciones activadas (simulado)
      </p>
    );
  }

  return (
    <div className="mb-4">
      <div
        className="mb-1.5 mx-auto w-fit max-w-full rounded-lg px-3 py-1 text-center text-xs"
        style={{ backgroundColor: "#FEF3C7", color: "#92400E" }}
      >
        <p className="font-semibold">{etiqueta}</p>
        <p>Solo te avisamos, no tienes que contestar nada.</p>
      </div>

      <section className="rounded-lg border border-gray-200 bg-white p-4">
        <p className="font-semibold text-gray-900">{titulo}</p>
        <p className="mt-1 text-sm text-gray-600">{texto}</p>
        <div className="mt-3 flex gap-3">
          <button
            type="button"
            onClick={() => setEstado("ventana")}
            className="rounded-md px-4 py-2 text-sm font-medium text-white"
            style={{ backgroundColor: "#1A3A5C" }}
          >
            Activar notificaciones
          </button>
          <button
            type="button"
            onClick={() => decidir(false)}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600"
          >
            Ahora no
          </button>
        </div>
      </section>

      {nota && <p className="mt-2 text-xs text-gray-400">{nota}</p>}

      {estado === "ventana" && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/60 px-6">
          <p
            className="mb-2 rounded-full px-3 py-1 text-xs font-semibold"
            style={{ backgroundColor: "#FEF3C7", color: "#92400E" }}
          >
            Ventana simulada · en la app real la muestra tu celular
          </p>
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="ventana-permiso-titulo"
            className="w-full max-w-xs overflow-hidden rounded-2xl bg-white text-center shadow-xl"
          >
            <div className="px-5 py-4">
              <p id="ventana-permiso-titulo" className="text-sm font-semibold text-gray-900">
                &quot;CertezaMX&quot; quiere enviarte notificaciones
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Pueden incluir alertas, sonidos e indicadores en el ícono.
              </p>
              {pasoIphone && (
                <p className="mt-3 rounded-lg bg-gray-100 px-3 py-2 text-left text-xs text-gray-700">
                  📲 En iPhone, antes de esta ventana te pedimos agregar CertezaMX a tu pantalla de inicio (Compartir → &quot;Agregar a pantalla de inicio&quot;).
                </p>
              )}
            </div>
            {/* Las dos opciones con el mismo peso: el celular deja decidir libremente. */}
            <div className="grid grid-cols-2 border-t border-gray-200 text-sm font-medium" style={{ color: "#1A3A5C" }}>
              <button type="button" onClick={() => decidir(false)} className="py-3 border-r border-gray-200">
                No permitir
              </button>
              <button type="button" onClick={() => decidir(true)} className="py-3">
                Permitir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
