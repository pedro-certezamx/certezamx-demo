"use client";
import Link from "next/link";
import DemoLayout from "../../components/DemoLayout";
import { ORDEN, PROVEEDOR } from "../../lib/demoData";

export default function ProveedorDashboard() {
  return (
    <DemoLayout esProveedor titulo={`Panel de ${PROVEEDOR.nombre}`}>
      <div
        className="rounded-xl p-4 mb-4 text-white"
        style={{ backgroundColor: "#1A3A5C" }}
      >
        <p className="text-sm opacity-80">Bienvenido,</p>
        <p className="text-lg font-bold">{PROVEEDOR.nombre}</p>
        <p className="text-xs opacity-60 mt-1">Panel de gestión de órdenes</p>
      </div>

      <p className="text-sm font-semibold mb-3" style={{ color: "#1A3A5C" }}>Órdenes activas (1)</p>

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
              <p className="text-xs text-gray-500">{ORDEN.producto.nombre}</p>
              <p className="text-xs text-gray-400">Para: {ORDEN.destinatario.nombre} · {ORDEN.destinatario.municipio}</p>
            </div>
            <span className="text-lg font-bold" style={{ color: "#C8890A" }}>
              ${ORDEN.valor} MXN
            </span>
          </div>

          <div className="p-2 rounded-lg bg-amber-50 border border-amber-100 mb-3">
            <p className="text-xs text-amber-800">
              📱 El comprador declaró haber pagado. Revisa tu cuenta bancaria y declara la recepción.
            </p>
          </div>

          <Link href="/demo/proveedor/declarar">
            <button
              className="w-full py-2.5 rounded-lg font-bold text-white"
              style={{ backgroundColor: "#C8890A" }}
            >
              Gestionar orden →
            </button>
          </Link>
        </div>
      </div>
    </DemoLayout>
  );
}
