// Recuerda si quien compra permitió las notificaciones simuladas en Pagar, para que
// Seguimiento muestre o no el aviso de la Constancia. Igual que el carrito, vive en sessionStorage.
const CLAVE = "certezamx_demo_notificaciones";

export function guardarNotificacionesActivadas(activadas) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(CLAVE, activadas ? "si" : "no");
}

export function limpiarNotificaciones() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(CLAVE);
}

// Si no eligió nada, cuenta como no activadas.
export function notificacionesActivadas() {
  if (typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem(CLAVE) === "si";
  } catch {
    return false;
  }
}
