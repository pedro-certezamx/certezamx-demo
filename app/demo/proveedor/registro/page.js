"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import DemoLayout from "../../../components/DemoLayout";
import { PROVEEDOR } from "../../../lib/demoData";

function Campo({ label, valor, ayuda, requerido }) {
  return (
    <div className="mb-3">
      <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
        {label} {requerido && <span style={{ color: "#C8890A" }}>*</span>}
      </label>
      <div
        className="w-full px-3 py-2.5 rounded-lg border text-sm bg-gray-50"
        style={{ borderColor: "#e5e7eb", color: "#374151" }}
      >
        {valor}
      </div>
      {ayuda && <p className="text-xs text-gray-400 mt-1">{ayuda}</p>}
    </div>
  );
}

function CampoVacio({ label }) {
  return (
    <div className="mb-3">
      <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
        {label}
      </label>
      <div
        className="w-full px-3 py-2.5 rounded-lg border text-sm bg-gray-50"
        style={{ borderColor: "#e5e7eb" }}
      >
        {" "}
      </div>
    </div>
  );
}

function Checkbox({ children, requerido }) {
  return (
    <div className="flex items-start gap-2 text-sm text-gray-700 mb-2">
      <span className="text-base leading-none" style={{ color: "#1A3A5C" }}>☑</span>
      <span>
        {children} {requerido && <span style={{ color: "#C8890A" }}>*</span>}
      </span>
    </div>
  );
}

export default function RegistroProveedor() {
  const [enviado, setEnviado] = useState(false);
  const router = useRouter();

  const handleEnviar = () => {
    setEnviado(true);
    setTimeout(() => router.push("/demo/proveedor/catalogo"), 3000);
  };

  return (
    <DemoLayout esProveedor>
      {/* Header real — copiado de RegistroProveedorUI.js */}
      <div
        className="flex flex-wrap items-center justify-between gap-4 -mx-4 -mt-6 mb-6 px-6 py-5 text-white"
        style={{ backgroundColor: "#1A3A5C" }}
      >
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-white/60">
            Portal Proveedor / Solicitud de Alta
          </p>
          <h1 className="mt-0.5 text-xl font-semibold">Solicitud de alta de proveedor</h1>
        </div>

        <div className="max-w-xs rounded-md border border-white/20 bg-white/10 px-4 py-2 text-xs text-white/90">
          <p className="font-semibold">Piloto Nueva York ↔ Puebla y Tlaxcala</p>
          <p className="mt-1">
            Cobertura de proveedores: Puebla Capital y zona conurbada,
            Tlaxcala capital y zona conurbada.
          </p>
          <p className="mt-1">
            ¿Dudas?{" "}
            <a href="mailto:atencion@certezamx.com" className="underline">
              atencion@certezamx.com
            </a>
          </p>
        </div>
      </div>

      {/* Tu negocio */}
      <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 mb-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Tu negocio</p>
        <Campo label="Nombre comercial" valor={PROVEEDOR.nombre} requerido />
        <Campo label="Giro" valor={PROVEEDOR.giro} requerido />
        <Campo label="Municipio" valor="Puebla" requerido />
        <Campo label="Estado" valor="Puebla" requerido />
        <Campo label="Dirección del negocio" valor="Av. Ejemplo 123, Col. Centro Demo, Puebla" requerido />
        <Campo label="Razón social" valor={PROVEEDOR.titular} requerido />
        <Campo label="RFC" valor="DEM010101AB1" requerido />
        <Campo
          label="Nombre del representante legal"
          valor="Juan Ejemplo Pérez"
          ayuda="Quien firma el Contrato B2B en nombre de tu negocio"
          requerido
        />
        <Campo label="Cargo del representante legal" valor="Dueño" requerido />

        <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
          Fotos del negocio (hasta 5, opcional)
        </label>
        <div className="flex flex-wrap gap-2">
          <span className="text-xs px-3 py-2 rounded-lg border bg-gray-50 text-gray-600" style={{ borderColor: "#e5e7eb" }}>
            📷 foto-negocio-1.jpg ✓
          </span>
          <span className="text-xs px-3 py-2 rounded-lg border bg-gray-50 text-gray-600" style={{ borderColor: "#e5e7eb" }}>
            📷 foto-negocio-2.jpg ✓
          </span>
        </div>
      </div>

      {/* Contacto y acceso */}
      <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 mb-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Contacto y acceso</p>
        <p className="text-sm text-gray-600 mb-3">
          Con este correo y contraseña iniciarás sesión más adelante para revisar tus órdenes y administrar tu catálogo.
        </p>
        <Campo label="Correo electrónico" valor="floreria@example.com" ayuda="Será tu usuario para iniciar sesión" requerido />
        <Campo label="Contraseña" valor="••••••••" ayuda="Mínimo 8 caracteres" requerido />
        <Campo label="WhatsApp principal" valor={PROVEEDOR.whatsapp} requerido />
        <CampoVacio label="WhatsApp secundario (opcional)" />
      </div>

      {/* Datos bancarios */}
      <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 mb-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Datos bancarios</p>
        <Campo label="Banco" valor={PROVEEDOR.banco} requerido />
        <Campo label="Titular de la cuenta" valor={PROVEEDOR.titular} requerido />
        <Campo label="CLABE" valor={PROVEEDOR.clabe} requerido />
        <Campo label="Número de cuenta" valor={PROVEEDOR.cuenta} requerido />
        <Campo label="Número de tarjeta" valor={PROVEEDOR.numero_tarjeta} requerido />

        <div className="p-3 rounded-lg bg-amber-50 border border-amber-100 mt-1">
          <p className="text-xs text-amber-800">
            Estos datos se mostrarán tal cual los ingreses a los compradores. Eres responsable de que sean correctos.
          </p>
        </div>
      </div>

      {/* Tu catálogo */}
      <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 mb-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Tu catálogo</p>
        <p className="text-sm font-medium text-gray-700 mb-1">
          ¿Cómo llevas hoy tu catálogo de productos? <span style={{ color: "#C8890A" }}>*</span>
        </p>
        <p className="text-xs text-gray-400 mb-3">
          Esta respuesta no activa ninguna acción ahora — nos ayuda a guiarte hacia la opción correcta una vez que tu cuenta sea aprobada.
        </p>
        <div className="flex flex-col gap-2 text-sm text-gray-700">
          <span>○ No tengo nada digitalizado todavía</span>
          <span className="font-semibold" style={{ color: "#1A3A5C" }}>● Tengo un archivo (Excel u otro) que ya uso</span>
          <span>○ Sí, tengo catálogo en línea</span>
        </div>
      </div>

      {/* Verificación de tu negocio */}
      <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 mb-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Verificación de tu negocio</p>
        <Checkbox requerido>Acepto una verificación de mi negocio (visita física) como parte del proceso de aprobación</Checkbox>
        <CampoVacio label="Fecha propuesta (opcional)" />
        <CampoVacio label="Hora propuesta (opcional)" />
        <CampoVacio label="Nota adicional (opcional)" />
        <p className="text-xs text-gray-400 mt-1">
          Si no propones fecha/hora, te contactaremos directamente para coordinar.
        </p>
      </div>

      {/* Declaración y legal */}
      <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 mb-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Declaración y legal</p>
        <Checkbox requerido>Declaro que la información proporcionada es verídica y me hago responsable de su exactitud</Checkbox>
        <Checkbox requerido>He leído y acepto el Aviso de Privacidad para Proveedores</Checkbox>
      </div>

      {!enviado ? (
        <>
          <button
            onClick={handleEnviar}
            className="w-full py-3 rounded-lg font-bold text-white"
            style={{ backgroundColor: "#1A3A5C" }}
          >
            Enviar solicitud
          </button>
          <p className="text-xs text-gray-400 text-center mt-3">
            Tu solicitud queda en revisión antes de activar tu cuenta.
          </p>
        </>
      ) : (
        <div className="text-center py-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="text-4xl mb-2">✅</div>
          <p className="font-bold" style={{ color: "#1A3A5C" }}>Solicitud enviada</p>
          <p className="text-sm text-gray-500 mt-1">Redirigiendo…</p>
        </div>
      )}
    </DemoLayout>
  );
}
