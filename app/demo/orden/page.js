"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import DemoLayout from "../../components/DemoLayout";
import { ORDEN, PROVEEDOR } from "../../lib/demoData";
import { obtenerCarrito } from "../../lib/carrito";

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

function formatearPrecio(valor) {
  return Number(valor).toLocaleString("es-MX", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function Orden() {
  const [carrito, setCarrito] = useState(null);

  useEffect(() => {
    setCarrito(obtenerCarrito());
  }, []);

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
        {!carrito ? (
          <div className="space-y-2 animate-pulse">
            <div className="h-4 bg-gray-100 rounded w-3/4" />
            <div className="h-4 bg-gray-100 rounded w-1/2" />
          </div>
        ) : (
          <>
            {carrito.productos.map((producto) => (
              <div key={producto.id} className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-700">
                  {producto.nombre} <span className="text-gray-400">× {producto.cantidad}</span>
                </span>
                <span className="text-sm font-medium text-gray-800">
                  ${formatearPrecio(producto.precio * producto.cantidad)} MXN
                </span>
              </div>
            ))}
            <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-100">
              <span className="text-sm font-semibold" style={{ color: "#1A3A5C" }}>Total</span>
              <span className="font-bold" style={{ color: "#C8890A" }}>${formatearPrecio(carrito.valorTotal)} MXN</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-gray-500">Proveedor</span>
              <span className="text-sm text-gray-700">{PROVEEDOR.nombre}</span>
            </div>
          </>
        )}
      </div>

      <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 mb-4">
        <p className="text-xs text-amber-800">
          ℹ️ Al confirmar, CertezaMX registrará esta orden. El pago lo realizarás directamente al proveedor, por los medios que él acepte.
        </p>
      </div>

      {carrito && (
        <Link href="/demo/pagar">
          <button
            className="w-full py-3 rounded-lg font-bold text-white"
            style={{ backgroundColor: "#C8890A" }}
          >
            Confirmar orden →
          </button>
        </Link>
      )}
    </DemoLayout>
  );
}
