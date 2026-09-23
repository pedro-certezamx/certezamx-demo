"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import DemoLayout from "../../components/DemoLayout";
import { PRODUCTOS, PROVEEDOR } from "../../lib/demoData";

function formatearPrecio(valor) {
  return Number(valor).toLocaleString("es-MX", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function Stepper({ cantidad, onCambiar }) {
  if (cantidad === 0) {
    return (
      <button
        type="button"
        onClick={() => onCambiar(1)}
        className="w-full py-2 rounded-lg font-semibold text-white text-sm"
        style={{ backgroundColor: "#C8890A" }}
      >
        + Agregar
      </button>
    );
  }

  return (
    <div className="flex items-center justify-between gap-2">
      <button
        type="button"
        aria-label="Quitar uno"
        onClick={() => onCambiar(cantidad - 1)}
        className="w-8 h-8 rounded-lg border flex items-center justify-center text-gray-700"
        style={{ borderColor: "#e5e7eb" }}
      >
        −
      </button>
      <span className="text-sm font-bold" style={{ color: "#1A3A5C" }}>{cantidad}</span>
      <button
        type="button"
        aria-label="Agregar uno"
        onClick={() => onCambiar(cantidad + 1)}
        className="w-8 h-8 rounded-lg border flex items-center justify-center text-gray-700"
        style={{ borderColor: "#e5e7eb" }}
      >
        +
      </button>
    </div>
  );
}

function TarjetaProducto({ producto, cantidad, onCambiar }) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 flex flex-col">
      <img src={producto.foto} alt={producto.nombre} className="w-full aspect-square object-cover" />
      <div className="p-3 flex flex-col gap-2 flex-1">
        <p className="text-sm font-medium leading-snug" style={{ color: "#1A3A5C" }}>
          {producto.nombre}
        </p>
        <div className="mt-auto">
          <p className="text-sm font-bold" style={{ color: "#1A3A5C" }}>
            ${formatearPrecio(producto.precio)}{" "}
            <span className="text-xs font-normal text-gray-500">/ {producto.unidad_medida}</span>
          </p>
          <p className="text-xs text-gray-400">Precio incluye IVA</p>
        </div>
        <Stepper cantidad={cantidad} onCambiar={onCambiar} />
      </div>
    </div>
  );
}

export default function Catalogo() {
  const router = useRouter();
  const [cantidades, setCantidades] = useState({});

  const actualizarCantidad = (id, cantidad) => {
    setCantidades((prev) => ({ ...prev, [id]: Math.max(0, cantidad) }));
  };

  const totalArticulos = PRODUCTOS.reduce((suma, p) => suma + (cantidades[p.id] || 0), 0);
  const valorTotal = PRODUCTOS.reduce(
    (suma, p) => suma + p.precio * (cantidades[p.id] || 0),
    0
  );

  return (
    <DemoLayout paso={1}>
      <p className="text-xs uppercase tracking-wide text-gray-400 font-semibold mb-1">
        Catálogo del proveedor
      </p>
      <h1 className="text-xl font-bold mb-4" style={{ color: "#1A3A5C" }}>
        {PROVEEDOR.nombre}
      </h1>

      <div className="grid grid-cols-2 gap-3">
        {PRODUCTOS.map((producto) => (
          <TarjetaProducto
            key={producto.id}
            producto={producto}
            cantidad={cantidades[producto.id] || 0}
            onCambiar={(cantidad) => actualizarCantidad(producto.id, cantidad)}
          />
        ))}
      </div>

      {totalArticulos > 0 && (
        <div className="mt-4 rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-sm">
          <p className="text-sm font-medium text-gray-800 mb-2">
            {totalArticulos} {totalArticulos === 1 ? "producto" : "productos"} —{" "}
            <span className="font-bold" style={{ color: "#1A3A5C" }}>${formatearPrecio(valorTotal)} MXN</span>
          </p>
          <button
            type="button"
            onClick={() => router.push("/demo/orden")}
            className="w-full py-2.5 px-4 rounded-lg font-semibold text-white text-sm"
            style={{ backgroundColor: "#1A3A5C" }}
          >
            Continuar a Formulario de Orden →
          </button>
        </div>
      )}
    </DemoLayout>
  );
}
