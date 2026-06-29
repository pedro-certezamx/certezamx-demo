"use client";
import Link from "next/link";
import Image from "next/image";
import DemoLayout from "../../components/DemoLayout";
import { PRODUCTOS, PROVEEDOR } from "../../lib/demoData";

export default function Catalogo() {
  return (
    <DemoLayout paso={1} titulo={`Catálogo — ${PROVEEDOR.nombre}`}>
      <p className="text-sm text-gray-500 mb-4">
        Selecciona el producto que deseas enviar a tu familiar en México.
      </p>

      <div className="space-y-4">
        {PRODUCTOS.map((producto) => (
          <div key={producto.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
            <img
              src={producto.foto}
              alt={producto.nombre}
              className="w-full h-44 object-cover"
            />
            <div className="p-4">
              <div className="flex items-start justify-between mb-1">
                <h3 className="font-bold text-base" style={{ color: "#1A3A5C" }}>
                  {producto.nombre}
                </h3>
                <span className="font-bold text-lg" style={{ color: "#C8890A" }}>
                  ${producto.precio} <span className="text-xs font-normal text-gray-500">MXN</span>
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-3">{producto.descripcion}</p>
              <Link href="/demo/orden">
                <button
                  className="w-full py-2 rounded-lg font-semibold text-white"
                  style={{ backgroundColor: "#1A3A5C" }}
                >
                  Seleccionar
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </DemoLayout>
  );
}
