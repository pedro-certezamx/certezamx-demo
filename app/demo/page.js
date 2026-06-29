import Link from "next/link";
import Image from "next/image";
import { PROVEEDOR } from "../lib/demoData";

export default function DemoHome() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#F8F9FA" }}>
      {/* Header */}
      <header style={{ backgroundColor: "#1A3A5C" }} className="px-4 py-4">
        <Image src="/Asset_3.png" alt="CertezaMX" width={180} height={50} className="object-contain" />
        <p className="text-white text-sm mt-1 opacity-80">Plataforma de gestión documental de compras</p>
      </header>

      <main className="flex-1 px-4 py-6 max-w-lg mx-auto w-full">
        <h2 className="text-lg font-bold mb-1" style={{ color: "#1A3A5C" }}>Proveedores verificados</h2>
        <p className="text-sm text-gray-500 mb-4">Navega catálogos y documenta tu compra con certeza.</p>

        {/* Card proveedor */}
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg font-bold" style={{ color: "#1A3A5C" }}>{PROVEEDOR.nombre}</span>
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-semibold"
                  style={{ backgroundColor: "#C8890A", color: "white" }}
                >
                  Verificado ✓
                </span>
              </div>
              <p className="text-sm text-gray-500">🌸 Floristería · {PROVEEDOR.municipio}</p>
              <p className="text-sm text-yellow-600 mt-1">⭐ {PROVEEDOR.calificacion} / 5.0</p>
            </div>
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xl"
              style={{ backgroundColor: "#1A3A5C" }}
            >
              🌺
            </div>
          </div>

          <Link href="/demo/catalogo">
            <button
              className="w-full mt-4 py-2.5 rounded-lg font-semibold text-white"
              style={{ backgroundColor: "#C8890A" }}
            >
              Ver catálogo →
            </button>
          </Link>
        </div>

        <div className="mt-6 p-3 rounded-lg bg-blue-50 border border-blue-100">
          <p className="text-xs text-blue-700">
            <strong>¿Cómo funciona?</strong> Navega el catálogo, genera tu orden, paga directo al proveedor con tu método preferido, y CertezaMX documenta todo el proceso. Sin intermediarios en tu pago.
          </p>
        </div>
      </main>

      <footer className="py-3 text-center" style={{ backgroundColor: "#1A3A5C" }}>
        <p className="text-xs text-white opacity-60">
          MODO DEMO — Esta es una simulación de CertezaMX. Ningún dato es real.
        </p>
      </footer>
    </div>
  );
}
