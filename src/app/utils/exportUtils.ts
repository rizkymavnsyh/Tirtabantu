import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function exportToExcel(data: any[], fileName: string) {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
}

export function exportToPDF(
  title: string,
  columns: string[],
  data: any[][],
  fileName: string
) {
  const doc = new jsPDF();
  
  // Title
  doc.setFontSize(16);
  doc.text(title, 14, 15);
  doc.setFontSize(10);
  doc.text(`Dicetak pada: ${new Date().toLocaleString('id-ID')}`, 14, 22);

  // Table
  autoTable(doc, {
    head: [columns],
    body: data,
    startY: 28,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [2, 132, 199] }, // sky-600
  });

  doc.save(`${fileName}.pdf`);
}
