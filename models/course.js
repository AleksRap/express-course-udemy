import fs from 'fs';
import path from 'path';
import { v4 } from 'uuid';

export class Course {
  id = v4();

  constructor(title, price, img) {
    this.title = title;
    this.price = price;
    this.img = img;
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      price: this.price,
      img: this.img
    };
  }

  async save() {
    const courses = await Course.getAll();
    courses.push(this.toJSON());

    return new Promise((res, rej) => {
      fs.writeFile(
        path.resolve('data', 'courses.json'),
        JSON.stringify(courses),
        (err) => {
          if (err) rej(err);
          else res();
        }
      );
    });
  }

  static async update(course) {
    const courses = await Course.getAll();
    const index = courses.findIndex(({ id }) => course.id === id);

    if (index !== -1) {
      courses[index] = course

      return new Promise((res, rej) => {
        fs.writeFile(
          path.resolve('data', 'courses.json'),
          JSON.stringify(courses),
          (err) => {
            if (err) rej(err);
            else res();
          }
        );
      });
    }
  }

  static getAll() {
    return new Promise((res, rej) => {
      fs.readFile(
        path.resolve('data', 'courses.json'),
        'utf-8',
        (err, content) => {
          if (err) rej(err);
          else res(JSON.parse(content));
        }
      );
    })
  }

  static async getById(findId) {
    const courses = await Course.getAll();
    return courses.find(({ id }) => id === findId);
  }
}
