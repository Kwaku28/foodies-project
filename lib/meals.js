const sql = require('better-sqlite3');
const db = sql('meals.db');

export async function getAllMeals() {
  await new Promise((resolve) => setTimeout(resolve, 5000));

  // throw new Error('Something went wrong');
  return db.prepare('SELECT * FROM meals').all();
}
