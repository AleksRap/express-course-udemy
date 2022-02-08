import express from 'express';
import path from 'path';
import mongoose from 'mongoose';

import { homeRouter } from './routes/home.js';
import { coursesRouter } from './routes/courses.js';
import { addRouter } from './routes/add.js';
import { cartRouter } from './routes/cart.js';
import { ordersRouter } from './routes/orders.js';
import { errorRouter } from './routes/error.js';
import { User } from './models/user.js';
import { URL } from './constants/url.js';

const app = express();

app.set('view engine', 'pug');
app.set('views', path.resolve('templates'));

app.use(async (req, res, next) => {
  try {
    req.user = await User.findById('61f0389a5f1991b2636cd36c');

    next();
  } catch (e) {
    console.log(e);
  }
});

app.use(express.static(path.resolve('static')));
app.use(express.urlencoded({ extended: false }));

app.use(URL.home, homeRouter);
app.use(URL.courses, coursesRouter);
app.use(URL.add, addRouter);
app.use(URL.cart, cartRouter);
app.use(URL.orders, ordersRouter);
app.use(URL.all, errorRouter);

const PORT = process.env.PORT || 3000;


async function start() {
  try {
    const url = 'mongodb+srv://sedov:wNlkveDQIB0pauwg@cluster0.hulle.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

    await mongoose.connect(url, { useNewUrlParser: true });

    const candidate = await User.findOne();

    if (!candidate) {
      const user = new User({
        email: 'alesk.rap94@mail.ru',
        name: 'Aleksei',
        cart: {
          items: [],
        },
      });

      await user.save();
    }


    app.listen(PORT, () => {
      console.log(`Server has been started on the port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

start();
