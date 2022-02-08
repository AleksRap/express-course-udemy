import { Router } from 'express';
import { Course } from '../models/course.js';
import { PAGE_CONSTANTS } from "../constants/pageVariables.js";

function mapCartItems(cart) {
  return cart.items.map(({ count, courseId: { id, _doc } }) => ({
    ..._doc,
    id,
    count,
  }));
}

function computedPrice(courses) {
  return courses.reduce((sum, { price, count }) => sum + price * count, 0);
}

export const cartRouter = Router();

cartRouter.get('/', async (req, res) => {
  const user = await req.user.populate('cart.items.courseId');

  const courses = mapCartItems(user.cart);

  res.render('cart', {
    ...PAGE_CONSTANTS.cart,
    courses,
    price: computedPrice(courses),
  });
});

cartRouter.post('/add', async (req, res) => {
  const course = await Course.findById(req.body.id);
  await req.user.addToCart(course);

  res.redirect('/cart');
});

cartRouter.delete('/remove/:id', async (req, res) => {
  await req.user.removeFromCart(req.params.id);
  const user = await req.user.populate('cart.items.courseId');

  const courses = mapCartItems(user.cart);
  const cart = {
    courses,
    price: computedPrice(courses),
  }

  res.json(cart);
});
