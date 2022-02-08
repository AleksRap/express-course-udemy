import { Router } from 'express';
import { Course } from '../models/course.js';
import { PAGE_CONSTANTS } from '../constants/pageVariables.js';
import { URL } from "../constants/url.js";

export const coursesRouter = Router();

coursesRouter.get('/', async (req, res) => {
  const courses = await Course.find().populate('userId', 'email name');

  res.render('courses', {
    ...PAGE_CONSTANTS.courses,
    courses,
  });
});

coursesRouter.get('/:id/edit', async (req, res) => {
  if (!req.query.allow) {
    return res.redirect(URL.home);
  }

  const course = await Course.findById(req.params.id);

  res.render('edit', {
    ...PAGE_CONSTANTS.edit,
    title: `Редактировать курс ${course.title}`,
    course,
  })
});

coursesRouter.post('/edit', async (req, res) => {
  const { id, ...otherData } = req.body;

  await Course.findByIdAndUpdate(id, otherData);
  res.redirect(URL.courses);
});

coursesRouter.post('/remove', async (req, res) => {
  try {
    await Course.deleteOne({ _id: req.body.id });
    res.redirect(URL.courses)
  } catch (e) {
    console.log(e);
  }
});

coursesRouter.get('/:id', async (req, res) => {
  const course = await Course.findById(req.params.id);

  res.render('course', {
    title: `Курс ${course.title}`,
    course,
  });
});
