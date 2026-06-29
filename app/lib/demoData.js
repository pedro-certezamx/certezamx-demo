export const PROVEEDOR = {
  nombre: "Florería Puebla",
  verificado: true,
  municipio: "Puebla, Puebla",
  calificacion: 4.8,
  banco: "BBVA México",
  clabe: "012 180 0012345678 90",
  titular: "Florería Puebla S.A. de C.V.",
  whatsapp: "+52 222 555 0199",
};

export const PRODUCTOS = [
  {
    id: 1,
    nombre: "Arreglo Floral Grande",
    precio: 600,
    foto: "https://images.unsplash.com/photo-1487530811015-780c83c9bcbc?w=400&h=300&fit=crop",
    descripcion: "Arreglo premium con flores de temporada, base de cerámica incluida.",
  },
  {
    id: 2,
    nombre: "Ramo de Rosas",
    precio: 450,
    foto: "https://images.unsplash.com/photo-1548094879-7e4c87c3b88b?w=400&h=300&fit=crop",
    descripcion: "24 rosas rojas frescas con papel kraft y listón.",
  },
  {
    id: 3,
    nombre: "Arreglo de Temporada",
    precio: 380,
    foto: "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?w=400&h=300&fit=crop",
    descripcion: "Flores de temporada seleccionadas, presentación rústica.",
  },
  {
    id: 4,
    nombre: "Centro de Mesa",
    precio: 520,
    foto: "https://images.unsplash.com/photo-1559291163-87e6ac1e1e60?w=400&h=300&fit=crop",
    descripcion: "Arreglo circular ideal para eventos y celebraciones.",
  },
];

export const ORDEN = {
  folio: "CX-DEMO-2026",
  cliente: {
    nombre: "María González",
    whatsapp: "+1 (323) 555-0142",
    email: "maria.gonzalez@email.com",
  },
  destinatario: {
    nombre: "Carmen Torres",
    municipio: "Puebla, Puebla",
  },
  producto: PRODUCTOS[0],
  valor: 600,
  fecha: "28 de junio de 2026",
  hora: "10:42 a.m.",
};
