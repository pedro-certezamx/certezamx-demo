"use client";
import Link from "next/link";
import DemoLayout from "../../components/DemoLayout";
import { ORDEN, PROVEEDOR } from "../../lib/demoData";

function Campo({ label, valor }) {
  return (
    <div className="mb-3">
      <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
        {label}
      </label>
      <div
        className="w-full px-3 py-2.5 rounded-lg border text-sm bg-gray-50"
        style={{ borderColor: "#e5e7eb", color: "#374151" }}
      >
        {valor}
      </div>
    </div>
  );
}

export default function Orden() {
  return (
    <DemoLayout paso={2} titulo="Confirma tu orden">
      <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 mb-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Tu información</p>
        <Campo label="Nombre completo" valor={ORDEN.cliente.nombre} />
        <Campo label="WhatsApp" valor={ORDEN.cliente.whatsapp} />

        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3 mt-4">¿Quién recibe?</p>
        <Campo label="Nombre del destinatario de la entrega" valor={ORDEN.destinatario.nombre} />
        <Campo label="Municipio de entrega" valor={ORDEN.destinatario.municipio} />
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 mb-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Resumen del pedido</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-700">{ORDEN.producto.nombre}</span>
          <span className="font-bold" style={{ color: "#C8890A" }}>${ORDEN.producto.precio} MXN</span>
        </div>
        <div className="flex justify-between items-center mt-1">
          <span className="text-sm text-gray-500">Proveedor</span>
          <span className="text-sm text-gray-700">{PROVEEDOR.nombre}</span>
        </div>
      </div>

      <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 mb-4">
        <p className="text-xs text-amber-800">
          ℹ️ Al confirmar, CertezaMX registrará esta orden. El pago lo realizarás directamente al proveedor con la institución financiera regulada de tu elección.
        </p>
      </div>

      <Link href="/demo/pagar">
        <button
          className="w-full py-3 rounded-lg font-bold text-white"
          style={{ backgroundColor: "#C8890A" }}
        >
          Confirmar orden →
        </button>
      </Link>
    </DemoLayout>
  );
}
