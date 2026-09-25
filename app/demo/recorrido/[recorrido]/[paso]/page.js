"use client";
import { notFound } from "next/navigation";
import { RecorridoProvider } from "../../../../lib/recorridos";
import RegistroProveedor from "../../../proveedor/registro/page";
import MiCatalogo from "../../../proveedor/catalogo/page";
import ProveedorDashboard from "../../../proveedor/page";
import Declarar from "../../../proveedor/declarar/page";
import Evidencia from "../../../proveedor/evidencia/page";
import Constancia from "../../../constancia/page";

// Cada paso de cada recorrido reutiliza una pantalla de la demo.
const PANTALLAS = {
  proveedor: {
    registro: RegistroProveedor,
    catalogo: MiCatalogo,
    panel: ProveedorDashboard,
    declarar: Declarar,
    evidencia: Evidencia,
    constancia: Constancia,
  },
};

export default function PasoDeRecorrido({ params }) {
  const Pantalla = PANTALLAS[params.recorrido]?.[params.paso];
  if (!Pantalla) notFound();

  return (
    <RecorridoProvider recorrido={params.recorrido} paso={params.paso}>
      <Pantalla />
    </RecorridoProvider>
  );
}
