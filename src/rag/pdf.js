import fs from "fs/promises";
import path from "path";
import { PDFParse } from "pdf-parse";

const PDF_FOLDER = path.join(process.cwd(), "data/pdfs");

export async function getPdfFiles() {
  const files = await fs.readdir(PDF_FOLDER);

  return files.filter((file) => file.endsWith(".pdf"));
}

export async function readPdf(fileName) {
  const filePath = path.join(PDF_FOLDER, fileName);

  const buffer = await fs.readFile(filePath);

  const parser = new PDFParse({
    data: buffer,
  });

  const result = await parser.getText();

  await parser.destroy();

  return result.text;
}
