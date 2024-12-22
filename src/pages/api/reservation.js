import db from '../../lib/db'; // 2階層上に戻る

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { checkInDate, numNights, roomType, numPeople } = req.body;  // numPeopleを受け取る

    try {
      // SQLクエリを実行して予約を挿入
      const [result] = await db.execute(
        'INSERT INTO reservations (check_in_date, num_nights, room_type, num_people) VALUES (?, ?, ?, ?)',
        [checkInDate, numNights, roomType, numPeople]  // numPeopleも挿入
      );

      // 予約IDを返す
      res.status(200).json({ reservationId: result.insertId });
    } catch (error) {
      console.error(error);  // エラーメッセージをコンソールに表示
      res.status(500).json({ error: 'Failed to insert reservation' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
