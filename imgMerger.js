import fs from 'fs'
import path from 'path'
import { PDFDocument } from 'pdf-lib'

const directoryPath = "./output";
const outputPath = "./book.pdf";


const pdfDoc = await PDFDocument.create()

fs.readdir(directoryPath, async (err, files) => {
    if (err) {
        console.error("Error reading directory:", err);
        return;
    }

    // sort files by name in numerical ascending order
    files.sort((a, b) => a.localeCompare(b, undefined, {numeric: true}));

    const imageFiles = files.filter(file => {
        return [".jpg"].includes(path.extname(file).toLowerCase());
    });

   


    imageFiles.forEach(async (file) => {
        console.log(file)
        var myArrayBuffer = fs.readFileSync(`./output/${file}`, null)
        const jpgImage = await pdfDoc.embedJpg(myArrayBuffer)
        const page = pdfDoc.addPage()
        page.drawImage(jpgImage,  {
            x: 0,
            y: 0,
            width: 595,
            height: 842,
            opacity: 0.75,
          })
    });
    
    const pdfBytes = await pdfDoc.save()

    console.log(pdfBytes)

    fs.writeFile('./book.pdf', new Uint8Array(pdfBytes), function (err) {
        if (err) {
            console.error("Error writing file:", err);
        } else {
            console.log("File saved successfully.");
        }
    });

    console.log("PDF merged successfully.");
});