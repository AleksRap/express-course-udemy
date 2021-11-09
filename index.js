import express from 'express';
import path from 'path';

import { homeRouter } from './routes/home.js';
import { coursesRouter } from './routes/courses.js';
import { addRouter } from './routes/add.js';
import { cardRouter } from './routes/card.js';
import { errorRouter } from './routes/error.js';
import { URL } from './constants/url.js';

const app = express();

app.set('view engine', 'pug');
app.set('views', path.resolve('templates'));

app.use(express.static(path.resolve('static')));
app.use(express.urlencoded({ extended: false }));

app.use(URL.home, homeRouter);
app.use(URL.courses, coursesRouter);
app.use(URL.add, addRouter);
app.use(URL.card, cardRouter);
app.use(URL.all, errorRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server has been started on the port ${PORT}`);
});
