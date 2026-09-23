import { ORDEN } from "./demoData";

const CLAVE = "certezamx_demo_carrito";

const CARRITO_POR_DEFECTO = {
  productos: [
    {
      id: ORDEN.producto.id,
      nombre: ORDEN.producto.nombre,
      precio: ORDEN.producto.precio,
      unidad_medida: ORDEN.producto.unidad_medida,
      cantidad: 1,
    },
  ],
  valorTotal: ORDEN.valor,
  totalArticulos: 1,
};

export function guardarCarrito(carrito) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(CLAVE, JSON.stringify(carrito));
}

export function limpiarCarrito() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(CLAVE);
}

export function obtenerCarrito() {
  if (typeof window === "undefined") return CARRITO_POR_DEFECTO;
  try {
    const raw = sessionStorage.getItem(CLAVE);
    return raw ? JSON.parse(raw) : CARRITO_POR_DEFECTO;
  } catch {
    return CARRITO_POR_DEFECTO;
  }
}

export function resumenProductos(carrito) {
  if (!carrito || carrito.productos.length === 0) return "";
  if (carrito.productos.length === 1) {
    const producto = carrito.productos[0];
    return producto.cantidad > 1 ? `${producto.nombre} × ${producto.cantidad}` : producto.nombre;
  }
  return `${carrito.totalArticulos} productos`;
}
