const CLAVE = "certezamx_demo_catalogo_publicado";

export function guardarCatalogoPublicado(productos) {
  if (typeof window === "undefined") return { ok: false };
  try {
    sessionStorage.setItem(CLAVE, JSON.stringify(productos));
    return { ok: true };
  } catch {
    return { ok: false };
  }
}

export function obtenerCatalogoPublicado() {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(CLAVE);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
