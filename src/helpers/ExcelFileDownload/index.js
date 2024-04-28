import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const ExcelFileDownload = (sheetHeader, sheetData) => {
  function handleDownloadButtonClick() {
    const workbook = generateExcelData();
    downloadExcelFile(workbook);
  }
  handleDownloadButtonClick();

  function downloadExcelFile(workbook) {
    const fileExtension = ".xlsx";
    const fileName = `Users${fileExtension}`;

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(blob, fileName)
  }

  function generateExcelData() {
    const sheetName = "Sheet1";
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet([sheetHeader, ...sheetData]);
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    return workbook;
  }
};

export default ExcelFileDownload;
