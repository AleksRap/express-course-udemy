import { Router } from 'express';
import { Card } from '../models/card.js';
import { Course } from '../models/course.js';
import { PAGE_CONSTANTS } from "../constants/pageVariables.js";

export const cardRouter = Router();

cardRouter.get('/', async (req, res) => {
  const { courses, price } = await Card.fetch();

  res.render('card', {
    ...PAGE_CONSTANTS.card,
    courses,
    price,
  });
});

cardRouter.post('/add', async (req, res) => {
  const course = await Course.getById(req.body.id);
  await Card.add(course);

  res.redirect('/card');
});

cardRouter.delete('/remove/:id', async (req, res) => {
  const card = await Card.remove(req.params.id);
  res.json(card);
});
