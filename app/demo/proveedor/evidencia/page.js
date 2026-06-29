"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import DemoLayout from "../../../components/DemoLayout";

export default function Evidencia() {
  const [enviado, setEnviado] = useState(false);
  const router = useRouter();

  const handleEnviar = () => {
    setEnviado(true);
    setTimeout(() => router.push("/demo/constancia"), 3000);
  };

  return (
    <DemoLayout esProveedor titulo="Sube evidencia de entrega">
      <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 text-center mb-4">
        {!enviado ? (
          <>
            <div className="text-5xl mb-3">📸</div>
            <p className="text-sm font-medium text-gray-700 mb-1">Sube foto de la entrega completada</p>
            <p className="text-xs text-gray-400 mb-5">
              Puede ser la foto del arreglo entregado, firma de recibido, o cualquier evidencia del servicio prestado.
            </p>

            <div
              className="border-2 border-dashed rounded-xl py-8 px-4 mb-4"
              style={{ borderColor: "#C8890A" }}
            >
              <p className="text-sm text-gray-400">📷 Toca para agregar foto</p>
              <p className="text-xs text-gray-300 mt-1">JPG, PNG — máx. 10 MB</p>
            </div>

            <button
              onClick={handleEnviar}
              className="w-full py-3 rounded-lg font-bold text-white"
              style={{ backgroundColor: "#C8890A" }}
            >
              Subir evidencia →
            </button>
          </>
        ) : (
          <div className="py-6">
            <div className="text-5xl mb-3">✅</div>
            <p className="text-lg font-bold" style={{ color: "#1A3A5C" }}>Evidencia enviada ✓</p>
            <p className="text-sm text-gray-500 mt-1">Generando Constancia de Evidencia Documental…</p>
          </div>
        )}
      </div>
    </DemoLayout>
  );
}
