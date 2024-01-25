const sql = require('better-sqlite3');
const db = sql('meals.db');

export async function getAllMeals() {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(slug) {
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}
