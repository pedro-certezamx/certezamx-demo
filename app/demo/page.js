"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { PROVEEDORES } from "../lib/demoData";
import { limpiarCarrito } from "../lib/carrito";
import { limpiarNotificaciones } from "../lib/notificacionesDemo";
import { useRecorrido } from "../lib/recorridos";
import { FranjaEjemplo } from "../components/DemoLayout";

const ESTADOS_PILOTO = ["Puebla", "Tlaxcala"];

function TarjetaProveedor({ proveedor, hrefCatalogo }) {
  const { nombre, giro, municipio, estado, calificacion, verificado, catalogoDisponible } = proveedor;

  const contenido = (
    <div
      className={`flex flex-col gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm ${
        catalogoDisponible ? "hover:shadow-md transition-shadow" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg font-semibold text-white"
          style={{ backgroundColor: "#1A3A5C" }}
        >
          {nombre.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0">
          <h3 className="truncate font-semibold" style={{ color: "#1A3A5C" }}>{nombre}</h3>
          <p className="truncate text-sm text-gray-500">{giro}</p>
        </div>
      </div>

      <p className="text-sm text-gray-500">{municipio}, {estado}</p>

      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1 text-sm font-medium text-gray-800">
          <span style={{ color: "#C8890A" }}>★</span>
          {calificacion.toFixed(1)}
        </span>
        {verificado && (
          <span
            className="rounded-full px-2 py-0.5 text-xs font-semibold"
            style={{ backgroundColor: "#C8890A", color: "white" }}
          >
            Verificado ✓
          </span>
        )}
      </div>

      {!catalogoDisponible && (
        <p className="text-xs text-gray-400">Catálogo no disponible en la demo</p>
      )}
    </div>
  );

  return catalogoDisponible ? <Link href={hrefCatalogo}>{contenido}</Link> : contenido;
}

export default function DemoHome() {
  const [filtroGiro, setFiltroGiro] = useState("");
  const [filtroMunicipio, setFiltroMunicipio] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");
  const recorrido = useRecorrido();
  const hrefCatalogo = recorrido?.siguiente ?? "/demo/catalogo";

  useEffect(() => {
    limpiarCarrito();
    limpiarNotificaciones();
  }, []);

  const proveedoresFiltrados = PROVEEDORES.filter((p) => {
    const matchGiro = p.giro.toLowerCase().includes(filtroGiro.toLowerCase());
    const matchMunicipio = p.municipio.toLowerCase().includes(filtroMunicipio.toLowerCase());
    const matchEstado = !filtroEstado || p.estado === filtroEstado;
    return matchGiro && matchMunicipio && matchEstado;
  });

  const limpiarFiltros = () => {
    setFiltroGiro("");
    setFiltroMunicipio("");
    setFiltroEstado("");
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#F8F9FA" }}>
      <header style={{ backgroundColor: "#1A3A5C" }} className="px-4 py-6">
        <Image src="/Asset_3.png" alt="CertezaMX" width={180} height={50} className="object-contain" />
        <h1 className="text-white text-xl font-semibold mt-3">Explorar Proveedores</h1>
        <p className="text-white text-sm mt-1 opacity-80">Encuentra proveedores verificados en México</p>
      </header>

      {recorrido?.franja && <FranjaEjemplo texto={recorrido.franja} />}

      <main className="flex-1 px-4 py-6 max-w-lg mx-auto w-full">
        <div className="mb-6 p-3 rounded-lg bg-blue-50 border border-blue-100">
          <p className="text-xs text-blue-700">
            <strong>¿Cómo funciona?</strong> Navega el catálogo, genera tu orden, paga directo al proveedor por los medios que él acepte, y CertezaMX documenta todo el proceso. Sin intermediarios en tu pago.
          </p>
        </div>

        <form className="flex flex-col gap-3 mb-6" role="search" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            value={filtroGiro}
            onChange={(e) => setFiltroGiro(e.target.value)}
            placeholder="Giro (ej. Florería)"
            className="rounded-md border px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
            style={{ borderColor: "#e5e7eb" }}
          />
          <input
            type="text"
            value={filtroMunicipio}
            onChange={(e) => setFiltroMunicipio(e.target.value)}
            placeholder="Municipio"
            className="rounded-md border px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
            style={{ borderColor: "#e5e7eb" }}
          />
          <select
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
            className="rounded-md border px-3 py-2 text-sm text-gray-900 focus:outline-none"
            style={{ borderColor: "#e5e7eb" }}
          >
            <option value="">Todos los estados</option>
            {ESTADOS_PILOTO.map((estado) => (
              <option key={estado} value={estado}>{estado}</option>
            ))}
          </select>
        </form>

        {proveedoresFiltrados.length === 0 ? (
          <div className="mt-10 text-center text-gray-600">
            <p className="text-sm">No encontramos proveedores en esa zona aún.</p>
            <button
              onClick={limpiarFiltros}
              className="mt-2 text-sm font-medium underline"
              style={{ color: "#1A3A5C" }}
            >
              Ver todos
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {proveedoresFiltrados.map((proveedor) => (
              <TarjetaProveedor key={proveedor.id} proveedor={proveedor} hrefCatalogo={hrefCatalogo} />
            ))}
          </div>
        )}

        {/* Dentro del recorrido del comprador no se enlaza al lado del proveedor. */}
        {!recorrido && (
          <div className="mt-8 rounded-lg border border-gray-200 bg-white p-4 text-center">
            <p className="text-sm text-gray-500">¿Tienes un negocio?</p>
            <Link
              href="/demo/proveedor/registro"
              className="mt-1 inline-block text-sm font-medium underline"
              style={{ color: "#1A3A5C" }}
            >
              Solicitud de alta de proveedor →
            </Link>
          </div>
        )}
      </main>

      <footer className="py-3 text-center" style={{ backgroundColor: "#1A3A5C" }}>
        <p className="text-xs text-white opacity-60">
          MODO DEMO — Esta es una simulación de CertezaMX. Ningún dato es real.
        </p>
      </footer>
    </div>
  );
}
