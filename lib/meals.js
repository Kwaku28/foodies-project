import fs from 'node:fs';

import slugify from 'slugify';
import xss from 'xss';
const sql = require('better-sqlite3');
const db = sql('meals.db');

export async function getAllMeals() {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(slug) {
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split('.').pop();
  const filename = `${meal.slug}.${extension}`;

  const stream = fs.createWriteStream(`public/images/${filename}`)
  const bufferedImage = await meal.image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error('Saving image failed');
    };
  });

  meal.image = `/images/${filename}`;
  // const slug = slugify(meal.title, { lower: true });
  // const sanitizedMeal = {
  //   ...meal,
  //   slug,
  //   creator: xss(meal.creator),
  //   creator_email: xss(meal.creator_email),
  //   title: xss(meal.title),
  //   summary: xss(meal.summary),
  //   instructions: xss(meal.instructions),
  //   image: xss(meal.image),
  // };

  const statement = db.prepare(`
    INSERT INTO meals (slug, creator, creator_email, title, summary, instructions, image)
    VALUES (@slug, @creator, @creator_email, @title, @summary, @instructions, @image)
  `);
  statement.run(meal);
}

