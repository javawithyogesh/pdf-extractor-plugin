document.getElementById('extractBtn').addEventListener('click', async () => {
  const fileInput = document.getElementById('pdfFiles');
  const pageNum = parseInt(document.getElementById('pageNumber').value) - 1;
  const isSeparate = document.getElementById('separateFiles').checked;

  if (fileInput.files.length === 0) {
    alert("Please select at least one PDF.");
    return;
  }

  const { PDFDocument } = PDFLib;
  const mergedPdf = await PDFDocument.create();

  for (const file of fileInput.files) {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      const totalPages = pdf.getPageCount();

      if (pageNum < totalPages) {
        if (isSeparate) {
          // CREATE INDIVIDUAL FILE
          const singlePdf = await PDFDocument.create();
          const [copiedPage] = await singlePdf.copyPages(pdf, [pageNum]);
          singlePdf.addPage(copiedPage);
          
          const pdfBytes = await singlePdf.save();
          const newName = `extracted_p${pageNum + 1}_${file.name}`;
          download(pdfBytes, newName, "application/pdf");
        } else {
          // ADD TO MERGED FILE
          const [copiedPage] = await mergedPdf.copyPages(pdf, [pageNum]);
          mergedPdf.addPage(copiedPage);
        }
      }
    } catch (err) {
      console.error(`Error processing ${file.name}:`, err);
    }
  }

  // Only download the merged version if we aren't in "Separate" mode
  if (!isSeparate && mergedPdf.getPageCount() > 0) {
    const pdfBytes = await mergedPdf.save();
    download(pdfBytes, "merged_extracted_pages.pdf", "application/pdf");
  }
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