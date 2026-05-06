document.getElementById('extractBtn').addEventListener('click', async () => {
  const fileInput = document.getElementById('pdfFiles');
  const pageNum = parseInt(document.getElementById('pageNumber').value) - 1; // Convert to 0-indexed

  if (fileInput.files.length === 0) {
    alert("Please select at least one PDF.");
    return;
  }

  const { PDFDocument } = PDFLib;
  const mergedPdf = await PDFDocument.create();

  for (const file of fileInput.files) {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    const totalPages = pdf.getPageCount();

    if (pageNum < totalPages) {
      // Copy the specific page
      const [copiedPage] = await mergedPdf.copyPages(pdf, [pageNum]);
      mergedPdf.addPage(copiedPage);
    } else {
      console.warn(`File ${file.name} has only ${totalPages} pages.`);
    }
  }

  const pdfBytes = await mergedPdf.save();
  download(pdfBytes, "extracted_pages.pdf", "application/pdf");
});

function download(data, filename, type) {
  const file = new Blob([data], { type: type });
  const a = document.createElement("a");
  const url = URL.createObjectURL(file);
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 0);
}