export const handleDownloadPDF = () => {
    // Ruta relativa al archivo PDF en la carpeta `public`
    const filePath = "/pdf/info_pdf1.pdf";

    // Crear un enlace temporal
    const link = document.createElement("a");
    link.href = filePath;
    link.download = "info.pdf"; // Nombre del archivo descargado
    document.body.appendChild(link);

    // Simular el clic en el enlace
    link.click();

    // Eliminar el enlace temporal
    document.body.removeChild(link);
};