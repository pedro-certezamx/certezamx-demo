"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ORDEN, PROVEEDOR } from "../../lib/demoData";
import { obtenerCarrito } from "../../lib/carrito";
import { BarraDePasos } from "../../components/DemoLayout";
import { useRecorrido } from "../../lib/recorridos";

function formatearPrecio(valor) {
  return Number(valor).toLocaleString("es-MX", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function BloqueCalificacion({ nombreProveedor }) {
  const [estrellas, setEstrellas] = useState(0);
  const [comentario, setComentario] = useState("");
  const [enviado, setEnviado] = useState(false);

  if (enviado) {
    return (
      <p className="text-sm font-medium text-green-700 text-center">
        ✓ ¡Gracias por tu calificación!
      </p>
    );
  }

  return (
    <div>
      <h2 className="text-base font-semibold" style={{ color: "#1A3A5C" }}>
        ¿Cómo fue tu experiencia con {nombreProveedor}?
      </h2>

      <div className="mt-3 flex gap-1 text-3xl">
        {[1, 2, 3, 4, 5].map((numero) => (
          <button
            key={numero}
            type="button"
            onClick={() => setEstrellas(numero)}
            aria-label={`${numero} estrella${numero > 1 ? "s" : ""}`}
            style={{ color: numero <= estrellas ? "#C8890A" : "#D1D5DB" }}
          >
            ★
          </button>
        ))}
      </div>

      {estrellas > 0 && (
        <div className="mt-4">
          <textarea
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            maxLength={500}
            placeholder="Comentario (opcional)"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400"
            rows={3}
          />
          <button
            type="button"
            onClick={() => setEnviado(true)}
            className="mt-3 w-full rounded-md px-4 py-2 text-sm font-medium text-white"
            style={{ backgroundColor: "#1A3A5C" }}
          >
            Enviar calificación
          </button>
        </div>
      )}
    </div>
  );
}

const ETIQUETAS_ESTRELLAS = ["", "Muy mala", "Mala", "Regular", "Buena", "Excelente"];

// Calificación del proveedor a quien le compró; textos de P-6 (CalificarClienteUI.js en la app real).
function BloqueCalificacionCliente({ nombreCliente, folio }) {
  const [estrellas, setEstrellas] = useState(0);
  const [comentario, setComentario] = useState("");
  const [enviado, setEnviado] = useState(false);

  if (enviado) {
    return (
      <p className="text-sm font-medium text-green-700 text-center">
        ✓ ¡Gracias por tu calificación!
      </p>
    );
  }

  return (
    <div>
      <div className="text-center">
        <h2 className="text-base font-semibold text-gray-800">
          ¿Cómo fue tu experiencia con <span style={{ color: "#1A3A5C" }}>{nombreCliente}</span>?
        </h2>
        <p className="mt-1 text-sm text-gray-400">Orden #{folio}</p>

        <div className="mt-4 flex justify-center gap-2 text-4xl">
          {[1, 2, 3, 4, 5].map((numero) => (
            <button
              key={numero}
              type="button"
              onClick={() => setEstrellas(numero)}
              aria-label={`${numero} estrella${numero > 1 ? "s" : ""}`}
              style={{ color: numero <= estrellas ? "#C8890A" : "#D1D5DB" }}
            >
              ★
            </button>
          ))}
        </div>
        {estrellas > 0 && (
          <p className="mt-2 text-sm font-medium" style={{ color: "#C8890A" }}>
            {ETIQUETAS_ESTRELLAS[estrellas]}
          </p>
        )}
      </div>

      <label htmlFor="calificar-comentario" className="mt-4 block text-sm font-semibold" style={{ color: "#1A3A5C" }}>
        Comentario <span className="font-normal text-gray-400">(opcional)</span>
      </label>
      <textarea
        id="calificar-comentario"
        value={comentario}
        onChange={(e) => setComentario(e.target.value.slice(0, 500))}
        rows={3}
        placeholder="Comparte tu experiencia con este cliente (opcional)"
        className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400"
      />
      <p className="mt-1 text-right text-xs text-gray-400">{comentario.length}/500</p>

      <button
        type="button"
        disabled={estrellas === 0}
        onClick={() => setEnviado(true)}
        className="mt-3 w-full rounded-md py-3 text-sm font-semibold text-white disabled:opacity-40"
        style={{ backgroundColor: "#C8890A" }}
      >
        ⭐ Enviar calificación
      </button>
    </div>
  );
}

export default function Constancia() {
  const [carrito, setCarrito] = useState(null);
  const recorrido = useRecorrido();
  const esRecorridoProveedor = recorrido?.recorrido === "proveedor";

  useEffect(() => {
    setCarrito(obtenerCarrito());
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#F8F9FA" }}>
      {/* Header */}
      <header
        style={{ backgroundColor: "#1A3A5C" }}
        // Dentro de un recorrido, mismo encabezado que DemoLayout para que la barra no se mueva.
        className={recorrido ? "px-4 py-3 flex items-center justify-between" : "px-4 py-5"}
      >
        <Image
          src="/Asset_3.png"
          alt="CertezaMX"
          width={recorrido ? 180 : 175}
          height={recorrido ? 50 : 52}
          className="object-contain"
        />
        {esRecorridoProveedor && (
          <span className="text-xs text-white opacity-70 bg-white bg-opacity-10 px-2 py-1 rounded">
            Vista Proveedor
          </span>
        )}
      </header>

      {recorrido && (
        <BarraDePasos pasos={recorrido.pasos.map((p) => p.etiqueta)} actual={recorrido.numero} />
      )}

      <main className="flex-1 px-4 py-6 max-w-lg mx-auto w-full">
        {/* Documento constancia */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-4">
          {/* Encabezado del documento */}
          <div className="px-6 py-5 text-center border-b-2" style={{ borderColor: "#C8890A" }}>
            <Image
              src="/Asset_2.png"
              alt="CertezaMX"
              width={60}
              height={60}
              className="object-contain mx-auto mb-2"
            />
            <h2 className="text-base font-bold tracking-wide uppercase" style={{ color: "#1A3A5C" }}>
              Constancia de Evidencia Documental
            </h2>
            <p className="text-xs text-gray-500 mt-1">Emitida por CertezaMX, S.A. de C.V.</p>
          </div>

          {/* Folio y fecha */}
          <div className="px-6 py-3 flex justify-between items-center" style={{ backgroundColor: "#F8F9FA" }}>
            <div>
              <p className="text-xs text-gray-400">Folio</p>
              <p className="text-sm font-bold" style={{ color: "#C8890A" }}>{ORDEN.folio}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">Fecha de emisión</p>
              <p className="text-sm font-medium text-gray-700">{ORDEN.fecha}</p>
            </div>
          </div>

          {/* Sección partes */}
          <div className="px-6 py-4 border-t border-gray-100">
            <p className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: "#1A3A5C" }}>
              Partes
            </p>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">Quien Compra</span>
                <span className="text-xs font-medium text-gray-800">{ORDEN.cliente.nombre}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">Proveedor</span>
                <span className="text-xs font-medium text-gray-800">{PROVEEDOR.nombre}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">Destinatario de la entrega</span>
                <span className="text-xs font-medium text-gray-800">{ORDEN.destinatario.nombre}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">Municipio de entrega</span>
                <span className="text-xs font-medium text-gray-800">{ORDEN.destinatario.municipio}</span>
              </div>
            </div>
          </div>

          {/* Sección orden */}
          <div className="px-6 py-4 border-t border-gray-100">
            <p className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: "#1A3A5C" }}>
              Orden documentada
            </p>
            {!carrito ? (
              <div className="space-y-2 animate-pulse">
                <div className="h-3 bg-gray-100 rounded w-3/4" />
                <div className="h-3 bg-gray-100 rounded w-1/2" />
                <div className="h-3 bg-gray-100 rounded w-2/3" />
              </div>
            ) : (
              <div className="space-y-2">
                <span className="text-xs text-gray-500">Descripción</span>
                {carrito.productos.map((producto) => (
                  <div key={producto.id} className="flex justify-between">
                    <span className="text-xs text-gray-700">{producto.nombre} × {producto.cantidad}</span>
                    <span className="text-xs font-medium text-gray-800">
                      ${formatearPrecio(producto.precio * producto.cantidad)} MXN
                    </span>
                  </div>
                ))}
                <div className="flex justify-between pt-1 border-t border-gray-100">
                  <span className="text-xs font-semibold text-gray-500">Valor declarado</span>
                  <span className="text-xs font-bold" style={{ color: "#C8890A" }}>${formatearPrecio(carrito.valorTotal)} MXN</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">Fecha de orden</span>
                  <span className="text-xs font-medium text-gray-800">{ORDEN.fecha}</span>
                </div>
              </div>
            )}
          </div>

          {/* Sección evidencia */}
          <div className="px-6 py-4 border-t border-gray-100">
            <p className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: "#1A3A5C" }}>
              Evidencia documentada
            </p>
            <div className="space-y-1.5">
              {[
                "Comprobante de pago almacenado: Sí",
                "Declaración de recepción del proveedor: 28 jun 2026 · 11:30 a.m.",
                "Evidencia de entrega: Foto de entrega",
                "Fecha de entrega: 28 jun 2026 · 3:15 p.m.",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span style={{ color: "#C8890A" }} className="text-xs font-bold">✓</span>
                  <span className="text-xs text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Foto de evidencia */}
          <div className="px-6 py-4 border-t border-gray-100">
            <div
              className="rounded-lg overflow-hidden border-2"
              style={{ borderColor: "#C8890A" }}
            >
              <img
                src="/productos/evidencia-entrega.jpg"
                alt="Foto de evidencia de entrega"
                className="w-full h-44 object-cover"
              />
            </div>
            <p className="text-xs text-gray-500 text-center mt-2">
              Foto de evidencia de entrega — subida por el proveedor
            </p>
          </div>

          {/* Alcance */}
          <div className="px-6 py-4 border-t-2 border-dashed" style={{ borderColor: "#e5e7eb" }}>
            <p className="text-xs text-gray-500 leading-relaxed">
              <strong>Alcance de esta Constancia:</strong> Este documento respalda que CertezaMX documentó el intercambio de información y evidencias entre las partes mencionadas. <strong>NO certifica la autenticidad del pago ni el valor del mismo.</strong> CertezaMX no procesa, valida ni custodia pagos. Solo documenta declaraciones y evidencias proporcionadas por las partes.
            </p>
          </div>

          {/* QR simulado + sello */}
          <div
            className="px-6 py-4 flex items-center justify-between"
            style={{ backgroundColor: "#1A3A5C" }}
          >
            <div className="text-white">
              <p className="text-xs opacity-70">Verificación:</p>
              <p className="text-xs font-mono font-bold">{ORDEN.folio}</p>
              <p className="text-xs opacity-50 mt-0.5">certezamx.com</p>
            </div>
            <div
              className="w-16 h-16 rounded-lg flex flex-col items-center justify-center"
              style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
            >
              {/* QR simulado */}
              <div className="grid grid-cols-4 gap-0.5">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-2.5 h-2.5 rounded-sm"
                    style={{ backgroundColor: [0,1,3,4,5,7,8,10,11,15].includes(i) ? "white" : "transparent" }}
                  />
                ))}
              </div>
              <p className="text-white text-xs mt-1 opacity-70" style={{ fontSize: "8px" }}>QR Verif.</p>
            </div>
          </div>
        </div>

        {/* Quien compra califica al proveedor; en el recorrido del proveedor, él califica a quien le compró (P-6). */}
        <hr className="mb-4 border-gray-200" />
        <div className="mb-4">
          {esRecorridoProveedor ? (
            <BloqueCalificacionCliente nombreCliente={ORDEN.cliente.nombre} folio={ORDEN.folio} />
          ) : (
            <BloqueCalificacion nombreProveedor={PROVEEDOR.nombre} />
          )}
        </div>

        <p className="text-xs text-gray-400 text-center mb-4">
          💡 En la app real, guarda esta pantalla como captura de pantalla desde tu celular.
        </p>

        {/* En un recorrido, vuelve a su primer paso; en /demo, al inicio de la demo. */}
        <Link href={recorrido?.inicio ?? "/demo"}>
          <button
            className="w-full py-3 rounded-lg font-bold text-white mb-3"
            style={{ backgroundColor: "#C8890A" }}
          >
            {recorrido ? "← Ver el ejemplo otra vez" : "← Volver al inicio del demo"}
          </button>
        </Link>

        {/* Cierre del recorrido del proveedor: primero el ejemplo de la solicitud, después la real. */}
        {esRecorridoProveedor && (
          <div className="pt-5 border-t border-gray-200 text-center">
            <h2 className="text-base font-bold mb-3" style={{ color: "#1A3A5C" }}>
              ¿Te interesa para tu negocio?
            </h2>
            <Link
              href={recorrido.siguiente}
              className="block w-full py-3 rounded-lg font-bold text-white"
              style={{ backgroundColor: "#1A3A5C" }}
            >
              Solicitar mi alta como proveedor →
            </Link>
            <p className="text-xs text-gray-400 mt-2 mb-3">
              Primero verás un ejemplo de la solicitud, con datos ficticios.
            </p>
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
