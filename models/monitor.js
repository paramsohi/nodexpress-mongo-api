const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const monitorSchema = new Schema({
  keyword: { type: String, required: [true, 'keyword is required'] },
}, { timestamps: true });

monitorSchema.set('toObject');
monitorSchema.set('toJSON');

module.exports = mongoose.model('Monitor', monitorSchema);