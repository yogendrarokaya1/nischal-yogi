const pool = require("../config/db");

const Reservation = {
  add: async ({ hotel_id, user_phone, room_id, room_number, check_in_date, check_out_date }) => {
    return pool.query(
      `INSERT INTO reservation (hotel_id, user_phone, room_id, room_number, check_in_date, check_out_date) 
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [hotel_id, user_phone, room_id, room_number, check_in_date, check_out_date]
    );
  },
  delete: async (reservation_id) => {
    return pool.query("DELETE FROM reservation WHERE reservation_id = $1", [reservation_id]);
  },
  findBySellerEmail: async (seller_email) => {
    return pool.query(
      `SELECT 
         r.reservation_id,
         r.user_phone,
         r.room_number,
         r.check_in_date,
         r.check_out_date,
         h.hotel_name,
         h.hotel_id,
         (SELECT u.email FROM users u WHERE u.phone = r.user_phone) AS user_email,
         h.seller_email
       FROM reservation r
       INNER JOIN hotel h ON r.hotel_id = h.hotel_id
       WHERE h.seller_email = $1
       ORDER BY r.check_in_date DESC`,
      [seller_email]
    );
  },
};

module.exports = Reservation;