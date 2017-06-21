const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const comments = new Schema({
  userId: { type: Schema.ObjectId, ref: 'User', required: [true, 'UserId is required'] },
  type: { type: String, enum: ['text', 'image'], default: 'text' },
  body: { type: String },
  status: { type: String, enum: ['active', 'deleted', 'blocked'], default: 'active' }
}, { timestamps: true });

const postsSchema = new Schema({
  title: { type: String, required: [true, 'Title is required'], maxlength: [100, 'Title cannot contain more than 100 characters'] },
  owner: { type: Schema.ObjectId, ref: 'User', required: [true, 'userId is required'] },
  image: { type: String },
  location: { type: [Number], index: '2d', required: [true, 'Location is required'] },
  likes: [{ type: Schema.ObjectId, ref: 'User', required: [true, 'userId is required'] }],
  views: [{ type: Schema.ObjectId, ref: 'User', required: [true, 'userId is required'] }],
  space: { type: Schema.ObjectId, ref: 'Space', required: [true, 'space id is required'] },
  comments,
  status: { type: String, enum: ['active', 'deleted', 'blocked'], default: 'active' }
}, { timestamps: true });

postsSchema.set('toObject');
postsSchema.set('toJSON');

module.exports = mongoose.model('Post', postsSchema);