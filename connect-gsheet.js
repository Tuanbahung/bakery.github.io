const { google } = require('googleapis');

// Lấy thông tin từ GitHub Secrets hoặc tệp JSON
const credentials = JSON.parse(process.env.GOOGLE_SHEET_CREDENTIALS);

// ID của Google Sheet
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID'; // Thay bằng ID của bạn

// Khởi tạo Google Sheets API
async function initGoogleSheets() {
    const auth = new google.auth.GoogleAuth({
        credentials,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    const sheets = google.sheets({ version: 'v4', auth });
    return sheets;
}

// Hàm đọc dữ liệu từ Google Sheets
async function readSheet(sheetName) {
    const sheets = await initGoogleSheets();
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: sheetName,
    });
    return response.data.values;
}

// Ví dụ chạy
(async () => {
    const sheetName = 'CuaHang1'; // Tên bảng cần lấy dữ liệu
    const data = await readSheet(sheetName);
    console.log('Data:', data);
})();