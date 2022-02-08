import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const schema = new Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  cart: {
    items: [{
      count: {
        type: Number,
        required: true,
        default: 1
      },
      courseId: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
      }
    }]
  }
});

schema.methods.addToCart = function(course) {
  const items = [...this.cart.items];
  const idx = items.findIndex(({ courseId }) => courseId.toString() === course._id.toString());

  if (idx !== -1) {
    items[idx].count += 1;
  } else {
    items.push({
      courseId: course._id,
      count: 1
    });
  }

  this.cart = {
    items,
  };

  return this.save();
}

schema.methods.removeFromCart = function (id) {
  const items = [...this.cart.items];
  const idx = items.findIndex(({ courseId }) => courseId.toString() === id.toString());

  if (items[idx].count > 1) {
    items[idx].count -= 1;
  } else {
    items.splice(idx, 1);
  }


  this.cart = {
    items,
  };

  return this.save();
};

schema.methods.clearCart = function () {
  this.cart = { items: [] };
  return this.save();
}

export const User = model('User', schema);
