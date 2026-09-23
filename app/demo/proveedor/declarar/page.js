"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import DemoLayout from "../../../components/DemoLayout";
import { ORDEN, PROVEEDOR } from "../../../lib/demoData";

export default function Declarar() {
  const [declarado, setDeclarado] = useState(false);
  const router = useRouter();

  const handleDeclarar = () => {
    setDeclarado(true);
    setTimeout(() => router.push("/demo/proveedor/evidencia"), 3000);
  };

  return (
    <DemoLayout esProveedor titulo="Declarar recepción de pago">
      <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 mb-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Detalles de la orden</p>
        {[
          { label: "Folio", valor: ORDEN.folio },
          { label: "Comprador", valor: ORDEN.cliente.nombre },
          { label: "Producto", valor: ORDEN.producto.nombre },
          { label: "Monto declarado por el comprador", valor: `$${ORDEN.valor}.00 MXN` },
          { label: "Destinatario de la entrega", valor: ORDEN.destinatario.nombre },
          { label: "Municipio", valor: ORDEN.destinatario.municipio },
        ].map((item) => (
          <div key={item.label} className="flex justify-between py-2 border-b border-gray-50 last:border-0">
            <span className="text-xs text-gray-500">{item.label}</span>
            <span className="text-xs font-medium text-gray-800">{item.valor}</span>
          </div>
        ))}
      </div>

      <div className="p-3 rounded-lg bg-blue-50 border border-blue-100 mb-4">
        <p className="text-sm text-blue-800">
          ℹ️ <strong>Verifica en tu cuenta bancaria</strong> de {PROVEEDOR.banco} que efectivamente recibiste el pago antes de declarar.
        </p>
      </div>

      {!declarado ? (
        <button
          onClick={handleDeclarar}
          className="w-full py-3 rounded-lg font-bold text-white"
          style={{ backgroundColor: "#1A3A5C" }}
        >
          Confirmar recepción de pago →
        </button>
      ) : (
        <div className="text-center py-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="text-4xl mb-2">✅</div>
          <p className="font-bold" style={{ color: "#1A3A5C" }}>Recepción declarada</p>
          <p className="text-sm text-gray-500 mt-1">Redirigiendo…</p>
        </div>
      )}

      <p className="text-xs text-gray-400 text-center mt-3">
        Al declarar, CertezaMX registra tu declaración. No validamos el pago de manera independiente — documentamos lo que declaras.
      </p>
    </DemoLayout>
  );
}
