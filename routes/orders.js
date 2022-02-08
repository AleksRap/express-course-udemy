import { Router } from 'express';
import { Order } from '../models/order.js';
import { PAGE_CONSTANTS } from '../constants/pageVariables.js';

export const ordersRouter = Router();

ordersRouter.get('/', async (req, res) => {
  try {
    const orders = await Order.find({
      'user.userId': req.user._id,
    }).populate('user.userId');

    res.render('orders', {
      ...PAGE_CONSTANTS.orders,
      orders: orders.map(({ _doc, courses }) => ({
        ..._doc,
        price: courses.reduce((total, { count, course: { price }}) => total + count * price, 0),
      })),
    });
  } catch (e) {
    console.log(e);
  }
});

ordersRouter.post('/', async (req, res) => {
  try {
    const user = await req.user.populate('cart.items.courseId');

    const courses = user.cart.items.map(({ count, courseId: { _doc } }) => ({
      count,
      course: { ..._doc },
    }));

    const order = new Order({
      user: {
        name: req.user.name,
        userId: req.user,
      },
      courses,
    });

    await order.save();
    await req.user.clearCart();

    res.redirect('/orders');
  } catch (e) {
    console.log(e);
  }
});
