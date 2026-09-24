"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import DemoLayout from "../../../components/DemoLayout";
import { PRODUCTOS } from "../../../lib/demoData";
import { guardarCatalogoPublicado, obtenerCatalogoPublicado } from "../../../lib/catalogoPublicado";

function formatearPrecio(valor) {
  const numero = Number(valor);
  return Number.isFinite(numero)
    ? numero.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : "0.00";
}

function itemVacio() {
  return { nombre: "", precio: "", unidad_medida: "", disponible: true, foto: null };
}

function redimensionarImagen(archivo, maxLado = 600, calidad = 0.8) {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    const url = URL.createObjectURL(archivo);
    img.onload = () => {
      let { width, height } = img;
      if (width >= height && width > maxLado) {
        height = Math.round((height * maxLado) / width);
        width = maxLado;
      } else if (height > width && height > maxLado) {
        width = Math.round((width * maxLado) / height);
        height = maxLado;
      }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/jpeg", calidad));
    };
    img.onerror = reject;
    img.src = url;
  });
}

function ToggleDisponible({ valor, onCambiar }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={valor}
      onClick={() => onCambiar(!valor)}
      className="flex items-center gap-2"
    >
      <span
        className="flex h-6 w-11 shrink-0 items-center rounded-full p-0.5 transition-colors"
        style={{
          backgroundColor: valor ? "#C8890A" : "#D4D4D8",
          justifyContent: valor ? "flex-end" : "flex-start",
        }}
      >
        <span className="h-5 w-5 rounded-full bg-white shadow" />
      </span>
      <span className="text-sm font-medium text-gray-700">
        {valor ? "Disponible" : "No disponible"}
      </span>
    </button>
  );
}

function FormularioProducto({ inicial, onGuardar, onCancelar }) {
  const fotoInputRef = useRef(null);
  const [campos, setCampos] = useState(inicial);
  const [errores, setErrores] = useState({});

  async function elegirFoto(archivo) {
    if (!archivo) return;
    const dataUrl = await redimensionarImagen(archivo);
    setCampos((c) => ({ ...c, foto: dataUrl }));
  }

  function quitarFoto() {
    setCampos((c) => ({ ...c, foto: null }));
  }

  function guardar() {
    const nuevosErrores = {};
    const nombre = campos.nombre.trim();
    if (!nombre) nuevosErrores.nombre = "El nombre no puede estar vacío.";

    const precio = Number(campos.precio);
    if (!Number.isFinite(precio) || precio < 0) nuevosErrores.precio = "Precio no válido.";

    const unidadMedida = campos.unidad_medida.trim();
    if (!unidadMedida) nuevosErrores.unidad_medida = "La unidad de medida no puede estar vacía.";

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    onGuardar({ ...campos, nombre, precio, unidad_medida: unidadMedida });
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 mb-4">
      <input
        ref={fotoInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={async (e) => {
          await elegirFoto(e.target.files?.[0]);
          e.target.value = "";
        }}
      />

      <div className="flex flex-col gap-1 mb-4">
        <span className="text-sm font-medium text-gray-700">Foto (opcional)</span>
        {campos.foto ? (
          <div className="flex items-center gap-3">
            <img src={campos.foto} alt="" className="h-20 w-20 rounded-md border border-gray-200 object-cover" />
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => fotoInputRef.current?.click()}
                className="rounded-md border px-3 py-1.5 text-xs font-medium"
                style={{ borderColor: "#1A3A5C", color: "#1A3A5C" }}
              >
                Cambiar foto
              </button>
              <button type="button" onClick={quitarFoto} className="text-xs font-medium text-red-600">
                Quitar foto
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fotoInputRef.current?.click()}
            className="self-start rounded-md border px-3 py-2 text-sm font-medium"
            style={{ borderColor: "#1A3A5C", color: "#1A3A5C" }}
          >
            📷 Agregar foto
          </button>
        )}
      </div>

      <div className="flex flex-col gap-1 mb-3">
        <label className="text-sm font-medium text-gray-700">Nombre</label>
        <input
          type="text"
          value={campos.nombre}
          onChange={(e) => setCampos((c) => ({ ...c, nombre: e.target.value }))}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400"
          placeholder="Bolsa de cemento 50kg"
        />
        {errores.nombre && <span className="text-xs text-red-600">{errores.nombre}</span>}
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Precio (con IVA)</label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={campos.precio}
            onChange={(e) => setCampos((c) => ({ ...c, precio: e.target.value }))}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400"
            placeholder="185.50"
          />
          {errores.precio && <span className="text-xs text-red-600">{errores.precio}</span>}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Unidad de medida</label>
          <input
            type="text"
            value={campos.unidad_medida}
            onChange={(e) => setCampos((c) => ({ ...c, unidad_medida: e.target.value }))}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400"
            placeholder="pieza"
          />
          {errores.unidad_medida && <span className="text-xs text-red-600">{errores.unidad_medida}</span>}
        </div>
      </div>

      <div className="mb-4">
        <ToggleDisponible valor={campos.disponible} onCambiar={(v) => setCampos((c) => ({ ...c, disponible: v }))} />
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={guardar}
          className="flex-1 rounded-md px-4 py-2.5 text-sm font-semibold text-white"
          style={{ backgroundColor: "#C8890A" }}
        >
          Guardar producto
        </button>
        <button
          type="button"
          onClick={onCancelar}
          className="rounded-md border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-600"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default function MiCatalogo() {
  const [draft, setDraft] = useState(null);
  const [vista, setVista] = useState("lista");
  const [editandoId, setEditandoId] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [errorPublicar, setErrorPublicar] = useState(null);
  const [publicado, setPublicado] = useState(false);

  useEffect(() => {
    const catalogoGuardado = obtenerCatalogoPublicado();
    if (catalogoGuardado) {
      setDraft(catalogoGuardado);
    } else {
      setDraft(
        PRODUCTOS.map((p) => ({
          localId: `preload-${p.id}`,
          nombre: p.nombre,
          precio: p.precio,
          unidad_medida: p.unidad_medida,
          disponible: true,
          foto: p.foto,
        }))
      );
    }
  }, []);

  function abrirNuevo() {
    setEditandoId(null);
    setVista("formulario");
  }

  function abrirEditar(item) {
    setEditandoId(item.localId);
    setVista("formulario");
  }

  function eliminar(localId) {
    setDraft((d) => d.filter((item) => item.localId !== localId));
  }

  function guardarProducto(campos) {
    if (editandoId === null) {
      setDraft((d) => [...d, { localId: crypto.randomUUID(), ...campos }]);
    } else {
      setDraft((d) => d.map((item) => (item.localId === editandoId ? { ...item, ...campos } : item)));
    }
    setVista("lista");
  }

  function confirmarPublicar() {
    const resultado = guardarCatalogoPublicado(draft);
    if (!resultado.ok) {
      setErrorPublicar(
        "No se pudo publicar el catálogo: no hay espacio suficiente en este navegador. Intenta quitar alguna foto o usar menos productos."
      );
      return;
    }
    setErrorPublicar(null);
    setModalAbierto(false);
    setPublicado(true);
  }

  if (publicado) {
    const disponibles = draft.filter((item) => item.disponible).length;
    const mensajeExito =
      disponibles === 0
        ? 'Publicaste tu catálogo, pero como todos los productos están marcados "No disponible", los compradores no verán ninguno todavía.'
        : disponibles === 1
        ? "Tu producto ya está visible para los compradores."
        : `Tus ${disponibles} productos ya están visibles para los compradores.`;

    return (
      <DemoLayout esProveedor titulo="Mi Catálogo">
        <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-center">
          <p className="text-lg font-semibold text-green-800">✅ Catálogo publicado</p>
          <p className="mt-2 text-sm text-green-700">{mensajeExito}</p>
        </div>
        <Link href="/demo/proveedor">
          <button
            className="mt-6 w-full py-3 rounded-lg font-bold text-white"
            style={{ backgroundColor: "#1A3A5C" }}
          >
            ← Panel principal
          </button>
        </Link>
      </DemoLayout>
    );
  }

  if (!draft) {
    return (
      <DemoLayout esProveedor titulo="Mi Catálogo">
        <div className="space-y-3 animate-pulse">
          <div className="h-16 bg-gray-100 rounded-lg" />
          <div className="h-16 bg-gray-100 rounded-lg" />
          <div className="h-16 bg-gray-100 rounded-lg" />
        </div>
      </DemoLayout>
    );
  }

  const itemEditando = draft.find((item) => item.localId === editandoId) ?? itemVacio();

  return (
    <DemoLayout esProveedor titulo="Mi Catálogo">
      <p className="text-xs text-gray-400 mb-4">
        Esta pantalla está disponible una vez que tu cuenta está activa.
      </p>

      <div className="flex items-start gap-3 rounded-lg bg-gray-50 p-4 mb-4">
        <span className="text-2xl">📁</span>
        <div>
          <p className="text-sm font-semibold" style={{ color: "#1A3A5C" }}>Subir archivo (Excel)</p>
          <p className="text-xs text-gray-500">Llena la plantilla con todos tus productos y súbela de un jalón.</p>
          <p className="text-xs text-gray-400 mt-1">Disponible en la app, no en la demo</p>
        </div>
      </div>

      {vista === "formulario" ? (
        <FormularioProducto
          key={editandoId ?? "nuevo"}
          inicial={itemEditando}
          onGuardar={guardarProducto}
          onCancelar={() => setVista("lista")}
        />
      ) : (
        <>
          <button
            type="button"
            onClick={abrirNuevo}
            className="w-full rounded-lg border-2 border-dashed px-4 py-3 text-sm font-semibold mb-4"
            style={{ borderColor: "#C8890A", color: "#C8890A" }}
          >
            + Agregar producto
          </button>

          {draft.length === 0 ? (
            <div className="rounded-lg border border-gray-200 bg-white px-6 py-12 text-center text-gray-500 mb-4">
              Todavía no agregas ningún producto.
            </div>
          ) : (
            <div className="flex flex-col gap-3 mb-4">
              {draft.map((item) => (
                <div key={item.localId} className="flex items-center gap-3 rounded-lg border border-gray-100 bg-white p-3 shadow-sm">
                  {item.foto ? (
                    <img src={item.foto} alt="" className="h-14 w-14 shrink-0 rounded-md border border-gray-200 object-cover" />
                  ) : (
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md bg-gray-100 text-gray-300">📦</div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-800">{item.nombre}</p>
                    <p className="text-sm text-gray-500">
                      ${formatearPrecio(item.precio)} / {item.unidad_medida}
                    </p>
                    {!item.disponible && (
                      <span className="text-xs font-medium text-red-600 whitespace-nowrap">No disponible</span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => abrirEditar(item)}
                    className="rounded-md border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-600"
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => eliminar(item.localId)}
                    aria-label={`Eliminar ${item.nombre}`}
                    className="text-gray-400"
                  >
                    🗑
                  </button>
                </div>
              ))}
            </div>
          )}

          <button
            type="button"
            disabled={draft.length === 0}
            onClick={() => setModalAbierto(true)}
            className="w-full rounded-lg px-4 py-3 text-sm font-semibold text-white disabled:opacity-50"
            style={{ backgroundColor: "#C8890A" }}
          >
            Publicar catálogo ({draft.length} productos)
          </button>
        </>
      )}

      {modalAbierto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
            <h3 className="text-base font-semibold" style={{ color: "#1A3A5C" }}>Publicar catálogo</h3>
            <p className="mt-3 text-sm text-gray-600">
              Vas a publicar <strong>{draft.length} productos</strong>. Esto reemplaza por completo el catálogo que tus compradores ven ahora mismo y no se puede deshacer.
            </p>

            {errorPublicar && (
              <p className="mt-3 rounded-md bg-red-50 px-4 py-3 text-sm text-red-600">{errorPublicar}</p>
            )}

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setModalAbierto(false)}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={confirmarPublicar}
                className="rounded-md px-4 py-2 text-sm font-medium text-white"
                style={{ backgroundColor: "#C8890A" }}
              >
                Sí, publicar catálogo
              </button>
            </div>
          </div>
        </div>
      )}
    </DemoLayout>
  );
}
