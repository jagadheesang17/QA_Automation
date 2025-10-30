import * as fs from 'fs';
import * as path from 'path';
import dataBase from "./dbUtil"
import DB from './dbUtil';

/**
 * Writes data to a CSV file where each row of data is written as a separate row in the CSV.
 * @param filePath The path where the CSV file should be saved.
 * @param header The header row.
 * @param data The dynamic data to be written to the CSV.
 */
export function writeToMultiRowCSV(file: string, header: string[], data: Record<string, string>[]): void {
    const filePath = path.resolve(__dirname, file);
    const fileExists = fs.existsSync(filePath);
    // Read existing file content to avoid duplicate rows
    const existingContent = fileExists ? fs.readFileSync(filePath, 'utf8') : '';
    const existingRows = new Set(existingContent.split('\n').map(line => line.trim()));

    let csvContent = '';

    if (!fileExists) {
        // Add the header if the file does not exist
        csvContent += header.join('|') + '\n';
    }

    // Add each row of data to the CSV content if it does not already exist
    data.forEach(rowObj => {
        const row = header.map(key => rowObj[key] || ''); // Ensure header keys are used to create the row
        const rowString = row.join('|');
        if (!existingRows.has(rowString)) {
            csvContent += rowString + '\n';
        }
    });

    // Append the content to the file
    fs.appendFileSync(filePath, csvContent, 'utf8');
    console.log(`CSV file has been updated at ${filePath}`);
}


/*Follow this step to write in further testScript*/

/* const header = ['username', 'class_code', 'regdate'];
const data = [{ username: 'AjayMichael', class_code: 'CRS-EL-01556', regdate: '2026-10-17' }];
const filePath = path.resolve(__dirname, '../data/output.csv'); 
writeToMultiRowCSV(filePath, header, data);*/