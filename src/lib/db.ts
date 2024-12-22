// src/lib/db.ts
import mysql from 'mysql2';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'hotel_db',
});

export default pool.promise();

// 型定義を追加することもできます
export type DBPool = typeof pool;
