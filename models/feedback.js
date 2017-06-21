const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
  userId: { type: Schema.ObjectId, ref: 'User', required: [true, 'UserId is required'] },
  message: { type: String, required: [true, 'message body is required'] },
}, { timestamps: true });

feedbackSchema.set('toObject');
feedbackSchema.set('toJSON');
module.exports = mongoose.model('Feedback', feedbackSchema);