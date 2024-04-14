
async function downloadPDF(url) {
    const response = await fetch(url);
    return await response.arrayBuffer();
}

async function concatenatePDFs() {
    const pdfDoc = await PDFLib.PDFDocument.create();

    const urls = [
        'https://cors-proxy.kotla.eu/?url=https://filestore.aqa.org.uk/sample-papers-and-mark-schemes/2022/june/AQA-85252-QP-JUN22.PDF',
        'https://cors-proxy.kotla.eu/?url=https://filestore.aqa.org.uk/sample-papers-and-mark-schemes/2022/june/AQA-85252-QP-JUN22.PDF'
        // Add more URLs here if needed
    ];

    for (const url of urls) {
        console.log(url)
        const fileArrayBuffer = await downloadPDF(url);
        console.log(fileArrayBuffer)
        const existingPdfDoc = await PDFLib.PDFDocument.load(fileArrayBuffer, { ignoreEncryption: true });
        console.log(existingPdfDoc)
        console.log("THAT WAS IT ////")

        console.log(existingPdfDoc.isEncrypted)
        console.log("ENCR/")

        // Remove first and last pages
        console.log("OLD COUNT: ")
        console.log(existingPdfDoc.getPageCount());
        
        existingPdfDoc.removePage(0);
        existingPdfDoc.removePage(existingPdfDoc.getPageCount() - 1);

        console.log("NEW COUNT: ")
        console.log(existingPdfDoc.getPageCount())
        console.log("Removed Pages")

        const copiedPages = await pdfDoc.copyPages(existingPdfDoc, existingPdfDoc.getPageIndices());
        copiedPages.forEach(page => pdfDoc.addPage(page));
    }

    const concatenatedPdfBytes = await pdfDoc.save();
    const blob = new Blob([concatenatedPdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    console.log("CREATED A ELEMENT")
    a.href = url;
    a.download = 'concatenated_pdf.pdf';
    document.body.appendChild(a);
    a.click();
    console.log("CLICKED?")
    document.body.removeChild(a);
}

document.getElementById('concatenateBtn').addEventListener('click', async () => {
    await concatenatePDFs();
});