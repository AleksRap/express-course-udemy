import { Router } from 'express';
import { Course } from '../models/course.js';
import { PAGE_CONSTANTS } from '../constants/pageVariables.js';
import { URL } from '../constants/url.js';

export const addRouter = Router();

addRouter.get('/', (req, res) => {
  res.render('add', PAGE_CONSTANTS.add);
})

addRouter.post('/', async (req, res) => {
  const { title, price, img } = req.body;
  const course = new Course(title, price, img);

  await course.save();

  res.redirect(URL.courses);
})
