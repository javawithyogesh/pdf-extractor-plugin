# PDF Page Extractor Chrome Extension

A lightweight Chrome Extension that allows users to upload multiple PDF files and extract a specific page (e.g., the 1st page, or the Nth page) from each, merging them into a single downloadable PDF document.

## Features
- **Bulk Processing:** Handle multiple PDF files at once.
- **Custom Page Selection:** Choose which specific page index to extract from every file.
- **Client-Side Processing:** All PDF manipulation happens in your browser using `pdf-lib`. No files are uploaded to a server, ensuring privacy.
- **Auto-Merge:** Automatically combines the extracted pages into a single output file.

## Installation

1. **Clone or Download** this repository to your local machine.
2. **Download Dependencies:**
   - The extension uses the `pdf-lib` library. For security and offline functionality, ensure `pdf-lib.min.js` is saved in the root folder of the extension.
3. **Load into Chrome:**
   - Open Chrome and navigate to `chrome://extensions/`.
   - Enable **Developer mode** (toggle in the top right).
   - Click **Load unpacked**.
   - Select the folder containing the extension files.

## Files Included
- `manifest.json`: Configuration and permissions.
- `popup.html`: The user interface.
- `popup.js`: The logic for reading PDFs, extracting pages, and triggering the download.
- `pdf-lib.min.js`: The core library for PDF manipulation.

## How to Use
1. Click the extension icon in your Chrome toolbar.
2. Click **Choose Files** and select one or more PDF documents.
3. Enter the **Page Number** you wish to extract (e.g., `1` for the first page).
4. Click **Extract & Download**.
5. A new PDF named `extracted_pages.pdf` will be generated and downloaded automatically.

## Requirements
- Google Chrome Browser (or any Chromium-based browser like Edge or Brave).
- Manifest V3 compatibility.

## Technical Details
The extension utilizes the `ArrayBuffer` API to read local files and the `copyPages` method from `pdf-lib` to transfer pages between documents without losing metadata or styling.

---
*Note: If a selected PDF has fewer pages than the number requested, that specific file will be skipped to prevent errors.*