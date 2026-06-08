const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

// 1. 連線到你的 SQLite 資料庫
const db = new sqlite3.Database('./gold_data.db', sqlite3.OPEN_READONLY, (err) => {
    if (err) {
        console.error('資料庫連線失敗：', err.message);
        process.exit(1);
    }
});

// 2. 從 GoldRecords_v2 資料表撈取所有資料 (包含價格與事件)
const query = `SELECT date, price, event, detail FROM GoldRecords_v2 ORDER BY date ASC`;

db.all(query, [], (err, rows) => {
    if (err) {
        throw err;
    }

    // 3. 過濾掉 price 為 null 的無效資料 (可選)
    const validRows = rows.filter(row => row.price !== null);

    // 4. 將結果轉換為 JSON 字串，並寫入到 src/ 資料夾下
    fs.writeFileSync('./src/gold_data.json', JSON.stringify(validRows, null, 2));
    
    console.log(`🎉 轉檔成功！共輸出了 ${validRows.length} 筆資料。`);
    console.log(`檔案已儲存為： ./src/gold_data.json`);
    
    db.close();
});