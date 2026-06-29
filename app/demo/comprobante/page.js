"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import DemoLayout from "../../components/DemoLayout";

export default function Comprobante() {
  const [enviado, setEnviado] = useState(false);
  const router = useRouter();

  const handleEnviar = () => {
    setEnviado(true);
    setTimeout(() => router.push("/demo/estado"), 3000);
  };

  return (
    <DemoLayout paso={4} titulo="Sube tu comprobante">
      <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 text-center mb-4">
        {!enviado ? (
          <>
            <div className="text-5xl mb-3">📄</div>
            <p className="text-sm text-gray-600 mb-2 font-medium">Sube la foto o captura de pantalla de tu comprobante</p>
            <p className="text-xs text-gray-400 mb-5">
              Tu comprobante es almacenado como parte del expediente documental de tu orden. CertezaMX no extrae ni procesa datos del comprobante.
            </p>

            <div
              className="border-2 border-dashed rounded-xl py-8 px-4 mb-4"
              style={{ borderColor: "#C8890A" }}
            >
              <p className="text-sm text-gray-400">📸 Toca para seleccionar imagen</p>
              <p className="text-xs text-gray-300 mt-1">JPG, PNG, PDF — máx. 10 MB</p>
            </div>

            <button
              onClick={handleEnviar}
              className="w-full py-3 rounded-lg font-bold text-white"
              style={{ backgroundColor: "#1A3A5C" }}
            >
              Subir comprobante →
            </button>
          </>
        ) : (
          <div className="py-6">
            <div className="text-5xl mb-3">✅</div>
            <p className="text-lg font-bold" style={{ color: "#1A3A5C" }}>Comprobante enviado ✓</p>
            <p className="text-sm text-gray-500 mt-1">Redirigiendo al seguimiento de tu orden…</p>
          </div>
        )}
      </div>
    </DemoLayout>
  );
}
