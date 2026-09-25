"use client";
import Link from "next/link";
import DemoLayout from "./DemoLayout";
import { rutaDelPaso } from "../lib/recorridos";

// Pausa del recorrido del proveedor antes de ir a la solicitud real (P-0).
// La lista sigue las secciones del formulario real (RegistroProveedorUI.js en la app).
const DATOS_SOLICITUD = [
  {
    seccion: "Tu negocio",
    datos: [
      "Nombre comercial, giro, municipio, estado y dirección del negocio",
      "Razón social y RFC (12 caracteres si es persona moral, 13 si es persona física)",
      "Nombre y cargo del representante legal, quien firma el Contrato B2B",
      "Fotos del negocio (opcional, hasta 5)",
    ],
  },
  {
    seccion: "Contacto y acceso",
    datos: [
      "Un correo electrónico, que será tu usuario para iniciar sesión",
      "Una contraseña de mínimo 8 caracteres",
      "Tu WhatsApp principal (y uno secundario, si tienes)",
    ],
  },
  {
    seccion: "Datos bancarios",
    datos: [
      "Banco y titular de la cuenta",
      "CLABE (18 dígitos), número de cuenta y número de tarjeta",
    ],
  },
  {
    seccion: "Tu catálogo",
    datos: ["Cómo llevas hoy tu catálogo (y su URL, si ya lo tienes en línea)"],
  },
  {
    seccion: "Verificación de tu negocio",
    datos: ["Si quieres, una fecha y hora que te acomode para la verificación de tu negocio"],
  },
];

export default function AntesDeSolicitar() {
  return (
    <DemoLayout esProveedor>
      <h1 className="text-lg font-bold mb-4" style={{ color: "#1A3A5C" }}>
        Antes de llenar tu solicitud real, ten a la mano:
      </h1>

      <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 mb-3">
        {DATOS_SOLICITUD.map(({ seccion, datos }, i) => (
          <div key={seccion} className={i > 0 ? "mt-4 pt-4 border-t border-gray-100" : ""}>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">{seccion}</p>
            <ul className="space-y-1.5">
              {datos.map((dato) => (
                <li key={dato} className="flex items-start gap-2 text-sm text-gray-700">
                  <span style={{ color: "#C8890A" }}>•</span>
                  <span>{dato}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-400 text-center mb-6">
        Tu solicitud queda en revisión antes de activar tu cuenta.
      </p>

      <a
        href="https://app.certezamx.com/proveedor/registro"
        className="block w-full py-3 rounded-lg font-bold text-white text-center"
        style={{ backgroundColor: "#1A3A5C" }}
      >
        Ir a la solicitud real →
      </a>
      <p className="text-xs text-gray-400 text-center mt-2 mb-4">
        Este botón te lleva a la plataforma real de CertezaMX.
      </p>

      {/* Sin salir de la demo: regresa a la Constancia, donde sigue el botón para solicitar el alta. */}
      <Link
        href={rutaDelPaso("proveedor", "constancia")}
        className="block w-full py-3 rounded-lg font-bold border text-center"
        style={{ borderColor: "#1A3A5C", color: "#1A3A5C" }}
      >
        Lo haré después
      </Link>
    </DemoLayout>
  );
}
