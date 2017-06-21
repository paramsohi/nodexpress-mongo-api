const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const spaceSchema = new Schema({
  owner: { type: Schema.ObjectId, ref: 'User' },
  location: { type: [Number], index: '2d', required: [true, 'Location is required'] },
  title: { type: String, required: [true, 'Title is required'], maxlength: [100, 'Title cannot contain more than 100 characters'] },
  details: { type: String, required: [true, 'Please provide Space Details'] },
  cover: { type: String },
  status: { type: String, enum: ['active', 'blocked', 'deleted'] },
}, { timestamps: true });

spaceSchema.set('toObject');
spaceSchema.set('toJSON');

module.exports = mongoose.model('Space', spaceSchema);