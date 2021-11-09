import path from 'path';
import fs from 'fs';

const p = path.join(
  'data',
  'card.json',
);

export class Card {

  static async add(course) {
    const card = await Card.fetch();

    const idx = card.courses.findIndex(({ id }) => id === course.id);
    const candidate = card.courses[idx];

    if (candidate) {
      candidate.count++;
      card.courses[idx] = candidate;
    } else {
      course.count = 1;
      card.courses.push(course);
    }

    card.price += +course.price;

    return new Promise((res, rej) => {
      fs.writeFile(p, JSON.stringify(card), (err) => {
        if (err) rej(err);
        else res();
      });
    });
  }

  static async remove(id) {
    const card = await Card.fetch();

    const idx = card.courses.findIndex(({ id: idCourse }) => idCourse === id);
    const { price, count } = card.courses[idx];

    if (count > 1) {
      card.courses[idx] = {
        ...card.courses[idx],
        count: --card.courses[idx].count,
      }
    } else {
      card.courses = card.courses.filter(({ id: idCard }) => idCard !== id);
    }


    const newCard = {
      courses: card.courses,
      price: +card.price - +price,
    };

    return new Promise((res, rej) => {
      fs.writeFile(p, JSON.stringify(newCard), (err) => {
        if (err) rej(err);
        else res(newCard);
      });
    });
  }

  static async fetch() {
    return new Promise((res, rej) => {
      fs.readFile(p, 'utf-8', (err, content) => {
        if (err) rej(err);
        else res(JSON.parse(content));
      })
    });
  }
}
