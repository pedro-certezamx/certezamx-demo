export const PROVEEDOR = {
  nombre: "Florería Ejemplo",
  verificado: true,
  municipio: "Puebla, Puebla",
  calificacion: 4.8,
  banco: "Banco de Ejemplo",
  clabe: "999 180 0012345678 90",
  titular: "Florería Ejemplo S.A. de C.V.",
  whatsapp: "+52 222 000 0000",
  giro: "Floristería",
  cuenta: "0123456789",
  numero_tarjeta: "1234 5678 9012 3456",
};

export const PROVEEDORES = [
  {
    id: 1,
    nombre: PROVEEDOR.nombre,
    giro: PROVEEDOR.giro,
    municipio: "Puebla",
    estado: "Puebla",
    calificacion: PROVEEDOR.calificacion,
    verificado: PROVEEDOR.verificado,
    catalogoDisponible: true,
  },
  {
    id: 2,
    nombre: "Papelería Ejemplo",
    giro: "Papelería",
    municipio: "Tlaxcala",
    estado: "Tlaxcala",
    calificacion: 4.6,
    verificado: true,
    catalogoDisponible: false,
  },
  {
    id: 3,
    nombre: "Materiales Ejemplo",
    giro: "Materiales de construcción",
    municipio: "San Andrés Cholula",
    estado: "Puebla",
    calificacion: 4.9,
    verificado: true,
    catalogoDisponible: false,
  },
];

export const PRODUCTOS = [
  {
    id: 1,
    nombre: "Arreglo Floral Grande",
    precio: 600,
    unidad_medida: "arreglo",
    foto: "https://images.unsplash.com/photo-1487530811015-780c83c9bcbc?w=400&h=300&fit=crop",
    descripcion: "Arreglo premium con flores de temporada, base de cerámica incluida.",
  },
  {
    id: 2,
    nombre: "Ramo de Rosas",
    precio: 450,
    unidad_medida: "ramo",
    foto: "https://images.unsplash.com/photo-1548094879-7e4c87c3b88b?w=400&h=300&fit=crop",
    descripcion: "24 rosas rojas frescas con papel kraft y listón.",
  },
  {
    id: 3,
    nombre: "Arreglo de Temporada",
    precio: 380,
    unidad_medida: "arreglo",
    foto: "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?w=400&h=300&fit=crop",
    descripcion: "Flores de temporada seleccionadas, presentación rústica.",
  },
  {
    id: 4,
    nombre: "Centro de Mesa",
    precio: 520,
    unidad_medida: "pieza",
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
