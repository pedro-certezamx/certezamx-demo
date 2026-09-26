"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import DemoLayout from "../../components/DemoLayout";
import InvitacionNotificaciones from "../../components/InvitacionNotificaciones";
import NotificacionSimulada from "../../components/NotificacionSimulada";
import { ORDEN, PROVEEDOR } from "../../lib/demoData";
import { obtenerCarrito, resumenProductos } from "../../lib/carrito";
import { useRecorrido } from "../../lib/recorridos";

function formatearPrecio(valor) {
  return Number(valor).toLocaleString("es-MX", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

// Mismo cuerpo que enviarPushNuevaOrdenProveedor() en la app real.
function cuerpoPushNuevaOrden(carrito) {
  const productosTexto =
    (carrito.productos ?? []).map((p) => `${p.nombre} x${p.cantidad}`).join(", ") || "Sin detalle";
  return `Nueva orden ${ORDEN.folio} de ${ORDEN.cliente.nombre}. Productos: ${productosTexto}. Total declarado: $${Number(carrito.valorTotal).toLocaleString("es-MX")} MXN. Recuerda la importancia de recabar la evidencia para tus clientes.`;
}

export default function ProveedorDashboard() {
  const [carrito, setCarrito] = useState(null);
  const recorrido = useRecorrido();
  // En el recorrido el aviso "Nueva orden" solo llega si permite las notificaciones; en /demo sale al cargar.
  const [avisosActivos, setAvisosActivos] = useState(false);
  const mostrarAviso = recorrido ? avisosActivos : true;

  useEffect(() => {
    setCarrito(obtenerCarrito());
  }, []);

  return (
    <DemoLayout esProveedor titulo={`Panel de ${PROVEEDOR.nombre}`}>
      {/* En el recorrido: invitación a activar notificaciones, en el mismo punto que la app real
          (textos de BloqueNotificacionesProveedor.js). */}
      {recorrido && (
        <InvitacionNotificaciones
          etiqueta="Recomendado · así te enteras al instante de cada orden nueva"
          titulo="🔔 Recibe avisos de tus órdenes al instante"
          texto="Te avisamos cuando entre una orden nueva, cuando el cliente notifique su pago, y cuando debas subir evidencia de entrega."
          nota="Cada orden nueva te llega por correo y, si activas las notificaciones, también a tu celular. Los avisos de pago y de entrega llegan a tu celular."
          onDecidir={setAvisosActivos}
        />
      )}

      {carrito && mostrarAviso && <NotificacionSimulada titulo="Nueva orden" cuerpo={cuerpoPushNuevaOrden(carrito)} />}

      <div
        className="rounded-xl p-4 mb-4 text-white"
        style={{ backgroundColor: "#1A3A5C" }}
      >
        <p className="text-sm opacity-80">Bienvenido,</p>
        <p className="text-lg font-bold">{PROVEEDOR.nombre}</p>
        <p className="text-xs opacity-60 mt-1">Panel de gestión de órdenes</p>
      </div>

      <p className="text-sm font-semibold mb-3" style={{ color: "#1A3A5C" }}>Órdenes activas (1)</p>

      {!carrito ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 animate-pulse space-y-3">
          <div className="h-4 bg-gray-100 rounded w-1/2" />
          <div className="h-4 bg-gray-100 rounded w-3/4" />
          <div className="h-4 bg-gray-100 rounded w-2/3" />
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">{ORDEN.folio}</span>
            <span
              className="text-xs px-2 py-0.5 rounded-full font-semibold"
              style={{ backgroundColor: "#FEF3C7", color: "#92400E" }}
            >
              Acción requerida
            </span>
          </div>
          <div className="p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-sm font-bold" style={{ color: "#1A3A5C" }}>
                  {ORDEN.cliente.nombre}
                </p>
                <p className="text-xs text-gray-500">{resumenProductos(carrito)}</p>
                <p className="text-xs text-gray-400">Para: {ORDEN.destinatario.nombre} · {ORDEN.destinatario.municipio}</p>
              </div>
              <span className="text-lg font-bold" style={{ color: "#C8890A" }}>
                ${formatearPrecio(carrito.valorTotal)} MXN
              </span>
            </div>

            <div className="p-2 rounded-lg bg-amber-50 border border-amber-100 mb-3">
              <p className="text-xs text-amber-800">
                📱 El comprador declaró haber pagado. Revisa tu cuenta bancaria y declara la recepción.
              </p>
            </div>

            <Link href={recorrido?.siguiente ?? "/demo/proveedor/declarar"}>
              <button
                className="w-full py-2.5 rounded-lg font-bold text-white"
                style={{ backgroundColor: "#C8890A" }}
              >
                Gestionar orden →
              </button>
            </Link>
          </div>
        </div>
      )}
    </DemoLayout>
  );
}
