"use client";
import { notFound } from "next/navigation";
import { RecorridoProvider } from "../../../../lib/recorridos";
import RegistroProveedor from "../../../proveedor/registro/page";
import AntesDeSolicitar from "../../../../components/AntesDeSolicitar";
import MiCatalogo from "../../../proveedor/catalogo/page";
import ProveedorDashboard from "../../../proveedor/page";
import Declarar from "../../../proveedor/declarar/page";
import Evidencia from "../../../proveedor/evidencia/page";
import Constancia from "../../../constancia/page";
import DemoHome from "../../../page";
import Catalogo from "../../../catalogo/page";
import Orden from "../../../orden/page";
import Pagar from "../../../pagar/page";
import Comprobante from "../../../comprobante/page";
import Estado from "../../../estado/page";

// Cada paso de cada recorrido reutiliza una pantalla de la demo.
const PANTALLAS = {
  proveedor: {
    catalogo: MiCatalogo,
    panel: ProveedorDashboard,
    declarar: Declarar,
    evidencia: Evidencia,
    constancia: Constancia,
    solicitud: RegistroProveedor,
    "antes-de-solicitar": AntesDeSolicitar,
  },
  comprador: {
    explorar: DemoHome,
    catalogo: Catalogo,
    orden: Orden,
    pagar: Pagar,
    comprobante: Comprobante,
    seguimiento: Estado,
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
