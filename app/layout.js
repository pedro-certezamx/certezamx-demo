import "./globals.css";

export const metadata = {
  title: "CertezaMX Demo",
  description: "Demo interactivo de CertezaMX",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="font-sans">{children}</body>
    </html>
  );
}
