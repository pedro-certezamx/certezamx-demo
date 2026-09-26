"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import DemoLayout from "../../components/DemoLayout";
import InvitacionNotificaciones from "../../components/InvitacionNotificaciones";
import { PROVEEDOR, ORDEN } from "../../lib/demoData";
import { obtenerCarrito } from "../../lib/carrito";
import { guardarNotificacionesActivadas } from "../../lib/notificacionesDemo";
import { useRecorrido } from "../../lib/recorridos";

function formatearPrecio(valor) {
  return Number(valor).toLocaleString("es-MX", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function Pagar() {
  const [carrito, setCarrito] = useState(null);
  const recorrido = useRecorrido();

  useEffect(() => {
    setCarrito(obtenerCarrito());
  }, []);

  return (
    <DemoLayout paso={3} titulo="Realiza tu pago">
      {/* En el recorrido: invitación a activar notificaciones, en el mismo punto que la app real
          (textos de bloque-notificaciones.js). */}
      {recorrido && (
        <InvitacionNotificaciones
          etiqueta="Recomendado · así sabrás al instante cuando tu Constancia esté lista"
          titulo="🔔 Te mantenemos informado de tu orden"
          texto="Te avisamos cuando el proveedor declare recepción de tu pago y cuando tu pedido esté listo."
          pasoIphone
          onDecidir={guardarNotificacionesActivadas}
        />
      )}

      <div className="p-3 rounded-lg bg-blue-50 border border-blue-100 mb-4">
        <p className="text-sm text-blue-800">
          Realiza tu pago directamente a <strong>{PROVEEDOR.nombre}</strong>, por los medios que él acepte.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-4 overflow-hidden">
        <div className="px-4 py-3" style={{ backgroundColor: "#1A3A5C" }}>
          <p className="text-white text-sm font-semibold">Datos bancarios del proveedor</p>
        </div>
        <div className="p-4 space-y-3">
          {!carrito ? (
            <div className="space-y-3 animate-pulse">
              <div className="h-4 bg-gray-100 rounded w-2/3" />
              <div className="h-4 bg-gray-100 rounded w-1/2" />
              <div className="h-4 bg-gray-100 rounded w-3/4" />
            </div>
          ) : (
            [
              { label: "Banco", valor: PROVEEDOR.banco },
              { label: "CLABE interbancaria", valor: PROVEEDOR.clabe },
              { label: "Titular de la cuenta", valor: PROVEEDOR.titular },
              { label: "Número de cuenta", valor: PROVEEDOR.cuenta },
              { label: "Número de tarjeta", valor: PROVEEDOR.numero_tarjeta },
              { label: "Monto a transferir", valor: `$${formatearPrecio(carrito.valorTotal)} MXN` },
              { label: "Concepto sugerido", valor: `Orden ${ORDEN.folio}` },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">{item.label}</p>
                <p className="text-sm font-medium text-gray-800 mt-0.5">{item.valor}</p>
              </div>
            ))
          )}
        </div>
      </div>

      <p className="text-xs text-gray-400 mb-4 text-center">
        CertezaMX no procesa ni toca tu pago. Solo documentamos lo que declaran las partes.
      </p>

      {carrito && (
        <Link href={recorrido?.siguiente ?? "/demo/comprobante"}>
          <button
            className="w-full py-3 rounded-lg font-bold text-white"
            style={{ backgroundColor: "#C8890A" }}
          >
            Ya realicé mi pago →
          </button>
        </Link>
      )}
    </DemoLayout>
  );
}
