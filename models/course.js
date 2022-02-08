import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const schema = new Schema({
  title: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    required: true,
  },
  img: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

schema.method('toClient', function() {
  const course = this.toObject();

  course.id = course._id;
  delete course._id;

  return course;
})

export const Course = model('Course', schema);
