import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  from: {
    type: String,
    ref: 'User',
    required: true,
  },
  to: {
    type: String,
    ref: 'User',
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
    required: true,
  },
  seen: {
    type: Boolean,
    default: false,
    required: true
  },
  File: {
    fileType: {
      type: String,
      default: '',
    },
    link: {
      type: String,
      default: ''
    }
  },

}, {
  timestamps: true,
});

export const Message = mongoose.model('Message', messageSchema);


